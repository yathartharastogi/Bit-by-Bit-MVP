import { db } from '@/lib/db'
import EventsClient from './EventsClient'
import ScrollReveal from '@/components/ScrollReveal'
import TextReveal from '@/components/TextReveal'

interface Event {
  id: string
  title: string
  description: string
  date: Date
  type: string
  capacity?: number | null
  imageUrl?: string | null
  status: string
  location?: string | null
  registrationUrl?: string | null
  longDescription?: string | null
  timeline?: { time: string; title: string; description: string }[] | null
}

// Default fallback list in case database query encounters errors
const defaultEvents: Event[] = [
  {
    id: 'innofusion-fest',
    title: 'InnoFusion Fest',
    description: 'A 2+2 day Hackathon Series built around real industry problems, structured mentorship, and a grand offline finale.',
    longDescription: 'Bit By Bit takes pride in organising impactful, student-centric technical events. We are excited to introduce InnoFusion Fest — a 2+2 day Hackathon Series built around real industry problems, structured mentorship, and a grand offline finale. The event is designed in a 2 Online + 2 Offline format: focused online days for speaker sessions, PPT presentations, and Top 12 shortlisting; followed by grand offline days for prototype demonstrations, final judging, and prize distribution.',
    date: new Date('2026-07-25T10:00:00Z'),
    type: 'hackathon',
    capacity: 250,
    status: 'UPCOMING',
    location: 'AB02 Audi-02, VIT Bhopal (Hybrid)',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfBpF7I44RVORzv_MAaJk01PUd6E8bAuuRRYwZ5lF1kcKhjzw/viewform?usp=sharing&ouid=113652932975824259890',
    timeline: [
      { time: 'Day 0 (25-26 July)', title: 'Online Conference', description: 'Real-world tech insights with industry speakers.' },
      { time: 'Day 1 (31 July)', title: 'Speaker Day + Problem Reveal', description: 'Offline speaker sessions, problem statements revealed, and team PPT submissions begin.' },
      { time: 'Day 2 & 3 (1-2 Aug)', title: 'PPT Presentation Round', description: 'Online pitches to industry judges with live Q&A.' },
      { time: 'Day 4 (4 Aug)', title: 'Grand Finale', description: 'Offline working prototype presentations, final judging, and prize distribution.' }
    ]
  }
]

export const revalidate = 60 // Cache page for 60 seconds

export default async function Events() {
  let events: Event[] = defaultEvents

  try {
    const dbEvents = await db.event.findMany({
      orderBy: {
        date: 'asc'
      }
    })
    if (dbEvents.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      events = dbEvents.map((e: any) => ({
        ...e,
        date: new Date(e.date)
      }))
    }
  } catch (error) {
    console.warn('Prisma fetch failed on events page, falling back to static data:', error)
  }

  // Format date strings for serialization into client component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serializedEvents = events.map((e: any) => ({
    ...e,
    date: e.date.toISOString()
  }))

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Page Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 space-y-6 text-left relative z-10">
          <ScrollReveal>
            <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Events</div>
          </ScrollReveal>
          
          <TextReveal
            text="Where the Magic Happens."
            className="font-sans font-bold text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]"
          />
          
          <ScrollReveal delay={0.2}>
            <p className="text-text-sec text-base md:text-lg max-w-xl leading-relaxed">
              Hackathons, workshops, design jams, talks — something&apos;s always happening at Bit-By-Bit. Join us in our upcoming sessions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Events Filter and Listings */}
      <section className="py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <EventsClient initialEvents={serializedEvents} />
        </div>
      </section>
    </div>
  )
}
