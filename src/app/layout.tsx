import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import CursorFollower from "@/components/ui/CursorFollower";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Nikhil | Portfolio - Full Stack Developer",
  description: "Explore the signature portfolio of Nikhil, a Full Stack Developer specializing in AI, Automation, and App Development.",
  icons: {
    icon: "/nikhilhomepage.png",
    shortcut: "/nikhilhomepage.png",
    apple: "/nikhilhomepage.png",
  }
};

import PageTransition from "@/components/animations/PageTransition";
import Preloader from "@/components/ui/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-black text-white`}>
        <Preloader />
        <SmoothScroll>
          <CursorFollower />
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
