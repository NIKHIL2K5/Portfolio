"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Globe, Share2, CheckCircle } from "lucide-react";

export default function AdminProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState({
    email: "", location: "",
    stats: { yearsOfExp: "", projectsCompleted: "", technologiesMastered: "" },
    socialLinks: { linkedin: "", github: "", twitter: "", instagram: "" }
  });

  useEffect(() => {
    fetch("/api/admin/settings").then(r => r.json()).then(res => {
      if (res.settings) setData(res.settings);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    } catch { /* silent */ }
    setSaving(false);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <Loader2 className="animate-spin text-zinc-300" size={36} />
      <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">Loading Profile</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-20 max-w-4xl">

      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.35em] mb-1">Identity</p>
          <h2 className="text-2xl font-black text-[#0D0D0D] tracking-tight">Profile Settings</h2>
        </div>
        <button onClick={handleSave} disabled={saving}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] active:scale-95 transition-all shadow-lg disabled:opacity-50 ${
            saved ? "bg-emerald-500 text-white" : "bg-[#0D0D0D] text-white hover:bg-zinc-800"
          }`}>
          {saving ? <Loader2 className="animate-spin" size={14} /> : saved ? <CheckCircle size={14} /> : <Save size={14} />}
          {saved ? "Saved!" : "Synchronize"}
        </button>
      </div>

      {/* Stats Cards */}
      <div>
        <p className="text-[8px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-4">Portfolio Statistics</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Years of Experience", key: "yearsOfExp", placeholder: "5+" },
            { label: "Projects Completed", key: "projectsCompleted", placeholder: "30+" },
            { label: "Technologies Mastered", key: "technologiesMastered", placeholder: "20+" },
          ].map((stat, i) => (
            <motion.div key={stat.key}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm hover:shadow-md transition-all">
              <label className="text-[8px] font-black text-zinc-300 uppercase tracking-widest block mb-3">{stat.label}</label>
              <input
                value={(data?.stats as any)?.[stat.key] || ""}
                onChange={e => setData({ ...data, stats: { ...data.stats, [stat.key]: e.target.value } })}
                className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-2xl font-black focus:outline-none focus:border-zinc-300 text-[#0D0D0D] tracking-tighter transition-colors"
                placeholder={stat.placeholder}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact + Social */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Contact Details */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-5 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-50">
            <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center">
              <Globe size={14} className="text-zinc-400" />
            </div>
            <h4 className="font-black text-[#0D0D0D] text-sm uppercase italic tracking-tight">Contact Details</h4>
          </div>
          <div className="space-y-4">
            {[
              { label: "Showcased Email", key: "email", placeholder: "name@email.com", type: "email" },
              { label: "Location", key: "location", placeholder: "City, Country", type: "text" },
            ].map(f => (
              <div key={f.key} className="space-y-1.5">
                <label className="text-[8px] font-black text-zinc-300 uppercase tracking-widest">{f.label}</label>
                <input type={f.type}
                  value={(data as any)[f.key] || ""}
                  onChange={e => setData({ ...data, [f.key]: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-300 text-[#0D0D0D] font-medium transition-colors"
                  placeholder={f.placeholder}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-5 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-50">
            <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center">
              <Share2 size={14} className="text-zinc-400" />
            </div>
            <h4 className="font-black text-[#0D0D0D] text-sm uppercase italic tracking-tight">Social Ecosystem</h4>
          </div>
          <div className="space-y-4">
            {Object.keys(data?.socialLinks || {}).map(key => (
              <div key={key} className="space-y-1.5">
                <label className="text-[8px] font-black text-zinc-300 uppercase tracking-widest capitalize">{key}</label>
                <input
                  value={(data?.socialLinks as any)?.[key] || ""}
                  onChange={e => setData({ ...data, socialLinks: { ...data.socialLinks, [key]: e.target.value } })}
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-300 text-[#0D0D0D] font-medium transition-colors"
                  placeholder={`https://${key}.com/...`}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
