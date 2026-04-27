"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const primaryEase = [0.85, 0, 0.15, 1] as any;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setLoading(false);
      });
  }, []);

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* ── Background Polish ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-[-10%] w-[1000px] h-[1000px] bg-cyan-600/[0.02] blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />
        
        {/* Decorative Circular Path Glow (Right) */}
        <div className="absolute right-[-20%] top-0 bottom-0 w-[800px] border-l border-white/[0.03] rounded-full z-0 pointer-events-none" 
             style={{ maskImage: 'linear-gradient(to bottom, transparent, black 50%, transparent)' }} />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10 py-20 md:py-40">
        
        {/* Navigation */}
        <nav className="mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/"
              className="group flex items-center gap-6 text-white/30 hover:text-white transition-all duration-500 no-underline"
            >
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition-all duration-500">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              <div>
                <p className="text-[12px] font-black uppercase tracking-[0.5em] leading-none mb-1 text-white">Index</p>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none">Home</p>
              </div>
            </Link>
          </motion.div>
        </nav>

        {/* Heading */}
        <header className="mb-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-14">
              <div className="w-12 h-[2px] bg-cyan-500" />
              <span className="text-cyan-400 text-[11px] font-black tracking-[0.8em] uppercase">The Archive</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-[11rem] font-black tracking-tighter mb-10 md:mb-16 leading-[0.9] md:leading-[0.8] break-words">
              Writings<br />
              <span className="text-white/10">Vol. 01</span>
            </h1>
            
            <div className="max-w-2xl">
              <p className="text-white/40 text-2xl font-medium leading-relaxed mb-20">
                A repository of technical research, architectural thoughts, and creative philosophy. Exploring the frontiers of digital engineering.
              </p>
            </div>

            {/* Overall Meta Row */}
            <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.4em] text-white/20 pb-16 border-b border-white/5">
               <span className="text-cyan-400">Technical</span>
               <span className="opacity-40">|</span>
               <span>1 Min Read</span>
               <span className="opacity-40">|</span>
               <span>Apr 26, 2026</span>
            </div>
          </motion.div>
        </header>

        {/* Blogs List */}
        <div className="space-y-48">
          {loading ? (
            <div className="space-y-12">
               {[...Array(2)].map((_, i) => (
                 <div key={i} className="animate-pulse space-y-6">
                    <div className="h-10 w-1/3 bg-white/5 rounded" />
                    <div className="h-6 w-full bg-white/5 rounded" />
                 </div>
               ))}
            </div>
          ) : (
            blogs.map((blog, i) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group py-12"
              >
                <Link href={`/blog/${blog._id}`} className="block no-underline">
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white hover:text-cyan-400 transition-colors duration-500">
                    {blog.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-white/30 font-medium italic">
                    {blog.excerpt || blog.content.substring(0, 150).trim() + "..."}
                  </p>
                </Link>
              </motion.article>
            ))
          )}
        </div>

        {/* Footer info */}
        <footer className="mt-64 pt-16 border-t border-white/5 flex justify-between items-center text-[11px] font-black uppercase tracking-[0.4em] text-white/20">
           <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_15px_cyan]" />
              <span>Archive Terminal Vol. 01</span>
           </div>
           <div className="hidden md:block">
             All Rights Reserved // 2026
           </div>
        </footer>
      </div>
    </main>
  );
}
