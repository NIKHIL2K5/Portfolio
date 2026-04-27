"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Loader2, Save, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EMPTY = { title: "", company: "", duration: "", description: "", startDate: "", endDate: "", isPresent: false, companyUrl: "" };

const formatDate = (date: string) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

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
    
    // Auto-generate duration string from dates if provided
    let finalEditing = { ...editing };
    if (editing.startDate) {
      const startStr = formatDate(editing.startDate);
      const endStr = editing.isPresent ? "Present" : (editing.endDate ? formatDate(editing.endDate) : "");
      finalEditing.duration = `${startStr} ${endStr ? `– ${endStr}` : ""}`.trim();
    }

    const res = await fetch("/api/admin/experience", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(finalEditing) });
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

      <div className="flex items-end justify-between mb-24">
        <div>
          <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.8em] mb-6">Career // Studio Protocol</p>
          <h2 className="text-6xl font-black text-[#0D0D0D] tracking-tighter uppercase italic leading-none">Experience <span className="text-zinc-200 font-medium text-4xl ml-4">({experiences.length})</span></h2>
        </div>
        <button onClick={() => { setEditing({ title: "", company: "", duration: "", description: "" }); setOpen(true); }}
          className="flex items-center gap-6 bg-[#0D0D0D] text-white px-12 py-6 rounded-3xl text-[11px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 active:scale-95 transition-all shadow-[0_25px_50px_rgba(0,0,0,0.2)] group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> Initialize Entry
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, i) => (
            <motion.div key={exp._id}
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[32px] border border-zinc-100 p-10 flex flex-col gap-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">

              {/* Header Section */}
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0 space-y-3">
                  <h4 className="font-black text-[#0D0D0D] text-xl tracking-tight uppercase italic truncate">{exp.title}</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.4em]">at</span>
                    <span className="text-[13px] font-black text-zinc-800 uppercase tracking-widest bg-zinc-50 px-4 py-1.5 rounded-full border border-zinc-100">{exp.company}</span>
                  </div>
                </div>
                <div className="shrink-0 text-[10px] px-5 py-2.5 bg-[#0D0D0D] text-white rounded-xl font-black uppercase tracking-widest shadow-xl">
                  {exp.duration}
                </div>
              </div>

              {/* Description Section */}
              <div className="relative">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-zinc-50 rounded-full" />
                <p className="text-[15px] text-zinc-400 font-medium leading-relaxed tracking-wide flex-1">{exp.description}</p>
              </div>

              {/* Actions Section */}
              <div className="flex gap-4 pt-10 mt-auto border-t border-zinc-50">
                <button onClick={() => { setEditing(exp); setOpen(true); }}
                  className="flex-1 bg-zinc-50 hover:bg-[#0D0D0D] hover:text-white border border-zinc-100 hover:border-[#0D0D0D] py-5 rounded-2xl transition-all duration-400 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.25em] text-zinc-600 shadow-sm active:scale-95">
                  <Edit2 size={16} /> Edit Entry
                </button>
                <button onClick={() => handleDelete(exp._id)}
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
              <div className="px-14 pt-16 pb-12 border-b border-zinc-100">
                <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-4">Career Timeline // System</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-5xl font-black text-[#0D0D0D] tracking-tighter uppercase italic leading-none">
                    {editing?._id ? "Edit Entry" : "New Entry"}
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
                    <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.3em]">Core Context</p>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Job Title</label>
                      <input required value={editing?.title || ""} onChange={e => setEditing({ ...editing, title: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300" 
                        placeholder="e.g. SENIOR DEVELOPER" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Company</label>
                        <input required value={editing?.company || ""} onChange={e => setEditing({ ...editing, company: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Company / Social Link</label>
                        <input value={editing?.companyUrl || ""} onChange={e => setEditing({ ...editing, companyUrl: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300" 
                          placeholder="https://company.com" />
                      </div>
                    </div>

                    <div className="bg-zinc-50 rounded-[28px] p-8 space-y-8 border border-zinc-100">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">Timeline Protocol</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Start Date</label>
                          <input 
                            type="date"
                            value={editing?.startDate ? new Date(editing.startDate).toISOString().split('T')[0] : ""} 
                            onChange={e => setEditing({ ...editing, startDate: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all" 
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between ml-1">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">End Date</label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                              <input 
                                type="checkbox" 
                                checked={editing?.isPresent} 
                                onChange={e => setEditing({ ...editing, isPresent: e.target.checked })}
                                className="w-4 h-4 rounded border-zinc-300 text-[#0D0D0D] focus:ring-0 transition-all"
                              />
                              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.1em] group-hover:text-[#0D0D0D] transition-colors">Currently Work Here</span>
                            </label>
                          </div>
                          {!editing?.isPresent && (
                            <input 
                              type="date"
                              value={editing?.endDate ? new Date(editing.endDate).toISOString().split('T')[0] : ""} 
                              onChange={e => setEditing({ ...editing, endDate: e.target.value })}
                              className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all" 
                            />
                          )}
                          {editing?.isPresent && (
                            <div className="w-full bg-zinc-100 border border-zinc-200 rounded-xl px-6 py-4 text-sm font-black text-zinc-400 uppercase tracking-[0.2em] flex items-center justify-center">
                              Present
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1">Description</label>
                      <textarea required rows={5} value={editing?.description || ""} onChange={e => setEditing({ ...editing, description: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-xl px-6 py-5 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all resize-none leading-relaxed placeholder:text-zinc-300" />
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer Action */}
              <div className="px-14 py-10 bg-white border-t border-zinc-100">
                <button onClick={handleSave} 
                  className="w-full bg-[#0D0D0D] hover:bg-zinc-800 text-white font-black uppercase tracking-[0.3em] text-[12px] py-6 rounded-2xl transition-all flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-[0.98]">
                  <Save size={20} />
                  {editing?._id ? "Synchronize Entry" : "Initialize Entry"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
