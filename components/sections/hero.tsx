"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { aboutContent, personalInfo, profileStats } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export function Hero() {
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

    // Synchronize photo modal state with navbar and body scroll
    useEffect(() => {
        if (isPhotoModalOpen) {
            document.documentElement.dataset.modalOpen = "true";
            document.body.style.overflow = "hidden";
            window.dispatchEvent(new CustomEvent("modal-visibility-change", { detail: { open: true } }));
        } else {
            delete document.documentElement.dataset.modalOpen;
            document.body.style.overflow = "";
            window.dispatchEvent(new CustomEvent("modal-visibility-change", { detail: { open: false } }));
        }
        return () => {
            delete document.documentElement.dataset.modalOpen;
            document.body.style.overflow = "";
            window.dispatchEvent(new CustomEvent("modal-visibility-change", { detail: { open: false } }));
        };
    }, [isPhotoModalOpen]);

    // Close photo modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsPhotoModalOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <section className="space-y-8" id="profile">
            {/* Hero Main Layout: Bento Grid */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
                {/* Main Headline & Value Prop (8 cols) */}
                <motion.div
                    variants={fadeInUp}
                    className="lg:col-span-8 glass-panel rounded-2xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden"
                >
                    <div className="space-y-5">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight leading-tight md:leading-[1.15] text-black dark:text-white">
                            I build clean websites and mobile apps for{" "}
                            <span className="underline decoration-1 underline-offset-8 decoration-black/30 dark:decoration-[#e6e2d3]/50">
                                real-world problems.
                            </span>
                        </h1>

                        <p className="text-base md:text-lg text-neutral-700 dark:text-[#b4b5b5] max-w-2xl leading-relaxed">
                            Focused on web development and app development. Also available for workflow automation (n8n), Machine Learning projects, and video editing.
                        </p>
                    </div>

                    {/* Hero CTAs */}
                    <div className="pt-8 flex flex-wrap items-center gap-3">
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-[#e6e2d3] transition-all active:scale-95 shadow-md"
                        >
                            <span>View Work</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                        </a>

                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-black/20 dark:border-[#e6e2d3]/20 bg-white/70 dark:bg-white/5 text-black dark:text-white hover:border-black dark:hover:border-white transition-all font-mono text-xs active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[16px]">mail</span>
                            <span>Send Email</span>
                        </a>

                        <a
                            href={personalInfo.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-black/20 dark:border-[#e6e2d3]/20 bg-white/70 dark:bg-white/5 text-neutral-700 dark:text-[#eeeeee] hover:border-black dark:hover:border-white transition-all font-mono text-xs"
                        >
                            <span className="material-symbols-outlined text-[16px]">description</span>
                            <span>Resume</span>
                        </a>
                    </div>
                </motion.div>

                {/* Spotlight Profile & Stats Card (4 cols) */}
                <motion.div variants={fadeInUp} className="lg:col-span-4 flex flex-col gap-6">
                    {/* Profile Card with Radiant Electric Blue Glow */}
                    <div className="glass-panel rounded-2xl p-6 md:p-7 flex-1 flex flex-col justify-between relative overflow-hidden">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3.5">
                                {/* Clickable Profile Photo */}
                                <button
                                    type="button"
                                    onClick={() => setIsPhotoModalOpen(true)}
                                    className="relative group shrink-0 cursor-pointer block text-left focus:outline-hidden"
                                    aria-label="View enlarged profile photo"
                                    title="Click to view full photo"
                                >
                                    {/* Heartbeat aura glow */}
                                    <span className="absolute -inset-1 rounded-2xl bg-cyan-400/30 dark:bg-cyan-400/20 blur-sm animate-heartbeat-aura -z-10 group-hover:bg-cyan-400/50 transition-colors" />
                                    
                                    {/* Profile Image with subtle heartbeat animation */}
                                    <div className="w-13 h-13 rounded-xl overflow-hidden relative border border-black/15 dark:border-[#e6e2d3]/25 shadow-md bg-neutral-200 dark:bg-neutral-800 animate-heartbeat group-hover:scale-105 active:scale-95 transition-transform duration-200">
                                        <Image
                                            src="/profile.png"
                                            alt={personalInfo.name}
                                            fill
                                            className="object-cover object-top"
                                            sizes="52px"
                                            priority
                                        />
                                    </div>

                                    {/* Heartbeat active status indicator */}
                                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5" title="Active & Available">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 glow-dot-blue border-2 border-white dark:border-[#121414]" />
                                    </span>
                                </button>

                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5">
                                        <h2 className="font-display font-semibold text-lg text-black dark:text-white tracking-tight">
                                            {personalInfo.name}
                                        </h2>
                                        <span
                                            className="material-symbols-outlined glow-icon-blue text-[20px]"
                                            title="Verified Engineer"
                                        >
                                            verified
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                                        <span>{personalInfo.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-[#e2ded2] dark:border-[#282a2b] pt-3.5">
                                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                                    About
                                </p>
                                <p className="text-xs md:text-sm text-neutral-700 dark:text-[#cfc4c5] leading-relaxed">
                                    I&apos;m a full-stack developer with experience in software engineering, IoT, and AI-powered applications. Hands-on with n8n workflow automations and multimedia production.
                                </p>
                            </div>
                        </div>

                        {/* Focus statement pill */}
                        <div className="mt-4 p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-[#e2ded2] dark:border-[#282a2b] font-mono text-xs text-neutral-800 dark:text-[#eeeeee]">
                            <span className="font-semibold text-black dark:text-[#e6e2d3]">➜ focus:</span> clean interfaces, reliable systems, practical products.
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {profileStats.map((stat) => (
                            <div key={stat.label} className="glass-panel rounded-xl p-5 text-center">
                                <p className="font-display text-3xl font-bold text-black dark:text-white">
                                    {stat.value}
                                </p>
                                <p className="font-mono text-xs text-neutral-600 dark:text-[#b4b5b5] mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Profile Photo Lightbox Modal */}
            <AnimatePresence>
                {isPhotoModalOpen && (
                    <div
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
                        onClick={() => setIsPhotoModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 16 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="glass-panel relative my-auto flex max-h-[90vh] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-black/15 dark:border-white/15 bg-white/95 dark:bg-[#121414]/95 backdrop-blur-2xl shadow-2xl p-6 text-center"
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="photo-modal-title"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-[#e2ded2] dark:border-[#282a2b]">
                                <div className="text-left">
                                    <h3 id="photo-modal-title" className="font-display text-base font-bold text-black dark:text-white">
                                        {personalInfo.name}
                                    </h3>
                                    <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                                        {personalInfo.location}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsPhotoModalOpen(false)}
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-black/10 text-neutral-600 hover:bg-black/5 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-white/5 transition-colors"
                                    aria-label="Close photo preview"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="relative my-5 aspect-square w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 shadow-inner">
                                <Image
                                    src="/profile.png"
                                    alt={personalInfo.name}
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 768px) 100vw, 360px"
                                    priority
                                />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                                    <span className="h-2 w-2 rounded-full glow-dot-emerald animate-pulse" />
                                    <span>Active &amp; Available</span>
                                </span>
                                <a
                                    href="/profile.png"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-black/15 dark:border-white/15 font-mono text-xs text-black dark:text-white hover:border-black dark:hover:border-white transition-colors"
                                >
                                    <span>Full Image</span>
                                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
