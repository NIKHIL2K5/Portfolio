"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

const primaryEase = [0.85, 0, 0.15, 1] as any;

const experiences = [
  {
    period: "2025 — Present",
    role: "Freelancer",
    company: "Self-Employed",
    tag: "Ongoing",
    color: "#ef4444",
    points: [
      "Worked with multiple clients to design and build websites from scratch to production.",
      "Handled full project lifecycle — from design planning to deployment and hosting.",
      "Delivered responsive, performant, and SEO-friendly web applications.",
      "Managed client communication, requirements gathering, and iterative delivery.",
    ],
  },
  {
    period: "Nov 2025 — May 2026",
    role: "MERN Stack Intern",
    company: "Eglogics",
    tag: "Internship",
    color: "#a78bfa",
    points: [
      "Built production-level full stack applications using the MERN stack.",
      "Developed and maintained RESTful APIs consumed by both web and mobile apps.",
      "Integrated Stripe payment gateway for seamless checkout experiences.",
      "Implemented Firebase Authentication and real-time database features.",
      "Added multi-language translation support across the platform.",
      "Collaborated with senior engineers on code reviews and feature planning.",
    ],
  },
];

export default function Experience({ experiences: dynamicExperiences }: { experiences?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const displayExperiences = (dynamicExperiences && dynamicExperiences.length > 0) ? dynamicExperiences.map(e => ({
    period: e.duration,
    role: e.title,
    company: e.company,
    tag: "Work",
    color: "#ef4444",
    points: e.description.split("\n"),
  })) : [
    {
      period: "2025 — Present",
      role: "Freelancer",
      company: "Self-Employed",
      tag: "Ongoing",
      color: "#ef4444",
      points: [
        "Worked with multiple clients to design and build websites from scratch to production.",
      ],
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative bg-[#050505] overflow-hidden"
      style={{ padding: "6rem 0" }}
    >
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-red-600/4 blur-[140px] rounded-full pointer-events-none" />

      <div style={{ paddingLeft: 120, paddingRight: 80 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginBottom: 64 }}
        >
          <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
            <div className="w-7 h-px bg-red-500" />
            <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-red-500/80">Timeline</span>
          </div>
          <h2 className="font-black tracking-tight" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1 }}>
            Experience
          </h2>
        </motion.div>

        <div className="relative" style={{ paddingLeft: 32 }}>
          <div
            className="absolute top-0 bottom-0"
            style={{ left: 0, width: 1, background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 bg-red-500"
              style={{ height: "100%", scaleY: scrollYProgress, transformOrigin: "top",
                boxShadow: "0 0 10px rgba(239,68,68,0.4)" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
            {displayExperiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: primaryEase }}
                viewport={{ once: true, margin: "-80px" }}
                className="relative group"
              >
                <div
                  className="absolute"
                  style={{
                    left: -40, top: 8,
                    width: 16, height: 16,
                    borderRadius: "50%",
                    border: `2px solid ${exp.color}60`,
                    background: "#050505",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: exp.color }} />
                </div>

                <div
                  className="transition-all duration-500"
                  style={{
                    padding: "28px 32px",
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                    maxWidth: 760,
                  }}
                >
                  <div className="flex items-center gap-4" style={{ marginBottom: 12 }}>
                    <span
                      className="font-mono font-bold"
                      style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}
                    >
                      {exp.period}
                    </span>
                    <span
                      className="font-semibold"
                      style={{
                        fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase",
                        padding: "2px 8px", borderRadius: 20,
                        border: `1px solid ${exp.color}40`,
                        color: exp.color,
                        background: `${exp.color}10`,
                      }}
                    >
                      {exp.tag}
                    </span>
                  </div>

                  <h3
                    className="font-black"
                    style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", marginBottom: 20, lineHeight: 1.15 }}
                  >
                    {exp.role}
                    {" "}
                    <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400, fontSize: "0.75em" }}>
                      @ {exp.company}
                    </span>
                  </h3>

                  <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {exp.points.map((pt, pi) => (
                      <motion.li
                        key={pi}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + pi * 0.07 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                        style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.65 }}
                      >
                        <span
                          className="flex-shrink-0 rounded-full"
                          style={{
                            marginTop: 7, width: 5, height: 5,
                            background: exp.color, opacity: 0.7,
                          }}
                        />
                        {pt}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
