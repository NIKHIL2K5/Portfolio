"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Scene3D from "@/components/3d/Scene3D";
import Image from "next/image";
import Magnetic from "@/components/animations/Magnetic";
import { useRef } from "react";

const primaryEase = [0.85, 0, 0.15, 1] as any;

export default function Hero({ socialLinks: cmsLinks }: { socialLinks?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const finalLinks = [
    {
      label: "LinkedIn",
      href: cmsLinks?.linkedin || "https://linkedin.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      href: cmsLinks?.github || "https://github.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: cmsLinks?.instagram || "https://instagram.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: cmsLinks?.youtube || "https://youtube.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
        </svg>
      ),
    },
  ];
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 20, mass: 0.5 });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#050505] cursor-default"
    >
      <Scene3D />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10" />

      {/* Right Photo */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: primaryEase }}
        className="absolute right-0 top-0 bottom-0 w-[55%] z-0 h-full"
      >
        <div className="relative w-full h-full">
          <Image
            src="/nikhilhomepage.png"
            alt="Nikhil"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover object-center grayscale brightness-[0.6] contrast-[1.1]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
        </div>
      </motion.div>

      {/* ── Social Icons — fixed to left-center of screen ── */}
      <div className="absolute left-5 md:left-7 top-1/2 -translate-y-1/2 flex flex-col items-center gap-7 z-30">
        {finalLinks.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 + i * 0.1, duration: 0.6, ease: primaryEase }}
            className="text-white/40 hover:text-white transition-all duration-300 hover:scale-125 transform"
          >
            {item.icon}
          </motion.a>
        ))}
        {/* thin vertical line below */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 2.2, duration: 0.9 }}
          className="w-px h-14 bg-white/12 origin-top"
        />
      </div>

      {/* ── Main content — bottom-left ── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pr-8" style={{ paddingLeft: '80px', paddingBottom: '80px' }}>
        <motion.div style={{ opacity }} className="flex flex-col gap-1 md:gap-3">

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-white/40 text-[9px] md:text-[10px] font-semibold tracking-[0.45em] uppercase"
          >
            Full Stack Developer&nbsp;&nbsp;|&nbsp;&nbsp;App Development&nbsp;&nbsp;|&nbsp;&nbsp;Automation&nbsp;&nbsp;|&nbsp;&nbsp;AI
          </motion.p>

          {/* Giant Name */}
          <div className="relative overflow-hidden inline-block">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 1.1, ease: primaryEase }}
              className="block text-[16vw] md:text-[13vw] font-black tracking-tighter leading-[0.82] text-white select-none"
            >
              NIKHIL
            </motion.h1>
            {/* Glitch overlay */}
            <motion.h1
              animate={{ opacity: [0, 0.12, 0, 0.08, 0], x: [-1, 1, -0.5, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 3 }}
              className="absolute inset-0 block text-[16vw] md:text-[13vw] font-black tracking-tighter leading-[0.82] text-red-500/10 pointer-events-none"
            >
              NIKHIL
            </motion.h1>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 1.0, ease: primaryEase }}
            className="flex gap-5 items-center mt-5"
          >
            <Magnetic>
              <button className="px-10 h-14 glass text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 rounded-[16px]">
                Let&apos;s Build
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative vertical text — right side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute right-6 md:right-14 bottom-24 hidden md:flex flex-col items-center gap-10 z-20 pointer-events-none"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="text-[9px] tracking-[0.7em] font-bold text-white/18 uppercase whitespace-nowrap relative overflow-hidden py-1">
          <span className="text-white/18">TECH ALCHEMIST</span>
          <motion.div
            animate={{ top: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 right-0 h-16 bg-white/15 blur-md pointer-events-none"
          />
        </span>
        <div className="w-px h-32 bg-white/6" />
      </motion.div>

      {/* Subtle ambient glow bottom-left */}
      <div className="absolute left-[-5vw] bottom-[-5vh] w-[55vw] h-[55vh] bg-white/[0.012] blur-[160px] rounded-full z-10 pointer-events-none" />
    </section>
  );
}
