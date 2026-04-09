"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FolderOpen, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { fadeInUp } from "@/lib/utils";

export function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);

    useEffect(() => {
        if (!selectedProject) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedProject(null);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [selectedProject]);

    return (
        <>
            <motion.div
                ref={ref}
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    <FolderOpen size={18} className="text-neutral-500" />
                    Projects
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {projects.map((project, index) => {
                        return (
                            <motion.button
                                key={project.title}
                                type="button"
                                onClick={() => setSelectedProject(project)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: index * 0.1 }}
                                className="group block overflow-hidden rounded-xl bg-neutral-100 text-left transition-all duration-300 hover:scale-105 cursor-pointer dark:bg-neutral-800"
                            >
                                <div className="relative aspect-video overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        width={400}
                                        height={225}
                                        className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-110"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                                        <ExternalLink
                                            size={20}
                                            className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        />
                                    </div>
                                </div>

                                <div className="p-2">
                                    <h3 className="mb-0.5 truncate text-xs font-medium text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                        {project.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-1">
                                        {project.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-neutral-200 px-1.5 py-0.5 text-[9px] font-medium text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags.length > 2 && (
                                            <span className="rounded-full bg-neutral-200 px-1.5 py-0.5 text-[9px] font-medium text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400">
                                                +{project.tags.length - 2}
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                                        View details
                                    </p>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedProject(null)}
                    >
                        <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 18 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 18 }}
                            transition={{ duration: 0.2 }}
                            onClick={(event) => event.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="project-modal-title"
                            className="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-900"
                        >
                            <div className="relative aspect-video w-full overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                                <button
                                    type="button"
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute right-3 top-3 rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/25"
                                    aria-label="Close project details"
                                >
                                    <X size={18} />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">
                                        Project details
                                    </p>
                                    <h3
                                        id="project-modal-title"
                                        className="text-2xl font-semibold text-white sm:text-3xl"
                                    >
                                        {selectedProject.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="overflow-y-auto p-5 sm:p-6">
                                <div className="space-y-6">
                                    <div>
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                                            Description
                                        </p>
                                        <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                                            {selectedProject.description}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                                            Stack used
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {selectedProject.url ? (
                                            <a
                                                href={selectedProject.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                                            >
                                                <ExternalLink size={16} />
                                                Visit Site
                                            </a>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-400 dark:border-neutral-700 dark:text-neutral-500">
                                                Private project
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

