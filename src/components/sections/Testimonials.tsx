"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const primaryEase = [0.85, 0, 0.15, 1] as any;

export default function Testimonials({ testimonials: dynamicTestimonials }: { testimonials?: any[] }) {
  const displayTestimonials = (dynamicTestimonials && dynamicTestimonials.length > 0) ? dynamicTestimonials.map(t => ({
    name: t.name,
    role: t.role,
    company: "",
    avatar: t.name ? t.name[0] : "A",
    color: "#ffffff",
    quote: t.content,
  })) : [
    {
      name: "Arjun Mehta",
      role: "Founder",
      company: "Bykahomes",
      avatar: "AM",
      color: "#a78bfa",
      quote: "Nikhil delivered a polished, fast and visually stunning website for our property platform.",
    },
  ];

  return (
    <section id="testimonials" className="bg-[#050505]" style={{ padding: "6rem 0" }}>
      <div style={{ paddingLeft: 120, paddingRight: 80 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginBottom: 56 }}
        >
          <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
            <div className="w-7 h-px bg-red-500" />
            <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-red-500/80">Kind Words</span>
          </div>
          <h2
            className="font-black tracking-tight"
            style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1 }}
          >
            Testimonials
          </h2>
        </motion.div>

        {/* Top rule */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 52 }} />

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {displayTestimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.65, ease: primaryEase }}
              viewport={{ once: true }}
              className="group"
              style={{
                padding: "28px 28px 24px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                transition: "all 0.3s",
              }}
              whileHover={{
                borderColor: `rgba(255,255,255,0.2)`,
                background: `rgba(255,255,255,0.04)`,
              }}
            >
              {/* Quote icon */}
              <div style={{ color: "#ef4444", opacity: 0.5 }}>
                <Quote size={20} />
              </div>

              {/* Quote text */}
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.5)",
                  flex: 1,
                }}
              >
                {t.quote}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="flex items-center justify-center font-black flex-shrink-0"
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: `rgba(255,255,255,0.05)`,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    fontSize: 10,
                    color: "white",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.avatar}
                </div>

                {/* Name + role */}
                <div>
                  <p
                    className="font-bold"
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.3 }}
                  >
                    {t.name}
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.3 }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
