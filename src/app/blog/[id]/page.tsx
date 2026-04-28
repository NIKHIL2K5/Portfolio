"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Tag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const ease = [0.16, 1, 0.3, 1] as any;

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => {
        const all = data.blogs || [];
        const found = all.find((b: any) => b._id === params.id);
        setAllBlogs(all.filter((b: any) => b._id !== params.id).slice(0, 3));
        if (found) setBlog(found);
        else setNotFound(true);
        setLoaded(true);
      })
      .catch(() => { setNotFound(true); setLoaded(true); });
  }, [params.id]);

  const readTime = (content: string) => {
    const mins = Math.ceil((content?.split(/\s+/).length || 0) / 200);
    return `${mins} min read`;
  };

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: blog?.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  /* ── Skeleton ── */
  if (!loaded) {
    return (
      <main style={{ minHeight: "100vh", background: "#050505", color: "#fff" }}>
        <div
          className="animate-pulse"
          style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(32px,6vw,80px) clamp(20px,5vw,60px)" }}
        >
          <div style={{ height: 36, width: 140, background: "rgba(255,255,255,0.05)", borderRadius: 6, marginBottom: 64 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 80 }}>
            <div>
              <div style={{ height: 14, width: "25%", background: "rgba(34,211,238,0.1)", borderRadius: 4, marginBottom: 20 }} />
              <div style={{ height: 56, width: "90%", background: "rgba(255,255,255,0.06)", borderRadius: 6, marginBottom: 12 }} />
              <div style={{ height: 56, width: "70%", background: "rgba(255,255,255,0.05)", borderRadius: 6, marginBottom: 36 }} />
              <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 36 }} />
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ height: 18, background: "rgba(255,255,255,0.04)", borderRadius: 4, marginBottom: 14, width: i % 3 === 2 ? "55%" : "100%" }} />
              ))}
            </div>
            <div>
              <div style={{ height: 180, background: "rgba(255,255,255,0.03)", borderRadius: 16, marginBottom: 24 }} />
              <div style={{ height: 140, background: "rgba(255,255,255,0.03)", borderRadius: 16 }} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !blog) {
    return (
      <main style={{ minHeight: "100vh", background: "#050505", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 100, fontWeight: 900, color: "rgba(255,255,255,0.04)", lineHeight: 1 }}>404</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: "0.25em", textTransform: "uppercase", margin: "16px 0 32px" }}>Post not found</p>
          <Link href="/blog" style={{ fontSize: 11, color: "#22d3ee", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
            ← Back to Archive
          </Link>
        </div>
      </main>
    );
  }

  const paragraphs = blog.content.split("\n").filter((p: string) => p.trim());

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#fff", overflowX: "hidden" }}>
      {/* Ambient glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-20%", right: "-8%", width: 700, height: 700, background: "rgba(8,145,178,0.03)", filter: "blur(180px)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: 0, left: "-10%", width: 500, height: 500, background: "rgba(239,68,68,0.015)", filter: "blur(150px)", borderRadius: "50%" }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "clamp(32px,6vw,80px) clamp(20px,5vw,60px)" }}>

        {/* ── Back nav ── */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{ marginBottom: "clamp(40px, 6vw, 64px)" }}
        >
          <Link
            href="/blog"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              color: "rgba(255,255,255,0.3)", textDecoration: "none",
              fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.35em",
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
          >
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ArrowLeft size={13} />
            </div>
            Archive
          </Link>
        </motion.nav>

        {/* ── Desktop Two-Column Grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}
             className="lg:grid-blog-post"
        >
          {/* LEFT: Main article */}
          <div>
            <motion.header
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease }}
              style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}
            >
              {/* Tag */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 28, height: 2, background: "#22d3ee" }} />
                <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5em", color: "rgba(34,211,238,0.75)" }}>
                  {blog.tag || "Technical Content"}
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.08,
                  color: "#fff",
                  marginBottom: "clamp(24px, 4vw, 44px)",
                }}
              >
                {blog.title}
              </h1>

              {/* Author meta bar */}
              <div
                style={{
                  display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16,
                  paddingTop: 18, paddingBottom: 18,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Avatar */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 900, color: "#fff",
                  }}>N</div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#fff", margin: 0, lineHeight: 1 }}>Nikhil</p>
                    <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", margin: "3px 0 0", lineHeight: 1 }}>Author</p>
                  </div>
                </div>

                <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />

                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 5 }}>
                  <Clock size={11} style={{ color: "#22d3ee" }} />
                  {readTime(blog.content)}
                </span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 5 }}>
                  <Calendar size={11} style={{ color: "#a78bfa" }} />
                  {fmtDate(blog.createdAt)}
                </span>

                {/* Share */}
                <button
                  onClick={handleShare}
                  style={{
                    marginLeft: "auto", display: "flex", alignItems: "center", gap: 7,
                    padding: "6px 14px", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 20, background: "transparent",
                    color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.2em", cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
                  }}
                >
                  <Share2 size={11} /> Share
                </button>
              </div>
            </motion.header>

            {/* Excerpt callout */}
            {blog.excerpt && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{
                  borderLeft: "3px solid rgba(34,211,238,0.45)",
                  background: "rgba(34,211,238,0.025)",
                  borderRadius: "0 10px 10px 0",
                  padding: "18px 24px",
                  marginBottom: "clamp(28px, 4vw, 48px)",
                }}
              >
                <p style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontStyle: "italic", fontWeight: 500, margin: 0 }}>
                  {blog.excerpt}
                </p>
              </motion.div>
            )}

            {/* Article body */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vw, 24px)" }}>
                {paragraphs.map((para: string, i: number) => {
                  if (i === 0) {
                    return (
                      <p key={i} style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.08rem)", lineHeight: 1.9, color: "rgba(255,255,255,0.7)", fontWeight: 450, margin: 0 }}>
                        <span style={{ float: "left", fontSize: "clamp(2.8rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 0.82, marginRight: 10, marginTop: 6, color: "#fff" }}>
                          {para[0]}
                        </span>
                        {para.slice(1)}
                      </p>
                    );
                  }
                  return (
                    <p key={i} style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.08rem)", lineHeight: 1.9, color: "rgba(255,255,255,0.6)", fontWeight: 450, margin: 0 }}>
                      {para}
                    </p>
                  );
                })}
              </div>
            </motion.div>

            {/* Bottom nav */}
            <div style={{ marginTop: "clamp(48px, 7vw, 80px)", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
              >
                <ArrowLeft size={13} /> More Posts
              </Link>
              <Link href="/#contact" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(34,211,238,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#22d3ee")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(34,211,238,0.6)")}
              >
                Get In Touch →
              </Link>
            </div>
          </div>

          {/* RIGHT: Sidebar (desktop only) */}
          <aside className="hidden lg:block">
            <div style={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Post info card */}
              <div style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.015)" }}>
                <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.4em", color: "rgba(255,255,255,0.2)", marginBottom: 20 }}>
                  Post Info
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.2em" }}>Read time</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>{readTime(blog.content)}</span>
                  </div>
                  <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.2em" }}>Published</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>{fmtDate(blog.createdAt)}</span>
                  </div>
                  <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.2em" }}>Category</span>
                    <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(34,211,238,0.7)", textTransform: "uppercase", letterSpacing: "0.15em" }}>{blog.tag || "Article"}</span>
                  </div>
                  <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
                    <span style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(34,197,94,0.8)" }}>Verified</span>
                  </div>
                </div>
              </div>

              {/* More posts */}
              {allBlogs.length > 0 && (
                <div style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.015)" }}>
                  <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.4em", color: "rgba(255,255,255,0.2)", marginBottom: 16 }}>
                    More Posts
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {allBlogs.map((b, i) => (
                      <Link
                        key={b._id}
                        href={`/blog/${b._id}`}
                        style={{
                          display: "block", textDecoration: "none",
                          padding: "14px 0",
                          borderBottom: i < allBlogs.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                        }}
                      >
                        <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)", lineHeight: 1.4, margin: 0, transition: "color 0.2s" }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
                        >
                          {b.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link
                href="/#contact"
                style={{
                  display: "block", padding: "20px 24px",
                  borderRadius: 16, border: "1px solid rgba(34,211,238,0.2)",
                  background: "rgba(34,211,238,0.03)",
                  textDecoration: "none", textAlign: "center",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(34,211,238,0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(34,211,238,0.03)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.2)";
                }}
              >
                <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.4em", color: "rgba(34,211,238,0.7)", margin: "0 0 6px" }}>Work Together</p>
                <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", margin: 0 }}>Have a project in mind?</p>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Inject responsive grid via style tag */}
      <style>{`
        @media (min-width: 1024px) {
          .lg\\:grid-blog-post {
            grid-template-columns: 1fr 280px !important;
            gap: 72px !important;
          }
        }
      `}</style>
    </main>
  );
}
