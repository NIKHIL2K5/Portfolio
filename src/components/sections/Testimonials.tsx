"use client";
 
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useRef, useEffect, useState } from "react";
 
const primaryEase = [0.85, 0, 0.15, 1] as any;
 
const DEFAULT_TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Founder",
    company: "Bykahomes",
    avatar: "AM",
    avatarUrl: null,
    color: "#a78bfa",
    quote: "Nikhil delivered a polished, fast and visually stunning website for our property platform.",
  },
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "Nexus Labs",
    avatar: "SC",
    avatarUrl: null,
    color: "#60a5fa",
    quote: "Exceptional attention to detail. The animation work on our landing page is world-class.",
  },
  {
    name: "Marcus Thorne",
    role: "CTO",
    company: "Veloce",
    avatar: "MT",
    avatarUrl: null,
    color: "#f472b6",
    quote: "Clean code, great performance, and a very professional workflow. Highly recommended.",
  },
  {
    name: "Elena Rodriguez",
    role: "Creative Lead",
    company: "Studio Aura",
    avatar: "ER",
    avatarUrl: null,
    color: "#34d399",
    quote: "Transformed our complex ideas into a simple, elegant user experience. A true partner.",
  },
  {
    name: "David Kim",
    role: "Solo Founder",
    company: "Upstream",
    avatar: "DK",
    avatarUrl: null,
    color: "#fbbf24",
    quote: "The best developer I've worked with. Fast, communicative and deeply skilled.",
  },
];
 
function TestimonialCard({ testimonial, i }: { testimonial: any, i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.1, duration: 0.6, ease: primaryEase }}
      viewport={{ once: true }}
      className="group"
      style={{
        padding: "28px 28px 24px",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.01)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        width: 400,
        flexShrink: 0,
      }}
      whileHover={{
        borderColor: `rgba(255,255,255,0.15)`,
        background: `rgba(255,255,255,0.03)`,
        y: -4,
      }}
    >
      <div style={{ color: "#ef4444", opacity: 0.4 }}>
        <Quote size={18} />
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.45)", flex: 1, fontWeight: 450 }}>
        {testimonial.quote}
      </p>
      <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center font-black flex-shrink-0 overflow-hidden"
          style={{
            width: 38, height: 38, borderRadius: 12,
            background: `rgba(255,255,255,0.05)`,
            border: `1px solid rgba(255,255,255,0.08)`,
            fontSize: 10,
            color: "white",
          }}
        >
          {testimonial.avatarUrl ? (
            <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-full h-full object-cover" />
          ) : (
            testimonial.avatar
          )}
        </div>
        <div>
          <p className="font-bold" style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.3 }}>
            {testimonial.name}
          </p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.3, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {testimonial.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
 
export default function Testimonials({ testimonials: dynamicTestimonials }: { testimonials?: any[] }) {
  const displayTestimonials = (dynamicTestimonials && dynamicTestimonials.length > 0)
    ? dynamicTestimonials.map(t => ({
      name: t.name,
      role: t.role,
      avatar: t.name ? t.name[0] : "A",
      avatarUrl: t.avatarUrl,
      quote: t.content,
    }))
    : DEFAULT_TESTIMONIALS;
 
  return (
    <section id="testimonials" className="bg-[#050505] relative overflow-hidden" style={{ padding: "8rem 0" }}>
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-red-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[10%] w-[30vw] h-[30vw] bg-zinc-500/10 blur-[100px] rounded-full" />
      </div>
 
      <div className="relative z-10">
        {/* Header */}
        <div style={{ padding: "0 clamp(20px, 12%, 200px)", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
              <div className="w-7 h-px bg-red-500" />
              <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-red-500/80">Kind Words</span>
            </div>
            <h2
              className="font-black tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
            >
              Testimonials<span className="text-red-500">.</span>
            </h2>
          </motion.div>
        </div>
 
        {/* Infinite Marquee Wrapper */}
        <div className="relative flex flex-col gap-8">
          {/* First Row */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-8 px-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: displayTestimonials.length * 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ width: "fit-content" }}
            >
              {[...displayTestimonials, ...displayTestimonials].map((t, i) => (
                <TestimonialCard key={`row1-${i}`} testimonial={t} i={i} />
              ))}
            </motion.div>
          </div>
 
          {/* Second Row (Reverse) */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-8 px-4"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                duration: displayTestimonials.length * 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ width: "fit-content" }}
            >
              {[...displayTestimonials, ...displayTestimonials].map((t, i) => (
                <TestimonialCard key={`row2-${i}`} testimonial={t} i={i} />
              ))}
            </motion.div>
          </div>
        </div>
 
        {/* Bottom Fade Gradient Overlay */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
      </div>
    </section>
  );
}
