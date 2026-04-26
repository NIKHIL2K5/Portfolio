"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Globe, Share2, CheckCircle, Link2, Briefcase, CodeXml, PlayCircle, Camera } from "lucide-react";

export default function AdminProfile() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState({
    email: "", location: "",
    stats: { yearsOfExp: "", projectsCompleted: "", technologiesMastered: "" },
    socialLinks: { linkedin: "", github: "", youtube: "", instagram: "" }
  });

  useEffect(() => {
    setMounted(true);
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

  if (!mounted) return null;

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <Loader2 className="animate-spin text-zinc-300" size={36} />
      <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">Loading Profile</p>
    </div>
  );

  return (
    <div className="space-y-12 pb-24 max-w-5xl">

      {/* Section Header */}
      <div className="flex items-end justify-between mb-24">
        <div>
          <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.6em] mb-4">Identity // Control</p>
          <h2 className="text-6xl font-black text-[#0D0D0D] tracking-tighter uppercase italic leading-none">Profile Settings</h2>
        </div>
        <button onClick={handleSave} disabled={saving}
          className={`flex items-center gap-6 px-16 py-8 rounded-[32px] text-[13px] font-black uppercase tracking-[0.25em] active:scale-95 transition-all shadow-[0_25px_50px_rgba(0,0,0,0.15)] disabled:opacity-50 ${
            saved ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-[#0D0D0D] text-white hover:bg-zinc-800"
          }`}>
          {saving ? <Loader2 className="animate-spin" size={20} /> : saved ? <CheckCircle size={20} /> : <Save size={20} />}
          {saved ? "Synchronized" : "Synchronize Identity"}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="space-y-6">
        <div className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.6em] mb-4 flex items-center gap-4">
          <span>Portfolio Analytics</span>
          <div className="flex-1 h-px bg-zinc-100" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Years of Experience", key: "yearsOfExp", placeholder: "5+" },
            { label: "Projects Completed", key: "projectsCompleted", placeholder: "30+" },
            { label: "Technologies Mastered", key: "technologiesMastered", placeholder: "20+" },
          ].map((stat, i) => (
            <motion.div key={stat.key}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[32px] border border-zinc-100 p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all">
              <label className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.4em] block mb-5 italic">{stat.label}</label>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">

        {/* Contact Details */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-[40px] border border-zinc-100 p-12 space-y-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-5 pb-6 border-b border-zinc-50">
            <div className="w-12 h-12 rounded-2xl bg-[#0D0D0D] text-white flex items-center justify-center shadow-xl">
              <Globe size={18} />
            </div>
            <div>
              <h4 className="font-black text-[#0D0D0D] text-lg uppercase italic tracking-tight">Identity Node</h4>
              <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em]">Global Coordinates</p>
            </div>
          </div>
          <div className="space-y-8">
            {[
              { label: "Showcased Email", key: "email", placeholder: "name@email.com", type: "email" },
              { label: "Location", key: "location", placeholder: "City, Country", type: "text" },
            ].map(f => (
              <div key={f.key} className="space-y-3">
                <label className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.4em] ml-1">{f.label}</label>
                <input type={f.type}
                  value={(data as any)[f.key] || ""}
                  onChange={e => setData({ ...data, [f.key]: e.target.value })}
                  className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-zinc-400 text-[#0D0D0D] font-bold tracking-wide transition-all placeholder:text-zinc-200"
                  placeholder={f.placeholder}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-[40px] border border-zinc-100 p-12 space-y-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-5 pb-6 border-b border-zinc-50">
            <div className="w-12 h-12 rounded-2xl bg-[#0D0D0D] text-white flex items-center justify-center shadow-xl">
              <Share2 size={18} />
            </div>
            <div>
              <h4 className="font-black text-[#0D0D0D] text-lg uppercase italic tracking-tight">Social Ecosystem</h4>
              <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em]">Digital Presence</p>
            </div>
          </div>
          <div className="space-y-6">
            {[
              { key: "linkedin", icon: "https://img.icons8.com/ios-glyphs/60/0077B5/linkedin.png", color: "bg-blue-50" },
              { key: "github", icon: "https://img.icons8.com/ios-glyphs/60/181717/github.png", color: "bg-zinc-100" },
              { key: "youtube", icon: "https://img.icons8.com/ios-glyphs/60/FF0000/youtube-play.png", color: "bg-red-50" },
              { key: "instagram", icon: "https://img.icons8.com/ios-glyphs/60/E4405F/instagram-new.png", color: "bg-pink-50" }
            ].map(({ key, icon, color }) => (
              <div key={key} className="flex items-center gap-4 group">
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300 p-3`}>
                  <img src={icon} alt={key} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">{key}</label>
                  <input
                    value={(data?.socialLinks as any)?.[key] || ""}
                    onChange={e => setData({ ...data, socialLinks: { ...data.socialLinks, [key]: e.target.value } })}
                    className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl px-6 py-4 text-[13px] focus:outline-none focus:border-zinc-400 text-[#0D0D0D] font-bold tracking-tight transition-all placeholder:text-zinc-200"
                    placeholder={`https://${key}.com/your-profile`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
