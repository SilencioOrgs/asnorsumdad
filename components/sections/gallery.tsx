"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { PixelScatter } from "@/components/sections/pixel-scatter";
import { fadeInUp } from "@/lib/utils";

const galleryImages = [
    { id: 1, src: "/images/gallery/1.jpg", alt: "Archive photo 1" },
    { id: 2, src: "/images/gallery/2.jpg", alt: "Archive photo 2" },
    { id: 3, src: "/images/gallery/3.jpg", alt: "Archive photo 3" },
    { id: 4, src: "/images/gallery/4.jpg", alt: "Archive photo 4" },
    { id: 5, src: "/images/gallery/5.jpg", alt: "Archive photo 5" },
    { id: 6, src: "/images/gallery/6.jpg", alt: "Archive photo 6" },
    { id: 7, src: "/images/gallery/7.jpg", alt: "Archive photo 7" },
    { id: 8, src: "/images/gallery/8.jpg", alt: "Archive photo 8" },
    { id: 9, src: "/images/gallery/9.jpg", alt: "Archive photo 9" },
    { id: 10, src: "/images/gallery/10.jpg", alt: "Archive photo 10" },
];

export function Gallery() {
    const ref = useRef(null);
    const isActive = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.section
            id="archive"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="relative isolate scroll-mt-28"
            aria-labelledby="archive-heading"
        >
            <PixelScatter active={isActive} />

            <div className="glass-panel overflow-hidden rounded-2xl p-6 md:p-8">
                <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                            Archive
                        </p>
                        <h2 id="archive-heading" className="font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                            Behind the work & journey.
                        </h2>
                    </div>
                    <p className="font-mono text-xs text-neutral-400">
                        Moments, hackathons, and hardware builds
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {galleryImages.map((image, index) => (
                        <motion.figure
                            key={image.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={isActive ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.03, duration: 0.2 }}
                            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.02]"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={360}
                                height={270}
                                className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </motion.figure>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
