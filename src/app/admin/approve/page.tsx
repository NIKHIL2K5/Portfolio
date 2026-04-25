"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ShieldCheck } from "lucide-react";

function ApproveContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      router.push("/admin");
      return;
    }

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [router, searchParams]);

  useEffect(() => {
    if (progress >= 100) {
      const token = searchParams.get("token");
      if (token) {
        router.push(`/admin/approval/${token}`);
      }
    }
  }, [progress, router, searchParams]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-8 bg-[#f8fafc] font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl flex flex-col items-center gap-8 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
          <div 
            className="h-full bg-green-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-20 h-20 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
          <ShieldCheck size={36} className="text-green-500" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-black">Verifying Identity</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
            Establishing secure connection to the administrative cluster. Please wait.
          </p>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mt-4">
          <Loader2 size={14} className="animate-spin" />
          <span>Handshake Protocol V4.0</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminApprove() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8fafc]"><Loader2 className="animate-spin text-slate-300" /></div>}>
      <ApproveContent />
    </Suspense>
  );
}
