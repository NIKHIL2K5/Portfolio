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

/** Smooth-scroll to a section by id */
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

  const offset = 80; // navbar clearance
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
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // ── Hide on scroll-down, show on scroll-up ──────────────────────────────
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsVisible(!(latest > previous && latest > 150));
  });

  // ── IntersectionObserver: auto-highlight active section ──────────────────
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
        {
          // Trigger when the section occupies 30% of viewport height
          threshold: 0,
          rootMargin: "-40% 0px -40% 0px",
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Nav click handler ────────────────────────────────────────────────────
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: { name: string; href: string }) => {
      e.preventDefault();
      setActiveItem(item.name);
      scrollToSection(item.href.replace("#", ""));
    },
    []
  );

  // Hide Navbar completely on Admin routes
  // Move this AFTER all hook calls to comply with React "Rules of Hooks"
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/blog")) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
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
            padding: "20px 24px 0",
          }}
        >
          <div style={{ position: "relative" }}>
            {/* Pill navbar */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(14,14,14,0.95)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 9999,
                boxShadow: "0 4px 30px rgba(0,0,0,0.7)",
                padding: "8px 20px",
                gap: 0,
                whiteSpace: "nowrap",
              }}
            >
              {/* Logo */}
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); scrollToSection("home"); setActiveItem("Home"); }}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  textDecoration: "none",
                  marginRight: 32,
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#ffffff", fontSize: 18, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  Nikhil
                </span>
                <span style={{ color: "#ef4444", fontSize: 18, fontWeight: 800, lineHeight: 1 }}>.</span>
              </a>

              {/* Vertical divider */}
              <div style={{ width: 1, height: 16, backgroundColor: "rgba(255,255,255,0.1)", flexShrink: 0, marginRight: 20 }} />

              {/* Nav items */}
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
                        backgroundColor: "rgba(127,29,29,0.55)",
                        border: "1px solid rgba(185,28,28,0.3)",
                        borderRadius: 9999,
                        zIndex: 0,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </div>
              ))}

              {/* Divider before Admin */}
              <div style={{ width: 1, height: 16, backgroundColor: "rgba(255,255,255,0.1)", flexShrink: 0, marginLeft: 8, marginRight: 8 }} />

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
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
