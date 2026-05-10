"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PixelScatter } from "@/components/sections/pixel-scatter";
import { experiences } from "@/lib/data";
import { fadeInUp } from "@/lib/utils";

export function Experience() {
    const ref = useRef(null);
    const isActive = useInView(ref, { once: false, margin: "-50px" });

    return (
        <motion.section
            id="journey"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative isolate scroll-mt-28"
            aria-labelledby="journey-heading"
        >
            <PixelScatter active={isActive} />

            <div className="mb-8">
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Journey
                </p>
                <h2 id="journey-heading" className="font-display text-4xl font-semibold text-black sm:text-5xl">
                    From first program to shipped systems.
                </h2>
            </div>

            <ol className="relative border-l border-neutral-300">
                {experiences.map((exp, index) => (
                    <motion.li
                        key={`${exp.period}-${exp.summary}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={isActive ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                        className="relative pb-8 pl-7 last:pb-0"
                    >
                        <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-black bg-white" />
                        <time className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                            {exp.period}
                        </time>
                        <p className="mt-2 text-base leading-7 text-neutral-800">
                            {exp.summary}
                        </p>
                    </motion.li>
                ))}
            </ol>
        </motion.section>
    );
}
