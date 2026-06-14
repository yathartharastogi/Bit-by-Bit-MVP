import Link from 'next/link'
import TracingTimeline from '@/components/TracingTimeline'
import ScrollReveal from '@/components/ScrollReveal'
import TextReveal from '@/components/TextReveal'
import { CheckCircle2 } from 'lucide-react'

export default function About() {
  const values = [
    { title: 'Community First', desc: 'People before projects. Always. We grow by lifting each other up.' },
    { title: 'Open to All', desc: 'No prerequisites except curiosity. Standard branch, age, or background is never a barrier.' },
    { title: 'Bias for Action', desc: 'Build first. Perfect later. Shipping code is the ultimate proof of learning.' },
    { title: 'Think Big', desc: 'Transforming classroom exercises into products that can have real-world campus impact.' }
  ]

  const milestones = [
    { date: 'September 2020', title: 'The Beginning', desc: '5 students with one shared laptop and infinite ambition founded the club in a hostel room.' },
    { date: 'January 2021', title: 'First Event: CodeSprint', desc: 'Our first competitive coding event drew 80 participants — 4× what we expected.' },
    { date: 'August 2021', title: 'BitHack 1.0', desc: '15 teams, 36 hours of non-stop building. The winner joined a top startup 6 months later.' },
    { date: '2022', title: '100 Active Members', desc: 'Launched 5 specialized domains. Hosted 12 hands-on workshops. Community grew organically through word of mouth.' },
    { date: '2023', title: 'National Recognition', desc: 'Hosted first national-level hackathon. Featured in college press. Secured sponsorships from industry partners.' },
    { date: '2024–Present', title: '500+ Members & Growing', desc: '24 events, 80+ workshops, and a community that keeps leveling up every single semester.' }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 space-y-6 text-left relative z-10">
          <ScrollReveal>
            <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Our Story</div>
          </ScrollReveal>
          
          <TextReveal
            text="More Than Code. We Build Community."
            className="font-sans font-bold text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]"
          />
          
          <ScrollReveal delay={0.2}>
            <p className="text-text-sec text-base md:text-lg max-w-2xl leading-relaxed">
              Bit-By-Bit Club was born from a simple belief — that students at VIT Bhopal deserve a space to build, fail, learn, and grow together without gatekeeping or prerequisites.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-card-bg border-y border-border-custom transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Mission and values details */}
          <div className="space-y-6">
            <ScrollReveal>
              <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Mission & Vision</div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-foreground">
                Why We Exist.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-text-sec text-sm leading-relaxed">
                Our mission is to democratize tech education and innovation at VIT Bhopal. Every student, regardless of branch or background, deserves access to world-class technical knowledge and a network that pushes them to do their best work.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-text-sec text-sm leading-relaxed">
                Our vision is a campus-wide culture of building — where the default response to an idea is "let's try it," where failure is celebrated as a step forward, and where your first project leads to your next opportunity.
              </p>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {values.map((v, idx) => (
                <ScrollReveal key={v.title} delay={idx * 0.08}>
                  <div className="p-5 rounded-xl border border-border-custom bg-background h-full">
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
      <section className="py-20 bg-background text-center relative overflow-hidden transition-colors duration-300">
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
                className="px-6 py-3 font-mono text-xs uppercase font-bold tracking-wider text-text-sec hover:text-foreground bg-card-bg border border-border-custom rounded-full transition-all duration-200"
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
