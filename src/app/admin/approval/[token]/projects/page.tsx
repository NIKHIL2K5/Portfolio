"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Loader2, Save, X, FolderOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EMPTY_PROJECT = { name: "", description: "", stack: [], imageUrl: "", githubUrl: "", liveUrl: "" };

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/projects").then(r => r.json()).then(d => { setProjects(d.projects || []); setLoading(false); });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing?._id ? "PUT" : "POST";
    const res = await fetch("/api/admin/projects", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (res.ok) {
      const { project } = await res.json();
      setProjects(prev => method === "POST" ? [...prev, project] : prev.map(p => p._id === project._id ? project : p));
      setOpen(false); setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
    if (res.ok) setProjects(prev => prev.filter(p => p._id !== id));
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-zinc-300" size={36} />
        <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">Loading Projects</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">

      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.3em] mb-2">System // Portfolio</p>
          <h2 className="text-3xl font-bold text-[#0D0D0D] tracking-tight">Projects <span className="text-zinc-300 font-medium text-xl ml-2">({projects.length})</span></h2>
        </div>
        <button onClick={() => { setEditing(EMPTY_PROJECT); setOpen(true); }}
          className="flex items-center gap-3 bg-[#0D0D0D] text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 active:scale-95 transition-all shadow-xl">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Grid */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 rounded-2xl border-2 border-dashed border-zinc-100 bg-white">
          <FolderOpen size={40} className="text-zinc-200 mb-4" />
          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">No Projects Yet</p>
          <button onClick={() => { setEditing(EMPTY_PROJECT); setOpen(true); }}
            className="mt-6 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-black underline underline-offset-4 transition-colors">
            Add your first project →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div key={project._id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-zinc-100 overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-400 group">

              {/* Image */}
              <div className="aspect-[16/9] bg-zinc-50 border-b border-zinc-100 overflow-hidden relative">
                {project.imageUrl
                  ? <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  : <div className="w-full h-full flex items-center justify-center text-zinc-200"><FolderOpen size={32} /></div>}
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <h4 className="font-black text-[#0D0D0D] text-base tracking-tight uppercase italic mb-1">{project.name}</h4>
                  <p className="text-[12px] text-zinc-500 line-clamp-2 leading-relaxed">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {project.stack?.map((s: string) => (
                    <span key={s} className="text-[8px] px-2 py-1 bg-zinc-50 border border-zinc-100 rounded-lg text-zinc-400 font-black uppercase tracking-widest">{s}</span>
                  ))}
                </div>
                <div className="flex gap-2 pt-4 border-t border-zinc-50">
                  <button onClick={() => { setEditing(project); setOpen(true); }}
                    className="flex-1 bg-zinc-50 hover:bg-[#0D0D0D] hover:text-white border border-zinc-100 hover:border-[#0D0D0D] py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                    <Edit2 size={12} /> Edit
                  </button>
                  <button onClick={() => handleDelete(project._id)}
                    className="p-2.5 rounded-xl bg-red-50 hover:bg-red-500 text-red-400 hover:text-white transition-all border border-red-100 hover:border-red-500">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-[8px]" 
              onClick={() => setOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
              style={{ maxHeight: '90vh' }}
            >
              {/* Header */}
              <div className="px-12 pt-16 pb-10 border-b border-zinc-100 bg-white">
                <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.25em] mb-3">Project Management // System</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-4xl font-bold text-[#0D0D0D] tracking-tight uppercase">
                    {editing?._id ? "Edit Project" : "New Project"}
                  </h3>
                  <button 
                    onClick={() => setOpen(false)}
                    className="w-10 h-10 flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 text-zinc-400 hover:text-[#0D0D0D] rounded-xl transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Scrollable Form body */}
              <div className="flex-1 overflow-y-auto px-12 py-10 bg-white custom-scrollbar">
                <form onSubmit={handleSave} className="space-y-10">
                  
                  {/* Section: Core Identity */}
                  <div className="space-y-6">
                    <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em] border-l-2 border-zinc-100 pl-4">Core Identity</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Title</label>
                        <input 
                          required 
                          value={editing?.name} 
                          onChange={e => setEditing({ ...editing, name: e.target.value })}
                          className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300"
                          placeholder="PROJECT NAME" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Stack</label>
                        <input 
                          value={editing?.stack?.join(", ")} 
                          onChange={e => setEditing({ ...editing, stack: e.target.value.split(",").map((s: string) => s.trim()) })}
                          className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300"
                          placeholder="TECH STACK" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Narrative</label>
                      <textarea 
                        required 
                        rows={4} 
                        value={editing?.description} 
                        onChange={e => setEditing({ ...editing, description: e.target.value })}
                        className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all resize-none leading-relaxed placeholder:text-zinc-300"
                        placeholder="PROJECT DESCRIPTION" 
                      />
                    </div>
                  </div>

                  {/* Section: Assets & Deployment */}
                  <div className="space-y-6">
                    <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em] border-l-2 border-zinc-100 pl-4">Assets & Links</p>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Visual Asset URL</label>
                      <input 
                        value={editing?.imageUrl} 
                        onChange={e => setEditing({ ...editing, imageUrl: e.target.value })}
                        className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300"
                        placeholder="IMAGE URL" 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Source Code</label>
                        <input 
                          value={editing?.githubUrl} 
                          onChange={e => setEditing({ ...editing, githubUrl: e.target.value })}
                          className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300"
                          placeholder="GITHUB LINK" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Live Endpoint</label>
                        <input 
                          value={editing?.liveUrl} 
                          onChange={e => setEditing({ ...editing, liveUrl: e.target.value })}
                          className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300"
                          placeholder="DEPLOYMENT LINK" 
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer Action */}
              <div className="px-12 py-8 bg-zinc-50/50 border-t border-zinc-100">
                <button 
                  onClick={handleSave}
                  className="w-full bg-[#0D0D0D] hover:bg-zinc-800 text-white font-bold uppercase tracking-[0.2em] text-[11px] py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.99]"
                >
                  <Save size={18} />
                  {editing?._id ? "Synchronize Repository" : "Initialize Project"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


    </div>
  );
}
