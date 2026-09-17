"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { navLinks, personalInfo } from "@/lib/data";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Listen to global modal visibility changes to hide navbar immediately
    useEffect(() => {
        const handleModalVisibility = (e: Event) => {
            const customEvent = e as CustomEvent<{ open: boolean }>;
            const open = Boolean(customEvent.detail?.open);
            setIsModalOpen(open);
            if (open) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener("modal-visibility-change", handleModalVisibility);
        return () => window.removeEventListener("modal-visibility-change", handleModalVisibility);
    }, []);

    // Auto-hide navbar after inactivity in content sections (e.g. projects); reveal on cursor movement or scroll
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        const showAndResetTimer = () => {
            if (document.documentElement.dataset.modalOpen === "true") {
                return;
            }

            // Immediately reveal navbar
            setIsVisible(true);

            if (timer) {
                clearTimeout(timer);
            }

            // Inactivity timer: hide after 2.5s if scrolled past the top hero area
            timer = setTimeout(() => {
                if (window.scrollY > 80 && !isHovered && !isMobileMenuOpen) {
                    setIsVisible(false);
                }
            }, 2500);
        };

        window.addEventListener("scroll", showAndResetTimer, { passive: true });
        window.addEventListener("mousemove", showAndResetTimer, { passive: true });
        window.addEventListener("touchstart", showAndResetTimer, { passive: true });
        window.addEventListener("keydown", showAndResetTimer, { passive: true });

        // Initial check
        timer = setTimeout(() => {
            if (window.scrollY > 80 && !isHovered && !isMobileMenuOpen) {
                setIsVisible(false);
            }
        }, 2500);

        return () => {
            if (timer) clearTimeout(timer);
            window.removeEventListener("scroll", showAndResetTimer);
            window.removeEventListener("mousemove", showAndResetTimer);
            window.removeEventListener("touchstart", showAndResetTimer);
            window.removeEventListener("keydown", showAndResetTimer);
        };
    }, [isHovered, isMobileMenuOpen]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const shouldHide = isModalOpen || (!isVisible && !isHovered && !isMobileMenuOpen);

    return (
        <motion.header
            initial={false}
            animate={{
                y: shouldHide ? -100 : 0,
                opacity: shouldHide ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-3 sm:top-5 inset-x-0 z-50 pointer-events-none"
        >
            <div className="mx-auto w-full max-w-[1240px] px-4 md:px-12">
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="pointer-events-auto relative flex w-full items-center justify-between rounded-full border border-black/10 dark:border-white/15 bg-white/75 dark:bg-[#121414]/80 px-5 sm:px-8 py-2.5 sm:py-3 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300"
                >
                    {/* Brand Name - No icon, no blue circle */}
                    <a
                        className="font-display text-sm font-semibold tracking-tight text-black dark:text-white sm:text-base hover:opacity-80 transition-opacity"
                        href="#"
                    >
                        {personalInfo.name}
                    </a>

                    {/* Desktop Nav Links */}
                    <nav className="hidden items-center gap-7 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-mono text-xs uppercase tracking-wider text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Header Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Theme Switcher Button */}
                        {mounted && (
                            <button
                                type="button"
                                onClick={toggleTheme}
                                aria-label="Toggle Light and Dark Mode"
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white/70 text-black shadow-xs transition-all hover:border-black dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white"
                            >
                                <span className="material-symbols-outlined text-[15px]">
                                    {theme === "dark" ? "light_mode" : "dark_mode"}
                                </span>
                            </button>
                        )}

                        {/* Contact Pill */}
                        <a
                            href="#contact"
                            className="hidden items-center gap-1.5 rounded-full border border-black/15 px-3.5 py-1.5 font-mono text-xs text-black transition-all hover:border-black dark:border-white/15 dark:text-white dark:hover:border-white sm:inline-flex"
                        >
                            <span className="material-symbols-outlined text-[14px]">mail</span>
                            <span>Contact</span>
                        </a>

                        {/* Resume Button */}
                        <a
                            href={personalInfo.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-1.5 font-mono text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-[#e6e2d3]"
                        >
                            <span className="material-symbols-outlined text-[14px]">description</span>
                            <span>Resume</span>
                        </a>

                        {/* Mobile Menu Toggle */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen((c) => !c)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:bg-black hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-black md:hidden"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-navigation"
                            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        >
                            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                        </button>
                    </div>

                    {/* Mobile Floating Drawer */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                id="mobile-navigation"
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.18 }}
                                className="pointer-events-auto absolute left-0 right-0 top-full mt-3 rounded-2xl border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#121414]/95 backdrop-blur-2xl p-3 shadow-2xl md:hidden"
                            >
                                <div className="grid gap-1">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center justify-between rounded-xl px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-black transition-colors hover:bg-black/5 dark:text-white dark:hover:bg-white/5"
                                        >
                                            <span>{link.name}</span>
                                            <span className="material-symbols-outlined text-[15px] opacity-40">
                                                chevron_right
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.header>
    );
}
