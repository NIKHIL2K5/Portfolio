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
    { label: "LinkedIn", href: settings?.socialLinks?.linkedin || "#", icon: "linkedin" },
    { label: "GitHub", href: settings?.socialLinks?.github || "#", icon: "github" },
    { label: "Twitter", href: settings?.socialLinks?.twitter || "#", icon: "twitter" },
    { label: "Instagram", href: settings?.socialLinks?.instagram || "#", icon: "instagram" },
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
      style={{ padding: "6rem 0 5rem" }}
    >
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-red-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div style={{ paddingLeft: 120, paddingRight: 80 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
            className="font-black tracking-tight"
            style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1 }}
          >
            Let&apos;s Build
            <br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>Something Great.</span>
          </h2>
        </motion.div>

        {/* ── Rule ── */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 52 }} />

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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: primaryEase }}
            viewport={{ once: true }}
          >
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.8,
                maxWidth: 380,
                marginBottom: 40,
              }}
            >
              Whether you have a project in mind, want to collaborate, or just
              want to say hello — my inbox is always open.
            </p>

            {/* Info items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 44 }}>
              {dynamicInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.03)",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 3 }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.75)", textDecoration: "none" }}
                        className="hover:text-white transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: 10 }}>
              {dynamicSocials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  title={s.label}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center font-bold text-[10px]"
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                    transition: "color 0.3s, border-color 0.3s, background 0.3s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  {s.label[0]}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: primaryEase }}
            viewport={{ once: true }}
            style={{
              padding: "36px 40px",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {/* Name */}
              <div>
                <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: 8 }}>
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
              <div>
                <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: 8 }}>
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
              <div>
                <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: 8 }}>
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
                <p style={{
                  fontSize: 12,
                  color: status.success ? "#4ade80" : "#f87171",
                  marginTop: -10,
                  fontWeight: 600
                }}>
                  {status.message}
                </p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="flex items-center justify-center gap-2 font-bold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  height: 50,
                  borderRadius: 12,
                  background: "#fff",
                  color: "#000",
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  border: "none",
                  fontFamily: "inherit",
                  marginTop: 4,
                }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={14} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
