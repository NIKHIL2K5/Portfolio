"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Blog from "@/components/sections/Blog";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return null; // Or a loader

  return (
    <main className="relative bg-black min-h-screen">
      <div className="relative z-10">
        <Hero />
        <About stats={data.settings.stats} />
        <Projects projects={data.projects} />
        <Skills />
        <Experience experiences={data.experiences} />
        <Blog blogs={data.blogs} />
        <Testimonials testimonials={data.testimonials} />
        <Contact settings={data.settings} />
        <Footer socialLinks={data.settings.socialLinks} />
      </div>

      {/* Persistent global effects */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-[#000510]/5 mix-blend-overlay" />
        <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
      </div>
    </main>
  );
}
