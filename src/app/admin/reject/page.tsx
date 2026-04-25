"use client";

import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminReject() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-8 bg-[#f8fafc] font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl flex flex-col items-center gap-8 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />

        <div className="w-20 h-20 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
          <ShieldAlert size={36} className="text-red-500" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-black">Access Denied</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
            Your request to enter the administrative cluster has been rejected by the administrator.
          </p>
        </div>

        <Link 
          href="/admin"
          className="w-full mt-4 bg-black text-white text-[11px] font-black uppercase tracking-[0.15em] rounded-xl py-4 flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-md"
        >
          <ArrowLeft size={16} />
          Return to Portal
        </Link>
      </motion.div>
    </div>
  );
}
