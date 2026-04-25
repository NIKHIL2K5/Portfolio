"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.030, duration: 0.4, ease: primaryEase }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      className="flex items-center gap-3 cursor-pointer group transition-all duration-300"
      style={{
        padding: "10px 20px",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.09)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <div className="w-[22px] h-[22px] flex-shrink-0 relative">
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
        className="font-semibold whitespace-nowrap transition-colors duration-300 group-hover:text-white"
        style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="bg-[#050505]" style={{ padding: "80px 0" }}>
      {/* Centered container matching reference */}
      <div
        className="mx-auto"
        style={{
          maxWidth: 1000,
          paddingLeft: 120,
          paddingRight: 60,
        }}
      >
        {/* ── Heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="font-black"
          style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", marginBottom: 32, letterSpacing: "-0.02em" }}
        >
          Skills
        </motion.h2>

        {/* ── Thin rule ── */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.09)", marginBottom: 52 }} />

        {/* ── Skill groups ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.07, duration: 0.55, ease: primaryEase }}
              viewport={{ once: true }}
            >
              {/* Category name */}
              <p
                className="font-bold"
                style={{
                  fontSize: 17,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 18,
                  letterSpacing: "0.01em",
                }}
              >
                {group.title}
              </p>

              {/* Skill cards */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {group.skills.map((skill, si) => (
                  <SkillCard key={si} skill={skill} index={si + gi * 10} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom space */}
        <div style={{ height: 20 }} />
      </div>
    </section>
  );
}
