"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PixelScatter } from "@/components/sections/pixel-scatter";
import { aboutContent } from "@/lib/data";
import { fadeInUp } from "@/lib/utils";

export function About() {
    const ref = useRef(null);
    const isActive = useInView(ref, { once: false, margin: "-50px" });

    return (
        <motion.section
            id="about"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative isolate min-w-0 scroll-mt-28"
            aria-labelledby="about-heading"
        >
            <PixelScatter active={isActive} />

            <div className="mb-8">
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    About
                </p>
                <h2 id="about-heading" className="font-display text-4xl font-semibold text-black sm:text-5xl">
                    Practical systems, clean interfaces.
                </h2>
            </div>

            <div className="space-y-5 text-base leading-8 text-neutral-700 sm:text-lg">
                {aboutContent.split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </div>
        </motion.section>
    );
}
