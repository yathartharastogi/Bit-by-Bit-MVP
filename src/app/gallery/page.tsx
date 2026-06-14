import ScrollReveal from '@/components/ScrollReveal'
import TextReveal from '@/components/TextReveal'
import SpotlightCard from '@/components/SpotlightCard'

export default function Gallery() {
  const galleryItems = [
    { title: 'BitHack 2024 Check-in', desc: 'Hackers checking in and picking up swag.', ratio: 'h-64 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-primary/30' },
    { title: 'Full-Stack Bootcamp S1', desc: 'Interactive workshop session inside CR-401.', ratio: 'h-48 bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-purple-500/30' },
    { title: 'UX Design Jam Sprint', desc: 'Teams whiteboard sketching and user flows.', ratio: 'h-80 bg-gradient-to-br from-orange-500/10 to-amber-500/10 text-orange-500/30' },
    { title: 'Coding Sprint Panel', desc: 'Judges reviewing final project code repositories.', ratio: 'h-52 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-emerald-500/30' },
    { title: 'Midnight Coffee Station', desc: 'Fueling up developers at 2 AM during BitHack.', ratio: 'h-72 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 text-cyan-500/30' },
    { title: 'Final Team Demos', desc: 'Top 10 pitch presentations on stage.', ratio: 'h-60 bg-gradient-to-br from-fuchsia-500/10 to-rose-500/10 text-fuchsia-500/30' }
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
            text="Our Gallery."
            className="font-sans font-bold text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]"
          />
          
          <ScrollReveal delay={0.2}>
            <p className="text-text-sec text-base md:text-lg max-w-xl leading-relaxed">
              Memories from workshops, national hackathons, and UX design jams. These placeholder geometries represent student collaborations.
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
                  {/* Geometric Placeholder */}
                  <div className={`w-full ${item.ratio} flex flex-col items-center justify-center font-mono text-xs relative overflow-hidden`}>
                    {/* Subtle pattern grid overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
                    
                    <span className="text-5xl mb-2 select-none group-hover:scale-110 transition-transform duration-300">
                      📐
                    </span>
                    <span className="font-semibold uppercase tracking-wider text-[10px] text-text-sec">
                      Placeholder Image
                    </span>
                  </div>

                  <div className="p-5 border-t border-border-custom/50 bg-card-bg text-left">
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
