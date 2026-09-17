"use client";

import { motion, useInView } from "framer-motion";
import { Github, Flame, Calendar, Trophy } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { fadeInUp } from "@/lib/utils";

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

interface ContributionResponse {
    configured: boolean;
    username: string | null;
    totalContributions: number;
    weeks: ContributionWeek[];
    message?: string;
}

interface ActivityStats {
    longestStreak: number;
    bestMonth: string;
    activeDays: number;
}

const weekdayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

function getContributionClass(day?: ContributionDay) {
    if (!day || day.contributionCount === 0) {
        return "bg-neutral-200/60 dark:bg-white/[0.05] border-black/5 dark:border-white/5";
    }

    switch (day.contributionLevel) {
        case "FIRST_QUARTILE":
            return "bg-neutral-400/80 dark:bg-neutral-700 border-neutral-400/40 dark:border-neutral-600";
        case "SECOND_QUARTILE":
            return "bg-neutral-600 dark:bg-neutral-500 border-neutral-600/40 dark:border-neutral-400";
        case "THIRD_QUARTILE":
            return "bg-neutral-800 dark:bg-neutral-300 border-neutral-800/40 dark:border-neutral-200";
        case "FOURTH_QUARTILE":
            return "bg-black dark:bg-white border-black dark:border-white shadow-sm";
        default:
            return "bg-neutral-500 dark:bg-neutral-400 border-neutral-500/40";
    }
}

function formatDateLabel(date: string) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

function getMonthMarkers(weeks: ContributionWeek[]) {
    return weeks.map((week, index) => {
        const currentMonth = new Date(week.firstDay).getMonth();
        const previousMonth = index > 0 ? new Date(weeks[index - 1].firstDay).getMonth() : -1;

        if (index === 0 || currentMonth !== previousMonth) {
            return new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(week.firstDay));
        }

        return "";
    });
}

