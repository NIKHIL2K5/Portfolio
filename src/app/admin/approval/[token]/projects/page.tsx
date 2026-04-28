"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Loader2, Save, X, FolderOpen, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EMPTY_PROJECT = { name: "", description: "", stack: [], imageUrl: "", githubUrl: "", liveUrl: "", order: 0 };

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/projects").then(r => r.json()).then(d => { setProjects((d.projects || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0))); setLoading(false); });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing?._id ? "PUT" : "POST";
    const res = await fetch("/api/admin/projects", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (res.ok) {
      const { project } = await res.json();
      setProjects(prev => {
        const newProjects = method === "POST" ? [...prev, project] : prev.map(p => p._id === project._id ? project : p);
        return newProjects.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      });
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
    <div className="space-y-12 pb-30">

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12 sm:mb-24">
        <div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#0D0D0D] tracking-tighter uppercase italic leading-none">
            Projects <span className="text-zinc-200 font-medium text-2xl sm:text-4xl ml-2 sm:ml-4">({projects.length})</span>
          </h2>
        </div>
        <button onClick={() => { setEditing(EMPTY_PROJECT); setOpen(true); }}
          className="group flex items-center justify-center bg-[#0D0D0D] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full hover:bg-zinc-800 active:scale-95 transition-all shadow-xl self-start sm:self-end">
          <div className="flex items-center gap-3">
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <span className="text-[10px] sm:text-[12px] font-bold uppercase tracking-widest translate-x-[2px]">Initialize New</span>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, i) => (
            <motion.div key={project._id}
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[32px] sm:rounded-[40px] border border-zinc-100 flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden group">
              
              {/* Image Area */}
              <div className="aspect-[16/10] bg-zinc-50 relative overflow-hidden">
                {project.imageUrl 
                  ? <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  : <div className="w-full h-full flex items-center justify-center text-zinc-200"><Briefcase size={48} /></div>}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>

              {/* Card Body */}
              <div className="p-8 sm:p-12 flex flex-col flex-1">
                <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                  <h4 className="font-black text-[#0D0D0D] text-2xl sm:text-3xl tracking-tight uppercase italic leading-none">{project.name}</h4>
                  <p className="text-[15px] sm:text-[17px] text-zinc-400 leading-relaxed font-medium line-clamp-2">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-3 mb-12">
                  {project.stack?.map((s: string) => (
                    <span key={s} className="text-[10px] px-4 py-2 bg-zinc-100/50 border border-zinc-100 rounded-xl text-[#0D0D0D] font-black uppercase tracking-[0.2em]">{s}</span>
                  ))}
                </div>

                {/* Footer Actions - Matching the Design */}
                <div className="mt-auto flex items-center justify-between bg-zinc-50/50 rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-zinc-100/50">
                  <button onClick={() => { setEditing(project); setOpen(true); }}
                    className="flex items-center gap-3 sm:gap-4 px-4 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-500 hover:text-black transition-all group">
                    <Edit2 size={14} className="text-zinc-300 group-hover:text-black transition-colors sm:w-4 sm:h-4" />
                    Edit Details
                  </button>
                  <button onClick={() => handleDelete(project._id)}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg sm:rounded-xl transition-all">
                    <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
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
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col border border-white/20"
              style={{ maxHeight: '90vh' }}
            >
              {/* Header */}
              <div className="px-6 sm:px-12 pt-8 sm:pt-14 pb-6 sm:pb-8 border-b border-zinc-100 bg-white shrink-0">
                <p className="text-[9px] sm:text-[11px] font-black text-zinc-300 uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-4 sm:mb-[16px]">Project Management // System</p>
                <div className="flex items-center justify-between gap-4 sm:gap-6">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0D0D0D] tracking-tighter uppercase italic leading-[1] sm:leading-[0.8] py-1 sm:py-2">
                    {editing?._id ? "Edit Project" : "New Project"}
                  </h3>
                  <button 
                    onClick={() => setOpen(false)}
                    className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 text-zinc-400 hover:text-[#0D0D0D] rounded-lg sm:rounded-xl transition-all border border-zinc-100"
                  >
                    <X size={20} className="sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>

              {/* Scrollable Form body */}
              <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 sm:py-10 bg-white custom-scrollbar">
                <form onSubmit={handleSave} className="space-y-8 sm:space-y-12">
                  
                  {/* Section: Core Identity */}
                  <div className="space-y-6 sm:space-y-8">
                    <p className="text-[10px] sm:text-[11px] font-black text-zinc-300 uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-3 sm:mb-[12px]">Core Identity</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                      <div className="space-y-[10px]">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 block">Title</label>
                        <input 
                          required 
                          value={editing?.name || ""} 
                          onChange={e => setEditing({ ...editing, name: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded-xl px-[20px] py-[16px] text-[14px] font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300"
                          placeholder="Project Name" 
                        />
                      </div>
                      <div className="space-y-[10px]">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 block">Stack</label>
                        <input 
                          value={editing?.stack?.join(", ") || ""} 
                          onChange={e => setEditing({ ...editing, stack: e.target.value.split(",").map((s: string) => s.trim()) })}
                          className="w-full bg-white border border-zinc-200 rounded-xl px-[20px] py-[16px] text-[14px] font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300"
                          placeholder="Tech Stack" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                      <div className="space-y-[10px]">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 block">Display Order</label>
                        <input 
                          type="number"
                          value={editing?.order || 0} 
                          onChange={e => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })}
                          className="w-full bg-white border border-zinc-200 rounded-xl px-[20px] py-[16px] text-[14px] font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300"
                          placeholder="e.g. 1" 
                        />
                      </div>
                      <div className="space-y-[10px]">
                        {/* Placeholder for symmetry */}
                      </div>
                    </div>

                    <div className="space-y-[10px]">
                      <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1 block">Narrative</label>
                      <textarea 
                        required 
                        rows={5} 
                        value={editing?.description || ""} 
                        onChange={e => setEditing({ ...editing, description: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-lg sm:rounded-xl px-4 sm:px-[20px] py-4 sm:py-[20px] text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all resize-none leading-relaxed placeholder:text-zinc-300"
                        placeholder="Project Description" 
                      />
                    </div>
                  </div>

                  {/* Section: Assets & Deployment */}
                  <div className="space-y-6 sm:space-y-8">
                    <p className="text-[10px] sm:text-[11px] font-black text-zinc-300 uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-3 sm:mb-[12px]">Assets & Deployment</p>
                    
                    <div className="space-y-2 sm:space-y-[10px]">
                      <label className="text-[9px] sm:text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1 block">Visual Asset URL</label>
                      <input 
                        value={editing?.imageUrl || ""} 
                        onChange={e => setEditing({ ...editing, imageUrl: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-lg sm:rounded-xl px-4 sm:px-[20px] py-3 sm:py-[16px] text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300"
                        placeholder="Image URL" 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-[24px]">
                      <div className="space-y-2 sm:space-y-[10px]">
                        <label className="text-[9px] sm:text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1 block">Source Code</label>
                        <input 
                          value={editing?.githubUrl || ""} 
                          onChange={e => setEditing({ ...editing, githubUrl: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded-lg sm:rounded-xl px-4 sm:px-[20px] py-3 sm:py-[16px] text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300"
                          placeholder="GitHub Link" 
                        />
                      </div>
                      <div className="space-y-[10px]">
                        <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-1 block">Live Endpoint</label>
                        <input 
                          value={editing?.liveUrl || ""} 
                          onChange={e => setEditing({ ...editing, liveUrl: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded-xl px-[20px] py-[16px] text-sm font-medium text-[#0D0D0D] focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-300"
                          placeholder="Deployment Link" 
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer Action */}
              <div className="px-[48px] py-[32px] bg-white border-t border-zinc-100 shrink-0">
                <button 
                  onClick={handleSave}
                  className="w-full bg-[#0D0D0D] hover:bg-zinc-800 text-white font-black uppercase tracking-[0.3em] text-[13px] py-[20px] rounded-full transition-all flex items-center justify-center gap-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-[0.98]"
                >
                  <Save size={20} />
                  <span className="translate-x-[3px]">{editing?._id ? "Synchronize Repository" : "Initialize Project"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


    </div>
  );
}
