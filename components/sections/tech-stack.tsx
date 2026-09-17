"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp } from "@/lib/utils";

export function TechStack() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.section
            id="tools"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8 scroll-mt-28"
            aria-labelledby="skills-heading"
        >
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e2ded2] dark:border-[#282a2b] pb-6">
                <div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-600 dark:text-[#e6e2d3] mb-1">
                        <span>02 / 04</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-[#e6e2d3]" />
                        <span>Technical Capabilities</span>
                    </div>
                    <h2
                        id="skills-heading"
                        className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white"
                    >
                        Tools I use to ship.
                    </h2>
                </div>
                <p className="text-sm md:text-base text-neutral-600 dark:text-[#b4b5b5] max-w-md">
                    The tools, frameworks, and platforms I reach for across front end, back end, AI workflows, mobile, and cloud infrastructure.
                </p>
            </div>

            {/* Skill Domain Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Frontend & Mobile */}
                <div className="glass-panel rounded-2xl p-6 md:p-7 space-y-4">
                    <div className="flex items-center gap-3 border-b border-[#e2ded2] dark:border-[#282a2b] pb-3">
                        <span className="material-symbols-outlined text-black dark:text-[#e6e2d3] text-[22px]">
                            devices
                        </span>
                        <h3 className="font-display font-semibold text-lg text-black dark:text-white">
                            Frontend &amp; Mobile
                        </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium">JavaScript</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium">TypeScript</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium text-black dark:text-[#e6e2d3] font-semibold">React</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium text-black dark:text-[#e6e2d3] font-semibold">Next.js</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium">Tailwind CSS</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium">FlutterFlow</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium text-neutral-500">HTML / CSS</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium text-neutral-500">Framer Motion</span>
                    </div>
                </div>

                {/* Backend & Cloud */}
                <div className="glass-panel rounded-2xl p-6 md:p-7 space-y-4">
                    <div className="flex items-center gap-3 border-b border-[#e2ded2] dark:border-[#282a2b] pb-3">
                        <span className="material-symbols-outlined text-black dark:text-[#e6e2d3] text-[22px]">
                            database
                        </span>
                        <h3 className="font-display font-semibold text-lg text-black dark:text-white">
                            Backend &amp; Cloud
                        </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-semibold text-black dark:text-[#e6e2d3]">Node.js</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-semibold text-black dark:text-[#e6e2d3]">Python</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium">FastAPI</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium">Supabase</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium">Firebase</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium text-neutral-500">PostgreSQL</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium text-neutral-500">Vercel</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium text-neutral-500">Docker</span>
                    </div>
                </div>

                {/* AI & Automation */}
                <div className="glass-panel rounded-2xl p-6 md:p-7 space-y-4">
                    <div className="flex items-center gap-3 border-b border-[#e2ded2] dark:border-[#282a2b] pb-3">
                        <span className="material-symbols-outlined text-black dark:text-[#e6e2d3] text-[22px]">
                            schema
                        </span>
                        <h3 className="font-display font-semibold text-lg text-black dark:text-white">
                            AI &amp; Automation
                        </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-semibold text-black dark:text-[#e6e2d3]">n8n Automation</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-semibold text-black dark:text-[#e6e2d3]">Gemini API</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium">Ollama / Local LLM</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium">Telegram Bots</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium text-neutral-500">Raspberry Pi</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium text-neutral-500">Video Production</span>
                        <span className="code-pill px-3 py-1.5 rounded-lg font-mono text-xs font-medium text-neutral-500">+28 more tools</span>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