function getActivityStats(weeks: ContributionWeek[]): ActivityStats {
    const days = weeks
        .flatMap((week) => week.contributionDays)
        .sort((first, second) => new Date(first.date).getTime() - new Date(second.date).getTime());
    const monthTotals = new Map<string, { label: string; total: number }>();
    let activeDays = 0;
    let longestStreak = 0;
    let currentStreak = 0;
    let previousActiveDate: Date | null = null;

    days.forEach((day) => {
        const date = new Date(day.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
        const monthLabel = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
        const monthTotal = monthTotals.get(monthKey) ?? { label: monthLabel, total: 0 };
        monthTotal.total += day.contributionCount;
        monthTotals.set(monthKey, monthTotal);

        if (day.contributionCount > 0) {
            activeDays += 1;

            if (previousActiveDate) {
                const dayDifference = Math.round(
                    (date.getTime() - previousActiveDate.getTime()) / (1000 * 60 * 60 * 24)
                );
                currentStreak = dayDifference === 1 ? currentStreak + 1 : 1;
            } else {
                currentStreak = 1;
            }

            longestStreak = Math.max(longestStreak, currentStreak);
            previousActiveDate = date;
        } else {
            currentStreak = 0;
            previousActiveDate = null;
        }
    });

    const bestMonth =
        Array.from(monthTotals.values()).sort((first, second) => second.total - first.total)[0]?.label ?? "--";

    return {
        longestStreak,
        bestMonth,
        activeDays,
    };
}

function ContributionSkeleton() {
    return (
        <div className="min-w-[42rem] animate-pulse">
            <div className="mb-2 ml-10 grid grid-cols-[repeat(53,0.75rem)] gap-1">
                {Array.from({ length: 53 }, (_, index) => (
                    <span key={index} className="h-3 rounded-[2px] bg-neutral-200 dark:bg-white/[0.04]" />
                ))}
            </div>
            <div className="grid grid-cols-[2rem_1fr] gap-2">
                <div className="grid grid-rows-7 gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                    {weekdayLabels.map((label, index) => (
                        <span key={`${label}-${index}`} className="h-3 leading-3">
                            {label}
                        </span>
                    ))}
                </div>
                <div className="grid grid-cols-[repeat(53,0.75rem)] gap-1">
                    {Array.from({ length: 53 }, (_, week) => (
                        <div key={week} className="grid grid-rows-7 gap-1">
                            {Array.from({ length: 7 }, (_, day) => (
                                <span
                                    key={`${week}-${day}`}
                                    className="h-3 w-3 rounded-[2px] bg-neutral-200 dark:bg-white/[0.04]"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function GitHubActivity() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [activity, setActivity] = useState<ContributionResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadActivity() {
            try {
                const response = await fetch("/api/github-contributions");
                const payload = (await response.json()) as ContributionResponse;

                if (!isMounted) return;

                setActivity(payload);
                setError(response.ok ? null : payload.message ?? "Unable to load GitHub activity.");
            } catch {
                if (isMounted) {
                    setError("Unable to load GitHub activity.");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadActivity();

        return () => {
            isMounted = false;
        };
    }, []);

    const monthMarkers = useMemo(() => getMonthMarkers(activity?.weeks ?? []), [activity?.weeks]);
    const activityStats = useMemo(() => getActivityStats(activity?.weeks ?? []), [activity?.weeks]);
    const username = activity?.username ?? "SilencioOrgs";

    return (
        <motion.section
            id="activity"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="scroll-mt-28"
            aria-labelledby="github-activity-heading"
        >
            <div className="glass-panel overflow-hidden rounded-2xl p-6 md:p-8">
                {/* Section Header */}
                <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#e2ded2] dark:border-[#282a2b] pb-6 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <Github size={18} className="text-black dark:text-white" />
                            <h2
                                id="github-activity-heading"
                                className="font-display text-xl font-bold tracking-tight text-neutral-900 dark:text-white"
                            >
                                Open Source &amp; Engineering Activity
                            </h2>
                        </div>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-[#b4b5b5]">
                            Public commits, repositories, and continuous shipping across projects.
                        </p>
                    </div>

                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 self-start rounded-full border border-black/10 bg-black/[0.02] px-3.5 py-1.5 font-mono text-xs font-medium text-neutral-800 transition-colors hover:bg-black/[0.06] dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-200 dark:hover:bg-white/[0.08] sm:self-auto"
                    >
                        <Github size={14} />
                        <span>@{username}</span>
                    </a>
                </div>

                {/* Metrics Highlights Bento Cards */}
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/5 dark:bg-white/[0.02]">
                        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">Total Year</p>
                        <p className="mt-1 font-display text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
                            {isLoading ? "--" : activity?.configured ? (activity?.totalContributions?.toLocaleString() ?? 0) : "20+"}
                        </p>
                        <p className="font-mono text-[10px] text-neutral-400">
                            {activity?.configured ? "Contributions" : "Public Repos & Builds"}
                        </p>
                    </div>

                    <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/5 dark:bg-white/[0.02]">
                        <div className="flex items-center gap-1">
                            <Flame size={14} className="text-orange-500" />
                            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">Longest Streak</p>
                        </div>
                        <p className="mt-1 font-display text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
                            {isLoading ? "--" : activity?.configured ? `${activityStats.longestStreak}d` : "Active"}
                        </p>
                        <p className="font-mono text-[10px] text-neutral-400">
                            {activity?.configured ? "Consecutive days" : "Continuous shipping"}
                        </p>
                    </div>

                    <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/5 dark:bg-white/[0.02]">
                        <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-emerald-500" />
                            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">Active Days</p>
                        </div>
                        <p className="mt-1 font-display text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
                            {isLoading ? "--" : activity?.configured ? activityStats.activeDays : "365d"}
                        </p>
                        <p className="font-mono text-[10px] text-neutral-400">
                            {activity?.configured ? "Recorded active" : "Year-round cycles"}
                        </p>
                    </div>

                    <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/5 dark:bg-white/[0.02]">
                        <div className="flex items-center gap-1">
                            <Trophy size={14} className="text-amber-500" />
                            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                                {activity?.configured ? "Peak Month" : "Platform"}
                            </p>
                        </div>
                        <p className="mt-1 truncate font-display text-xl font-bold text-neutral-900 dark:text-white sm:text-2xl">
                            {isLoading ? "--" : activity?.configured ? activityStats.bestMonth : "GitHub"}
                        </p>
                        <p className="font-mono text-[10px] text-neutral-400">
                            {activity?.configured ? "Highest velocity" : "Open Source"}
                        </p>
                    </div>
                </div>

                {/* Heatmap Container */}
                <div className="relative overflow-hidden rounded-xl border border-black/5 bg-black/[0.01] p-4 dark:border-white/5 dark:bg-black/30">
                    <div className="overflow-x-auto pb-2 pt-1">
                        {isLoading ? (
                            <ContributionSkeleton />
                        ) : !activity?.configured ? (
                            <div className="flex flex-col items-center justify-center p-8 text-center space-y-3 rounded-xl border border-dashed border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                                <Github className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
                                <div>
                                    <p className="font-display font-semibold text-sm text-black dark:text-white">
                                        Live GitHub Activity Stream
                                    </p>
                                    <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-md">
                                        Make sure <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200">GITHUB_TOKEN</code> is in your <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200">.env.local</code> to stream your real-time GraphQL commit calendar.
                                    </p>
                                </div>
                                <a
                                    href={`https://github.com/${username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
                                >
                                    <span>View @{username} on GitHub</span>
                                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                </a>
                            </div>
                        ) : error ? (
                            <div className="rounded-lg border border-dashed border-red-500/20 bg-red-500/[0.05] p-6 text-center text-sm text-red-500 font-mono">
                                {error}
                            </div>
                        ) : (
                            <div className="min-w-[42rem]">
                                {/* Months Header */}
                                <div
                                    className="mb-2 ml-10 grid gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500"
                                    style={{ gridTemplateColumns: `repeat(${activity?.weeks.length ?? 0}, 0.75rem)` }}
                                >
                                    {monthMarkers.map((month, index) => (
                                        <span key={`${month}-${index}`} className="h-3 leading-3">
                                            {month}
                                        </span>
                                    ))}
                                </div>

                                <div className="grid grid-cols-[2rem_1fr] gap-2">
                                    {/* Weekday Labels */}
                                    <div className="grid grid-rows-7 gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
                                        {weekdayLabels.map((label, index) => (
                                            <span key={`${label}-${index}`} className="h-3 leading-3">
                                                {label}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Contribution Matrix */}
                                    <div
                                        className="grid gap-1"
                                        style={{ gridTemplateColumns: `repeat(${activity?.weeks.length ?? 0}, 0.75rem)` }}
                                    >
                                        {activity?.weeks.map((week) => (
                                            <div key={week.firstDay} className="grid grid-rows-7 gap-1">
                                                {Array.from({ length: 7 }, (_, weekday) => {
                                                    const day = week.contributionDays.find(
                                                        (contributionDay) => contributionDay.weekday === weekday
                                                    );

                                                    return (
                                                        <span
                                                            key={`${week.firstDay}-${weekday}`}
                                                            className={`h-3 w-3 rounded-[2px] border transition-transform duration-150 hover:scale-125 ${getContributionClass(day)}`}
                                                            title={
                                                                day
                                                                    ? `${formatDateLabel(day.date)}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`
                                                                    : "No contribution data"
                                                            }
                                                            aria-label={
                                                                day
                                                                    ? `${formatDateLabel(day.date)}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`
                                                                    : "No contribution data"
                                                            }
                                                        />
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Matrix Legend */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-black/5 pt-3 font-mono text-xs text-neutral-500 dark:border-white/5 dark:text-neutral-400">
                        <span>Updated automatically via GitHub API</span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[11px]">Less</span>
                            <span className="h-2.5 w-2.5 rounded-[2px] border border-black/5 bg-neutral-200/60 dark:border-white/5 dark:bg-white/[0.05]" />
                            <span className="h-2.5 w-2.5 rounded-[2px] border border-neutral-400/40 bg-neutral-400/80 dark:border-neutral-600 dark:bg-neutral-700" />
                            <span className="h-2.5 w-2.5 rounded-[2px] border border-neutral-600/40 bg-neutral-600 dark:border-neutral-400 dark:bg-neutral-500" />
                            <span className="h-2.5 w-2.5 rounded-[2px] border border-neutral-800/40 bg-neutral-800 dark:border-neutral-200 dark:bg-neutral-300" />
                            <span className="h-2.5 w-2.5 rounded-[2px] border border-black bg-black dark:border-white dark:bg-white" />
                            <span className="text-[11px]">More</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
