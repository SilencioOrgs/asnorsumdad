"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp } from "@/lib/utils";

interface TimelineItem {
    period: string;
    title: string;
    description: string;
    tag?: string;
    badge?: string;
    dotClass: string;
}

const timelineData: TimelineItem[] = [
    {
        period: "2025 – Present",
        title: "Freelance Full-Stack & AI Automation Systems",
        description:
            "Expanded into freelance full-stack development, AI automation workflows, and bespoke client platforms. Continuously evolving and leveraging modern AI to transform automated workflows into living, self-sustaining digital products.",
        badge: "Active Focus",
        dotClass: "bg-black dark:bg-white",
    },
    {
        period: "2024 – 2025",
        title: "Video Editor & AI Animated Content Producer",
        description:
            "Worked as Video Editor for Australian keto diet channel (DisruptingDiabetes) and engineered AI-animated educational content for MagpieTutor Academy, bridging tech and digital media.",
        dotClass: "bg-neutral-400 dark:bg-[#e6e2d3]",
    },
    {
        period: "2023",
        title: "Web Development & Personal Projects",
        description:
            "Started building personal web development projects and mastering core web technologies—learning HTML, CSS, JavaScript, MySQL, and PHP to develop dynamic, database-driven applications alongside n8n automation workflows.",
        dotClass: "bg-neutral-400 dark:bg-neutral-600",
    },
    {
        period: "2021 – 2022",
        title: "BS Computer Engineering & Academic Journey (LSPU Main Campus)",
        description:
            "Began my college journey pursuing a Bachelor of Science in Computer Engineering at Laguna State Polytechnic University (LSPU) Main Campus. Participated in programming events, hackathons, IoT hardware experiments, and student engineering communities.",
        dotClass: "bg-neutral-400 dark:bg-neutral-600",
    },
    {
        period: "2020",
        title: "Built simple games and early VB.NET systems",
        description:
            "Built simple games and early desktop database systems with VB.NET, exploring architecture, event handlers, and data structures.",
        dotClass: "bg-neutral-300 dark:bg-neutral-700",
    },
    {
        period: "2019",
        title: "First Code & Hello World",
        description:
            'Started programming with my first "Hello, World" program, sparking my lifelong dedication to software engineering.',
        tag: "Genesis",
        dotClass: "bg-neutral-300 dark:bg-neutral-700",
    },
];

export function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.section
            id="journey"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8 scroll-mt-28"
            aria-labelledby="journey-heading"
        >
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e2ded2] dark:border-[#282a2b] pb-6">
                <div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-600 dark:text-[#e6e2d3] mb-1">
                        <span>03 / 04</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-[#e6e2d3]" />
                        <span>Career Progression</span>
                    </div>
                    <h2
                        id="journey-heading"
                        className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white"
                    >
                        From first program to shipped systems.
                    </h2>
                </div>
                <p className="text-sm md:text-base text-neutral-600 dark:text-[#b4b5b5] max-w-md">
                    A continuous path of engineering curiosity, hackathons, real-world business operations, and automated software delivery.
                </p>
            </div>

            {/* Chronological Monochromatic Cards */}
            <div className="relative border-l border-neutral-300 dark:border-neutral-800 ml-4 md:ml-8 space-y-6 pl-6 md:pl-10">
                {timelineData.map((item, index) => {
                    const isPresent = item.period.includes("Present");

                    return (
                        <div key={item.period} className="relative group">
                            {/* Dot with ring */}
                            <span
                                className={`absolute -left-[31px] md:-left-[47px] top-2 w-3.5 h-3.5 rounded-full ring-4 ring-[#f8f8f7] dark:ring-black ${item.dotClass}`}
                            />

                            <div className="glass-panel rounded-2xl p-6 md:p-7 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`px-3 py-0.5 rounded-full font-mono text-xs font-semibold ${
                                                isPresent
                                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                                    : "code-pill font-medium"
                                            }`}
                                        >
                                            {item.period}
                                        </span>
                                        {item.tag && (
                                            <span className="font-mono text-xs text-neutral-500">
                                                {item.tag}
                                            </span>
                                        )}
                                    </div>

                                    {item.badge && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full glow-pill-live font-mono text-xs font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full glow-dot-emerald animate-pulse" />
                                            <span>{item.badge}</span>
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-display font-semibold text-lg text-black dark:text-white">
                                    {item.title}
                                </h3>

                                <p className="text-sm md:text-base text-neutral-600 dark:text-[#b4b5b5] leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.section>
    );
}
