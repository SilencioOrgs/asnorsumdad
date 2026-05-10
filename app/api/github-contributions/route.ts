import { NextResponse } from "next/server";

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
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;

    if (!token || !username) {
        return NextResponse.json({
            configured: false,
            username: username ?? null,
            totalContributions: 0,
            weeks: [],
            message: "GitHub contribution calendar is not configured yet.",
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
