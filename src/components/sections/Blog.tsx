"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Tag } from "lucide-react";
import Link from "next/link";

const primaryEase = [0.85, 0, 0.15, 1] as any;

const posts = [
  {
    slug: "#",
    tag: "Full Stack",
    date: "Mar 2025",
    readTime: "5 min read",
    title: "Building Scalable APIs with Node.js & Express",
    excerpt:
      "A deep dive into structuring production-ready REST APIs — covering middleware, error handling, rate limiting, and deployment best practices.",
  },
  {
    slug: "#",
    tag: "Freelancing",
    date: "Feb 2025",
    readTime: "4 min read",
    title: "What I Learned Building My First Client Project",
    excerpt:
      "From a blank canvas to a live product — lessons learned about scoping, communication, and delivering value as a freelance developer.",
  },
  {
    slug: "#",
    tag: "Tools",
    date: "Jan 2025",
    readTime: "3 min read",
    title: "Why I Switched from REST to tRPC in My Projects",
    excerpt:
      "How end-to-end type safety changed the way I think about full-stack development, and when tRPC is the right call.",
  },
];

export default function Blog({ blogs = [] }: { blogs?: any[] }) {
  // Helper to calculate read time
  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Helper to format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Use dynamic blogs if available, otherwise fallback to static posts for demo
  const displayPosts = blogs.length > 0 ? blogs.map(blog => ({
    slug: `/blog/${blog._id}`, // Or a specific slug if added later
    tag: "Article",
    date: formatDate(blog.createdAt),
    readTime: getReadTime(blog.content),
    title: blog.title,
    excerpt: blog.excerpt || blog.content.substring(0, 150) + "...",
  })) : posts;

  return (
    <section id="blog" className="bg-[#050505]" style={{ padding: "6rem 0" }}>
      <div style={{ paddingLeft: 120, paddingRight: 80 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginBottom: 56 }}
        >
          <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
            <div className="w-7 h-px bg-red-500" />
            <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-red-500/80">Writing</span>
          </div>
          <h2
            className="font-black tracking-tight text-white"
            style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1 }}
          >
            Blog
          </h2>
        </motion.div>

        {/* Top rule */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 48 }} />

        {/* Post list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {displayPosts.map((post, i) => (
            <motion.a
              key={i}
              href={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: primaryEase }}
              viewport={{ once: true }}
              className="group block"
              style={{
                padding: "28px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <div className="flex items-start justify-between gap-8">
                {/* Left */}
                <div style={{ flex: 1 }}>
                  {/* Meta row */}
                  <div className="flex items-center gap-5" style={{ marginBottom: 12 }}>
                    <span
                      className="font-semibold"
                      style={{
                        fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                        padding: "2px 10px", borderRadius: 20,
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      {post.tag}
                    </span>
                    <span
                      className="flex items-center gap-1.5"
                      style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}
                    >
                      <Clock size={10} />
                      {post.readTime}
                    </span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold transition-colors duration-300 group-hover:text-white"
                    style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "rgba(255,255,255,0.75)", marginBottom: 10, lineHeight: 1.3 }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.30)", lineHeight: 1.7, maxWidth: 620 }}>
                    {post.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <motion.div
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0 flex items-center justify-center rounded-full border transition-all duration-300 group-hover:border-white/20"
                  style={{ width: 40, height: 40, marginTop: 4, borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <ArrowUpRight size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* "All posts" link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          style={{ marginTop: 36 }}
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-white/35 hover:text-white transition-colors duration-300"
            style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textDecoration: "none" }}
          >
            View all posts
            <ArrowUpRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
