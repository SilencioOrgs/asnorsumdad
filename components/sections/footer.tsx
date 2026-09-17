"use client";

import { personalInfo } from "@/lib/data";

export function Footer() {
    return (
        <footer className="bg-white dark:bg-black border-t border-[#e2ded2] dark:border-[#282a2b] relative z-20 transition-colors duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1240px] mx-auto px-4 md:px-12 py-8 gap-4">
                {/* Brand & Copyright */}
                <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                    <span className="font-display font-semibold text-base text-black dark:text-white flex items-center gap-2">
                        {personalInfo.name}
                        <span className="w-1.5 h-1.5 rounded-full glow-dot-blue inline-block" />
                    </span>
                    <span className="hidden sm:inline text-neutral-400">•</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        &copy; {new Date().getFullYear()} {personalInfo.name}. Engineered with precision.
                    </span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-6">
                    <a
                        className="text-neutral-600 dark:text-[#b4b5b5] hover:text-black dark:hover:text-white transition-colors font-mono text-xs"
                        href={personalInfo.github}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        GitHub
                    </a>
                    <a
                        className="text-neutral-600 dark:text-[#b4b5b5] hover:text-black dark:hover:text-white transition-colors font-mono text-xs"
                        href={personalInfo.linkedin}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        LinkedIn
                    </a>
                    <a
                        className="text-neutral-600 dark:text-[#b4b5b5] hover:text-black dark:hover:text-white transition-colors font-mono text-xs"
                        href="#projects"
                    >
                        Terminal
                    </a>
                    <a
                        className="text-neutral-600 dark:text-[#b4b5b5] hover:text-black dark:hover:text-white transition-colors font-mono text-xs"
                        href={personalInfo.github}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Source Code
                    </a>
                </div>
            </div>
        </footer>
    );
}
