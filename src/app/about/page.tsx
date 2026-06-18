import Link from 'next/link'
import TracingTimeline from '@/components/TracingTimeline'
import ScrollReveal from '@/components/ScrollReveal'
import TextReveal from '@/components/TextReveal'
import { CheckCircle2 } from 'lucide-react'
import WebGlobe3D from '@/components/three/WebGlobe3D'

export default function About() {
  const values = [
    { title: 'Community First', desc: 'People before projects. Always. An environment filled with innovation and teamwork. We grow by lifting each other up' },
    { title: 'Open to All', desc: 'No prerequisites except curiosity. Students of all branches and backgrounds deserve a space to discover new skills and solve problem together.' },
    { title: 'Bias for Action', desc: 'Build first. Perfect later. Shipping code is the ultimate proof of learning. The club celebrates trying,falling, and improving.' },
    { title: 'Think Big', desc: 'Transforming classroom exercises into products that can have real-world campus impact. Every effort is aimed at making learning meaningful.' }
  ]

  const milestones = [
    { date: '2017', title: 'The First Bit', desc: 'Founded with a singular vision: to break down the barriers of complex tech education and build an unstructured sanctuary for builders on campus.' },
    { date: '2018 — 2021', title: 'The Core Stack', desc: 'Focused on open-source development, internal technical bootcamps, and engineering our first cohort of specialized web, AI, and systems domains.' },
    { date: '2022 — 2024', title: 'Scaling The Network', desc: 'Expanded into an institutional powerhouse—hosting national-level hackathons, forming strategic industry links, and cross-collaborating across technical ecosystems.' },
    { date: '2025', title: 'Mindzilla', desc: 'Launched our flagship technical coding sprint at AdVITya. High-energy problem solving that pushed competitive programming and algorithmic thinking to the absolute limit.' },
    { date: '2026', title: 'Playtopia', desc: 'Proved that builders know how to play. Orchestrated a massive non-technical gaming and interactive arena, creating a high-octane entertainment hub for the entire campus.' },
    { date: 'Present', title: 'The 500+ Ecosystem', desc: 'Operating as a fully self-sustaining community of engineers, designers, and creators—constantly shipping code, hosting events, and defining campus tech culture.' }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section — transparent so global Nexus background shows through */}
      <section className="py-18 md:py-22 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col md:flex-row-reverse md:items-center justify-between gap-8 md:gap-12 py-2">
            <div className="max-w-2xl space-y-6 text-left">
              <ScrollReveal>
                <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Our Story</div>
              </ScrollReveal>
              <TextReveal
                text="More Than Code. We Build Community."
                className="font-sans font-bold text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]"
              />
              <ScrollReveal delay={0.1}>
                <p className="text-text-sec text-base md:text-lg max-w-2xl leading-relaxed">
                  Bit By Bit Club is more than just a student club — it is a space where curiosity turns into creativity and ideas turn into experiences. Built by students, for students, the club brings together tech enthusiasts, creators, and learners who believe in exploring, experimenting, and growing together. At Bit By Bit, learning goes beyond classrooms and code.
                </p>
              </ScrollReveal>
            </div>
            
            <div className="hidden md:flex justify-center items-center flex-shrink-0">
              <WebGlobe3D />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pb-22 md:pb-26 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Mission and values details */}
          <div className="space-y-6">
            <ScrollReveal>
              <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Mission &amp; Vision</div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-foreground">
                Why We Exist.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-text-sec text-sm leading-relaxed">
                The club focuses on creating opportunities where students can discover new skills, collaborate on ideas, solve problems, and challenge themselves in an environment filled with innovation and teamwork.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-text-sec text-sm leading-relaxed">
                Whether it’s through technical activities, interactive events, or creative initiatives, every effort is aimed at making learning more engaging and meaningful. The club celebrates the process of trying, failing, learning, and improving.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="text-text-sec text-sm leading-relaxed">
                With every event, project, and collaboration, Bit By Bit continues to grow as a community that inspires innovation, builds connections, and help students take their next step - One Bit at a time.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {values.map((v, idx) => (
                <ScrollReveal key={v.title} delay={idx * 0.08}>
                  <div className="p-5 rounded-xl border border-border-custom bg-background/50 h-full">
                    <h4 className="font-sans font-bold text-sm text-foreground flex items-center gap-2 mb-2">
                      <CheckCircle2 size={16} className="text-primary" />
                      {v.title}
                    </h4>
                    <p className="text-text-sec text-xs leading-relaxed">{v.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Interactive Timeline Progress */}
          <div className="space-y-6 md:pl-6">
            <ScrollReveal>
              <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Journey</div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-foreground mb-6">
                From 0 to 500+.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <TracingTimeline items={milestones} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 text-center relative overflow-hidden transition-colors duration-300">
        <div className="max-w-xl mx-auto px-6 space-y-6 relative z-10">
          <ScrollReveal>
            <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Be Part of It</div>
          </ScrollReveal>
          <TextReveal
            text="Your Story Starts Here."
            as="h2"
            className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-foreground justify-center"
          />
          <ScrollReveal delay={0.1}>
            <p className="text-text-sec text-sm leading-relaxed">
              Every great builder was once a beginner. Come as you are. Leave as a creator. Apply to join our core domains or check upcoming public sessions.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex justify-center gap-3 pt-4">
              <Link
                href="/contact#join"
                className="px-6 py-3 font-mono text-xs uppercase font-bold tracking-wider text-white bg-primary hover:bg-primary-hover rounded-full transition-all duration-200"
              >
                Apply Now ⚡
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 font-mono text-xs uppercase font-bold tracking-wider text-text-sec hover:text-foreground bg-card-bg/60 border border-border-custom rounded-full transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
