"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const primaryEase = [0.85, 0, 0.15, 1] as any;

// Card dimensions — must match CSS below
const CARD_W = 440;   // px  (md width)
const CARD_GAP = 32;  // px  (gap-8)
const PAD_LEFT = 120; // px  (paddingLeft of the row)

interface Project {
  title: string;
  category: string;
  description: string;
  accent: string;
  gradient: string;
  year: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Bykahomes",
    category: "Web Design / Presentation",
    description: "Premium property showcase platform with immersive UI and seamless property browsing.",
    accent: "#a78bfa",
    gradient: "from-violet-900/40 via-purple-900/20 to-transparent",
    year: "2024",
    tags: ["Next.js", "Tailwind", "Framer"],
  },
  {
    title: "Noje",
    category: "Web Design / Presentation",
    description: "Creative agency portfolio crafted with fluid animations and bold typography.",
    accent: "#f472b6",
    gradient: "from-pink-900/40 via-rose-900/20 to-transparent",
    year: "2024",
    tags: ["React", "GSAP", "Three.js"],
  },
  {
    title: "Champsprès",
    category: "Web Design / Presentation",
    description: "Investment management portal with clean data visualization and secure dashboards.",
    accent: "#6ee7b7",
    gradient: "from-emerald-900/40 via-teal-900/20 to-transparent",
    year: "2023",
    tags: ["Next.js", "TypeScript", "Chart.js"],
  },
  {
    title: "Zequo",
    category: "Brand Identity / Logo",
    description: "Modern brand identity system including logo, typography, and visual guidelines.",
    accent: "#fbbf24",
    gradient: "from-amber-900/40 via-yellow-900/20 to-transparent",
    year: "2023",
    tags: ["Figma", "Illustrator", "Branding"],
  },
];

