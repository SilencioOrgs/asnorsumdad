import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.22, ease: "easeOut" },
    },
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.2, ease: "easeOut" },
    },
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.06,
        },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.2, ease: "easeOut" },
    },
};

export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.22, ease: "easeOut" },
    },
};

export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 12 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.22, ease: "easeOut" },
    },
};
