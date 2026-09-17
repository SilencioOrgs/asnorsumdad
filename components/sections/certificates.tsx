"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, FileText, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { certificates } from "@/lib/data";
import { fadeInUp } from "@/lib/utils";

interface CertificateItem {
    title: string;
    issuer: string;
    year: string;
    icon: string;
    file?: string;
    image?: string;
    credlyBadgeId?: string;
}

const certList: CertificateItem[] = [
    {
        title: "Python Essentials 1",
        issuer: "Cisco Networking Academy & OpenEDG Python Institute",
        year: "2026",
        icon: "verified_user",
        file: "cisco-python-essentials-1.pdf",
        image: "cisco-python-essentials-1.png",
        credlyBadgeId: "b0f9b703-d9d5-46d1-9d87-fcb0c0f751ae",
    },
    {
        title: "Innovation Lab Hackathon",
        issuer: "The Innovation Lab 2026 Competitive Hackathon",
        year: "2026",
        icon: "emoji_events",
        file: "SUMDAD, ASNOR A. Certificate of Attendance.pdf",
        image: "innovation-lab-2026-certificate.png",
    },
    {
        title: "Cybersecurity Plan Orientation",
        issuer: "DICT Region IV-A Cybersecurity Governance Division",
        year: "2025",
        icon: "shield",
        file: "cert_Asnor A. Sumdad.pdf",
        image: "dict-cybersecurity-orientation-2025-certificate.png",
    },
    {
        title: "Regional Convention & CpE Challenge",
        issuer: "ICpEP.se Regional Convention & Programming League",
        year: "2022",
        icon: "code",
        file: "ICpEP.se Regional Convention, GA, CpE Challenge_SUMDAD, ASNOR.pdf",
        image: "icpep-cpe-challenge-2022-certificate.png",
    },
    {
        title: "Reply Code Challenge Teen",
        issuer: "Reply Code Challenge Global Algorithmic Contest",
        year: "2023",
        icon: "psychology",
        file: "ReplyCodeChallengeTeen2023_Certificate.pdf",
        image: "reply-code-challenge-teen-2023-certificate.png",
    },
];

export function Certificates() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

    useEffect(() => {
        if (selectedCert) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedCert]);

    return (
        <motion.section
            id="certifications"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8 scroll-mt-28"
            aria-labelledby="certifications-heading"
        >
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e2ded2] dark:border-[#282a2b] pb-6">
                <div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-600 dark:text-[#e6e2d3] mb-1">
                        <span>04 / 04</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-[#e6e2d3]" />
                        <span>Proof of Practice</span>
                    </div>
                    <h2
                        id="certifications-heading"
                        className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white"
                    >
                        Verified Certifications.
                    </h2>
                </div>
                <p className="text-sm md:text-base text-neutral-600 dark:text-[#b4b5b5] max-w-md">
                    Credentials, cybersecurity orientations, and competitive engineering hackathon recognitions.
                </p>
            </div>

            {/* Certifications Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certList.map((cert) => (
                    <div
                        key={cert.title}
                        onClick={() => setSelectedCert(cert)}
                        className="glass-panel rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:border-black dark:hover:border-[#e6e2d3]"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="material-symbols-outlined text-black dark:text-white text-[24px]">
                                    {cert.icon}
                                </span>
                                <span className="font-mono text-xs text-neutral-500 dark:text-[#e6e2d3]">
                                    {cert.year}
                                </span>
                            </div>
                            <h3 className="font-display font-semibold text-lg text-black dark:text-white">
                                {cert.title}
                            </h3>
                            <p className="text-xs md:text-sm text-neutral-600 dark:text-[#b4b5b5]">
                                {cert.issuer}
                            </p>
                        </div>
                        <div className="pt-4 border-t border-[#e2ded2] dark:border-[#282a2b] mt-5 flex items-center justify-between">
                            <span className="font-mono text-xs font-medium tracking-wider text-black dark:text-[#e6e2d3]">
                                {"{ VERIFIED }"}
                            </span>
                            <span className="material-symbols-outlined text-[16px] text-neutral-400">
                                arrow_forward
                            </span>
                        </div>
                    </div>
                ))}

                {/* Callout Tile */}
                <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between border-dashed border-black/20 dark:border-[#282a2b]">
                    <div className="space-y-2">
                        <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-[#e6e2d3]">
                            Archive &amp; In-Progress
                        </p>
                        <h3 className="font-display font-semibold text-lg text-black dark:text-white">
                            Continuous Engineering Credentials
                        </h3>
                        <p className="text-xs md:text-sm text-neutral-600 dark:text-[#b4b5b5] leading-relaxed">
                            Continuously training on distributed architectures, containerization, and modern AI agentic workflows.
                        </p>
                    </div>
                    <div className="pt-4 flex items-center gap-2 font-mono text-xs text-black dark:text-white font-medium">
                        <span className="material-symbols-outlined text-[16px]">terminal</span>
                        <span>Always building &amp; testing</span>
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            {selectedCert && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-6"
                    onClick={() => setSelectedCert(null)}
                >
                    <div
                        className="glass-panel relative my-auto flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-[#e2ded2] px-6 py-4 dark:border-[#282a2b]">
                            <div>
                                <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                                    {selectedCert.issuer} · {selectedCert.year}
                                </p>
                                <h3 className="font-display text-xl font-bold text-black dark:text-white">
                                    {selectedCert.title}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedCert(null)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 text-neutral-600 hover:bg-black/5 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-white/5"
                                aria-label="Close dialog"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="flex min-h-[300px] flex-1 items-center justify-center bg-black/[0.02] p-6 dark:bg-black/40">
                            {selectedCert.image ? (
                                <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-neutral-950">
                                    <Image
                                        src={`/certificates/${selectedCert.image}`}
                                        alt={selectedCert.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="text-center font-mono text-sm text-neutral-500">
                                    Official verified credential on record.
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e2ded2] px-6 py-4 dark:border-[#282a2b]">
                            <button
                                type="button"
                                onClick={() => setSelectedCert(null)}
                                className="rounded-lg border border-black/10 px-4 py-2 font-mono text-xs text-neutral-700 hover:bg-black/5 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-white/5"
                            >
                                Close
                            </button>

                            <div className="flex items-center gap-3">
                                {selectedCert.credlyBadgeId && (
                                    <a
                                        href={`https://www.credly.com/badges/${selectedCert.credlyBadgeId}/public_url`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-black/15 px-4 py-2 font-mono text-xs font-semibold text-neutral-900 hover:bg-black hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-black"
                                    >
                                        <span>Credly Badge</span>
                                        <ArrowUpRight size={14} />
                                    </a>
                                )}
                                {selectedCert.file && (
                                    <a
                                        href={`/certificates/${selectedCert.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-black px-4 py-2 font-mono text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-[#e6e2d3]"
                                    >
                                        <span>Open PDF</span>
                                        <FileText size={14} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.section>
    );
}