// No module-level SLIDE_TOTAL here to avoid confusion

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="relative flex-shrink-0 group cursor-pointer"
      style={{ width: CARD_W, height: 540 }}
    >
      <div className="absolute inset-0 rounded-[28px] overflow-hidden border border-white/[0.07] group-hover:border-white/20 transition-all duration-700 bg-[#0d0d0d]">

        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-70 group-hover:opacity-100 transition-opacity duration-700`} />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-35 transition-opacity duration-700"
          style={{ background: project.accent }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[28px]"
          style={{ background: `linear-gradient(to right, transparent, ${project.accent}60, transparent)` }} />
        <div className="absolute top-6 right-6 text-[90px] font-black leading-none select-none pointer-events-none"
          style={{ color: `${project.accent}07` }}>
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-10">
          <div className="flex items-start justify-between gap-4">
            <span className="text-[10px] font-bold tracking-[0.35em] text-white/20 uppercase shrink-0">{project.year}</span>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border"
                  style={{ borderColor: `${project.accent}30`, color: project.accent, background: `${project.accent}10` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-semibold mb-3">{project.category}</p>
            <h3 className="text-4xl font-black tracking-tight leading-tight mb-4 group-hover:translate-x-1 transition-transform duration-500">
              {project.title}
            </h3>
            <p className="text-white/30 text-[13px] leading-relaxed group-hover:text-white/55 transition-colors duration-500 max-w-[88%]">
              {project.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="h-px w-8" style={{ background: `${project.accent}40` }} />
            <motion.div whileHover={{ rotate: 45, scale: 1.1 }} transition={{ duration: 0.3 }}
              className="w-11 h-11 rounded-full border flex items-center justify-center"
              style={{ borderColor: `${project.accent}30` }}>
              <ArrowUpRight size={18} style={{ color: project.accent }} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects: dynamicProjects }: { projects?: any[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  
  const displayProjects = (dynamicProjects && dynamicProjects.length > 0) ? dynamicProjects.map(p => ({
    title: p.name,
    category: "Full Stack",
    description: p.description,
    accent: "#ffffff",
    gradient: "from-white/10 via-white/5 to-transparent",
    year: new Date(p.createdAt || Date.now()).getFullYear().toString(),
    tags: p.stack || [],
    imageUrl: p.imageUrl,
    liveUrl: p.liveUrl
  })) : [
    {
      title: "Bykahomes",
      category: "Web Design / Presentation",
      description: "Premium property showcase platform with immersive UI and seamless property browsing.",
      accent: "#a78bfa",
      gradient: "from-violet-900/40 via-purple-900/20 to-transparent",
      year: "2024",
      tags: ["Next.js", "Tailwind", "Framer"],
      imageUrl: "",
      liveUrl: "#"
    },
    // ... other static ones if needed
  ];

  const totalSlideWidth = (displayProjects.length - 1) * (CARD_W + CARD_GAP) + 260;

  // Track scroll progress across the full height of the outer container
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll 0→1 to pixel translation 0 → -totalSlideWidth
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -totalSlideWidth]);

  // Spring for buttery smooth motion
  const x = useSpring(rawX, { stiffness: 70, damping: 22, mass: 0.5 });

  return (
    <div ref={outerRef} id="projects" className="relative bg-[#050505]">
      
      {/* ─── MOBILE VIEW (Vertical Stack) ─── */}
      <div className="block lg:hidden py-16 flex flex-col gap-10" style={{ padding: "clamp(48px, 8vw, 96px) clamp(16px, 5vw, 40px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-white/25 text-[10px] tracking-[0.45em] uppercase font-bold mb-3">Portfolio</p>
          <h2 className="text-[clamp(2rem,10vw,3.5rem)] font-black tracking-tighter leading-[0.9]">
            My best <span className="text-white/20">projects</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8">
          {displayProjects.map((p, i) => (
            <a
              key={i}
              href={p.liveUrl || "#"}
              target={p.liveUrl && p.liveUrl !== "#" ? "_blank" : undefined}
              rel={p.liveUrl && p.liveUrl !== "#" ? "noopener noreferrer" : undefined}
              className="relative group cursor-pointer block w-full rounded-[24px] overflow-hidden border border-white/[0.07] bg-[#0d0d0d]"
            >
              <div className="relative aspect-[4/3] sm:aspect-square w-full">
                {p.imageUrl ? (
                  <>
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                  </>
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-70`} />
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[60px] opacity-20" style={{ background: p.accent }} />
                  </>
                )}
                
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(to right, transparent, ${p.accent}60, transparent)` }} />
                
                <div className="absolute top-6 right-6 flex justify-end items-start z-10">
                   <div className="text-[48px] font-black leading-none select-none drop-shadow-lg" style={{ color: `rgba(255,255,255,0.15)` }}>
                     {String(i + 1).padStart(2, "0")}
                   </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                   <div className="rounded-[20px] bg-[#0d0d0d]/90 backdrop-blur-3xl border border-white/[0.08] flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden p-6">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold mb-2">
                          {p.year} • {p.category}
                        </p>
                        <h3 className="text-[22px] font-bold tracking-tight leading-[1.2] mb-2 text-white">
                          {p.title}
                        </h3>
                        <p className="text-white/50 text-[14px] leading-[1.5] line-clamp-2 font-medium">
                          {p.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/[0.06] mt-4 pt-4">
                        <div className="flex flex-wrap gap-2">
                          {p.tags.slice(0, 2).map((tag: string) => (
                            <span key={tag} className="text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-white/70">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.15] flex items-center justify-center shrink-0">
                          <ArrowUpRight size={16} className="text-white/80" />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </a>
          ))}

          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <h4 className="text-xl font-black text-white/20 leading-tight tracking-tight text-center">
              More alchemy<br />coming soon…
            </h4>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP VIEW (Horizontal Slider) ─── */}
      <div 
        className="hidden lg:block relative"
        style={{ height: `calc(100vh + ${totalSlideWidth}px)` }}
      >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center gap-8 md:gap-16 bg-[#050505]">

        {/* Header */}
        <div className="shrink-0 lg:pl-[12%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-white/25 text-[10px] tracking-[0.45em] uppercase font-bold mb-3">Portfolio</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
              My best <span className="text-white/20">projects</span>
            </h2>
          </motion.div>
        </div>

        {/* Sliding row */}
        <div className="overflow-hidden pb-12">
          <motion.div
            style={{ x }}
            className="flex items-center will-change-transform"
          >
            {/* Left padding spacer so first card aligns with header */}
            <div style={{ minWidth: PAD_LEFT, flexShrink: 0 }} />

            {displayProjects.map((p, i) => (
              <div key={i} style={{ marginRight: i < displayProjects.length - 1 ? CARD_GAP : 0 }}>
                 <a
                  href={p.liveUrl || "#"}
                  target={p.liveUrl && p.liveUrl !== "#" ? "_blank" : undefined}
                  rel={p.liveUrl && p.liveUrl !== "#" ? "noopener noreferrer" : undefined}
                  className="relative flex-shrink-0 group cursor-pointer block"
                  style={{ width: CARD_W, height: 540 }}
                >
                  <div className="absolute inset-0 rounded-[28px] overflow-hidden border border-white/[0.07] group-hover:border-white/20 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-700 bg-[#0d0d0d]">
                    {p.imageUrl ? (
                      <div className="absolute inset-0">
                         <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-70 group-hover:opacity-100 transition-opacity duration-700`} />
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-35 transition-opacity duration-700"
                          style={{ background: p.accent }} />
                      </>
                    )}
                    
                    <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[28px]"
                      style={{ background: `linear-gradient(to right, transparent, ${p.accent}60, transparent)` }} />
                    
                    {/* Top Layer: Number */}
                    <div className="absolute top-8 right-8 flex justify-end items-start z-10">
                       <div className="text-[60px] font-black leading-none select-none pointer-events-none drop-shadow-2xl group-hover:scale-110 group-hover:-translate-y-1 group-hover:text-white/30 transition-all duration-700 origin-top-right"
                         style={{ color: `rgba(255,255,255,0.15)` }}>
                         {String(i + 1).padStart(2, "0")}
                       </div>
                    </div>

                    {/* Bottom Floating Content Card */}
                    <div className="absolute bottom-5 left-5 right-5 z-10">
                       <div 
                         className="rounded-[24px] bg-[#0d0d0d]/80 backdrop-blur-3xl border border-white/[0.08] flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden group-hover:bg-[#111111]/90 group-hover:border-white/20 transition-all duration-500"
                         style={{ padding: '32px' }}
                       >
                          <div className="group-hover:-translate-y-1 transition-transform duration-500">
                            {/* Top-left label */}
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-[12px]">
                              {p.year} • {p.category}
                            </p>
                            
                            {/* Main Title */}
                            <h3 className="text-[26px] font-bold tracking-tight leading-[1.2] mb-[12px] text-white group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300">
                              {p.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-white/50 text-[15px] leading-[1.6] line-clamp-2 font-medium">
                              {p.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between border-t border-white/[0.06]" style={{ marginTop: '20px', paddingTop: '20px' }}>
                            <div className="flex flex-wrap gap-2 group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                              {p.tags.slice(0, 3).map((tag: string) => (
                                <span key={tag} className="text-[11px] font-semibold tracking-wider px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-white/70 shadow-sm group-hover:border-white/20 transition-colors duration-500">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <motion.div whileHover={{ rotate: 45, scale: 1.1 }} transition={{ duration: 0.3 }}
                              className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.15] flex items-center justify-center shrink-0 shadow-sm group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-500">
                              <ArrowUpRight size={18} className="text-white/80 group-hover:text-white" />
                            </motion.div>
                          </div>
                       </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}

            {/* End teaser */}
            <div className="flex-shrink-0 flex flex-col justify-center gap-4" style={{ width: 220, paddingLeft: CARD_GAP + 16 }}>
              <h4 className="text-2xl font-black text-white/10 leading-tight tracking-tight">
                More alchemy<br />coming soon…
              </h4>
              <div className="w-10 h-10 rounded-full border border-white/8 flex items-center justify-center">
                <ArrowUpRight size={16} className="text-white/15" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-8 left-0 right-0 h-px bg-white/[0.04]" style={{ left: PAD_LEFT, right: PAD_LEFT }}>
          <motion.div className="h-full bg-white/30 origin-left" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </div>
  </div>
);
}
