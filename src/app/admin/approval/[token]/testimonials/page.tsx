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

      <div className="flex items-end justify-between mb-24">
        <div>
          <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.8em] mb-6">Social // Studio Protocol</p>
          <h2 className="text-6xl font-black text-[#0D0D0D] tracking-tighter uppercase italic leading-none">Testimonials <span className="text-zinc-200 font-medium text-4xl ml-4">({testimonials.length})</span></h2>
        </div>
        <button onClick={() => { setEditing({ name: "", role: "", content: "", avatarUrl: "" }); setOpen(true); }}
          className="flex items-center gap-6 bg-[#0D0D0D] text-white px-12 py-6 rounded-3xl text-[11px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 active:scale-95 transition-all shadow-[0_25px_50px_rgba(0,0,0,0.2)] group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> Add New Quote
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={t._id}
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[40px] border border-zinc-100 p-12 flex flex-col gap-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50/50 rounded-bl-[100px] -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quote Section */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 group-hover:bg-[#0D0D0D] transition-colors duration-500">
                  <Quote size={20} className="text-zinc-300 group-hover:text-white transition-colors" />
                </div>
                <p className="text-[16px] text-zinc-500 font-medium leading-relaxed italic tracking-wide flex-1">&ldquo;{t.content}&rdquo;</p>
              </div>

              {/* Author Section */}
              <div className="flex items-center gap-5 pt-8 border-t border-zinc-50 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 overflow-hidden shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  {t.avatarUrl
                    ? <img src={t.avatarUrl} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-lg font-black text-zinc-300">{t.name?.[0]}</div>}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="font-black text-[#0D0D0D] text-lg tracking-tight truncate leading-none">{t.name}</p>
                  <p className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.3em] truncate">{t.role}</p>
                </div>
              </div>

              {/* Actions Section */}
              <div className="flex gap-4 relative z-10">
                <button onClick={() => { setEditing(t); setOpen(true); }}
                  className="flex-1 bg-zinc-50 hover:bg-[#0D0D0D] hover:text-white border border-zinc-100 hover:border-[#0D0D0D] py-5 rounded-2xl transition-all duration-400 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.25em] text-zinc-600 shadow-sm active:scale-95">
                  <Edit2 size={16} /> Edit Quote
                </button>
                <button onClick={() => handleDelete(t._id)}
                  className="p-5 rounded-2xl bg-red-50 hover:bg-red-500 text-red-500 hover:text-white transition-all duration-400 border border-red-100 hover:border-red-500 active:scale-95 shadow-sm">
                  <Trash2 size={18} />
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
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
              style={{ maxHeight: '90vh' }}>
              
              {/* Header */}
              <div className="px-14 pt-16 pb-12 border-b border-zinc-100 bg-white">
                <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-4">Social Proof // System</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-5xl font-black text-[#0D0D0D] tracking-tighter uppercase italic leading-none">
                    {editing?._id ? "Edit Quote" : "New Quote"}
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
                    <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.3em]">Client Profile</p>
                    
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Client Name</label>
                        <input required value={editing?.name} onChange={e => setEditing({ ...editing, name: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Professional Role</label>
                        <input value={editing?.role} onChange={e => setEditing({ ...editing, role: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-200" placeholder="CEO AT COMPANY" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Avatar Asset URL</label>
                      <input value={editing?.avatarUrl} onChange={e => setEditing({ ...editing, avatarUrl: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-200" placeholder="https://..." />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Testimonial Content</label>
                      <textarea required rows={6} value={editing?.content} onChange={e => setEditing({ ...editing, content: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-5 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all resize-none leading-relaxed placeholder:text-zinc-200" placeholder="WHAT THEY SAID..." />
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer Action */}
              <div className="px-14 py-10 bg-white border-t border-zinc-100">
                <button onClick={handleSave} 
                  className="w-full bg-[#0D0D0D] hover:bg-zinc-800 text-white font-black uppercase tracking-[0.3em] text-[12px] py-6 rounded-2xl transition-all flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-[0.98]">
                  <Save size={20} />
                  {editing?._id ? "Synchronize Quote" : "Initialize Quote"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
