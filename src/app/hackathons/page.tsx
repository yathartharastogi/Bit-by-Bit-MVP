import Link from 'next/link'
import Countdown from '@/components/Countdown'
import Faq from '@/components/Faq'
import SpotlightCard from '@/components/SpotlightCard'
import ScrollReveal from '@/components/ScrollReveal'
import TextReveal from '@/components/TextReveal'
import TracingTimeline from '@/components/TracingTimeline'
import { Sparkles, Calendar, MapPin, Award } from 'lucide-react'

export default function Hackathons() {
  const pastEditions = [
    { title: 'BitHack 2024', stats: '240 participants · 42 teams · 36 hours', prize: '₹1L Prize Pool' },
    { title: 'BitHack 2023', stats: '180 participants · 30 teams · 36 hours', prize: '₹75K Prize Pool' },
    { title: 'BitHack 2022', stats: '120 participants · 24 teams · 24 hours', prize: '₹50K Prize Pool' }
  ]

  const hallOfFame = [
    { rank: '🥇 1st Place', team: 'Team Quantum', details: 'BitHack 2024 · AI-powered campus navigation app', prize: '₹50,000' },
    { rank: '🥈 2nd Place', team: 'Team Nexus', details: 'BitHack 2024 · Decentralized student peer-to-peer marketplace', prize: '₹25,000' },
    { rank: '🎖️ Winner', team: 'Team ByteForce', details: 'BitHack 2023 · Real-time collaborative terminal code editor', prize: '₹37,500' }
  ]

  const timeline = [
    { day: 'Day 0', title: 'Opening & Scrambles', desc: 'Check-in, opening ceremony remarks, theme announcements, and team formation scrambles.' },
    { day: 'Day 1 — 10:00 AM', title: 'Hacking Begins', desc: 'Hacking clock officially starts. Mentorship sessions, API workshops, and checkpoint 1 starts.' },
    { day: 'Day 1 — Midnight', title: 'Midnight Review', desc: 'Seniors and domain leads check in for technical troubleshooting. Fuel and snacks served.' },
    { day: 'Day 2 — 10:00 PM', title: 'Code Freeze', desc: 'Submissions closed on GitHub. Project video recordings and pitch templates uploaded.' },
    { day: 'Day 2 — 11:00 PM', title: 'Pitching & Awards', desc: 'Top 10 teams pitch live to judges. Winners announced. Closing celebration.' }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Page Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 space-y-6 text-left relative z-10">
          <ScrollReveal>
            <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Flagship Hackathons</div>
          </ScrollReveal>
          
          <TextReveal
            text="36 Hours to Change Everything."
            className="font-sans font-bold text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]"
          />
          
          <ScrollReveal delay={0.2}>
            <p className="text-text-sec text-base md:text-lg max-w-xl leading-relaxed">
              BitHack is where ideas become prototypes, strangers become teammates, and students become engineers. Our flagship series has launched student careers.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Countdown */}
      <section className="py-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <SpotlightCard className="p-8 bg-background border border-border-custom relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
                <div className="space-y-4 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold text-[#a855f7] bg-[#a855f7]/10 rounded-full border border-[#a855f7]/20">
                    <Sparkles size={12} />
                    REGISTRATION OPEN
                  </div>
                  <h2 className="font-sans font-bold text-2xl md:text-3xl text-foreground">BitHack 2026</h2>
                  <p className="text-text-sec text-xs md:text-sm max-w-lg leading-relaxed">
                    VIT Bhopal's biggest student-run hackathon is back. Join hundreds of developers, designers, and innovators to build products from scratch in 36 hours.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-1.5 text-text-sec text-xs font-mono">
                      <Calendar size={14} className="text-[#a855f7]" />
                      October 25–26, 2026
                    </div>
                    <div className="flex items-center gap-1.5 text-text-sec text-xs font-mono">
                      <MapPin size={14} className="text-[#a855f7]" />
                      VIT Bhopal Campus
                    </div>
                    <div className="flex items-center gap-1.5 text-text-sec text-xs font-mono">
                      <Award size={14} className="text-[#a855f7]" />
                      ₹1.5L Prize Pool
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <Link
                      href="/events"
                      className="px-6 py-2.5 font-mono text-xs uppercase font-bold tracking-wider text-white bg-primary hover:bg-primary-hover rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    >
                      Register Now
                    </Link>
                    <Link
                      href="/contact"
                      className="px-6 py-2.5 font-mono text-xs uppercase font-bold tracking-wider text-text-sec hover:text-foreground bg-card-bg border border-border-custom rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    >
                      Ask Questions
                    </Link>
                  </div>
                </div>

                {/* Countdown Box */}
                <div className="p-6 rounded-2xl border border-border-custom bg-card-bg text-center min-w-[260px] max-w-sm flex flex-col justify-center items-center">
                  <div className="font-mono text-[9px] text-[#a855f7] font-bold uppercase tracking-wider mb-4">
                    Hacking begins in
                  </div>
                  <Countdown targetDate="2026-10-25T10:00:00Z" />
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Hall of Fame & Timeline */}
      <section className="py-24 border-b border-border-custom transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Hall of fame */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <ScrollReveal>
                <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Winners</div>
              </ScrollReveal>
              <TextReveal
                text="Hall of Fame."
                as="h2"
                className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-foreground"
              />
            </div>

            <div className="flex flex-col gap-4">
              {hallOfFame.map((winner, idx) => (
                <ScrollReveal key={winner.team} delay={idx * 0.1}>
                  <SpotlightCard className="p-5 bg-card-bg border border-border-custom">
                    <div className="flex items-start gap-4 w-full text-left">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 text-lg flex items-center justify-center flex-shrink-0">
                        🏆
                      </div>
                      <div>
                        <span className="font-mono text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                          {winner.rank}
                        </span>
                        <h3 className="font-sans font-bold text-sm text-foreground mt-2 mb-1">
                          {winner.team}
                        </h3>
                        <p className="text-text-sec text-xs leading-relaxed mb-2">
                          {winner.details}
                        </p>
                        <span className="font-mono text-xs text-primary font-bold">{winner.prize}</span>
                      </div>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <h3 className="font-sans font-bold text-lg text-foreground pt-6 pb-2">Past Editions</h3>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pastEditions.map((pe, idx) => (
                <ScrollReveal key={pe.title} delay={idx * 0.08} className="h-full">
                  <SpotlightCard className="p-4 border border-border-custom bg-card-bg h-full text-left">
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <h4 className="font-sans font-bold text-xs text-foreground mb-1">{pe.title}</h4>
                        <p className="text-text-sec text-[10px] leading-tight mb-2">{pe.stats}</p>
                      </div>
                      <span className="font-mono text-[10px] text-primary font-semibold block mt-2">{pe.prize}</span>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Timeline / Schedule */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <ScrollReveal>
                <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Schedule</div>
              </ScrollReveal>
              <TextReveal
                text="Event Timeline."
                as="h2"
                className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-foreground"
              />
            </div>

            <div className="mt-6">
              <ScrollReveal delay={0.2}>
                <TracingTimeline items={timeline} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <ScrollReveal>
              <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Questions</div>
            </ScrollReveal>
            <TextReveal
              text="Frequently Asked Questions."
              as="h2"
              className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-foreground justify-center"
            />
          </div>

          <ScrollReveal delay={0.15}>
            <Faq />
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
