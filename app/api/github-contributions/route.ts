import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

function getEnv(key: string): string | undefined {
    if (process.env[key]) {
        return process.env[key];
    }
    const envFiles = [".env.local", ".env", ".env.development", ".env.production"];
    for (const file of envFiles) {
        try {
            const filePath = path.join(process.cwd(), file);
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, "utf-8");
                const regex = new RegExp(`^\\s*${key}\\s*=\\s*["']?([^"'\\r\\n]+)["']?`, "m");
                const match = content.match(regex);
                if (match?.[1]) {
                    return match[1].trim();
                }
            }
        } catch {
            // Ignore file read errors
        }
    }
    return undefined;
}

interface ContributionDay {
    date: string;
    contributionCount: number;
    contributionLevel: string;
    weekday: number;
}

interface ContributionWeek {
    firstDay: string;
    contributionDays: ContributionDay[];
}

interface ContributionCalendar {
    totalContributions: number;
    weeks: ContributionWeek[];
}

interface GitHubGraphQLResponse {
    data?: {
        user?: {
            contributionsCollection?: {
                contributionCalendar?: ContributionCalendar;
            };
        };
    };
    errors?: Array<{ message: string }>;
}

const CONTRIBUTIONS_QUERY = `
    query PortfolioContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                    totalContributions
                    weeks {
                        firstDay
                        contributionDays {
                            date
                            contributionCount
                            contributionLevel
                            weekday
                        }
                    }
                }
            }
        }
    }
`;

export async function GET() {
    const rawToken = getEnv("GITHUB_TOKEN");
    const rawUsername = getEnv("GITHUB_USERNAME");

    const token = rawToken?.trim()?.replace(/^["']|["']$/g, "");
    const username = rawUsername?.trim()?.replace(/^["']|["']$/g, "") || "SilencioOrgs";

    if (!token) {
        return NextResponse.json({
            configured: false,
            username: username,
            totalContributions: 0,
            weeks: [],
            message: "Missing GITHUB_TOKEN environment variable in Vercel or .env.local",
        });
    }

    const to = new Date();
    const from = new Date(to);
    from.setFullYear(from.getFullYear() - 1);

    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: CONTRIBUTIONS_QUERY,
                variables: {
                    login: username,
                    from: from.toISOString(),
                    to: to.toISOString(),
                },
            }),
            next: { revalidate: 60 * 60 },
        });

        if (!response.ok) {
            return NextResponse.json(
                {
                    configured: true,
                    username,
                    totalContributions: 0,
                    weeks: [],
                    message: "GitHub rejected the contribution request.",
                },
                { status: response.status }
            );
        }

        const payload = (await response.json()) as GitHubGraphQLResponse;

        if (payload.errors?.length) {
            return NextResponse.json(
                {
                    configured: true,
                    username,
                    totalContributions: 0,
                    weeks: [],
                    message: payload.errors[0]?.message ?? "GitHub returned an error.",
                },
                { status: 502 }
            );
        }

        const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;

        if (!calendar) {
            return NextResponse.json(
                {
                    configured: true,
                    username,
                    totalContributions: 0,
                    weeks: [],
                    message: "No contribution calendar was returned for this user.",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                configured: true,
                username,
                from: from.toISOString(),
                to: to.toISOString(),
                totalContributions: calendar.totalContributions,
                weeks: calendar.weeks,
            },
            {
                headers: {
                    "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
                },
            }
        );
    } catch {
        return NextResponse.json(
            {
                configured: true,
                username,
                totalContributions: 0,
                weeks: [],
                message: "Unable to load GitHub contribution data.",
            },
            { status: 500 }
        );
    }
}
