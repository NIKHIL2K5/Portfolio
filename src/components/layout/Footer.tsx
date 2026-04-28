"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Footer({ socialLinks }: { socialLinks?: any }) {
  const dynamicSocials = [
    { label: "LinkedIn", href: socialLinks?.linkedin || "#", icon: "https://img.icons8.com/ios-glyphs/60/ffffff/linkedin.png" },
    { label: "GitHub", href: socialLinks?.github || "#", icon: "https://img.icons8.com/ios-glyphs/60/ffffff/github.png" },
    { label: "YouTube", href: socialLinks?.youtube || "#", icon: "https://img.icons8.com/ios-glyphs/60/ffffff/youtube-play.png" },
    { label: "Instagram", href: socialLinks?.instagram || "#", icon: "https://img.icons8.com/ios-glyphs/60/ffffff/instagram-new.png" },
  ];

  const scrollToTop = () => {
    const lenis = (window as any).lenisInstance;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { duration: 2.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="bg-[#050505] relative z-10 overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* ── Background Accent ── */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-600/5 blur-[100px] rounded-full pointer-events-none" />
      
      {/* ── Main footer body ── */}
      <div className="relative z-10 pt-16 lg:pt-20" style={{ padding: "clamp(40px, 6vw, 80px) clamp(20px, 12%, 200px) 0" }}>
        <div
          className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-0 text-center md:text-left"
        >
          {/* LEFT: brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-black tracking-tighter"
              style={{ fontSize: 28, marginBottom: 16, letterSpacing: "-0.04em" }}
            >
              NIKHIL<span className="text-red-500">.</span>
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.8, maxWidth: 260 }}>
              Full Stack Developer & Freelancer crafting high-performance digital experiences with code and creativity.
            </p>

            {/* Socials */}
            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              {dynamicSocials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  title={s.label}
                  whileHover={{ 
                    y: -5, 
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex items-center justify-center group"
                  style={{
                    width: 44, height: 44, borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    textDecoration: "none",
                    transition: "all 0.4s",
                  }}
                >
                  <img 
                    src={s.icon as string} 
                    alt={s.label} 
                    className="w-4 h-4 object-contain opacity-30 group-hover:opacity-100 transition-opacity duration-300" 
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: back to top + availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-end gap-8 md:gap-32"
          >
            {/* Availability badge */}
            <div
              className="flex items-center gap-2.5"
              style={{
                padding: "10px 20px", borderRadius: 30,
                border: "1px solid rgba(34,197,94,0.15)",
                background: "rgba(34,197,94,0.04)",
              }}
            >
              <span
                className="rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"
                style={{ width: 7, height: 7, background: "#22c55e", display: "inline-block" }}
              />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Available for freelance
              </span>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex flex-col items-center gap-3 group"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <motion.div
                whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.3)" }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center transition-all duration-500"
                style={{
                  width: 48, height: 48, borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                <ArrowUp size={18} className="group-hover:text-white transition-colors" />
              </motion.div>
              <span
                style={{
                  fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)", fontWeight: 800,
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
        className="relative z-10"
        style={{ margin: "64px clamp(20px, 12%, 200px) 0", paddingTop: 28, paddingBottom: 28, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}
      >
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", fontWeight: 500 }}>
          © 2026 Nikhil. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
           <p style={{ fontSize: 11, color: "rgba(255,255,255,0.1)", fontWeight: 500 }}>
             Designed & built with ❤️ by Nikhil
           </p>
        </div>
      </div>
    </footer>
  );
}
