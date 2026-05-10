"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PixelScatter } from "@/components/sections/pixel-scatter";
import { certificates } from "@/lib/data";
import { fadeInUp } from "@/lib/utils";

const AUTOPLAY_DELAY = 4500;

function certificateHref(file: string) {
    return `/certificates/${encodeURIComponent(file)}`;
}

function certificateImageHref(image: string) {
    return `/certificates/${encodeURIComponent(image)}`;
}

export function Certificates() {
    const ref = useRef(null);
    const isActive = useInView(ref, { once: false, margin: "-50px" });
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const activeCertificate = certificates[activeIndex];
    const activeHref = certificateHref(activeCertificate.file);
    const activeImageHref = certificateImageHref(activeCertificate.image);
    const hasMultipleCertificates = certificates.length > 1;

    useEffect(() => {
        const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!hasMultipleCertificates || isPaused || prefersReducedMotion) return;

        const intervalId = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % certificates.length);
        }, AUTOPLAY_DELAY);

        return () => window.clearInterval(intervalId);
    }, [hasMultipleCertificates, isPaused]);

    const goToPrevious = () => {
        setActiveIndex((current) => (current - 1 + certificates.length) % certificates.length);
    };

    const goToNext = () => {
        setActiveIndex((current) => (current + 1) % certificates.length);
    };

    return (
        <motion.section
            id="certificates"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative isolate scroll-mt-28 border-t border-neutral-200 py-16 md:py-24"
            aria-labelledby="certificates-heading"
        >
            <PixelScatter active={isActive} />

            <div className="mb-10">
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Certificates
                </p>
                <h2 id="certificates-heading" className="font-display text-4xl font-semibold text-black sm:text-5xl">
                    Proof of practice.
                </h2>
            </div>

            <div
                className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocusCapture={() => setIsPaused(true)}
                onBlurCapture={() => setIsPaused(false)}
            >
                <div className="overflow-hidden border border-black bg-neutral-100 lg:self-start">
                    <div className="flex items-center justify-between border-b border-black bg-white px-4 py-3">
                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-600">
                            {String(activeIndex + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}
                        </p>
                        <a
                            href={activeHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.16em] text-black transition-opacity duration-200 hover:opacity-60"
                            aria-label={`Open certificate: ${activeCertificate.title}`}
                        >
                            Open PDF
                            <ArrowUpRight size={14} />
                        </a>
                    </div>

                    <div className="relative aspect-[16/10] bg-white lg:aspect-[4/3]">
                        <Image
                            key={activeImageHref}
                            src={activeImageHref}
                            alt={`${activeCertificate.title} certificate preview`}
                            fill
                            sizes="(min-width: 1024px) 760px, 100vw"
                            className="object-contain grayscale"
                            priority={activeIndex === 0}
                        />
                    </div>
                </div>

                <aside className="border-t border-black lg:border-t-0" aria-label="Certificate carousel controls">
                    <div className="border-b border-neutral-200 py-5">
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                            {activeCertificate.year}
                        </p>
                        <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-black">
                            {activeCertificate.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-neutral-600">
                            {activeCertificate.issuer}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 border-b border-neutral-200 py-5">
                        <button
                            type="button"
                            onClick={goToPrevious}
                            className="flex h-11 w-11 items-center justify-center border border-black text-black transition-colors duration-200 hover:bg-black hover:text-white"
                            aria-label="Show previous certificate"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={goToNext}
                            className="flex h-11 w-11 items-center justify-center border border-black text-black transition-colors duration-200 hover:bg-black hover:text-white"
                            aria-label="Show next certificate"
                        >
                            <ChevronRight size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsPaused((current) => !current)}
                            className="ml-auto inline-flex h-11 items-center gap-2 border border-black px-4 font-mono text-xs uppercase tracking-[0.16em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
                            aria-label={isPaused ? "Resume certificate autoplay" : "Pause certificate autoplay"}
                        >
                            {isPaused ? <Play size={15} /> : <Pause size={15} />}
                            {isPaused ? "Play" : "Pause"}
                        </button>
                    </div>

                    <div className="grid gap-2 py-5">
                        {certificates.map((certificate, index) => (
                            <button
                                key={certificate.file}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                className={`grid grid-cols-[4.5rem_1fr] gap-3 border p-2 text-left transition-colors duration-200 ${
                                    activeIndex === index
                                        ? "border-black bg-black text-white"
                                        : "border-neutral-200 text-neutral-700 hover:border-black hover:text-black"
                                }`}
                                aria-label={`Show certificate ${index + 1}: ${certificate.title}`}
                                aria-current={activeIndex === index ? "true" : undefined}
                            >
                                <span className="relative aspect-[4/3] overflow-hidden border border-current bg-white/10">
                                    <Image
                                        src={certificateImageHref(certificate.image)}
                                        alt=""
                                        fill
                                        sizes="72px"
                                        className="object-cover object-center grayscale"
                                    />
                                </span>
                                <span className="min-w-0 self-center">
                                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] opacity-70">
                                        {String(index + 1).padStart(2, "0")} / {certificate.year}
                                    </span>
                                    <span className="mt-1 block truncate text-sm font-semibold">
                                        {certificate.title}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
                </aside>
            </div>
        </motion.section>
    );
}
