"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const primaryEase = [0.85, 0, 0.15, 1] as any;

export default function About({ stats: dynamicStats }: { stats?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const displayStats = [
    { value: dynamicStats?.yearsOfExp || "3+", label: "Years of\nExperience" },
    { value: dynamicStats?.projectsCompleted || "4+", label: "Projects\nCompleted" },
    { value: dynamicStats?.technologiesMastered || "10+", label: "Technologies\nMastered" },
  ];

  useEffect(() => { setIsMounted(true); }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Spring-smoothed mouse positions for the electric effect
  const springX = useSpring(mousePos.x, { stiffness: 150, damping: 20 });
  const springY = useSpring(mousePos.y, { stiffness: 150, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section 
      id="about" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative py-40 bg-[#010101] overflow-hidden group/section"
    >
      
      {/* ΓöÇΓöÇ Interactive Electric Background ΓöÇΓöÇ */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Base Ambient - Deep Navy */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-[#02050a] to-[#010101] opacity-80" />

        {/* The "Electric" Glow - Follows Mouse */}
        {isMounted && (
            <motion.div 
                style={{ 
                    left: springX, 
                    top: springY,
                    background: 'radial-gradient(circle, rgba(0,210,255,0.12) 0%, rgba(0,210,255,0.05) 30%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-1 pointer-events-none"
            />
        )}

        {/* Electric Sparks / Micro-Grid Interaction */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `
              linear-gradient(rgba(0,183,255,0.2) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(0,183,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 60%)`
          }} 
        />

        {/* Drifting Nebula - Calm background layers */}
        <motion.div 
          animate={{ 
            x: ["-10%", "10%"],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-blue-900/5 blur-[150px] mix-blend-screen"
        />

        {/* "Electric" Pulse Lines - Rare quick pulses */}
        <motion.div 
            animate={{ 
                opacity: [0, 0.4, 0],
                scaleX: [0, 1.5, 0],
            }}
            transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 10, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 right-0 h-px bg-cyan-400/50 shadow-[0_0_20px_rgba(0,210,255,1)] z-2"
        />

        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="relative z-10 px-5 sm:px-8 lg:px-0" style={{ paddingLeft: "clamp(20px, 12%, 160px)", paddingRight: "clamp(20px, 8%, 120px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-32 items-center">

          {/* ─── LEFT: Text content ─── */}
          <div className="order-2 lg:order-1">

            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="w-10 h-px bg-cyan-500/40" />
              <span className="text-cyan-400/50 text-[10px] font-black tracking-[0.6em] uppercase">
                Interactive Ethos
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: primaryEase }}
              viewport={{ once: true }}
              className="text-[2.6rem] md:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.9] mb-8 lg:mb-14 text-white"
            >
              Crafting Digital<br />
              <span className="text-white/10">Soul & Code.</span>
            </motion.h2>

            {/* Body text */}
            <div className="space-y-5 lg:space-y-8 mb-10 lg:mb-16">
              {[
                "I am a Full Stack Developer and Freelancer driven by the pursuit of building high-performance, scalable systems that feel like second nature to the user.",
                "As a digital architect, I believe that code is more than just instructions — it's the alchemy of logic and creativity that solves human problems.",
                "My mission is to stay at the cutting edge of tech, transforming complex requirements into elegant, efficient, and future-proof digital experiences.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.9, ease: primaryEase }}
                  viewport={{ once: true }}
                  className="text-white/40 text-[14px] lg:text-[17px] leading-relaxed font-medium hover:text-white/80 transition-all duration-700 max-w-xl"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-8 lg:gap-16 pt-8 lg:pt-14 border-t border-white/[0.04]"
            >
              {displayStats.map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <motion.p 
                    whileHover={{ scale: 1.1, color: "rgba(0,210,255,0.8)" }}
                    className="text-4xl md:text-5xl font-black tracking-tighter text-white/80 transition-all duration-300"
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] mt-3 font-black leading-tight whitespace-pre-line group-hover:text-white/40 transition-colors">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ΓöÇΓöÇΓöÇ RIGHT: Portrait ΓöÇΓöÇΓöÇ */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: primaryEase }}
            viewport={{ once: true }}
          >
            {/* Interactive Glow around portrait */}
            <motion.div 
                style={{ 
                    x: (mousePos.x - 500) * 0.05, 
                    y: (mousePos.y - 400) * 0.05 
                }}
                className="absolute inset-0 bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none" 
            />

            {/* Premium Card Container */}
            <motion.div
              ref={imageRef}
              style={{ y: imgY, rotate }}
              whileHover={{ scale: 1.02 }}
              className="relative w-full max-w-[460px] aspect-[4/5] bg-zinc-950/40 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.7)] rounded-[48px] overflow-hidden border border-white/[0.04] group/card"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/nikhilaboutme.png"
                  alt="Nikhil"
                  fill
                  sizes="(max-width: 768px) 100vw, 460px"
                  className="object-cover object-top grayscale group-hover/card:grayscale-0 transition-all duration-[2500ms] scale-[1.08] group-hover/card:scale-100"
                  priority
                />
                
                {/* Electric Edge Highlight */}
                <div className="absolute inset-0 border-[2px] border-cyan-500/0 group-hover/card:border-cyan-500/20 transition-all duration-700 pointer-events-none z-30" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                {/* Info Overlay */}
                <div className="absolute bottom-12 left-12 right-12 z-20">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="h-[2px] bg-cyan-500/60 mb-5" 
                  />
                  <p className="text-white text-3xl font-black tracking-tighter mb-2">
                    Nikhil<span className="text-cyan-500/50">.</span>
                  </p>
                  <p className="text-white/30 text-[11px] uppercase tracking-[0.5em] font-black italic">
                    Full Stack Architect
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Philosophy Card */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 40 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.9, duration: 1.4, ease: primaryEase }}
              viewport={{ once: true }}
              className="absolute -bottom-12 -left-8 md:-left-20 w-72 bg-zinc-950/90 backdrop-blur-3xl border border-white/[0.06] rounded-[32px] p-10 shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-500 mb-8 shadow-[0_0_10px_rgba(0,210,255,0.8)] animate-pulse" />
              <p className="text-[10px] text-white/15 uppercase tracking-[0.4em] font-black mb-4">
                Philosophy
              </p>
              <p className="text-[16px] text-white font-bold leading-tight tracking-tight">
                Crafting code with the precision of&nbsp;
                <span className="text-cyan-400/80">Logic</span> and the soul of&nbsp;
                <span className="text-white/30">Design.</span>
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
