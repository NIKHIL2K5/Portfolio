"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Loader2, Save, X, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/testimonials").then(r => r.json()).then(d => { setTestimonials(d.testimonials || []); setLoading(false); });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing?._id ? "PUT" : "POST";
    const res = await fetch("/api/admin/testimonials", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (res.ok) {
      const { testimonial } = await res.json();
      setTestimonials(prev => method === "POST" ? [...prev, testimonial] : prev.map(t => t._id === testimonial._id ? testimonial : t));
      setOpen(false); setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
    if (res.ok) setTestimonials(prev => prev.filter(t => t._id !== id));
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <Loader2 className="animate-spin text-zinc-300" size={36} />
      <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">Loading Testimonials</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">

      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.35em] mb-1">Social Proof</p>
          <h2 className="text-2xl font-black text-[#0D0D0D] tracking-tight">Testimonials <span className="text-zinc-200 font-medium text-xl">({testimonials.length})</span></h2>
        </div>
        <button onClick={() => { setEditing({ name: "", role: "", content: "", avatarUrl: "" }); setOpen(true); }}
          className="flex items-center gap-2 bg-[#0D0D0D] text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] hover:bg-zinc-800 active:scale-95 transition-all shadow-lg">
          <Plus size={14} /> Add Testimonial
        </button>
      </div>

      {/* Grid */}
      {testimonials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 rounded-2xl border-2 border-dashed border-zinc-100 bg-white">
          <Star size={40} className="text-zinc-200 mb-4" />
          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">No Testimonials Yet</p>
          <button onClick={() => { setEditing({ name: "", role: "", content: "", avatarUrl: "" }); setOpen(true); }}
            className="mt-6 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-black underline underline-offset-4 transition-colors">
            Add your first testimonial →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={t._id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-zinc-100 p-6 flex flex-col gap-5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-400">

              {/* Quote icon */}
              <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                <Quote size={14} className="text-zinc-300" />
              </div>

              {/* Content */}
              <p className="text-[13px] text-zinc-600 leading-relaxed italic flex-1">&ldquo;{t.content}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-50">
                <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 overflow-hidden shrink-0">
                  {t.avatarUrl
                    ? <img src={t.avatarUrl} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-zinc-300">{t.name?.[0]}</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-[#0D0D0D] text-sm tracking-tight truncate">{t.name}</p>
                  <p className="text-[9px] text-zinc-400 font-black uppercase tracking-[0.2em] truncate">{t.role}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button onClick={() => { setEditing(t); setOpen(true); }}
                  className="flex-1 bg-zinc-50 hover:bg-[#0D0D0D] hover:text-white border border-zinc-100 hover:border-[#0D0D0D] py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                  <Edit2 size={12} /> Edit
                </button>
                <button onClick={() => handleDelete(t._id)}
                  className="p-2.5 rounded-xl bg-red-50 hover:bg-red-500 text-red-400 hover:text-white transition-all border border-red-100 hover:border-red-500">
                  <Trash2 size={13} />
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
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-7 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <p className="text-[8px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-0.5">Social Proof</p>
                  <h3 className="text-xl font-black uppercase italic text-[#0D0D0D] tracking-tight">{editing?._id ? "Edit Testimonial" : "New Testimonial"}</h3>
                </div>
                <button onClick={() => setOpen(false)} className="p-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-500 rounded-xl transition-all border border-zinc-100"><X size={16} /></button>
              </div>
              <form onSubmit={handleSave} className="p-7 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Name</label>
                    <input required value={editing?.name} onChange={e => setEditing({ ...editing, name: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 text-[#0D0D0D] font-medium" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Role</label>
                    <input value={editing?.role} onChange={e => setEditing({ ...editing, role: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 text-[#0D0D0D] font-medium" placeholder="CEO at Company" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Avatar URL</label>
                  <input value={editing?.avatarUrl} onChange={e => setEditing({ ...editing, avatarUrl: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 text-[#0D0D0D] font-medium" placeholder="https://..." />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Testimonial</label>
                  <textarea required rows={5} value={editing?.content} onChange={e => setEditing({ ...editing, content: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 resize-none text-[#0D0D0D] font-medium" placeholder="What they said..." />
                </div>
                <button type="submit" className="w-full bg-[#0D0D0D] text-white font-black uppercase tracking-[0.15em] text-[10px] py-4 rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
                  <Save size={14} /> Save Testimonial
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
