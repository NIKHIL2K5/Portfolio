"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home",         href: "#home" },
  { name: "About",        href: "#about" },
  { name: "Projects",     href: "#projects" },
  { name: "Skills",       href: "#skills" },
  { name: "Experience",   href: "#experience" },
  { name: "Blog",         href: "#blog" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact",      href: "#contact" },
];

function scrollToSection(id: string) {
  const lenis = (window as any).lenisInstance;
  const isLenisFn = lenis && typeof lenis.scrollTo === "function";

  if (id === "home") {
    if (isLenisFn) lenis.scrollTo(0, { duration: 2.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const offset = 80;
  if (isLenisFn) {
    lenis.scrollTo(el, { offset: -offset, duration: 2.2 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsVisible(!(latest > previous && latest > 150));
  });

  useEffect(() => {
    const sectionIds = navItems.map((n) => n.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const matched = navItems.find((n) => n.href === `#${id}`);
            if (matched) setActiveItem(matched.name);
          }
        },
        { threshold: 0, rootMargin: "-40% 0px -40% 0px" }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: { name: string; href: string }) => {
      e.preventDefault();
      setActiveItem(item.name);
      scrollToSection(item.href.replace("#", ""));
      setIsMobileMenuOpen(false);
    },
    []
  );

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/blog")) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            key="navbar"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              display: "flex",
              justifyContent: "center",
              paddingTop: 20,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            {/* ── Desktop Pill Navbar (centered) ── */}
            <nav
              className="hidden lg:flex"
              style={{
                alignItems: "center",
                backgroundColor: "rgba(14,14,14,0.95)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 9999,
                boxShadow: "0 4px 30px rgba(0,0,0,0.7)",
                padding: "10px 28px",
                gap: 0,
                whiteSpace: "nowrap",
              }}
            >
              {/* Logo */}
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); scrollToSection("home"); setActiveItem("Home"); }}
                style={{ display: "flex", alignItems: "baseline", textDecoration: "none", marginRight: 24, flexShrink: 0 }}
              >
                <span style={{ color: "#fff", fontSize: 18, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>Nikhil</span>
                <span style={{ color: "#ef4444", fontSize: 18, fontWeight: 800, lineHeight: 1 }}>.</span>
              </a>

              {/* Divider */}
              <div style={{ width: 1, height: 16, backgroundColor: "rgba(255,255,255,0.1)", flexShrink: 0, marginRight: 20 }} />

              {/* Nav Items */}
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {navItems.map((item) => (
                  <div key={item.name} style={{ position: "relative", flexShrink: 0 }}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      style={{
                        position: "relative",
                        zIndex: 1,
                        display: "block",
                        padding: "6px 14px",
                        fontSize: 13,
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                        color: activeItem === item.name ? "#ffffff" : "rgba(161,161,170,1)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (activeItem !== item.name)
                          (e.currentTarget as HTMLElement).style.color = "#e4e4e7";
                      }}
                      onMouseLeave={(e) => {
                        if (activeItem !== item.name)
                          (e.currentTarget as HTMLElement).style.color = "rgba(161,161,170,1)";
                      }}
                    >
                      {item.name}
                    </a>

                    {activeItem === item.name && (
                      <motion.div
                        layoutId="nav-pill"
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: "rgba(127,29,29,0.5)",
                          border: "1px solid rgba(185,28,28,0.25)",
                          borderRadius: 9999,
                          zIndex: 0,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ width: 1, height: 16, backgroundColor: "rgba(255,255,255,0.1)", flexShrink: 0, marginLeft: 12, marginRight: 12 }} />

              {/* Admin Panel */}
              <Link
                href="/admin"
                style={{
                  display: "block",
                  padding: "6px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  color: "#ef4444",
                  textDecoration: "none",
                  flexShrink: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f87171")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#ef4444")}
              >
                Admin Panel
              </Link>
            </nav>

            {/* ── Mobile Top Bar ── */}
            <div
              className="flex lg:hidden"
              style={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(14,14,14,0.95)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 9999,
                padding: "10px 20px",
                boxShadow: "0 4px 30px rgba(0,0,0,0.7)",
              }}
            >
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                  setActiveItem("Home");
                  setIsMobileMenuOpen(false);
                }}
                style={{ display: "flex", alignItems: "baseline", textDecoration: "none", flexShrink: 0 }}
              >
                <span style={{ color: "#fff", fontSize: 18, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>Nikhil</span>
                <span style={{ color: "#ef4444", fontSize: 18, fontWeight: 800, lineHeight: 1 }}>.</span>
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#fff" }}
                aria-label="Toggle mobile menu"
              >
                <div style={{ width: 20, height: 16, position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <span className={`block h-[2px] w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                  <span className={`block h-[2px] w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                  <span className={`block h-[2px] w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                </div>
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ── Mobile Full Screen Menu Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 z-40 lg:hidden bg-[#050505]/98 backdrop-blur-3xl flex flex-col items-center justify-center pt-20 pb-10"
          >
            <div className="flex flex-col items-center gap-6 w-full px-8 overflow-y-auto">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-2xl font-bold tracking-tight transition-colors ${
                    activeItem === item.name ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navItems.length * 0.05, duration: 0.4 }}
                className="mt-4 pt-6 border-t border-white/10 w-full flex justify-center"
              >
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-bold text-red-500 hover:text-red-400 transition-colors"
                >
                  Admin Panel
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
