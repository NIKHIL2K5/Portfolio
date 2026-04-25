"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Loader2, Save, X, BookOpen, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_STYLES: Record<string, string> = {
  published: "bg-emerald-50 border-emerald-100 text-emerald-600",
  scheduled:  "bg-blue-50 border-blue-100 text-blue-600",
  draft:      "bg-zinc-50 border-zinc-100 text-zinc-500",
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/blogs").then(r => r.json()).then(d => { setBlogs(d.blogs || []); setLoading(false); });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalStatus = editing.status;
    if (editing.scheduledAt && new Date(editing.scheduledAt) > new Date()) finalStatus = "scheduled";
    const method = editing?._id ? "PUT" : "POST";
    const res = await fetch("/api/admin/blogs", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...editing, status: finalStatus }) });
    if (res.ok) {
      const { blog } = await res.json();
      setBlogs(prev => method === "POST" ? [...prev, blog] : prev.map(b => b._id === blog._id ? blog : b));
      setOpen(false); setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
    if (res.ok) setBlogs(prev => prev.filter(b => b._id !== id));
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <Loader2 className="animate-spin text-zinc-300" size={36} />
      <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">Loading Posts</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">

      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.35em] mb-1">Content Studio</p>
          <h2 className="text-2xl font-black text-[#0D0D0D] tracking-tight">Blog Posts <span className="text-zinc-200 font-medium text-xl">({blogs.length})</span></h2>
        </div>
        <button onClick={() => { setEditing({ title: "", excerpt: "", content: "", coverImage: "", status: "draft", scheduledAt: "" }); setOpen(true); }}
          className="flex items-center gap-2 bg-[#0D0D0D] text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] hover:bg-zinc-800 active:scale-95 transition-all shadow-lg">
          <Plus size={14} /> Compose Post
        </button>
      </div>

      {/* List */}
      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 rounded-2xl border-2 border-dashed border-zinc-100 bg-white">
          <BookOpen size={40} className="text-zinc-200 mb-4" />
          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">No Posts Yet</p>
          <button onClick={() => { setEditing({ title: "", excerpt: "", content: "", coverImage: "", status: "draft", scheduledAt: "" }); setOpen(true); }}
            className="mt-6 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-black underline underline-offset-4 transition-colors">
            Write your first post →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog, i) => (
            <motion.div key={blog._id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-zinc-100 flex gap-6 p-5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-400 group items-center">

              {/* Thumbnail */}
              <div className="w-24 h-24 shrink-0 bg-zinc-50 border border-zinc-100 rounded-xl overflow-hidden">
                {blog.coverImage
                  ? <img src={blog.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  : <div className="w-full h-full flex items-center justify-center"><BookOpen size={20} className="text-zinc-200" /></div>}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="font-black text-[#0D0D0D] text-base tracking-tight truncate">{blog.title}</h4>
                  <span className={`shrink-0 text-[8px] px-2.5 py-1 rounded-lg font-black uppercase tracking-widest border ${STATUS_STYLES[blog.status] || STATUS_STYLES.draft}`}>
                    {blog.status}
                  </span>
                </div>
                <p className="text-[12px] text-zinc-500 line-clamp-2 leading-relaxed">{blog.excerpt}</p>
                {blog.scheduledAt && (
                  <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-blue-500">
                    <Calendar size={10} />
                    {new Date(blog.scheduledAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 shrink-0">
                <button onClick={() => { setEditing(blog); setOpen(true); }}
                  className="p-2.5 bg-zinc-50 hover:bg-[#0D0D0D] hover:text-white text-zinc-500 rounded-xl transition-all border border-zinc-100 hover:border-[#0D0D0D]">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => handleDelete(blog._id)}
                  className="p-2.5 bg-red-50 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all border border-red-100 hover:border-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="p-7 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div>
                  <p className="text-[8px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-0.5">Content Studio</p>
                  <h3 className="text-xl font-black uppercase italic text-[#0D0D0D] tracking-tight">{editing?._id ? "Edit Post" : "New Post"}</h3>
                </div>
                <button onClick={() => setOpen(false)} className="p-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-500 rounded-xl transition-all border border-zinc-100"><X size={16} /></button>
              </div>
              <form onSubmit={handleSave} className="p-7 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Post Title</label>
                  <input required value={editing?.title} onChange={e => setEditing({ ...editing, title: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-base font-bold focus:outline-none focus:border-zinc-400 text-[#0D0D0D]" placeholder="Article Title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Status</label>
                    <select value={editing?.status} onChange={e => setEditing({ ...editing, status: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 text-[#0D0D0D] font-medium">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Schedule (Optional)</label>
                    <input type="datetime-local" value={editing?.scheduledAt ? new Date(editing.scheduledAt).toISOString().slice(0, 16) : ""}
                      onChange={e => setEditing({ ...editing, scheduledAt: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 text-[#0D0D0D] font-medium" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Cover Image URL</label>
                  <input value={editing?.coverImage} onChange={e => setEditing({ ...editing, coverImage: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 text-[#0D0D0D] font-medium" placeholder="https://..." />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Short Excerpt</label>
                  <textarea rows={2} value={editing?.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 resize-none text-[#0D0D0D] font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Content</label>
                  <textarea required rows={10} value={editing?.content} onChange={e => setEditing({ ...editing, content: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 resize-none font-mono text-[#0D0D0D]" placeholder="Write your content..." />
                </div>
                <button type="submit" className="w-full bg-[#0D0D0D] text-white font-black uppercase tracking-[0.15em] text-[10px] py-4 rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
                  <Save size={14} /> Publish Post
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
