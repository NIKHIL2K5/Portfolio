"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const primaryEase = [0.85, 0, 0.15, 1] as any;

export default function About({ stats: dynamicStats }: { stats?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const displayStats = [
    { value: dynamicStats?.yearsOfExp || "3+", label: "Years of\nExperience" },
    { value: dynamicStats?.projectsCompleted || "4+", label: "Projects\nCompleted" },
    { value: dynamicStats?.technologiesMastered || "10+", label: "Technologies\nMastered" },
  ];

  useEffect(() => { setIsMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <section id="about" ref={containerRef} className="relative py-32 bg-[#050505] overflow-hidden">

      {/* ── Subtle ambient particles ── */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
              }}
              animate={{ y: [null, "-=80px"], opacity: [0, 0.6, 0] }}
              transition={{
                duration: Math.random() * 12 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
              }}
              className="absolute w-px h-px bg-white/40 rounded-full"
            />
          ))}
        </div>
      )}

      {/* ── Faint large "ABOUT" watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-black text-white/[0.02] tracking-tighter uppercase">
          About
        </span>
      </div>

      <div className="relative z-10" style={{ padding: '0 80px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ─── LEFT: Text content ─── */}
          <div className="order-2 lg:order-1" style={{ paddingLeft: '40px' }}>

            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-px bg-red-500/60" />
              <span className="text-red-500/80 text-[10px] font-bold tracking-[0.4em] uppercase">
                About Me
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: primaryEase }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-[1.05] mb-10"
            >
              Freelancer&nbsp;&amp;&nbsp;
              <span className="relative inline-block text-white/25 overflow-hidden">
                Tech Alchemist
                <motion.div
                  animate={{ left: ["-100%", "200%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                  className="absolute top-0 bottom-0 w-6 bg-white/30 -skew-x-12 blur-[3px]"
                />
              </span>
            </motion.h2>

            {/* Body text */}
            <div className="space-y-5 mb-12">
              {[
                "I am a Full Stack Developer and Freelancer passionate about building scalable, efficient, and user-focused digital solutions.",
                "As a Tech Alchemist, I combine code, creativity, and automation to craft intelligent systems that solve real-world problems.",
                "I continuously explore new tools and technologies to stay ahead, ensuring every project is built with innovation, performance, and scalability.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.15, duration: 0.8, ease: primaryEase }}
                  viewport={{ once: true }}
                  className="text-white/45 text-[15px] leading-relaxed hover:text-white/75 transition-colors duration-500"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center gap-10 pt-8 border-t border-white/[0.06]"
            >
              {displayStats.map((stat, i) => (
                <div key={i} className="group">
                  <p className="text-3xl md:text-4xl font-black tracking-tight text-white group-hover:text-red-400 transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-[9px] text-white/30 uppercase tracking-[0.25em] mt-1.5 leading-tight whitespace-pre-line">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── RIGHT: Image ─── */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center items-center relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: primaryEase }}
            viewport={{ once: true }}
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-red-900/10 blur-[80px] rounded-full scale-75 pointer-events-none" />

            {/* Polaroid-style card */}
            <motion.div
              ref={imageRef}
              style={{ y: imgY, rotate }}
              className="relative w-full max-w-[420px] aspect-[3/4] bg-[#111] shadow-[0_32px_80px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden group"
            >
              {/* Corner accents — inside corners of the rounded card */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-white/20 z-10 rounded-tl-sm" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-white/20 z-10 rounded-tr-sm" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-white/20 z-10 rounded-bl-sm" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-white/20 z-10 rounded-br-sm" />

              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/nikhilaboutme.png"
                  alt="Nikhil — Tech Alchemist"
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000 scale-[1.03] group-hover:scale-100"
                  priority
                />
                {/* Dark gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Name tag inside card — bright, clear */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <p className="text-white text-[13px] font-black uppercase tracking-[0.3em]">
                    Nikhil
                  </p>
                  <div className="w-8 h-px bg-red-500/60 my-2" />
                  <p className="text-white/60 text-[10px] uppercase tracking-[0.25em] font-semibold">
                    Full Stack Developer
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.6, duration: 1.0, ease: primaryEase }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-4 md:-left-12 w-56 bg-[#111]/90 backdrop-blur-xl border border-white/[0.07] rounded-2xl p-5 shadow-2xl"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                ))}
              </div>
              <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] font-semibold mb-2">
                Core Philosophy
              </p>
              <p className="text-[13px] text-white font-semibold leading-snug">
                Code + Creativity =&nbsp;
                <span className="text-red-400">Alchemy.</span>
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
