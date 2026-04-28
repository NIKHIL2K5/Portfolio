"use client";

import { motion } from "framer-motion";
import { Clock, Send, ShieldAlert, KeyRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SessionExpired() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 relative font-sans">
      {/* Refined Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg w-full relative z-10 flex flex-col mx-auto items-center"
      >
        <div className="bg-[#0a0a0a] w-full p-12 md:p-16 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col items-center gap-10 shrink-0">
          {/* Subtle Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-8 w-full">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 shrink-0 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-inner"
            >
              <Clock size={28} className="text-red-500" />
            </motion.div>

            <div className="flex flex-col gap-2 items-center w-full">
              <h1 className="text-3xl md:text-[2rem] font-black tracking-tightest uppercase leading-none text-center">
                Session<span className="text-white/20">Expired</span>
              </h1>
              <p className="text-xs text-white/40 leading-relaxed font-medium mt-1 w-full max-w-[280px] mx-auto text-center">
                Security protocol dictates a 30-minute limit. Your authorized window has closed.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-[320px] mx-auto items-center">
             <Link 
               href="/admin/request"
               className="w-full h-[3.5rem] bg-white text-black text-[11px] font-black uppercase tracking-[0.15em] rounded-xl flex items-center justify-center gap-3 hover:bg-white/90 active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group relative overflow-hidden"
             >
                <div className="absolute inset-0 w-full h-full bg-black/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl" />
                <span className="relative z-10">Request New Link</span>
                <Send size={16} className="group-hover:translate-x-1 transition-transform relative z-10" />
             </Link>
          </div>
        </div>

        {/* Bottom label */}
        <div className="mt-8 shrink-0 flex items-center justify-center relative">
          <p className="text-center text-white/10 text-[9px] font-black uppercase tracking-[0.4em]">
            Auth Checkpoint // V4.0
          </p>
        </div>
      </motion.div>
    </div>
  );
}
