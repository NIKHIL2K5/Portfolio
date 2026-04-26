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

      <div className="flex items-end justify-between mb-24">
        <div>
          <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.8em] mb-6">Content // Studio Protocol</p>
          <h2 className="text-6xl font-black text-[#0D0D0D] tracking-tighter uppercase italic leading-none">Blog Posts <span className="text-zinc-200 font-medium text-4xl ml-4">({blogs.length})</span></h2>
        </div>
        <button onClick={() => { setEditing({ title: "", excerpt: "", content: "", coverImage: "", status: "draft", scheduledAt: "" }); setOpen(true); }}
          className="flex items-center gap-6 bg-[#0D0D0D] text-white px-12 py-6 rounded-3xl text-[11px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 active:scale-95 transition-all shadow-[0_25px_50px_rgba(0,0,0,0.2)] group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> Compose Post
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
        <div className="space-y-6">
          {blogs.map((blog, i) => (
            <motion.div key={blog._id}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[32px] border border-zinc-100 flex gap-8 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 group items-center">

              {/* Thumbnail Container */}
              <div className="w-32 h-32 shrink-0 bg-zinc-50 rounded-[24px] overflow-hidden border border-zinc-100">
                {blog.coverImage
                  ? <img src={blog.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  : <div className="w-full h-full flex items-center justify-center"><BookOpen size={28} className="text-zinc-200" /></div>}
              </div>

              {/* Content Section */}
              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <h4 className="font-black text-[#0D0D0D] text-xl tracking-tight uppercase italic truncate leading-none">{blog.title}</h4>
                  <span className={`shrink-0 text-[9px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] border shadow-sm ${STATUS_STYLES[blog.status] || STATUS_STYLES.draft}`}>
                    {blog.status}
                  </span>
                </div>
                <p className="text-[14px] text-zinc-400 font-medium line-clamp-2 leading-relaxed tracking-wide">{blog.excerpt}</p>
                
                {blog.scheduledAt ? (
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-blue-500 bg-blue-50/50 w-fit px-3 py-1 rounded-lg">
                    <Calendar size={12} />
                    {new Date(blog.scheduledAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-300">
                    <Calendar size={12} />
                    Last Edited // {new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </div>
                )}
              </div>

              {/* Actions Section */}
              <div className="flex flex-col gap-4 shrink-0">
                <button onClick={() => { setEditing(blog); setOpen(true); }}
                  className="p-5 bg-zinc-50 hover:bg-[#0D0D0D] hover:text-white text-zinc-400 rounded-2xl transition-all duration-400 border border-zinc-100 hover:border-[#0D0D0D] shadow-sm active:scale-95">
                  <Edit2 size={20} />
                </button>
                <button onClick={() => handleDelete(blog._id)}
                  className="p-5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all duration-400 border border-red-100 hover:border-red-500 shadow-sm active:scale-95">
                  <Trash2 size={20} />
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
            <motion.div initial={{ opacity: 0, scale: 0.98, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 15 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
              style={{ maxHeight: '90vh' }}>
              
              {/* Header */}
              <div className="px-14 pt-16 pb-12 border-b border-zinc-100 bg-white sticky top-0 z-10">
                <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-4">Content Studio // System</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-5xl font-black text-[#0D0D0D] tracking-tighter uppercase italic">
                    {editing?._id ? "Edit Post" : "New Post"}
                  </h3>
                  <button onClick={() => setOpen(false)} 
                    className="w-12 h-12 flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 text-zinc-400 hover:text-[#0D0D0D] rounded-2xl transition-all border border-zinc-100">
                    <X size={22} />
                  </button>
                </div>
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto px-14 py-12 bg-white custom-scrollbar">
                <form onSubmit={handleSave} className="space-y-12">
                  <div className="space-y-8">
                    <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.3em]">Article Metadata</p>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Post Title</label>
                      <input required value={editing?.title} onChange={e => setEditing({ ...editing, title: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-4 text-base font-bold text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300" 
                        placeholder="ARTICLE TITLE" />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Status</label>
                        <select value={editing?.status} onChange={e => setEditing({ ...editing, status: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all">
                          <option value="draft">DRAFT</option>
                          <option value="published">PUBLISHED</option>
                          <option value="scheduled">SCHEDULED</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Schedule (Optional)</label>
                        <input type="datetime-local" value={editing?.scheduledAt ? new Date(editing.scheduledAt).toISOString().slice(0, 16) : ""}
                          onChange={e => setEditing({ ...editing, scheduledAt: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Cover Image URL</label>
                      <input value={editing?.coverImage} onChange={e => setEditing({ ...editing, coverImage: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300" 
                        placeholder="https://..." />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Short Excerpt</label>
                      <textarea rows={3} value={editing?.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-5 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all resize-none leading-relaxed placeholder:text-zinc-300" />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Content (Markdown)</label>
                      <textarea required rows={12} value={editing?.content} onChange={e => setEditing({ ...editing, content: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-5 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all resize-none font-mono leading-relaxed placeholder:text-zinc-300" />
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer Action */}
              <div className="px-14 py-10 bg-white border-t border-zinc-100">
                <button onClick={handleSave} 
                  className="w-full bg-[#0D0D0D] hover:bg-zinc-800 text-white font-black uppercase tracking-[0.3em] text-[12px] py-6 rounded-2xl transition-all flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-[0.98]">
                  <Save size={20} />
                  {editing?._id ? "Synchronize Publication" : "Initialize Publication"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
