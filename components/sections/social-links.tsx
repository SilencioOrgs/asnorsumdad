"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { personalInfo } from "@/lib/data";
import { fadeInUp } from "@/lib/utils";

const contactLinks = [
    {
        name: "GitHub",
        handle: "@SilencioOrgs",
        href: personalInfo.github,
        icon: "code",
        actionIcon: "arrow_outward",
    },
    {
        name: "LinkedIn",
        handle: "in/sumdad-asnor-a",
        href: personalInfo.linkedin,
        icon: "badge",
        actionIcon: "arrow_outward",
    },
    {
        name: "Instagram",
        handle: "@asnor_sumdad",
        href: personalInfo.instagram,
        icon: "camera",
        actionIcon: "arrow_outward",
    },
    {
        name: "Full Resume / CV",
        handle: "Download PDF Artifact",
        href: personalInfo.resume,
        icon: "description",
        actionIcon: "download",
    },
];

export function SocialLinks() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(personalInfo.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    return (
        <motion.section
            id="contact"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden scroll-mt-28"
            aria-labelledby="contact-heading"
        >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Heading & Direct Actions */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full code-pill text-xs font-mono">
                        <span className="w-2 h-2 rounded-full glow-dot-blue animate-pulse" />
                        <span>Direct Communication Channel</span>
                    </div>

                    <h2
                        id="contact-heading"
                        className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-black dark:text-white tracking-tight"
                    >
                        Let&apos;s build something useful.
                    </h2>

                    <p className="text-base md:text-lg text-neutral-600 dark:text-[#b4b5b5] max-w-xl leading-relaxed">
                        Have a project, freelance inquiry, automated workflow challenge, or want to discuss full-stack applications? Feel free to drop a message.
                    </p>

                    <div className="pt-3 flex flex-wrap items-center gap-3">
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-[#e6e2d3] transition-all shadow-md"
                        >
                            <span className="material-symbols-outlined text-[16px]">mail</span>
                            <span>{personalInfo.email}</span>
                        </a>

                        <button
                            type="button"
                            onClick={handleCopyEmail}
                            className="px-4 py-3.5 rounded-xl border border-black/20 dark:border-[#e6e2d3]/20 bg-white/70 dark:bg-white/5 text-black dark:text-white hover:border-black dark:hover:border-white transition-all font-mono text-xs inline-flex items-center gap-2 cursor-pointer"
                            title="Copy Email"
                        >
                            <span className="material-symbols-outlined text-[16px]">
                                {copied ? "check" : "content_copy"}
                            </span>
                            <span>{copied ? "Copied!" : "Copy"}</span>
                        </button>
                    </div>
                </div>

                {/* Right Column: Social & Direct Link Grid (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                    {contactLinks.map((link) => {
                        const isExternal = !link.href.startsWith("mailto:");

                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className="glass-panel rounded-xl p-4 flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 flex items-center justify-center text-black dark:text-white">
                                        <span className="material-symbols-outlined text-[20px]">
                                            {link.icon}
                                        </span>
                                    </span>
                                    <div>
                                        <p className="font-display text-sm font-semibold text-black dark:text-white">
                                            {link.name}
                                        </p>
                                        <p className="font-mono text-xs text-neutral-500">
                                            {link.handle}
                                        </p>
                                    </div>
                                </div>

                                <span className="material-symbols-outlined text-neutral-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[18px]">
                                    {link.actionIcon}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
}
