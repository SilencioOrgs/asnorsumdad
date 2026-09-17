"use client";

import { MotionConfig } from "framer-motion";
import { Certificates } from "@/components/sections/certificates";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
import { Projects } from "@/components/sections/projects";
import { SocialLinks } from "@/components/sections/social-links";
import { TechStack } from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#f8f8f7] text-neutral-900 transition-colors duration-300 dark:bg-black dark:text-neutral-100">
        {/* Ambient Monochrome Vignette / Minimal Gradients */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[20%] right-[10%] h-[600px] w-[600px] rounded-full bg-[#e6e2d3]/5 blur-[140px] dark:bg-white/[0.03]" />
          <div className="absolute -left-[10%] top-[40%] h-[550px] w-[550px] rounded-full bg-[#eeeeee]/10 blur-[150px] dark:bg-white/[0.02]" />
          <div className="bg-grid-monochrome absolute inset-0" />
        </div>

        <Navbar />

        <main className="relative z-10 mx-auto w-full max-w-[1240px] space-y-24 px-4 pb-24 pt-20 sm:pt-24 md:pt-28 md:px-12">
          <Hero />
          <Projects />
          <TechStack />
          <GitHubActivity />
          <Experience />
          <Certificates />
          <SocialLinks />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
