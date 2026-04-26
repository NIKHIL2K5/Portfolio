"use client";

import { motion } from "framer-motion";

import { LayoutDashboard, Briefcase, Clock, BookOpen, Star, User, MessageCircle, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

const getAdminNav = (token: string) => [
  { name: "Overview", href: `/admin/approval/${token}`, icon: <LayoutDashboard size={20} /> },
  { name: "Projects", href: `/admin/approval/${token}/projects`, icon: <Briefcase size={20} /> },
  { name: "Experience", href: `/admin/approval/${token}/experience`, icon: <Clock size={20} /> },
  { name: "Blogs", href: `/admin/approval/${token}/blogs`, icon: <BookOpen size={20} /> },
  { name: "Testimonials", href: `/admin/approval/${token}/testimonials`, icon: <Star size={20} /> },
  { name: "Profile", href: `/admin/approval/${token}/profile`, icon: <User size={20} /> },
  { name: "Messages", href: `/admin/approval/${token}/messages`, icon: <MessageCircle size={20} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;
  const adminNav = token ? getAdminNav(token) : [];

  const handleLogout = () => {
    document.cookie = `admin_token=; Max-Age=0; path=/;`;
    router.push('/admin');
  };

  if (!token) return null;

  useEffect(() => {
    // Optionally set cookie for API routes if needed
    document.cookie = `admin_token=${token}; Max-Age=1800; path=/;`;
  }, [token]);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans text-[#0D0D0D]">
      {/* Sidebar - Fixed 320px */}
      <aside className="w-80 h-full bg-black/90 backdrop-blur-xl flex flex-col justify-between shrink-0 relative z-30 shadow-2xl gap-10">
        {/* Top Profile Section */}

        <div className="py-12 flex flex-col items-center border-b border-white/5">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(255,255,255,0.1)] ring-4 ring-white/5">
            <span className="text-black text-2xl font-black italic">N</span>
          </div>
          <h1 className="text-[11px] font-black tracking-[0.5em] text-white uppercase italic opacity-80">
            NIKHIL.ADMIN
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-8 py-12 overflow-y-auto flex flex-col gap-6 no-scrollbar ">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            // const isOverview = item.name === "Overview";
            // const isProfile = item.name === "Profile";

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-center gap-4 px-6 py-4 text-center text-sm font-medium transition-all ${isActive
                    ? "bg-white/10 text-white border-l-2 border-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
              >
                
                <div className="flex justify-center items-center gap-4 ">
                  <div className={`transition-all duration-300 ${isActive ? "text-white" : "text-white/50 group-hover:text-white"}`}>
                    {item.icon}
                  </div>
                  <span className="text-[13px] font-semibold uppercase" style={{ letterSpacing: "0.32em" }}>
                    {item.name}
                  </span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    className="w-2 h-2 rounded-full bg-white shadow-[0_0_12px_white]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-8 flex flex-col gap-6 border-t border-white/5 bg-[#0D0D0D]">
          {/* User Card */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4 group cursor-pointer hover:bg-white/[0.05] transition-all">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white border border-white/10">
              NA
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-bold text-white tracking-tight">Admin Panel</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] text-white/40">Active</span>
              </div>
            </div>
            <ChevronDown size={14} className="text-white/20" />
          </div>

          {/* Terminate Button */}
          <button
            onClick={handleLogout}
            className="w-full h-14 bg-[#E5E7EB] hover:bg-white text-[#FF3B30] rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 font-bold uppercase tracking-widest text-[11px] shadow-lg active:scale-95 group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Terminate</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full flex flex-col relative overflow-hidden bg-zinc-50/50">
        {/* System Header - Solid White */}
        <header className="h-20 shrink-0 flex items-center justify-between border-b border-zinc-200 bg-white sticky top-0 z-40" style={{ paddingLeft: '56px', paddingRight: '56px' }}>
          <div className="space-y-3">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.6em] leading-none">System Dashboard</p>
            <h2 className="text-4xl font-black tracking-tighter text-[#0D0D0D] py-2 uppercase italic leading-tight">
              {adminNav.find(n => n.href === pathname)?.name || "Overview"}
            </h2>
            <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
              <span>Admin</span>
              <span className="text-zinc-200 font-normal">/</span>
              <span className="text-zinc-600">{adminNav.find(n => n.href === pathname)?.name || "Overview"}</span>
            </div>
          </div>

          <div className="flex items-center gap-7">
            {/* Profile Link */}
            <Link href={`/admin/approval/${token}/profile`} className="w-10 h-10 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center hover:scale-105 transition-all shadow-xl hover:shadow-black/20">
              <User size={18} />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto scroll-smooth relative" style={{ paddingLeft: '56px', paddingRight: '56px', paddingTop: '48px', paddingBottom: '80px' }}>
          {/* Subtle Blue Glow Effect at bottom */}
          <div className="fixed bottom-0 right-0 w-[50vw] h-[30vh] bg-blue-500/5 blur-[120px] pointer-events-none z-0" />

          <div className="max-w-[1400px] relative z-10">
            {children}
          </div>
        </div>
      </main>
    </div >
  );
}
