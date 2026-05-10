"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Lock, MonitorUp, Smartphone } from "lucide-react";
import { useRef } from "react";
import { PixelScatter } from "@/components/sections/pixel-scatter";
import { projectGroups, projects } from "@/lib/data";

function ProjectPreview({ project }: { project: (typeof projects)[number] }) {
    if (!project.url) {
        return (
            <div className="flex h-full min-h-56 flex-col justify-between bg-black p-5 text-white">
                <div className="flex items-center justify-between">
                    {project.title === "PillPal" ? <Smartphone size={22} /> : <Lock size={22} />}
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                        {project.status ?? "Private"}
                    </span>
                </div>
                <div>
                    <p className="font-display text-3xl font-semibold leading-tight">
                        {project.title}
                    </p>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-white/65">
                        Private project preview. Stack and project context are listed below.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-full min-h-56 overflow-hidden bg-white">
            <iframe
                src={project.url}
                title={`${project.title} website preview`}
                loading="lazy"
                tabIndex={-1}
                className="pointer-events-none h-full w-full bg-white grayscale"
            />
            <div className="pointer-events-none absolute inset-0 border border-black/5" />
            <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 border border-black bg-white px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-black">
                <MonitorUp size={13} />
                Live Preview
            </div>
        </div>
    );
}

export function Projects() {
    const ref = useRef(null);
    const isActive = useInView(ref, { once: false, margin: "-80px" });

    return (
        <motion.section
            id="work"
            ref={ref}
            className="relative isolate scroll-mt-28 py-16 md:py-24"
            aria-labelledby="work-heading"
        >
            <PixelScatter active={isActive} />

            <div className="mb-12 max-w-3xl">
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Selected Work / Projects
                </p>
                <h2 id="work-heading" className="font-display text-5xl font-semibold text-black sm:text-6xl">
                    Project gallery.
                </h2>
            </div>

            <div className="space-y-16">
                {projectGroups.map((group, groupIndex) => {
                    const groupProjects = projects.filter((project) => project.group === group.id);

                    return (
                        <section
                            key={group.id}
                            className="border-t border-black pt-8"
                            aria-labelledby={`${group.id}-projects-heading`}
                        >
                            <div className="mb-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                                <div>
                                    <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                                        {String(groupIndex + 1).padStart(2, "0")} / {String(groupProjects.length).padStart(2, "0")}
                                    </p>
                                    <h3
                                        id={`${group.id}-projects-heading`}
                                        className="font-display text-3xl font-semibold leading-tight text-black sm:text-4xl"
                                    >
                                        {group.label}
                                    </h3>
                                </div>
                                <p className="max-w-2xl text-sm leading-6 text-neutral-600 lg:justify-self-end">
                                    {group.description}
                                </p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {groupProjects.map((project, index) => (
                                    <article
                                        key={project.title}
                                        className="group grid overflow-hidden border border-neutral-200 bg-white transition-colors duration-200 hover:border-black"
                                    >
                                        <div className="aspect-[16/10] border-b border-neutral-200">
                                            <ProjectPreview project={project} />
                                        </div>

                                        <div className="grid gap-5 p-5">
                                            <div>
                                                <div className="mb-3 flex items-center justify-between gap-3">
                                                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>
                                                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                                                        {project.status ?? (project.url ? "Live" : "Private")}
                                                    </span>
                                                </div>
                                                <h4 className="font-display text-2xl font-semibold leading-tight text-black">
                                                    {project.title}
                                                </h4>
                                                <p className="mt-3 text-sm leading-6 text-neutral-600">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={`${project.title}-${tag}`}
                                                        className="border border-neutral-200 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-600"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {project.url ? (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 border border-black px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
                                                    aria-label={`Open ${project.title}`}
                                                >
                                                    Open Project
                                                    <ArrowUpRight size={14} />
                                                </a>
                                            ) : (
                                                <span className="inline-flex items-center gap-2 border border-neutral-200 px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                                    <Lock size={14} />
                                                    Private
                                                </span>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </motion.section>
    );
}
