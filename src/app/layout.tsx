import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ParticleBackground from "@/components/ParticleBackground";
import NexusScene from "@/components/three/NexusScene";
import GlobalScrollBlur from "@/components/GlobalScrollBlur";
import ScalePotential from "@/components/ScalePotential";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bit-By-Bit Club — VIT Bhopal",
  description: "VIT Bhopal's premier tech community — a launchpad for developers, designers, and innovators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col pt-16">
        <Loader />
        <Navbar />

        {/* ── Global fixed background layers (back → front) ── */}
        {/* Layer 1: Nexus node network — deepest */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
          <NexusScene className="w-full h-full" />
        </div>

        {/* Layer 2: ParticleBackground binary rain + wireframes */}
        <ParticleBackground />

        {/* Layer 3: Global scroll-reactive blur overlay */}
        <GlobalScrollBlur />

        <main className="flex-grow flex flex-col relative" style={{ zIndex: 1 }}>
          {children}
          <ScalePotential/>
        </main>
        <Footer />
      </body>
    </html>
  );
}
