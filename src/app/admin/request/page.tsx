"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldAlert, ArrowRight, Loader2, KeyRound, Clock } from "lucide-react";

export default function RequestAccess() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/admin/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("Will review your access request soon. You will get an email after the review.");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection failed. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col items-center justify-center p-16 md:p-8 relative font-sans">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg w-full relative z-10 flex flex-col mx-auto items-center"
      >
        <div className="bg-white w-full p-12 md:p-16 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden flex flex-col items-center gap-10 shrink-0">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <div className="flex flex-col items-center text-center gap-8 pt-10 w-full">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner"
            >
              <KeyRound size={28} className="text-slate-400" />
            </motion.div>

            <div className="flex flex-col gap-2 items-center w-full">
              <h1 className="text-3xl md:text-[2rem] font-black tracking-tighter uppercase leading-none text-center text-black">
                Access<span className="text-slate-300"> Portal</span>
              </h1>
              <p className="text-[9px] md:text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1 text-center">
                Identity Verification
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-6 py-4 w-full"
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center">
                  <ShieldCheck className="text-green-500" size={28} />
                </div>
                <div className="flex flex-col gap-2 items-center w-full">
                  <p className="text-sm font-black uppercase tracking-wider text-green-500 text-center">Request Dispatched</p>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1 w-full max-w-[280px] mx-auto text-center">{message}</p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 w-full max-w-[320px] mx-auto items-center"
              >
                <div className="flex flex-col gap-3 w-full">
                  <div className="relative w-full">
                     <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter authorized email"
                      className="w-full h-[3.5rem] text-center bg-slate-50 border border-slate-100 rounded-xl px-5 text-sm font-bold text-black placeholder:text-slate-400 focus:outline-none focus:border-slate-300 focus:bg-white transition-all duration-300"
                    />
                  </div>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-3 text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-xs font-bold mt-1">
                          <ShieldAlert size={14} className="flex-shrink-0" />
                          <span>{message}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-[3.5rem] bg-black text-white text-[11px] font-black uppercase tracking-[0.15em] rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 shadow-md group relative overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl" />
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin relative z-10" />
                      <span className="relative z-10">Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Request Access Link</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform relative z-10" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 pt-2 text-slate-400">
                  <Clock size={12} className="shrink-0" />
                  <p className="text-center text-[9px] uppercase font-black tracking-wider">
                    Session expiry: 30 minutes
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 shrink-0 flex items-center justify-center relative">
          <p className="text-center text-slate-400 text-[9px] font-black uppercase tracking-[0.4em]">
            Secure Handshake Protocol // V4.0
          </p>
        </div>
      </motion.div>
    </div>
  );
}
