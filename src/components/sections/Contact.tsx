"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Mail } from "lucide-react";
import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";

const primaryEase = [0.85, 0, 0.15, 1] as any;

export default function Contact({ settings }: { settings?: any }) {
  const dynamicInfo = [
    {
      label: "Email",
      value: settings?.email || "nikhilrawat.dev@gmail.com",
      href: `mailto:${settings?.email || "nikhilrawat.dev@gmail.com"}`,
      icon: <Mail size={15} />,
    },
    {
      label: "Location",
      value: settings?.location || "Remote · Available Worldwide",
      href: null,
      icon: <MapPin size={15} />,
    },
  ];

  const dynamicSocials = [
    { label: "LinkedIn", href: settings?.socialLinks?.linkedin || "#", icon: "https://img.icons8.com/ios-glyphs/60/ffffff/linkedin.png" },
    { label: "GitHub", href: settings?.socialLinks?.github || "#", icon: "https://img.icons8.com/ios-glyphs/60/ffffff/github.png" },
    { label: "YouTube", href: settings?.socialLinks?.youtube || "#", icon: "https://img.icons8.com/ios-glyphs/60/ffffff/youtube-play.png" },
    { label: "Instagram", href: settings?.socialLinks?.instagram || "#", icon: "https://img.icons8.com/ios-glyphs/60/ffffff/instagram-new.png" },
  ];
  
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    setIsSubmitting(false);
    if (result.success) {
      setStatus({ success: true, message: "Message sent successfully!" });
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus({ success: false, message: result.error || "Failed to send message." });
    }
  };

  const getInputStyle = (fieldId: string): React.CSSProperties => ({
    width: "100%",
    background: "transparent",
    outline: "none",
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    padding: "12px 0",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: focused === fieldId ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.10)",
    transition: "border-color 0.3s",
    fontFamily: "inherit",
    resize: "none" as const,
  });


  return (
    <section
      id="contact"
      className="bg-[#050505] relative overflow-hidden"
      style={{ padding: "8rem 0 6rem" }}
    >
      {/* ── Dynamic Animated Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-red-600/30 blur-[140px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1.3, 1, 1.3],
            opacity: [0.05, 0.1, 0.05],
            x: [0, -30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-zinc-600/10 blur-[120px] rounded-full"
        />
        <div className="absolute inset-0 bg-noise opacity-5" />
      </div>

      <div style={{ paddingLeft: 120, paddingRight: 80 }} className="relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: primaryEase }}
          viewport={{ once: true }}
          style={{ marginBottom: 56 }}
        >
          <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
            <div className="w-7 h-px bg-red-500" />
            <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-red-500/80">
              Get In Touch
            </span>
          </div>
          <h2
            className="font-black tracking-tight text-white"
            style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)", lineHeight: 0.95 }}
          >
            Let&apos;s Build
            <br />
            <span className="text-white/20">Something Great.</span>
          </h2>
        </motion.div>

        {/* ── Rule ── */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 64 }} />

        {/* ── Two-column layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* LEFT: info + socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: primaryEase }}
            viewport={{ once: true }}
          >
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.8,
                maxWidth: 400,
                marginBottom: 48,
              }}
            >
              Whether you have a project in mind, want to collaborate, or just
              want to say hello — my inbox is always open.
            </p>

            {/* Info items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 56 }}>
              {dynamicInfo.map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-5 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:bg-white group-hover:text-black"
                    style={{
                      width: 44, height: 44, borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.03)",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 4, fontWeight: 800 }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.8)", textDecoration: "none" }}
                        className="hover:text-white transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: 14 }}>
              {dynamicSocials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  title={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(255,255,255,0.2)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 15,
                    delay: i * 0.05 
                  }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center group"
                  style={{
                    width: 52, height: 52, borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    textDecoration: "none",
                  }}
                >
                  <img 
                    src={s.icon as string} 
                    alt={s.label} 
                    className="w-6 h-6 object-contain opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" 
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: primaryEase }}
            viewport={{ once: true }}
            style={{
              padding: "48px 52px",
              borderRadius: 32,
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(12px)",
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {/* Name */}
              <div className="group">
                <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", display: "block", marginBottom: 10, fontWeight: 800 }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your full name"
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  style={getInputStyle("name")}
                />
              </div>

              {/* Email */}
              <div className="group">
                <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", display: "block", marginBottom: 10, fontWeight: 800 }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={getInputStyle("email")}
                />
              </div>

              {/* Message */}
              <div className="group">
                <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", display: "block", marginBottom: 10, fontWeight: 800 }}>
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project…"
                  onFocus={() => setFocused("msg")}
                  onBlur={() => setFocused(null)}
                  style={getInputStyle("msg")}
                />
              </div>

              {/* Status Message */}
              {status && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontSize: 12,
                    color: status.success ? "#4ade80" : "#f87171",
                    marginTop: -10,
                    fontWeight: 800,
                    textAlign: "center"
                  }}>
                  {status.message}
                </motion.p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { 
                  scale: 1.02,
                  backgroundColor: "#fff",
                  boxShadow: "0 20px 40px -10px rgba(255,255,255,0.2)"
                } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="flex items-center justify-center gap-3 font-black w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500"
                style={{
                  height: 60,
                  borderRadius: 16,
                  background: "#eee",
                  color: "#000",
                  fontSize: 14,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  border: "none",
                  fontFamily: "inherit",
                }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
