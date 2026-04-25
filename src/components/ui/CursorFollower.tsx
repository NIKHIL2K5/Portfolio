"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorFollower() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring for lag effect
  const sprX = useSpring(cursorX, { damping: 30, stiffness: 250, mass: 0.5 });
  const sprY = useSpring(cursorY, { damping: 30, stiffness: 250, mass: 0.5 });

  useEffect(() => {
    setMounted(true);
    const moveMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .group')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full z-[9999] pointer-events-none mix-blend-difference blur-[1px]"
        style={{ 
          x: sprX, 
          y: sprY, 
          translateX: "-50%", 
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          backgroundColor: "white"
        }}
        animate={{ 
          scale: isHovered ? 4 : 1,
          boxShadow: isHovered ? "0 0 20px rgba(255,255,255,0.5)" : "none"
        }}
        transition={{ duration: 0.3, ease: [0.85, 0, 0.15, 1] }}
      >
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
             <span className="text-[4px] font-black text-black uppercase tracking-tighter">VIEW</span>
          </motion.div>
        )}
      </motion.div>
      
      {/* Outer subtle ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full z-[9998] pointer-events-none mix-blend-difference"
        style={{ 
          x: sprX, 
          y: sprY, 
          translateX: "-50%", 
          translateY: "-50%",
          opacity: isVisible ? 0.3 : 0
        }}
        animate={{ 
          scale: isHovered ? 1.5 : 1,
        }}
      />
    </>
  );
}
