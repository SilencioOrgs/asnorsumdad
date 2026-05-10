"use client";

import { MotionConfig } from "framer-motion";
import { Certificates } from "@/components/sections/certificates";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Gallery } from "@/components/sections/gallery";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
import { Profile } from "@/components/sections/profile";
import { Projects } from "@/components/sections/projects";
import { SocialLinks } from "@/components/sections/social-links";
import { TechStack } from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-white text-black">
        <Navbar />
        <Hero />

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Profile />
          <Projects />
          <TechStack />
          <GitHubActivity />

          <div className="border-t border-black py-16 md:py-24">
            <Experience />
          </div>

          <Certificates />
          <Gallery />
          <SocialLinks />
        </div>

        <Footer />
      </main>
    </MotionConfig>
  );
}
