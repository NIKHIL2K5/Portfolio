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
    <main className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30">
      
      {/* ── Background Polish ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link 
            href="/"
            className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-300 no-underline"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all duration-300">
              <ArrowLeft size={18} />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">Return to Home</span>
          </Link>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: primaryEase }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-cyan-500 shadow-[0_0_15px_rgba(0,210,255,0.5)]" />
            <span className="text-cyan-400 text-[10px] font-black tracking-[0.6em] uppercase">Archive</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
            Detailed<br />
            <span className="text-white/10">Writings.</span>
          </h1>
          <p className="text-white/30 text-lg max-w-xl font-medium leading-relaxed">
            Exploring the intersection of code, architecture, and creativity. A collection of thoughts and deep dives.
          </p>
        </motion.div>

        {/* Blogs List */}
        <div className="space-y-32">
          {loading ? (
            <div className="flex flex-col gap-12">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="animate-pulse space-y-4">
                    <div className="h-4 w-24 bg-white/5 rounded" />
                    <div className="h-10 w-3/4 bg-white/5 rounded" />
                    <div className="h-20 w-full bg-white/5 rounded" />
                 </div>
               ))}
            </div>
          ) : (
            blogs.map((blog, i) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: primaryEase, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Visual marker */}
                <div className="absolute -left-12 top-0 bottom-0 w-px bg-white/5 group-hover:bg-cyan-500/30 transition-colors duration-500" />
                
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
                   <div className="flex-1">
                      {/* Meta */}
                      <div className="flex items-center gap-6 mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500/60">
                           {blog.tag || "Technical"}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                           <Clock size={10} />
                           {getReadTime(blog.content)}
                        </span>
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                           {formatDate(blog.createdAt)}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8 group-hover:text-cyan-400 transition-colors duration-500 leading-[1.1]">
                        {blog.title}
                      </h2>

                      {/* Detailed Content Excerpt */}
                      <div className="prose prose-invert prose-sm max-w-none text-white/40 leading-relaxed space-y-6">
                         <p className="text-lg text-white/50 font-medium">
                            {blog.excerpt || blog.content.substring(0, 200) + "..."}
                         </p>
                         <div className="h-px w-20 bg-white/10" />
                         <p className="line-clamp-4">
                            {blog.content}
                         </p>
                      </div>

                      {/* CTA */}
                      <div className="mt-10">
                         <Link 
                            href={`/blogs/${blog._id}`}
                            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-white/30 hover:text-cyan-400 transition-all duration-300"
                         >
                            Read Full Article
                            <ArrowUpRight size={14} />
                         </Link>
                      </div>
                   </div>

                   {/* Background Glow on hover */}
                   <div className="absolute inset-x-[-40px] inset-y-[-40px] bg-cyan-500/0 group-hover:bg-cyan-500/[0.02] rounded-[40px] transition-all duration-700 -z-10" />
                </div>
              </motion.article>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="mt-40 pt-12 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
           <span>Archive Vol. 01</span>
           <span>Nikhil © 2026</span>
        </div>
      </div>
    </main>
  );
}
