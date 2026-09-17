"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type CategoryKey = "all" | "capstone" | "wedding" | "ai" | "mobile";

const filterTabs = [
    { id: "all", label: "All Projects" },
    { id: "capstone", label: "Capstone / Client Systems" },
    { id: "wedding", label: "Wedding Websites" },
    { id: "ai", label: "Personal / AI Projects" },
    { id: "mobile", label: "Mobile & Telemetry" },
] as const;

interface ProjectDetail {
    id: string;
    title: string;
    shortTitle: string;
    category: string;
    status: "Live" | "Private";
    description: string;
    summary: string;
    highlights: string[];
    tags: string[];
    url?: string;
    image?: string;
}

const projectsData: Record<string, ProjectDetail> = {
    "ate-ai": {
        id: "ate-ai",
        title: "Ate Ai's Kitchen Ordering System",
        shortTitle: "Ate Ai's Kitchen",
        category: "Capstone & Client Systems",
        status: "Live",
        url: "https://ateaikitchen.vercel.app",
        image: "/images/projects/orderingsystem.png",
        description: "Food ordering platform for managing customer orders, automated alerts, and delivery location telemetry.",
        summary: "Comprehensive food ordering and kitchen dispatch platform engineered for high-volume customer orders, automated alerts, real-time status updates, and interactive delivery telemetry.",
        highlights: [
            "Real-time order tracking and dynamic kitchen dispatch",
            "Automated transactional email receipts via Nodemailer",
            "Interactive customer delivery location telemetry via Mapbox",
            "Responsive mobile-first menu selection and cart management",
        ],
        tags: ["Next.js", "Supabase", "Firebase", "Nodemailer", "Mapbox", "Tailwind CSS"],
    },
    "hereafterpal": {
        id: "hereafterpal",
        title: "HereafterPal Memorial Archive",
        shortTitle: "HereafterPal",
        category: "Capstone & Client Systems",
        status: "Private",
        description: "Digital memorial platform for preserving family stories, commemorative photos, tributes, and legacy archives safely online.",
        summary: "A secure digital commemoration platform designed to preserve cherished family legacies, commemorative portraits, tributes, and biographical history in perpetuity.",
        highlights: [
            "Protected memorial spaces with granular family access controls",
            "High-resolution tribute photo archives and digital keepsakes",
            "Clean, respectful minimalist design with accessible navigation",
            "Structured memory timeline for milestone remembrance",
        ],
        tags: ["React", "Next.js", "Vercel", "Tailwind CSS", "Cloud Storage"],
    },
    "lspu-portal": {
        id: "lspu-portal",
        title: "LSPU Student Registration & Portal",
        shortTitle: "LSPU Student Portal",
        category: "Capstone & Client Systems",
        status: "Private",
        image: "/images/projects/lspu-student-reg.png",
        description: "University student registration and thesis records database management portal with role-based access control.",
        summary: "Campus administrative registration portal and thesis catalog repository built for academic data accuracy, validation workflows, and role-based student access.",
        highlights: [
            "Role-based authorization for administrative staff and students",
            "Clean student enrollment data entry and curriculum tracking",
            "Centralized thesis catalog and academic document validation",
            "Optimized database schemas for concurrent registration periods",
        ],
        tags: ["React", "Vite", "Node.js", "Database Management", "REST APIs"],
    },
    "wedding-landing": {
        id: "wedding-landing",
        title: "Wedding Landing Page",
        shortTitle: "Landing Page",
        category: "Event & Invitation Portals",
        status: "Live",
        url: "https://wedding-landingpage.vercel.app",
        image: "/images/projects/wedding-landingpage.png",
        description: "Elegant wedding website with RSVP-focused presentation and timeline.",
        summary: "An elegant, bespoke event landing page built for guest coordination, RSVP intake, celebratory timelines, and couple narrative showcase.",
        highlights: [
            "Interactive guest RSVP capture with real-time feedback",
            "Delicate scroll-triggered reveal animations via Framer Motion",
            "Visual countdown timer and event schedule itinerary",
            "Curated typographic palette with luxury aesthetic",
        ],
        tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    },
    "daniel-giada": {
        id: "daniel-giada",
        title: "Daniel & Giada Wedding Platform",
        shortTitle: "Daniel & Giada",
        category: "Event & Invitation Portals",
        status: "Live",
        url: "https://daniel-giada-wedding.vercel.app",
        image: "/images/projects/wedding-landingpage.png",
        description: "Custom event website for guest information, storytelling, and itinerary.",
        summary: "Custom celebration platform celebrating Daniel & Giada, featuring couple milestones, wedding itinerary details, and guest confirmations.",
        highlights: [
            "Interactive timeline for ceremony, cocktail hour, and reception",
            "Embedded venue coordinates with one-tap directions",
            "Integrated guest registry details and ceremony FAQs",
            "Optimized mobile performance for on-the-day guest lookup",
        ],
        tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    },
    "carl-shania": {
        id: "carl-shania",
        title: "Carl Joseph & Shania Mae Wedding Platform",
        shortTitle: "Carl Joseph & Shania Mae",
        category: "Event & Invitation Portals",
        status: "Live",
        url: "https://carl-joseph-and-shania-mae.vercel.app",
        image: "/images/projects/wedding-landingpage.png",
        description: "Modern celebration page highlighting ceremony schedule, entourage, and couple gallery.",
        summary: "A modern, responsive celebration website designed with custom micro-interactions, ceremony protocols, entourage presentation, and RSVP management.",
        highlights: [
            "Detailed ceremony entourage and wedding party showcase",
            "Dynamic attire palette and celebration dress code guide",
            "Zero-friction RSVP collection for guest planning",
            "Mobile-optimized photo gallery and memory carousel",
        ],
        tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    },
    "rameez-kris": {
        id: "rameez-kris",
        title: "Rameez & Kris Wedding Platform",
        shortTitle: "Rameez & Kris",
        category: "Event & Invitation Portals",
        status: "Live",
        url: "https://rameez-kris-i13a.vercel.app",
        image: "/images/projects/wedding-landingpage.png",
        description: "Contemporary wedding portal for guest logistics and celebration highlights.",
        summary: "Contemporary celebration portal tailored for destination guests, providing multi-event weekend logistics, travel details, and digital RSVP confirmation.",
        highlights: [
            "Multi-day celebration schedule for destination attendees",
            "Accommodation recommendations and travel transport notes",
            "Seamless guest RSVP logging with immediate visual confirmation",
            "Lightweight assets for instantaneous mobile loading",
        ],
        tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    },
    "godfrey-vanessa": {
        id: "godfrey-vanessa",
        title: "Godfrey & Vanessa Wedding Platform",
        shortTitle: "Godfrey & Vanessa",
        category: "Event & Invitation Portals",
        status: "Live",
        url: "https://godfreyvanessa.vercel.app",
        image: "/images/projects/wedding-landingpage.png",
        description: "Wedding website featuring invitation content and mobile-friendly experience.",
        summary: "High-elegance wedding portal delivering interactive digital invitations, ceremony protocols, couple story narrative, and live response tracking.",
        highlights: [
            "Bespoke digital invitation experience with editorial typography",
            "Comprehensive schedule for ceremony, dinner, and celebration",
            "Mobile-first design for effortless smartphone navigation",
            "Instant RSVP response pipeline",
        ],
        tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    },
    "chadgpt": {
        id: "chadgpt",
        title: "ChadGPT - AI Tone Profiler",
        shortTitle: "ChadGPT - Tone Profiler",
        category: "Personal & AI Experiments",
        status: "Live",
        url: "https://tone-profiler.vercel.app",
        image: "/images/projects/tone-profiler.png",
        description: "AI writing tone analysis platform leveraging sentiment classification and tone profiling models.",
        summary: "An AI-powered writing intelligence application that evaluates stylistic tone, emotional valence, and sentiment patterns to help writers calibrate their copy.",
        highlights: [
            "Real-time linguistic tone and emotional sentiment classification",
            "Interactive confidence scoring across multiple communication styles",
            "Modular backend architecture powered by FastAPI and local LLMs",
            "Direct feedback loop for instant writing adjustments",
        ],
        tags: ["Next.js", "FastAPI", "Python", "NLP", "Ollama", "Tailwind CSS"],
    },
    "ai-fb": {
        id: "ai-fb",
        title: "AI Facebook Content Automation",
        shortTitle: "AI Facebook Content Automation",
        category: "Personal & AI Experiments",
        status: "Private",
        image: "/images/projects/n8n-workflow.png",
        description: "n8n workflow leveraging Gemini API & Telegram bots on a local Raspberry Pi to generate contextual posts.",
        summary: "An autonomous end-to-end publishing pipeline deployed on a local Raspberry Pi node. Uses Google Gemini API to research trends, create copy, generate visuals, and schedule Facebook posts via Graph API.",
        highlights: [
            "Fully autonomous workflow triggered via custom Telegram bot commands",
            "Contextual topic research & prompt crafting via Google Gemini API",
            "Automated post scheduling via Facebook Graph API HTTP endpoints",
            "Self-hosted 24/7 on high-efficiency local Raspberry Pi hardware",
        ],
        tags: ["n8n", "Gemini API", "Telegram Bot API", "Facebook Graph API", "Raspberry Pi"],
    },
    "rydar": {
        id: "rydar",
        title: "Rydar Mobile Telemetry",
        shortTitle: "Rydar Mobile Telemetry",
        category: "Mobile & Telemetry",
        status: "Private",
        image: "/images/projects/rydar/rydar-overlay.jpg",
        description: "Mobile tracking application for motorcycle and bicycle riders to record ride telemetry, log top speed, and overlay stats onto photos.",
        summary: "A high-performance mobile telemetry suite engineered for riders to record GPS trajectory, calculate maximum velocities, and generate dynamic telemetry HUD overlays on photos.",
        highlights: [
            "High-frequency GPS tracking and speed calculation engine",
            "Dynamic telemetry HUD overlays composited onto rider photos",
            "Interactive route map replays using Mapbox mobile SDK",
            "Offline-first telemetry logging with Firebase cloud synchronization",
        ],
        tags: ["Flutter", "Mapbox", "Firebase", "GPS Tracking", "Mobile App"],
    },
};

