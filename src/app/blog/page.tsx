"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as any;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const readTime = (content: string) => {
    const mins = Math.ceil((content?.split(/\s+/).length || 0) / 200);
    return `${mins} min read`;
  };

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-cyan-600/[0.025] blur-[180px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600/[0.02] blur-[150px] rounded-full" />
      </div>

      <div
        className="relative z-10 mx-auto"
        style={{ maxWidth: 1100, padding: "clamp(32px, 6vw, 80px) clamp(20px, 6vw, 80px)" }}
      >
        {/* Back nav */}
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "clamp(40px, 6vw, 72px)" }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-white/30 hover:text-white transition-colors duration-300 no-underline group"
          >
            <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all duration-300">
              <ArrowLeft size={15} />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.35em]">Back to Home</span>
          </Link>
        </motion.nav>

        {/* Page header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          style={{ marginBottom: "clamp(48px, 8vw, 100px)" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[2px] bg-cyan-500" />
            <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.7em]">
              The Archive
            </span>
          </div>

          <h1
            className="font-black tracking-tighter leading-[0.88]"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)", marginBottom: "clamp(16px, 3vw, 32px)" }}
          >
            Writings
            <br />
            <span className="text-white/10">Vol. 01</span>
          </h1>

          <p
            className="text-white/35 font-medium leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 2vw, 1.2rem)", maxWidth: 520 }}
          >
            Technical research, architectural thoughts, and creative philosophy. Exploring the frontiers of digital engineering.
          </p>
        </motion.header>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: "clamp(32px, 5vw, 64px)" }} />

        {/* Blog list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0px, 0px, 0px)" }}>
          {!loaded ? (
            /* Skeleton */
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  padding: "clamp(24px, 4vw, 48px) 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div className="animate-pulse">
                  <div style={{ height: 12, width: "30%", background: "rgba(255,255,255,0.05)", borderRadius: 4, marginBottom: 16 }} />
                  <div style={{ height: 28, width: "70%", background: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 12 }} />
                  <div style={{ height: 14, width: "50%", background: "rgba(255,255,255,0.04)", borderRadius: 4 }} />
                </div>
              </div>
            ))
          ) : blogs.length === 0 ? (
            <div style={{ padding: "80px 0", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: 14, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              No posts yet.
            </div>
          ) : (
            blogs.map((blog, i) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                style={{
                  padding: "clamp(24px, 4vw, 48px) 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Link href={`/blog/${blog._id}`} className="block no-underline group">
                  {/* Meta row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: "0.35em",
                        textTransform: "uppercase",
                        color: "rgba(34,211,238,0.7)",
                        padding: "3px 10px",
                        border: "1px solid rgba(34,211,238,0.2)",
                        borderRadius: 20,
                      }}
                    >
                      {blog.tag || "Article"}
                    </span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={10} />
                      {readTime(blog.content)}
                    </span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={10} />
                      {fmtDate(blog.createdAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="font-black tracking-tighter text-white group-hover:text-cyan-300 transition-colors duration-400"
                    style={{
                      fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
                      lineHeight: 1.1,
                      marginBottom: 12,
                    }}
                  >
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontSize: "clamp(13px, 1.5vw, 16px)",
                      color: "rgba(255,255,255,0.3)",
                      lineHeight: 1.65,
                      fontWeight: 500,
                      maxWidth: 680,
                    }}
                  >
                    {blog.excerpt || blog.content.substring(0, 140).trim() + "…"}
                  </p>
                </Link>
              </motion.article>
            ))
          )}
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: "clamp(48px, 8vw, 96px)",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22d3ee", boxShadow: "0 0 10px #22d3ee" }} />
            <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.35em", color: "rgba(255,255,255,0.2)" }}>
              Archive Terminal Vol. 01
            </span>
          </div>
          <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.35em", color: "rgba(255,255,255,0.15)" }}>
            All Rights Reserved // 2026
          </span>
        </footer>
      </div>
    </main>
  );
}
