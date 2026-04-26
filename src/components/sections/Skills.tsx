"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const primaryEase = [0.85, 0, 0.15, 1] as any;

const skillGroups = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "Python",     icon: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "HTML5",      icon: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS3",       icon: "https://cdn.simpleicons.org/css/1572B6" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React",        icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js",      icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
      { name: "Node",         icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Express",      icon: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "GSAP",         icon: "https://cdn.simpleicons.org/greensock/88CE02" },
      { name: "Prisma",       icon: "https://cdn.simpleicons.org/prisma/FFFFFF" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "MongoDB",    icon: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Redis",      icon: "https://cdn.simpleicons.org/redis/DC382D" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git",     icon: "https://cdn.simpleicons.org/git/F05032" },
      { name: "Docker",  icon: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "n8n",     icon: "https://cdn.simpleicons.org/n8n/FF6D5A" },
      { name: "Vercel",  icon: "https://cdn.simpleicons.org/vercel/FFFFFF" },
      { name: "Linux",   icon: "https://cdn.simpleicons.org/linux/FCC624" },
      { name: "Figma",   icon: "https://cdn.simpleicons.org/figma/F24E1E" },
      { name: "Postman", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "GitHub",  icon: "https://cdn.simpleicons.org/github/FFFFFF" },
    ],
  },
];

type Skill = { name: string; icon: string };

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ 
        y: -5, 
        scale: 1.05,
        backgroundColor: "rgba(255,255,255,0.12)",
        borderColor: "rgba(0,210,255,0.5)",
        boxShadow: "0 0 30px rgba(0,210,255,0.25)"
      }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.015
      }}
      viewport={{ once: true }}
      className="relative flex items-center gap-3 cursor-pointer group transition-all duration-500"
      style={{
        padding: "12px 24px",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="w-[22px] h-[22px] flex-shrink-0 relative transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
        <Image
          src={skill.icon}
          alt={skill.name}
          width={22}
          height={22}
          className="object-contain"
          unoptimized
        />
      </div>
      <span
        className="font-bold whitespace-nowrap transition-colors duration-300 group-hover:text-white"
        style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}
      >
        {skill.name}
      </span>
      
      {/* Intense neon border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ border: "1px solid rgba(0,210,255,0.4)", boxShadow: "0 0 15px rgba(0,210,255,0.2)" }} />
    </motion.div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="relative bg-[#010101] overflow-hidden" 
      style={{ padding: "160px 0" }}
    >
      
      {/* ── Enhanced Futuristic Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Main Grid System - Brighter and more visible */}
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            backgroundImage: `
              linear-gradient(rgba(0,210,255,0.08) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(0,210,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 90%)'
          }} 
        />

        {/* Sharper sub-grid for texture */}
        <div 
          className="absolute inset-0 z-0 opacity-40" 
          style={{ 
            backgroundImage: `
              linear-gradient(rgba(0,210,255,0.04) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(0,210,210,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '15px 15px',
            maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 95%)'
          }} 
        />

        {/* Scanlines Effect */}
        <div className="absolute inset-0 z-1 opacity-[0.03]"
             style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 3px, transparent 4px)' }} />

        {/* Intense Perspective Lines */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent shadow-[0_0_20px_rgba(0,210,255,0.5)]" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent shadow-[0_0_20px_rgba(168,85,247,0.4)]" />
        </div>

        {/* Moving Energy Pulse Lines */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ left: "-100%" }}
            animate={{ left: "200%" }}
            transition={{ 
              duration: 6 + i * 1.5, 
              repeat: Infinity, 
              ease: "linear", 
              delay: i * 2.5 
            }}
            className="absolute top-[20%] h-px w-[800px] z-1"
            style={{ 
              background: `linear-gradient(to right, transparent, rgba(0,210,255,${0.2 - i*0.04}), transparent)`,
              top: `${20 + i * 22}%`,
              transform: "rotate(-3deg)",
              boxShadow: "0 0 10px rgba(0,210,255,0.3)"
            }}
          />
        ))}

        {/* Deep Atmospheric Glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 -left-[10%] w-[800px] h-[800px] bg-cyan-600/10 blur-[160px] rounded-full mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 -right-[10%] w-[900px] h-[900px] bg-purple-600/10 blur-[200px] rounded-full mix-blend-screen"
        />

        {/* Noise Overaly */}
        <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none mix-blend-overlay" />
      </div>

      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: 1100,
          paddingLeft: 120,
          paddingRight: 60,
        }}
      >
        {/* ── Section Label ── */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="w-12 h-[2px] bg-cyan-500 shadow-[0_0_20px_rgba(0,210,255,0.8)]" />
          <span className="text-cyan-400 text-[10px] font-black tracking-[0.7em] uppercase" style={{ textShadow: "0 0 10px rgba(0,210,255,0.5)" }}>
            Digital Arsenal
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: primaryEase }}
          viewport={{ once: true }}
          className="font-black text-white"
          style={{ fontSize: "clamp(4.2rem, 10vw, 7.5rem)", marginBottom: 80, letterSpacing: "-0.06em", lineHeight: 0.8 }}
        >
          Weaponry<br />
          <span className="text-white/10" style={{ textShadow: "none" }}>Vault.</span>
        </motion.h2>

        {/* ── Skill groups ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: primaryEase, delay: gi * 0.12 }}
              viewport={{ once: true }}
            >
              {/* Category label with digital accent */}
              <div className="flex items-center gap-10 mb-12">
                <div className="flex flex-col">
                    <p
                    className="font-black uppercase shrink-0"
                    style={{
                        fontSize: 13,
                        color: "rgba(0,210,255,0.5)",
                        letterSpacing: "0.4em",
                        textShadow: "0 0 10px rgba(0,210,255,0.2)"
                    }}
                    >
                    {group.title}
                    </p>
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-[2px] bg-cyan-500 shadow-[0_0_10px_rgba(0,210,255,0.6)] mt-2" 
                    />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/20 via-transparent to-transparent" />
              </div>

              {/* Skill cards grid */}
              <div className="flex flex-wrap gap-5">
                {group.skills.map((skill, si) => (
                  <SkillCard key={si} skill={skill} index={si + gi * 5} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side Decorative Glow Line */}
      <div className="absolute left-[50px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
      <motion.div 
        animate={{ 
            top: ["0%", "100%"],
            opacity: [0, 1, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-[49px] w-[3px] h-20 bg-cyan-400 blur-[2px] shadow-[0_0_15px_rgba(0,210,255,0.8)]" 
      />
    </section>
  );
}
