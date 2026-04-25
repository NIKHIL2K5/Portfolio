"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldX, Home, Command } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  const themes = {
    approved: {
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      glow: "shadow-[0_0_50px_rgba(16,185,129,0.15)]",
      gradient: "from-emerald-500/20 via-transparent to-transparent",
      icon: <ShieldCheck size={32} className="text-emerald-500" />,
      title: "Protocol Approved",
      subtitle: "Access Granted",
    },
    rejected: {
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      glow: "shadow-[0_0_50px_rgba(244,63,94,0.15)]",
      gradient: "from-rose-500/20 via-transparent to-transparent",
      icon: <ShieldX size={32} className="text-rose-500" />,
      title: "Protocol Denied",
      subtitle: "Access Terminated",
    },
    error: {
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      glow: "shadow-[0_0_50px_rgba(245,158,11,0.15)]",
      gradient: "from-amber-500/20 via-transparent to-transparent",
      icon: <Command size={32} className="text-amber-500" />,
      title: "Protocol Error",
      subtitle: "Action Failed",
    }
  };

  const currentTheme = themes[status as keyof typeof themes] || themes.error;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#050505] font-sans">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-b ${currentTheme.gradient} opacity-40`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full relative z-10"
      >
        <div className={`bg-[#0a0a0a]/80 backdrop-blur-xl w-full p-10 md:p-14 rounded-[3rem] border ${currentTheme.border} ${currentTheme.glow} relative overflow-hidden flex flex-col items-center gap-10`}>
          {/* Status Indicator */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`w-20 h-20 rounded-3xl ${currentTheme.bg} border ${currentTheme.border} flex items-center justify-center relative group`}
          >
            <div className={`absolute inset-0 rounded-3xl ${currentTheme.bg} blur-xl group-hover:blur-2xl transition-all duration-500`} />
            <div className="relative z-10">{currentTheme.icon}</div>
          </motion.div>

          <div className="flex flex-col items-center text-center gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
                {currentTheme.title.split(' ')[0]}
                <span className="text-white/20 not-italic ml-1">{currentTheme.title.split(' ')[1]}</span>
              </h1>
              <p className={`text-xs font-bold uppercase tracking-[0.4em] ${currentTheme.color} mt-2`}>
                {currentTheme.subtitle}
              </p>
            </div>
            
            <div className="h-px w-12 bg-white/10" />

            <p className="text-sm text-white/50 leading-relaxed font-medium max-w-[280px] italic">
              {message || "The requested security protocol has been processed and applied to the central registry."}
            </p>
          </div>

          <div className="w-full space-y-4">
            <Link 
              href="/"
              className="w-full h-16 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:bg-white/90 active:scale-[0.98] transition-all duration-300 group shadow-lg shadow-white/5"
            >
              <span>Return to Nexus</span>
              <Home size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            
            <p className="text-center text-white/10 text-[9px] font-black uppercase tracking-[0.5em] pt-4">
              Authorized // Layer 4 // Cluster
            </p>
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-12 opacity-10 hidden md:block">
        <div className="text-[10px] font-mono text-white leading-tight">
          SECURE_HANDSHAKE: OK<br />
          PROTOCOL_AUTH: {status?.toUpperCase()}<br />
          TIMESTAMP: {new Date().toISOString()}
        </div>
      </div>
    </div>
  );
}

export default function VerifyStatus() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Command className="animate-spin text-white/20" size={32} />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}

