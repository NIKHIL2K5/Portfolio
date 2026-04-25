"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const words = ["DEVELOPER", "TECH ALCHEMIST", "AUTOMATIONS", "DESIGNER", "NIKHIL"];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    document.body.style.cursor = "none";

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setComplete(true);
            document.body.style.overflow = "auto";
            document.body.style.cursor = "auto";
          }, 1200); 
          return 100;
        }
        return prev + 1.0; // Slightly slower for better readability
      });
    }, 30);

    // Dynamic word index based on progress ranges
    let nextIndex = 0;
    if (progress < 25) nextIndex = 0;
    else if (progress < 40) nextIndex = 0;
    else if (progress < 55) nextIndex = 1;
    else if (progress < 70) nextIndex = 2;
    else if (progress < 85) nextIndex = 3;
    else nextIndex = 4;
    
    if (nextIndex !== currentWordIndex) {
      setCurrentWordIndex(nextIndex);
    }

    return () => clearInterval(timer);
  }, [progress, currentWordIndex]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {!complete && (
        <motion.div
          key="preloader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, delay: 1 } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Top Panel - The World Curtain */}
          <motion.div 
            initial={{ y: "0%" }}
            exit={{ y: "-100%", transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            className="absolute top-0 left-0 w-full h-[50.5%] bg-[#050505] z-50 border-b border-white/5"
          />
          {/* Bottom Panel */}
          <motion.div 
            initial={{ y: "0%" }}
            exit={{ y: "100%", transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            className="absolute bottom-0 left-0 w-full h-[50.5%] bg-[#050505] z-50 border-t border-white/5"
          />

          {/* Background Layer: Grain & Glows (Behind the Slit Panels if we want them to reveal) */}
          {/* Actually, let's keep glows behind the panels too for a 'deep' world reveal */}
          <div className="absolute inset-0 bg-[#050505] z-10" />
          <motion.div 
            animate={{ 
              x: [0, 40, -40, 0], 
              y: [0, -40, 40, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] blur-[150px] rounded-full" />
          </motion.div>
          <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none z-30" />

          {/* Core Content Layer - Above Panels (z-60) */}
          <motion.div 
            exit={{ opacity: 0, filter: "blur(20px)", scale: 0.95, transition: { duration: 0.6 } }}
            className="relative z-[60] flex flex-col items-center gap-16"
          >
            
            {/* Phase 1: Pulsing Heartbeat */}
            <AnimatePresence mode="wait">
              {progress < 25 && (
                <motion.div
                  key="heart-awakening"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
                  exit={{ scale: 3, opacity: 0, transition: { duration: 0.5 } }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-4 h-4 bg-white rounded-full shadow-[0_0_30px_white]"
                />
              )}
            </AnimatePresence>

            {/* Identity & Progress */}
            {progress >= 25 && (
              <div className="flex flex-col items-center">
                 <div className="h-32 md:h-48 flex items-center justify-center overflow-hidden mb-12">
                   <AnimatePresence mode="wait">
                     <motion.h1
                       key={currentWordIndex}
                       initial={{ y: "100%", opacity: 0, filter: "blur(40px)" }}
                       animate={{ 
                         y: 0, 
                         opacity: 1, 
                         filter: "blur(0px)",
                         scale: progress > 90 ? 1.05 : 1
                       }}
                       exit={{ y: "-100%", opacity: 0, filter: "blur(40px)" }}
                       transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                       className="text-7xl md:text-[10rem] font-bold tracking-tighter text-white whitespace-nowrap px-10"
                     >
                       {words[currentWordIndex]}
                     </motion.h1>
                   </AnimatePresence>
                 </div>

                 {/* Signature Progress System */}
                 <div className="relative flex flex-col items-center gap-8 w-full max-w-[300px]">
                    <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                       <motion.div 
                          initial={{ left: "-100%" }}
                          animate={{ left: `${progress - 100}%` }}
                          transition={{ ease: "linear" }}
                          className="absolute inset-0 bg-white"
                       />
                       {/* Pulse Energy */}
                       <motion.div 
                          animate={{ left: ["-100%", "200%"] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm"
                       />
                    </div>

                    <div className="flex justify-between w-full items-center">
                       <span className="text-[10px] font-bold text-white/30 tracking-[0.4em] uppercase">Tech Alchemist</span>
                       <span className="text-sm font-bold text-white tabular-nums tracking-widest">{Math.floor(progress)}%</span>
                    </div>
                 </div>
              </div>
            )}
          </motion.div>

          {/* Brand Signature */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/10 tracking-[0.6em] uppercase z-[60] flex items-center gap-4">
             <div className="w-8 h-[1px] bg-white/20" />
             NIKHIL &bull; 2026 
             <div className="w-8 h-[1px] bg-white/20" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
