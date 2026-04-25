"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Loader2, Save, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EMPTY = { title: "", company: "", duration: "", description: "" };

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/experience").then(r => r.json()).then(d => { setExperiences(d.experiences || []); setLoading(false); });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing?._id ? "PUT" : "POST";
    const res = await fetch("/api/admin/experience", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (res.ok) {
      const { experience } = await res.json();
      setExperiences(prev => method === "POST" ? [...prev, experience] : prev.map(ex => ex._id === experience._id ? experience : ex));
      setOpen(false); setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    const res = await fetch(`/api/admin/experience?id=${id}`, { method: "DELETE" });
    if (res.ok) setExperiences(prev => prev.filter(ex => ex._id !== id));
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <Loader2 className="animate-spin text-zinc-300" size={36} />
      <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">Loading Experience</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">

      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.35em] mb-1">Career Timeline</p>
          <h2 className="text-2xl font-black text-[#0D0D0D] tracking-tight">Experience <span className="text-zinc-200 font-medium text-xl">({experiences.length})</span></h2>
        </div>
        <button onClick={() => { setEditing(EMPTY); setOpen(true); }}
          className="flex items-center gap-2 bg-[#0D0D0D] text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] hover:bg-zinc-800 active:scale-95 transition-all shadow-lg">
          <Plus size={14} /> Add Experience
        </button>
      </div>

      {/* List */}
      {experiences.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 rounded-2xl border-2 border-dashed border-zinc-100 bg-white">
          <Clock size={40} className="text-zinc-200 mb-4" />
          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">No Experience Added</p>
          <button onClick={() => { setEditing(EMPTY); setOpen(true); }}
            className="mt-6 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-black underline underline-offset-4 transition-colors">
            Add your first entry →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {experiences.map((exp, i) => (
            <motion.div key={exp._id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-zinc-100 p-6 flex flex-col gap-5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-400">

              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-[#0D0D0D] text-base tracking-tight uppercase italic truncate">{exp.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">at</span>
                    <span className="text-[11px] font-black text-zinc-700 uppercase tracking-tight">{exp.company}</span>
                  </div>
                </div>
                <span className="shrink-0 text-[8px] px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-lg text-zinc-500 font-black uppercase tracking-widest">
                  {exp.duration}
                </span>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-zinc-50" />

              {/* Description */}
              <p className="text-[13px] text-zinc-600 leading-relaxed flex-1">{exp.description}</p>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-zinc-50">
                <button onClick={() => { setEditing(exp); setOpen(true); }}
                  className="flex-1 bg-zinc-50 hover:bg-[#0D0D0D] hover:text-white border border-zinc-100 hover:border-[#0D0D0D] py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                  <Edit2 size={12} /> Edit
                </button>
                <button onClick={() => handleDelete(exp._id)}
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
                  <p className="text-[8px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-0.5">Career</p>
                  <h3 className="text-xl font-black uppercase italic text-[#0D0D0D] tracking-tight">{editing?._id ? "Edit Experience" : "New Experience"}</h3>
                </div>
                <button onClick={() => setOpen(false)} className="p-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-500 rounded-xl transition-all border border-zinc-100"><X size={16} /></button>
              </div>
              <form onSubmit={handleSave} className="p-7 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Job Title</label>
                  <input required value={editing?.title} onChange={e => setEditing({ ...editing, title: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 text-[#0D0D0D] font-medium" placeholder="e.g. Senior Developer" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Company</label>
                    <input required value={editing?.company} onChange={e => setEditing({ ...editing, company: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 text-[#0D0D0D] font-medium" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Duration</label>
                    <input required value={editing?.duration} onChange={e => setEditing({ ...editing, duration: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 text-[#0D0D0D] font-medium" placeholder="2022 – Present" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Description</label>
                  <textarea required rows={4} value={editing?.description} onChange={e => setEditing({ ...editing, description: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 resize-none text-[#0D0D0D] font-medium" />
                </div>
                <button type="submit" className="w-full bg-[#0D0D0D] text-white font-black uppercase tracking-[0.15em] text-[10px] py-4 rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
                  <Save size={14} /> Save Experience
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