export function Projects() {
    const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
    const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

    // Synchronize modal state with navbar and body scroll
    useEffect(() => {
        if (selectedProject) {
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
    }, [selectedProject]);

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedProject(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <section className="space-y-8 scroll-mt-28" id="projects">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e2ded2] dark:border-[#282a2b] pb-6">
                <div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-600 dark:text-[#e6e2d3] mb-1">
                        <span>01 / 04</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-[#e6e2d3]" />
                        <span>Portfolio Artifacts</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">
                        Project gallery.
                    </h2>
                </div>
                <p className="text-sm md:text-base text-neutral-600 dark:text-[#b4b5b5] max-w-md">
                    Systems built for practical workflows, client needs, event portfolios, and automated intelligence pipelines.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
                {filterTabs.map((tab) => {
                    const isActive = activeCategory === tab.id;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveCategory(tab.id as CategoryKey)}
                            className={`px-4 py-1.5 rounded-full font-mono text-xs cursor-pointer transition-all ${
                                isActive
                                    ? "bg-black text-white dark:bg-white dark:text-black font-semibold shadow"
                                    : "code-pill"
                            }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Project Groups Stack */}
            <div className="space-y-8">
                {/* GROUP 1: CAPSTONE & CLIENT SYSTEMS */}
                {(activeCategory === "all" || activeCategory === "capstone") && (
                    <div className="project-group-card glass-panel rounded-2xl p-7 md:p-9 space-y-6">
                        {/* Top Header Row */}
                        <div className="flex items-center justify-between gap-4">
                            <span className="font-mono text-xs md:text-sm text-neutral-500 dark:text-neutral-400 tracking-tight">
                                Capstone &amp; Client Systems
                            </span>
                        </div>

                        {/* Main Heading & Narrative Description */}
                        <div className="space-y-2">
                            <h3 className="font-display font-semibold text-2xl md:text-3xl text-black dark:text-white tracking-tight">
                                Production Capstone &amp; Client Platforms
                            </h3>
                            <p className="text-sm md:text-base text-neutral-600 dark:text-[#b4b5b5] max-w-3xl leading-relaxed">
                                Full-featured web applications engineered for active client business workflows, digital memorial archives, and university administrative validation systems.
                            </p>
                        </div>

                        {/* Sub-Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                            {/* Ate Ai's Kitchen */}
                            <div className="sub-card rounded-xl p-5 flex flex-col justify-between group">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(projectsData["ate-ai"])}
                                            className="font-display font-semibold text-base md:text-lg text-black dark:text-white group-hover:underline text-left cursor-pointer transition-colors"
                                        >
                                            {projectsData["ate-ai"].shortTitle}
                                        </button>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full glow-pill-live text-[10px] font-mono shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full glow-dot-emerald" />
                                            Live
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-neutral-600 dark:text-[#b4b5b5] line-clamp-2 leading-relaxed">
                                        {projectsData["ate-ai"].description}
                                    </p>
                                </div>
                                <div className="pt-4 mt-2">
                                    <a
                                        className="inline-flex items-center text-black dark:text-white font-mono text-xs font-semibold group-hover:underline"
                                        href={projectsData["ate-ai"].url}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span>Visit Site</span>
                                    </a>
                                </div>
                            </div>

                            {/* HereafterPal */}
                            <div className="sub-card rounded-xl p-5 flex flex-col justify-between group">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(projectsData["hereafterpal"])}
                                            className="font-display font-semibold text-base md:text-lg text-black dark:text-white group-hover:underline text-left cursor-pointer transition-colors"
                                        >
                                            {projectsData["hereafterpal"].shortTitle}
                                        </button>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full glow-pill-private text-[10px] font-mono shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full glow-dot-amber" />
                                            Private
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-neutral-600 dark:text-[#b4b5b5] line-clamp-2 leading-relaxed">
                                        {projectsData["hereafterpal"].description}
                                    </p>
                                </div>
                            </div>

                            {/* LSPU Student Portal */}
                            <div className="sub-card rounded-xl p-5 flex flex-col justify-between group">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(projectsData["lspu-portal"])}
                                            className="font-display font-semibold text-base md:text-lg text-black dark:text-white group-hover:underline text-left cursor-pointer transition-colors"
                                        >
                                            {projectsData["lspu-portal"].shortTitle}
                                        </button>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full glow-pill-private text-[10px] font-mono shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full glow-dot-amber" />
                                            Private
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-neutral-600 dark:text-[#b4b5b5] line-clamp-2 leading-relaxed">
                                        {projectsData["lspu-portal"].description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Tech Stack Badges Row */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#e2ded2] dark:border-[#282a2b]">
                            {["Next.js", "Supabase", "Firebase", "React", "Nodemailer"].map((tag) => (
                                <span key={tag} className="code-pill px-3 py-1 rounded-md text-xs font-mono">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* GROUP 2: EVENT & INVITATION PORTALS / WEDDING PLATFORMS */}
                {(activeCategory === "all" || activeCategory === "wedding") && (
                    <div className="project-group-card glass-panel rounded-2xl p-7 md:p-9 space-y-6">
                        {/* Top Header Row */}
                        <div className="flex items-center justify-between gap-4">
                            <span className="font-mono text-xs md:text-sm text-neutral-500 dark:text-neutral-400 tracking-tight">
                                Event &amp; Invitation Portals
                            </span>
                        </div>

                        {/* Main Heading & Narrative Description */}
                        <div className="space-y-2">
                            <h3 className="font-display font-semibold text-2xl md:text-3xl text-black dark:text-white tracking-tight">
                                Bespoke Wedding &amp; Event Platforms
                            </h3>
                            <p className="text-sm md:text-base text-neutral-600 dark:text-[#b4b5b5] max-w-3xl leading-relaxed">
                                Custom responsive websites built with Framer Motion and Next.js featuring RSVP collection, celebration timelines, guest coordination, and interactive storyboards.
                            </p>
                        </div>

                        {/* Sub-Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                            {/* Landing Page */}
                            <div className="sub-card rounded-xl p-5 flex flex-col justify-between group">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(projectsData["wedding-landing"])}
                                            className="font-display font-semibold text-base md:text-lg text-black dark:text-white group-hover:underline text-left cursor-pointer transition-colors"
                                        >
                                            {projectsData["wedding-landing"].shortTitle}
                                        </button>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full glow-pill-live text-[10px] font-mono shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full glow-dot-emerald" />
                                            Live
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-neutral-600 dark:text-[#b4b5b5] line-clamp-2 leading-relaxed">
                                        {projectsData["wedding-landing"].description}
                                    </p>
                                </div>
                                <div className="pt-4 mt-2">
                                    <a
                                        className="inline-flex items-center text-black dark:text-white font-mono text-xs font-semibold group-hover:underline"
                                        href={projectsData["wedding-landing"].url}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span>Visit Site</span>
                                    </a>
                                </div>
                            </div>

                            {/* Daniel & Giada */}
                            <div className="sub-card rounded-xl p-5 flex flex-col justify-between group">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(projectsData["daniel-giada"])}
                                            className="font-display font-semibold text-base md:text-lg text-black dark:text-white group-hover:underline text-left cursor-pointer transition-colors"
                                        >
                                            {projectsData["daniel-giada"].shortTitle}
                                        </button>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full glow-pill-live text-[10px] font-mono shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full glow-dot-emerald" />
                                            Live
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-neutral-600 dark:text-[#b4b5b5] line-clamp-2 leading-relaxed">
                                        {projectsData["daniel-giada"].description}
                                    </p>
                                </div>
                                <div className="pt-4 mt-2">
                                    <a
                                        className="inline-flex items-center text-black dark:text-white font-mono text-xs font-semibold group-hover:underline"
                                        href={projectsData["daniel-giada"].url}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span>Visit Site</span>
                                    </a>
                                </div>
                            </div>

                            {/* Carl Joseph & Shania Mae */}
                            <div className="sub-card rounded-xl p-5 flex flex-col justify-between group">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(projectsData["carl-shania"])}
                                            className="font-display font-semibold text-base md:text-lg text-black dark:text-white group-hover:underline text-left cursor-pointer transition-colors"
                                        >
                                            {projectsData["carl-shania"].shortTitle}
                                        </button>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full glow-pill-live text-[10px] font-mono shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full glow-dot-emerald" />
                                            Live
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-neutral-600 dark:text-[#b4b5b5] line-clamp-2 leading-relaxed">
                                        {projectsData["carl-shania"].description}
                                    </p>
                                </div>
                                <div className="pt-4 mt-2">
                                    <a
                                        className="inline-flex items-center text-black dark:text-white font-mono text-xs font-semibold group-hover:underline"
                                        href={projectsData["carl-shania"].url}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span>Visit Site</span>
                                    </a>
                                </div>
                            </div>

                            {/* Rameez & Kris */}
                            <div className="sub-card rounded-xl p-5 flex flex-col justify-between group">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(projectsData["rameez-kris"])}
                                            className="font-display font-semibold text-base md:text-lg text-black dark:text-white group-hover:underline text-left cursor-pointer transition-colors"
                                        >
                                            {projectsData["rameez-kris"].shortTitle}
                                        </button>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full glow-pill-live text-[10px] font-mono shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full glow-dot-emerald" />
                                            Live
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-neutral-600 dark:text-[#b4b5b5] line-clamp-2 leading-relaxed">
                                        {projectsData["rameez-kris"].description}
                                    </p>
                                </div>
                                <div className="pt-4 mt-2">
                                    <a
                                        className="inline-flex items-center text-black dark:text-white font-mono text-xs font-semibold group-hover:underline"
                                        href={projectsData["rameez-kris"].url}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span>Visit Site</span>
                                    </a>
                                </div>
                            </div>

                            {/* Godfrey & Vanessa */}
                            <div className="sub-card rounded-xl p-5 flex flex-col justify-between group">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(projectsData["godfrey-vanessa"])}
                                            className="font-display font-semibold text-base md:text-lg text-black dark:text-white group-hover:underline text-left cursor-pointer transition-colors"
                                        >
                                            {projectsData["godfrey-vanessa"].shortTitle}
                                        </button>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full glow-pill-live text-[10px] font-mono shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full glow-dot-emerald" />
                                            Live
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-neutral-600 dark:text-[#b4b5b5] line-clamp-2 leading-relaxed">
                                        {projectsData["godfrey-vanessa"].description}
                                    </p>
                                </div>
                                <div className="pt-4 mt-2">
                                    <a
                                        className="inline-flex items-center text-black dark:text-white font-mono text-xs font-semibold group-hover:underline"
                                        href={projectsData["godfrey-vanessa"].url}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span>Visit Site</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Tech Stack Badges Row */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#e2ded2] dark:border-[#282a2b]">
                            {["Next.js", "Framer Motion", "Tailwind CSS"].map((tag) => (
                                <span key={tag} className="code-pill px-3 py-1 rounded-md text-xs font-mono">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* GROUP 3: PERSONAL & AI EXPERIMENTS */}
                {(activeCategory === "all" || activeCategory === "ai") && (
                    <div className="project-group-card glass-panel rounded-2xl p-7 md:p-9 space-y-6">
                        {/* Top Header Row */}
                        <div className="flex items-center justify-between gap-4">
                            <span className="font-mono text-xs md:text-sm text-neutral-500 dark:text-neutral-400 tracking-tight">
                                Personal &amp; AI Experiments
                            </span>
                        </div>

                        {/* Main Heading & Narrative Description */}
                        <div className="space-y-2">
                            <h3 className="font-display font-semibold text-2xl md:text-3xl text-black dark:text-white tracking-tight">
                                AI Automation &amp; Intelligence Lab
                            </h3>
                            <p className="text-sm md:text-base text-neutral-600 dark:text-[#b4b5b5] max-w-3xl leading-relaxed">
                                Autonomous agent pipelines, natural language tone profiling, and self-hosted micro-services orchestrating content generation via local LLMs and cloud APIs.
                            </p>
                        </div>

                        {/* Sub-Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                            {/* ChadGPT - Tone Profiler */}
                            <div className="sub-card rounded-xl p-5 flex flex-col justify-between group">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(projectsData["chadgpt"])}
                                            className="font-display font-semibold text-base md:text-lg text-black dark:text-white group-hover:underline text-left cursor-pointer transition-colors"
                                        >
                                            {projectsData["chadgpt"].shortTitle}
                                        </button>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full glow-pill-live text-[10px] font-mono shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full glow-dot-emerald" />
                                            Live
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-neutral-600 dark:text-[#b4b5b5] line-clamp-2 leading-relaxed">
                                        {projectsData["chadgpt"].description}
                                    </p>
                                </div>
                                <div className="pt-4 mt-2">
                                    <a
                                        className="inline-flex items-center text-black dark:text-white font-mono text-xs font-semibold group-hover:underline"
                                        href={projectsData["chadgpt"].url}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span>Visit Site</span>
                                    </a>
                                </div>
                            </div>

                            {/* AI Facebook Content Automation */}
                            <div className="sub-card rounded-xl p-5 flex flex-col justify-between group">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(projectsData["ai-fb"])}
                                            className="font-display font-semibold text-base md:text-lg text-black dark:text-white group-hover:underline text-left cursor-pointer transition-colors"
                                        >
                                            {projectsData["ai-fb"].shortTitle}
                                        </button>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full glow-pill-private text-[10px] font-mono shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full glow-dot-amber" />
                                            Private
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-neutral-600 dark:text-[#b4b5b5] line-clamp-2 leading-relaxed">
                                        {projectsData["ai-fb"].description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Tech Stack Badges Row */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#e2ded2] dark:border-[#282a2b]">
                            {["n8n", "Gemini API", "FastAPI", "Python", "Ollama", "Raspberry Pi"].map((tag) => (
                                <span key={tag} className="code-pill px-3 py-1 rounded-md text-xs font-mono">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* GROUP 4: MOBILE & TELEMETRY */}
                {(activeCategory === "all" || activeCategory === "mobile") && (
                    <div className="project-group-card glass-panel rounded-2xl p-7 md:p-9 space-y-6">
                        {/* Top Header Row */}
                        <div className="flex items-center justify-between gap-4">
                            <span className="font-mono text-xs md:text-sm text-neutral-500 dark:text-neutral-400 tracking-tight">
                                Mobile &amp; Telemetry
                            </span>
                        </div>

                        {/* Main Heading & Narrative Description */}
                        <div className="space-y-2">
                            <h3 className="font-display font-semibold text-2xl md:text-3xl text-black dark:text-white tracking-tight">
                                Mobile Telemetry &amp; Utility Systems
                            </h3>
                            <p className="text-sm md:text-base text-neutral-600 dark:text-[#b4b5b5] max-w-3xl leading-relaxed">
                                Cross-platform mobile applications engineered for high-precision sensor capture, GPS ride tracking, and dynamic visual telemetry sharing.
                            </p>
                        </div>

                        {/* Sub-Card: Rydar */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                            <div className="sub-card rounded-xl p-5 flex flex-col justify-between group">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(projectsData["rydar"])}
                                            className="font-display font-semibold text-base md:text-lg text-black dark:text-white group-hover:underline text-left cursor-pointer transition-colors"
                                        >
                                            {projectsData["rydar"].shortTitle}
                                        </button>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full glow-pill-private text-[10px] font-mono">
                                            <span className="w-1.5 h-1.5 rounded-full glow-dot-amber" />
                                            Private
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-neutral-600 dark:text-[#b4b5b5] line-clamp-2 leading-relaxed">
                                        {projectsData["rydar"].description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Tech Stack Badges Row */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#e2ded2] dark:border-[#282a2b]">
                            {["Flutter", "Mapbox", "Firebase", "GPS Tracking"].map((tag) => (
                                <span key={tag} className="code-pill px-3 py-1 rounded-md text-xs font-mono">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Glassmorphic Project Details Modal Popup */}
            <AnimatePresence>
                {selectedProject && (
                    <div
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 12 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="glass-panel relative my-auto w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-black/15 dark:border-white/15 bg-white/95 dark:bg-[#121414]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-project-title"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between border-b border-[#e2ded2] dark:border-[#282a2b] px-6 py-4 bg-black/[0.02] dark:bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        {selectedProject.category}
                                    </span>
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${
                                            selectedProject.status === "Live"
                                                ? "glow-pill-live"
                                                : "glow-pill-private"
                                        }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${
                                                selectedProject.status === "Live"
                                                    ? "glow-dot-emerald"
                                                    : "glow-dot-amber"
                                            }`}
                                        />
                                        <span>{selectedProject.status}</span>
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedProject(null)}
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-black/10 text-neutral-600 hover:bg-black/5 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-white/5 transition-colors"
                                    aria-label="Close project details"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Modal Scrollable Content */}
                            <div className="overflow-y-auto p-6 sm:p-7 space-y-6">
                                {/* Title */}
                                <div>
                                    <h3
                                        id="modal-project-title"
                                        className="font-display text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight"
                                    >
                                        {selectedProject.title}
                                    </h3>
                                </div>

                                {/* Preview Image if available */}
                                {selectedProject.image && (
                                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 shadow-xs">
                                        <Image
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            fill
                                            className="object-cover object-top"
                                            sizes="(max-width: 768px) 100vw, 672px"
                                        />
                                    </div>
                                )}

                                {/* Summary Section */}
                                <div className="space-y-2">
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                                        Project Overview
                                    </h4>
                                    <p className="text-sm md:text-base text-neutral-700 dark:text-[#cfc4c5] leading-relaxed">
                                        {selectedProject.summary}
                                    </p>
                                </div>

                                {/* Key Highlights */}
                                <div className="space-y-2.5">
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                                        Key Capabilities &amp; Architecture
                                    </h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-neutral-700 dark:text-[#b4b5b5]">
                                        {selectedProject.highlights.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-black dark:text-white font-mono font-bold shrink-0">
                                                    ›
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Technologies & Tools */}
                                <div className="space-y-2.5 pt-4 border-t border-[#e2ded2] dark:border-[#282a2b]">
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                                        Technologies &amp; Libraries
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="code-pill px-3 py-1 rounded-md text-xs font-mono"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-between border-t border-[#e2ded2] dark:border-[#282a2b] px-6 py-4 bg-black/[0.02] dark:bg-white/[0.02]">
                                <div>
                                    {selectedProject.status === "Private" && (
                                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-amber-600 dark:text-amber-400">
                                            <span className="material-symbols-outlined text-[15px]">lock</span>
                                            <span>Private &amp; Proprietary System</span>
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedProject(null)}
                                        className="cursor-pointer px-4 py-2 rounded-xl border border-black/15 dark:border-white/15 font-mono text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:border-black dark:hover:border-white transition-colors"
                                    >
                                        Close
                                    </button>
                                    {selectedProject.status === "Live" && selectedProject.url && (
                                        <a
                                            href={selectedProject.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-[#e6e2d3] transition-all shadow-xs active:scale-95"
                                        >
                                            <span>Visit Website</span>
                                            <span className="material-symbols-outlined text-[15px]">
                                                open_in_new
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
