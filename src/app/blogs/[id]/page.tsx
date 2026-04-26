"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

  if (!blog) return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center gap-6">
       <h1 className="text-4xl font-black">Post Not Found</h1>
       <Link href="/blogs" className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">Back to Archive</Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30">
      
      {/* ── Background Polish ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-600/5 blur-[180px] rounded-full" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 md:py-32">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link 
            href="/blogs"
            className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-300 no-underline"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all duration-300">
              <ArrowLeft size={18} />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">Archive</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: primaryEase }}
          >
            <div className="flex items-center gap-4 mb-8">
               <span className="px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500/80">
                  {blog.tag || "Technical"}
               </span>
               <div className="flex items-center gap-4 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {getReadTime(blog.content)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {formatDate(blog.createdAt)}
                  </span>
               </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-8 text-white">
              {blog.title}
            </h1>

            <p className="text-xl text-white/40 leading-relaxed font-medium mb-12 italic border-l-2 border-white/10 pl-8">
               {blog.excerpt || "A deep dive into the technical architecture and creative philosophy behind this topic."}
            </p>
          </motion.div>
        </header>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="text-white/60 leading-loose space-y-8 text-lg font-medium">
             {blog.content.split('\n').map((para: string, i: number) => (
                para ? <p key={i}>{para}</p> : <br key={i} />
             ))}
          </div>
        </motion.article>

        {/* Article Footer / Actions */}
        <footer className="mt-24 pt-12 border-t border-white/5">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                 <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
                    <Share2 size={16} />
                    Share
                 </button>
                 <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
                    <MessageCircle size={16} />
                    Comment
                 </button>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
                End of Transmission.
              </p>
           </div>
        </footer>
      </div>
    </main>
  );
}
