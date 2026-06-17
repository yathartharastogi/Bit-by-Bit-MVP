'use client'
import React from 'react'
import Link from 'next/link'

export default function ScalePotential() {
  return (
    <section className="relative py-32 px-6 text-center overflow-hidden bg-[#020617] z-10">
      {/* 
          BG-COLOR: bg-[#020617] is solid black. 
          This blocks the 'grid-pattern' and 'orb' from appearing behind this section.
      */}
      
      {/* Huge background text (Watermark style) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <h2 className="text-[20vw] font-black text-white/[0.03] leading-none uppercase tracking-tighter">
          SCALE
        </h2>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-center gap-4 mb-6">
           <div className="h-px w-8 bg-blue-500" />
           <span className="font-mono text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase">Bit-By-Bit</span>
           <div className="h-px w-8 bg-blue-500" />
        </div>
        
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-none">
          SCALE YOUR <br />
          <span className="outline-text">
            POTENTIAL.
          </span>
        </h2>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-medium opacity-70">
          Where every bit of innovation counts. <br /> Join the movement.
        </p>

        <div className="pt-8">
          <Link href="/contact" className="group relative inline-flex items-center gap-3 px-10 py-4 bg-blue-600 text-white font-bold rounded-full hover:scale-105 transition-all shadow-2xl shadow-blue-500/30">
            CONNECT WITH US
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}   