"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";



export default function Footer({ socialLinks }: { socialLinks?: any }) {
  const dynamicSocials = [
    { label: "GitHub", href: socialLinks?.github || "#", icon: "GH" },
    { label: "LinkedIn", href: socialLinks?.linkedin || "#", icon: "LI" },
    { label: "Twitter", href: socialLinks?.twitter || "#", icon: "TW" },
    { label: "Instagram", href: socialLinks?.instagram || "#", icon: "IG" },
  ];

  const scrollToTop = () => {
    // console.log("Back to top clicked");
    const lenis = (window as any).lenisInstance;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { duration: 2.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="bg-[#050505] relative z-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* ── Main footer body ── */}
      <div style={{ padding: "4rem 8rem 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT: brand */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-black tracking-tight"
              style={{ fontSize: 22, marginBottom: 10, letterSpacing: "-0.02em" }}
            >
              NIKHIL<span className="text-red-500">.</span>
            </h2>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", lineHeight: 1.7, maxWidth: 220 }}>
              Full Stack Developer & Freelancer building scalable digital experiences.
            </p>

            {/* Socials */}
            <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
              {dynamicSocials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  title={s.label}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center font-bold text-[10px]"
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.3)",
                    textDecoration: "none",
                    transition: "color 0.3s, border-color 0.3s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: back to top + availability */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 24 }}
          >
            {/* Availability badge */}
            <div
              className="flex items-center gap-2"
              style={{
                padding: "8px 16px", borderRadius: 20,
                border: "1px solid rgba(34,197,94,0.25)",
                background: "rgba(34,197,94,0.06)",
              }}
            >
              <span
                className="rounded-full animate-pulse"
                style={{ width: 6, height: 6, background: "#22c55e", display: "inline-block" }}
              />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
                Available for freelance
              </span>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex flex-col items-center gap-2 group"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.4)",
                  transition: "border-color 0.3s, color 0.3s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                }}
              >
                <ArrowUp size={15} />
              </motion.div>
              <span
                style={{
                  fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)", fontWeight: 700,
                }}
              >
                Back to Top
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          margin: "3rem 8rem 0",
          padding: "20px 0",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)" }}>
          © 2026 Nikhil. All rights reserved.
        </p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.12)" }}>
          Designed & built with ❤️ by Nikhil
        </p>
      </div>
    </footer>
  );
}
