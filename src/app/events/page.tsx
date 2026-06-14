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
}

// Default fallback list in case database query encounters errors
const defaultEvents: Event[] = [
  {
    id: '1',
    title: 'BitHack 2026',
    description: '36-hour national hackathon with ₹1.5L in prizes. 500+ developers, designers, and builders expected.',
    date: new Date('2026-10-25T10:00:00Z'),
    type: 'hackathon',
    imageUrl: '🏗️',
    status: 'UPCOMING',
    location: 'VIT Bhopal Campus'
  },
  {
    id: '2',
    title: 'Design Jam 3.0',
    description: 'High-energy UI/UX design sprint. Build beautiful products fast. Teams of 2–3.',
    date: new Date('2026-11-08T10:00:00Z'),
    type: 'design',
    imageUrl: '🎨',
    status: 'UPCOMING',
    location: 'Innovation Lab'
  },
  {
    id: '3',
    title: 'ML Foundations Bootcamp',
    description: 'From linear regression to deep neural networks — intensive 2-day bootcamp for beginners.',
    date: new Date('2026-11-15T09:00:00Z'),
    type: 'workshop',
    imageUrl: '🤖',
    status: 'UPCOMING',
    location: 'CR-401'
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
      events = dbEvents.map(e => ({
        ...e,
        date: new Date(e.date)
      }))
    }
  } catch (error) {
    console.warn('Prisma fetch failed on events page, falling back to static data:', error)
  }

  // Format date strings for serialization into client component
  const serializedEvents = events.map(e => ({
    ...e,
    date: e.date.toISOString()
  }))

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Page Hero */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 space-y-6 text-left relative z-10">
          <ScrollReveal>
            <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Events</div>
          </ScrollReveal>
          
          <TextReveal
            text="Where the Magic Happens."
            className="font-sans font-bold text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]"
          />
          
          <ScrollReveal delay={0.2}>
            <p className="text-text-sec text-base md:text-lg max-w-xl leading-relaxed">
              Hackathons, workshops, design jams, talks — something's always happening at Bit-By-Bit. Join us in our upcoming sessions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Events Filter and Listings */}
      <section className="py-16 bg-card-bg border-y border-border-custom transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <EventsClient initialEvents={serializedEvents} />
        </div>
      </section>
    </div>
  )
}
