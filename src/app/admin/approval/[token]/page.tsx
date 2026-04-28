"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Clock, BookOpen, MessageCircle, ArrowUpRight, TrendingUp, Activity, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

function useCountUp(target: number, duration = 1000) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!target) { setDisplay(0); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, duration]);
  return display;
}

function StatCard({ label, value, icon, href, index, loaded }: {
  label: string; value: number; icon: React.ReactNode; href: string; index: number; loaded: boolean;
}) {
  const count = useCountUp(loaded ? value : 0, 900 + index * 120);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={href} className="block group">
        <div className="relative bg-white rounded-2xl border border-zinc-100 flex flex-col hover:shadow-xl hover:-translate-y-0.5 transition-all duration-400 overflow-hidden" style={{ padding: 'clamp(24px, 4vw, 36px)' }}>
          {/* top row */}
          <div className="flex items-start justify-between mb-6">
            <motion.div whileHover={{ rotate: [-6, 6, 0], scale: 1.1 }} transition={{ duration: 0.35 }}
              className="w-12 h-12 rounded-xl bg-[#0D0D0D] text-white flex items-center justify-center shadow-md">
              {icon}
            </motion.div>
            <span className="flex items-center gap-1.5 text-[8px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 rounded-full">
              <Activity size={8} /> Live
            </span>
          </div>
          {/* value */}
          <div className="mb-6">
            <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.5em] mb-4">{label}</p>
            {!loaded
              ? <div className="h-10 w-16 bg-zinc-100 rounded-lg animate-pulse" />
              : <p className="text-5xl font-black text-[#0D0D0D] tracking-tighter tabular-nums leading-none">{count}</p>}
          </div>
          {/* footer */}
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300 group-hover:text-[#0D0D0D] transition-colors duration-300 pt-4 border-t border-zinc-100 mt-auto">
            <span className="tracking-[0.2em]">Open Module</span>
            <ArrowUpRight size={10} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const params = useParams();
  const token = params?.token as string;
  const [data, setData] = useState({ projects: 0, experience: 0, blogs: 0, messages: 0, testimonials: 0 });
  const [loaded, setLoaded] = useState(false);

  if (!token) return null;

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(r => r.json())
      .then(j => {
        const s = j.stats ?? j;
        setData({ 
          projects: s.projects ?? 0, 
          experience: s.experience ?? 0, 
          blogs: s.blogs ?? 0, 
          messages: s.messages ?? 0,
          testimonials: s.testimonials ?? 0
        });
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const cards = [
    { label: "PROJECTS", value: data.projects, icon: <Briefcase size={18} />, href: `/admin/approval/${token}/projects` },
    { label: "EXPERIENCE", value: data.experience, icon: <Clock size={18} />, href: `/admin/approval/${token}/experience` },
    { label: "BLOG POSTS", value: data.blogs, icon: <BookOpen size={18} />, href: `/admin/approval/${token}/blogs` },
    { label: "TESTIMONIALS", value: (data as any).testimonials ?? 0, icon: <Star size={18} />, href: `/admin/approval/${token}/testimonials` },
    { label: "MESSAGES", value: data.messages, icon: <MessageCircle size={18} />, href: `/admin/approval/${token}/messages` },
  ];

  return (
    <div className="space-y-16 pb-20">

      {/* Section label */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] sm:text-[10px] font-black text-zinc-300 uppercase tracking-[0.4em] sm:tracking-[0.6em] mb-2 sm:mb-3">System Overview</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0D0D0D] tracking-tight uppercase italic">Dashboard Metrics</h2>
        </div>
        <span className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] bg-zinc-50 border border-zinc-100 px-4 py-2 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Data
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((c, i) => <StatCard key={c.label} {...c} index={i} loaded={loaded} />)}
      </div>

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-[#0D0D0D] rounded-2xl overflow-hidden shadow-2xl" 
        style={{ padding: 'clamp(32px, 6vw, 56px)', marginTop: 'clamp(32px, 6vw, 48px)' }}
      >
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none">
          <p className="text-[11vw] font-black text-white/[0.03] uppercase italic tracking-tighter leading-none pr-8">ADMIN</p>
        </div>
        <motion.div
          animate={{ x: [0, 50, 0], opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-[80px] pointer-events-none"
        />
        <div className="relative z-10" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
            />
            <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Node Live // Protocol Alpha</span>
          </div>
          <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'white', textTransform: 'uppercase', fontStyle: 'italic', lineHeight: 1 }}>
            Central<br />Administration
          </h3>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, letterSpacing: '0.08em', textTransform: 'uppercase', maxWidth: '520px' }}>
            Authenticated within the high-security portfolio management cluster. Synchronize projects,
            manage global messaging, and refine your identity. Secured via 30-min handshake protocol.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
