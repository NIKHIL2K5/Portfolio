"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, Trash2, Loader2, MessageCircle, Inbox } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/messages").then(r => r.json()).then(d => { setMessages(d.messages || []); setLoading(false); });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
    if (res.ok) setMessages(prev => prev.filter(m => m._id !== id));
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <Loader2 className="animate-spin text-zinc-300" size={36} />
      <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">Loading Messages</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">

      {/* Section Header */}
      <div className="flex items-end justify-between mb-24">
        <div>
          <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.8em] mb-6">Communication // Studio Protocol</p>
          <h2 className="text-6xl font-black text-[#0D0D0D] tracking-tighter uppercase italic leading-none">
            Messages <span className="text-zinc-200 font-medium text-4xl ml-4">({messages.length})</span>
          </h2>
        </div>
        {/* Summary badge */}
        <div className="flex items-center gap-6 bg-white border border-zinc-100 rounded-3xl px-8 py-5 shadow-sm">
          <Inbox size={22} className="text-zinc-400" />
          <div className="flex flex-col">
            <span className="text-[14px] font-black text-[#0D0D0D] uppercase tracking-widest leading-none mb-1">{messages.length}</span>
            <span className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">Inbound Node</span>
          </div>
        </div>
      </div>

      {/* List */}
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 rounded-2xl border-2 border-dashed border-zinc-100 bg-white">
          <MessageCircle size={40} className="text-zinc-200 mb-4" />
          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">No Messages Yet</p>
          <p className="text-[9px] text-zinc-300 mt-2">Messages from your portfolio contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg, i) => (
            <motion.div key={msg._id}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[32px] border border-zinc-100 p-8 flex gap-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 group items-center">

              {/* Icon Container */}
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:bg-[#0D0D0D] transition-colors duration-500">
                <Mail size={24} className="text-zinc-300 group-hover:text-white transition-colors" />
              </div>

              {/* Content Section */}
              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex items-center justify-between gap-6">
                  <div className="space-y-1">
                    <p className="font-black text-[#0D0D0D] text-lg tracking-tight uppercase italic leading-none">{msg.name}</p>
                    <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em]">{msg.email}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2 text-[9px] font-black text-zinc-300 uppercase tracking-widest bg-zinc-50 border border-zinc-100 px-4 py-2 rounded-full">
                    <Clock size={12} />
                    {new Date(msg.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-50 rounded-full" />
                  <p className="text-[15px] text-zinc-400 font-medium leading-relaxed tracking-wide italic">&ldquo;{msg.message}&rdquo;</p>
                </div>
              </div>

              {/* Delete Section */}
              <button onClick={() => handleDelete(msg._id)}
                className="shrink-0 p-5 bg-red-50 hover:bg-red-500 text-red-400 hover:text-white rounded-2xl transition-all duration-300 border border-red-100 hover:border-red-500 shadow-sm self-center">
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
