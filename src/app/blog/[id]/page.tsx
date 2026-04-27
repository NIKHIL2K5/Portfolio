"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, MessageCircle, Shield } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";

const primaryEase = [0.85, 0, 0.15, 1] as any;

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        const found = data.blogs.find((b: any) => b._id === params.id);
        setBlog(found);
        setLoading(false);
      });
  }, [params.id]);

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center">
       <div className="w-10 h-10 border-2 border-white/10 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );

  if (!blog) return notFound();

  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* ── Background Polish ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-[-10%] w-[1000px] h-[1000px] bg-cyan-600/[0.02] blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-20 py-24 md:py-40">
          
          {/* Left Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-40 space-y-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link 
                  href="/blog"
                  className="group flex flex-col items-start gap-4 text-white/30 hover:text-white transition-all duration-500 no-underline"
                >
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition-all duration-500">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] leading-none mb-1 text-white">Archive</p>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none">Return</p>
                  </div>
                </Link>
              </motion.div>

              {/* Pulsing Dot with concentric rings */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                 <div className="absolute w-full h-full rounded-full border border-white/[0.02]" />
                 <div className="absolute w-2/3 h-2/3 rounded-full border border-white/[0.03]" />
                 <div className="absolute w-1/3 h-1/3 rounded-full border border-white/[0.05]" />
                 <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_15px_cyan] relative z-10" 
                 />
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <article>
            <header className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Mobile Back Button */}
                <Link href="/blog" className="lg:hidden flex items-center gap-4 text-white/40 hover:text-white mb-12 no-underline group">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 transition-all">
                    <ArrowLeft size={18} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Archive</span>
                </Link>
                <div className="flex items-center gap-4 mb-10">
                   <div className="h-[2px] w-10 bg-cyan-500" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">
                      {blog.tag || "Technical Content"}
                   </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[0.95] mb-12 md:mb-20 text-white">
                  {blog.title}
                </h1>

                <div className="flex items-center gap-10 py-8 border-y border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                      N
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white leading-none mb-1">Nikhil</p>
                      <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-none">Author</p>
                    </div>
                  </div>
                  
                  <div className="h-8 w-px bg-white/10" />

                  <div className="flex items-center gap-8 text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-3">
                      <Clock size={16} className="text-cyan-500" />
                      {getReadTime(blog.content)}
                    </span>
                    <span className="flex items-center gap-3">
                      <Calendar size={16} className="text-purple-500" />
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </header>

            {/* Excerpt with vertical bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-32 mt-20"
            >
              <div className="flex gap-10 items-start">
                 <div className="w-1.5 self-stretch bg-cyan-500 rounded-full" />
                 <p className="text-3xl md:text-4xl text-white/50 leading-relaxed font-black italic py-1">
                    {blog.excerpt || "An in-depth exploration of technical principles, creative workflows, and the evolving landscape of digital architecture."}
                 </p>
              </div>
            </motion.div>

            {/* Body Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="text-white/80 leading-[1.8] space-y-12 text-2xl font-medium">
                 {blog.content.split('\n').map((para: string, i: number) => {
                    if (!para.trim()) return null;
                    if (i === 0) {
                      return (
                        <p key={i} className="first-letter:text-8xl first-letter:font-black first-letter:text-white first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8] mb-12">
                          {para}
                        </p>
                      );
                    }
                    return <p key={i}>{para}</p>;
                 })}
              </div>
            </motion.div>

            {/* Actions Footer - Cohesive bordered block */}
            <footer className="mt-64">
               <div className="flex items-center h-16 rounded-2xl border border-white/5 overflow-hidden bg-white/[0.01]">
                  <button 
                    onClick={() => {}}
                    className="flex-1 h-full flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all border-r border-white/5 group"
                  >
                    <Share2 size={16} className="group-hover:scale-110 transition-transform" />
                    Share Article
                  </button>
                  
                  <Link href="/#contact" className="flex-1 h-full flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all border-r border-white/5 relative group no-underline">
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_cyan]" />
                    <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                    Leave a Thought
                  </Link>

                  <div className="flex-1 h-full flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/10 group cursor-default">
                    <Shield size={16} className="opacity-20" />
                    0xFF Protocol
                  </div>
               </div>
            </footer>
          </article>

          {/* Right Sidebar */}
          <aside className="hidden lg:block">
             <div className="sticky top-40 space-y-12">
                <div className="p-10 rounded-[32px] border border-white/5 bg-white/[0.01]">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-8">Related Tags</p>
                   <div className="flex flex-wrap gap-3 mb-8">
                      {["NextJS", "UI Design"].map(t => (
                        <span key={t} className="px-4 py-2 rounded-xl bg-transparent text-[10px] font-black uppercase tracking-widest text-white/80 border border-cyan-500/30">
                           {t}
                        </span>
                      ))}
                   </div>
                   <div className="flex flex-wrap gap-3 mb-10">
                      {["Architecture"].map(t => (
                        <span key={t} className="px-4 py-2 rounded-xl bg-transparent text-[10px] font-black uppercase tracking-widest text-white/80 border border-cyan-500/30">
                           {t}
                        </span>
                      ))}
                   </div>

                   <div className="h-px w-full bg-white/5 mb-8" />

                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-6 italic">Minimalism</p>
                   
                   <div className="h-px w-full bg-white/5 mb-8" />

                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-6 italic">Status</p>
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-green-500/80">Verified Transmission</span>
                   </div>
                </div>
             </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
