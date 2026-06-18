'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { type ReactNode } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import TextReveal from '@/components/TextReveal'
import SpotlightCard from '@/components/SpotlightCard'

// ─── Lazy-load heavy 3-D pieces (no SSR) ──────────────────────────────────────
const SceneWrapper = dynamic(() => import('@/components/three/SceneWrapper'), { ssr: false })
const CpuCoin3D = dynamic(() => import('@/components/three/CpuCoin3D'), { ssr: false })

// ─── Types ────────────────────────────────────────────────────────────────────
interface Domain {
  name: string
  icon: ReactNode
  desc: string
  tags: string
}

interface DomainsCPUSectionProps {
  domains: Domain[]
}

// ─── Single reusable domain card ──────────────────────────────────────────────
function DomainCard({ domain, delay }: { domain: Domain; delay: number }) {
  return (
    <ScrollReveal delay={delay}>
      <SpotlightCard className="p-5 flex flex-col border border-border-custom bg-card-bg hover:-translate-y-1.5 transition-all duration-300 group h-full">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
            {domain.icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-sans font-bold text-sm text-foreground mb-0.5">{domain.name}</h3>
            <span className="font-mono text-[9px] font-semibold text-primary tracking-tight px-1.5 py-0.5 rounded border border-primary/20 bg-primary/5">
              {domain.tags}
            </span>
          </div>
        </div>
        <p className="text-text-sec text-xs leading-relaxed">{domain.desc}</p>
      </SpotlightCard>
    </ScrollReveal>
  )
}

// ─── Main exported component ──────────────────────────────────────────────────
export default function DomainsCPUSection({ domains }: DomainsCPUSectionProps) {
  const leftDomains = domains.slice(0, 2)
  const rightDomains = domains.slice(2, 5)

  return (
    <section className="py-24 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Three-column grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">

          {/* ── LEFT: Section header + 2 domain cards ───────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="space-y-3">
              <ScrollReveal>
                <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
                  What We Do
                </div>
              </ScrollReveal>

              <TextReveal
                text="Find Your Domain."
                as="h2"
                className="font-sans font-bold text-3xl tracking-tight text-foreground"
              />

              <ScrollReveal delay={0.1}>
                <p className="text-text-sec text-sm leading-relaxed max-w-xs">
                  Every skill has a home here. Build, design, write, or organize — pick your path
                  and grow with people who share your passion.
                </p>
              </ScrollReveal>
            </div>

            {/* First 2 domain cards */}
            <div className="flex flex-col gap-4">
              {leftDomains.map((domain, idx) => (
                <DomainCard key={domain.name} domain={domain} delay={idx * 0.07} />
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div
              className="relative w-[360px] xl:w-[420px] aspect-square"
              aria-hidden="true"
            >
              {/* Glow halo behind the model */}
              <div className="absolute inset-0 rounded-full bg-primary/15 blur-3xl scale-75 pointer-events-none" />

              <Suspense fallback={
                <div className="w-full h-full rounded-3xl bg-primary/5 animate-pulse" />
              }>
                <SceneWrapper
                  className="w-full h-full"
                  demandFrameloop={false}
                  camera={{ position: [0, 1.2, 4.8], fov: 52 }}
                >
                  <CpuCoin3D />
                </SceneWrapper>
              </Suspense>
            </div>
          </div>

          {/* ── RIGHT: 3 domain cards ────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {rightDomains.map((domain, idx) => (
              <DomainCard key={domain.name} domain={domain} delay={(idx + 2) * 0.07} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
