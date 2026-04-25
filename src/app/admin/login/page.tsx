"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ShieldCheck, ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("Verifying your access token...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No access token provided.");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          setStatus("success");
          setMessage("Access granted! Redirecting to dashboard...");
          setTimeout(() => {
            router.push("/admin");
          }, 1500);
        } else {
          const data = await res.json();
          setStatus("error");
          setMessage(data.error || "Invalid or expired token.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Verification failed. Please try again.");
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative font-sans">
      {/* Refined Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-[#0a0a0a] p-12 md:p-16 rounded-[2.5rem] border border-white/5 space-y-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="space-y-8 flex flex-col items-center text-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-inner"
            >
              {status === "verifying" && <Loader2 className="animate-spin text-white/40" size={28} />}
              {status === "success" && <ShieldCheck className="text-green-500" size={28} />}
              {status === "error" && <ShieldAlert className="text-red-500" size={28} />}
            </motion.div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tightest uppercase">
                Auth<span className="text-white/20">Check</span>
              </h1>
              <p className={`text-sm font-medium leading-relaxed max-w-[240px] ${status === 'error' ? 'text-red-400' : 'text-white/40'}`}>
                {message}
              </p>
            </div>
          </div>

          {status === "error" && (
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => router.push("/admin/request")}
              className="w-full h-14 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all border border-white/5"
            >
              Request New Link
            </motion.button>
          )}

          {status === "success" && (
            <div className="flex justify-center mt-4">
               <div className="flex gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <motion.div 
                      key={i}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-green-500"
                    />
                  ))}
               </div>
            </div>
          )}
        </div>
        
        <p className="mt-8 text-center text-white/10 text-[9px] font-black uppercase tracking-[0.4em]">
           Secure Handshake Protocol // V4.0
        </p>
      </motion.div>
    </div>
  );
}
