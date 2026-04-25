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
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.35em] mb-1">Communication Stream</p>
          <h2 className="text-2xl font-black text-[#0D0D0D] tracking-tight">
            Messages <span className="text-zinc-200 font-medium text-xl">({messages.length})</span>
          </h2>
        </div>
        {/* Summary badge */}
        <div className="flex items-center gap-2 bg-white border border-zinc-100 rounded-xl px-4 py-2.5 shadow-sm">
          <Inbox size={14} className="text-zinc-400" />
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{messages.length} Inbound</span>
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
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <motion.div key={msg._id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-zinc-100 p-6 flex gap-5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-400 group items-start">

              {/* Avatar */}
              <div className="w-11 h-11 shrink-0 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:bg-[#0D0D0D] transition-colors duration-400">
                <Mail size={16} className="text-zinc-300 group-hover:text-white transition-colors" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-black text-[#0D0D0D] text-base tracking-tight">{msg.name}</p>
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{msg.email}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5 text-[8px] font-black text-zinc-400 uppercase tracking-widest bg-zinc-50 border border-zinc-100 px-2.5 py-1.5 rounded-lg">
                    <Clock size={9} />
                    {new Date(msg.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>
                <p className="text-[13px] text-zinc-600 leading-relaxed italic">&ldquo;{msg.message}&rdquo;</p>
              </div>

              {/* Delete */}
              <button onClick={() => handleDelete(msg._id)}
                className="shrink-0 p-2.5 bg-red-50 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all border border-red-100 hover:border-red-500 self-center">
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
