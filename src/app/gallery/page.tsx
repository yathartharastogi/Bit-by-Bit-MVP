import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import TextReveal from '@/components/TextReveal'
import SpotlightCard from '@/components/SpotlightCard'

export default function Gallery() {
  const galleryItems = [
    { src: '/events/mindzilla/20250220_091023.webp', title: 'Mindzilla Briefing', desc: 'Participants gathering for the event introduction and problem statement release.' },
    { src: '/events/mindzilla/20250220_091031.webp', title: 'Brainstorming Session', desc: 'Teams whiteboard sketching ideas and logical maps for the analytical puzzles.' },
    { src: '/events/mindzilla/20250220_091102.webp', title: 'Problem Solving', desc: 'Working through algorithmic optimization challenges under pressure.' },
    { src: '/events/mindzilla/20250220_091146.webp', title: 'Collaboration Phase', desc: 'Peer-to-peer technical debugging and cross-team knowledge share.' },
    { src: '/events/mindzilla/20250220_091159.webp', title: 'Strategic Decisions', desc: 'Analyzing trade-offs between speed, accuracy, and execution complexity.' },
    { src: '/events/mindzilla/20250220_092640.webp', title: 'Logic Sprint', desc: 'Developing solutions for the interactive logic challenges.' },
    { src: '/events/mindzilla/20250220_094043.webp', title: 'Tech Stack Check', desc: 'Validating deployment parameters and runtime safety checklists.' },
    { src: '/events/mindzilla/20250220_094056.webp', title: 'Mentorship Checkpoint', desc: 'Seniors reviewing repository status and code quality parameters.' },
    { src: '/events/mindzilla/20250220_094151.webp', title: 'Competition Arena', desc: 'The high-energy environment inside the VIT Bhopal tech park lab.' },
    { src: '/events/mindzilla/20250220_095925.webp', title: 'Analytical Puzzles', desc: 'Decoupling complex data structures into simpler, solvable units.' },
    { src: '/events/mindzilla/20250220_100317.webp', title: 'Final Code Commits', desc: 'Teams finalizing code pushes to their GitHub repositories.' },
    { src: '/events/mindzilla/20250220_103004.webp', title: 'Mindzilla Champions', desc: 'Celebrating top teams and creative technical pitches at AdVITya.' }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Page Hero */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 space-y-6 text-left relative z-10">
          <ScrollReveal>
            <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Memories</div>
          </ScrollReveal>
          
          <TextReveal
            text="Mindzilla 2025."
            className="font-sans font-bold text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]"
          />
          
          <ScrollReveal delay={0.2}>
            <p className="text-text-sec text-base md:text-lg max-w-xl leading-relaxed">
              Relive the action from **Mindzilla**, Bit-By-Bit's flagship problem-solving and logic competition held during the AdVITya festival.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid Display */}
      <section className="py-16 bg-card-bg border-y border-border-custom transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {galleryItems.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05} className="break-inside-avoid mb-6">
                <SpotlightCard className="overflow-hidden bg-background border border-border-custom hover:border-primary/55 transition-all duration-300 relative group cursor-pointer">
                  {/* Image Container with Hover zoom and filter */}
                  <div className="w-full relative overflow-hidden flex flex-col items-center justify-center font-mono text-xs">
                    <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] bg-[size:16px_16px] opacity-5 pointer-events-none z-10" />
                    
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        priority={idx < 3}
                      />
                    </div>
                  </div>

                  <div className="p-5 border-t border-border-custom/50 bg-card-bg text-left relative z-10">
                    <h4 className="font-sans font-bold text-sm text-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-text-sec text-[11px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

