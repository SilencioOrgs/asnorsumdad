"use client";

import { motion, useInView } from "framer-motion";
import {
    Bot,
    Braces,
    Cloud,
    Code2,
    Cpu,
    Database,
    Figma,
    GitBranch,
    Github,
    Palette,
    PenTool,
    Server,
    Smartphone,
    Terminal,
} from "lucide-react";
import { type ComponentType, useRef } from "react";
import { PixelScatter } from "@/components/sections/pixel-scatter";
import { fadeInUp } from "@/lib/utils";

const toolMarquee: Array<{ name: string; Icon: ComponentType<{ size?: number; className?: string }> }> = [
    { name: "React", Icon: Code2 },
    { name: "Next.js", Icon: Braces },
    { name: "Tailwind CSS", Icon: Palette },
    { name: "Flutter", Icon: Smartphone },
    { name: "JavaScript", Icon: Code2 },
    { name: "TypeScript", Icon: Braces },
    { name: "Node.js", Icon: Server },
    { name: "Python", Icon: Terminal },
    { name: "REST APIs", Icon: Server },
    { name: "FastAPI", Icon: Terminal },
    { name: "PHP", Icon: Code2 },
    { name: "Firebase", Icon: Cloud },
    { name: "Supabase", Icon: Database },
    { name: "MySQL", Icon: Database },
    { name: "PostgreSQL", Icon: Database },
    { name: "SQLite", Icon: Database },
    { name: "OpenAI API", Icon: Bot },
    { name: "LLaMA", Icon: Bot },
    { name: "Flan-T5", Icon: Bot },
    { name: "NLP", Icon: Bot },
    { name: "ESP32", Icon: Cpu },
    { name: "Arduino", Icon: Cpu },
    { name: "Raspberry Pi", Icon: Cpu },
    { name: "Sensors", Icon: Cpu },
    { name: "Figma", Icon: Figma },
    { name: "Canva", Icon: PenTool },
    { name: "Git", Icon: GitBranch },
    { name: "GitHub", Icon: Github },
    { name: "Trello", Icon: PenTool },
    { name: "Vercel", Icon: Cloud },
];

function ToolMarqueeRow({ reverse = false }: { reverse?: boolean }) {
    const items = [...toolMarquee, ...toolMarquee];

    return (
        <div className="tool-marquee w-full max-w-full overflow-hidden border-y border-neutral-200 bg-white">
            <div
                className={`tool-marquee-track flex w-max ${
                    reverse ? "tool-marquee-track-reverse" : ""
                }`}
                aria-hidden="true"
            >
                {items.map(({ name, Icon }, index) => (
                    <div
                        key={`${name}-${index}`}
                        className="flex h-16 min-w-[13rem] items-center justify-center gap-3 border-r border-neutral-200 px-7 text-neutral-600"
                    >
                        <Icon size={18} className="text-neutral-500" />
                        <span className="font-mono text-sm font-semibold tracking-[0.12em]">
                            {name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function TechStack() {
    const ref = useRef(null);
    const isActive = useInView(ref, { once: false, margin: "-50px" });

    return (
        <motion.section
            id="stack"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative isolate scroll-mt-28 border-t border-black py-16 md:py-24"
            aria-labelledby="stack-heading"
        >
            <PixelScatter active={isActive} />

            <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                    <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                        Stack
                    </p>
                    <h2 id="stack-heading" className="font-display text-4xl font-semibold text-black sm:text-5xl">
                        Tools I use to ship.
                    </h2>
                </div>
                <p className="max-w-2xl text-base leading-7 text-neutral-600 lg:justify-self-end">
                    A focused moving index of the tools, platforms, and hardware I use across web,
                    mobile, AI, and IoT work.
                </p>
            </div>

            <div className="relative w-full max-w-full overflow-hidden border border-neutral-200 bg-white py-4">
                <ToolMarqueeRow />
                <ToolMarqueeRow reverse />
            </div>
        </motion.section>
    );
}
