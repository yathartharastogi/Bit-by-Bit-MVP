import Link from 'next/link'
import { db } from '@/lib/db'
import Terminal from '@/components/Terminal'
import Counter from '@/components/Counter'
import Testimonials from '@/components/Testimonials'
import SpotlightCard from '@/components/SpotlightCard'
import ScrollReveal from '@/components/ScrollReveal'
import TextReveal from '@/components/TextReveal'
import { Calendar, MapPin, Sparkles, Code, Palette, Share2, Layers, ClipboardList } from 'lucide-react'

// Default fallbacks in case DB is not seeded or encounters issues
const defaultAnnouncements = [
  {
    id: '1',
    title: 'BitHack registrations are OPEN!',
    content: '🚀 BitHack registrations are OPEN! 36-hour national hackathon · ₹1.5L prize pool · 500+ participants expected. Register now!',
    tag: 'HACKATHON',
    pinned: true,
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Full-Stack Bootcamp Resources',
    content: '📚 Full-Stack Bootcamp — Session 3 resources uploaded! Git repos, slides & project templates in the drive. Next session: Saturday 6 PM in CR-401.',
    tag: 'WORKSHOP',
    pinned: false,
    createdAt: new Date(Date.now() - 86400000)
  },
  {
    id: '3',
    title: 'Design Jam 3.0 Sprint',
    content: '🎨 Design Jam 3.0 — Call for participants! 6-hour collaborative UI/UX sprint · Teams of 2–3 · Register by Sunday 11:59 PM.',
    tag: 'EVENT',
    pinned: false,
    createdAt: new Date(Date.now() - 172800000)
  }
]

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

export default async function Home() {
  let announcements = defaultAnnouncements
  let events: Event[] = defaultEvents

  try {
    const dbAnnouncements = await db.announcement.findMany({
      orderBy: [
        { pinned: 'desc' },
        { createdAt: 'desc' }
      ],
      take: 4
    })
    if (dbAnnouncements.length > 0) {
      announcements = dbAnnouncements.map(a => ({
        ...a,
        createdAt: new Date(a.createdAt)
      }))
    }

    const dbEvents = await db.event.findMany({
      where: { status: 'UPCOMING' },
      orderBy: { date: 'asc' },
      take: 3
    })
    if (dbEvents.length > 0) {
      events = dbEvents.map(e => ({
        ...e,
        date: new Date(e.date)
      }))
    }
  } catch (error) {
    console.warn('Prisma fetch failed on landing page, falling back to static data:', error)
  }

  const domains = [
    { name: 'Tech', icon: <Code className="text-[#2563eb]" size={24} />, desc: 'Web dev, ML, cloud, backend engineering and beyond', tags: 'Dev · AI · Cloud' },
    { name: 'Design', icon: <Palette className="text-purple-500" size={24} />, desc: 'UI/UX, brand identity, motion, product design', tags: 'UI · UX · Brand' },
    { name: 'PR & Outreach', icon: <Share2 className="text-orange-500" size={24} />, desc: 'Partnerships, sponsorships, community relations', tags: 'PR · Growth' },
    { name: 'Content', icon: <Layers className="text-green-500" size={24} />, desc: 'Blogs, social media, documentation, storytelling', tags: 'Writing · Media' },
    { name: 'Event Management', icon: <ClipboardList className="text-yellow-500" size={24} />, desc: 'Planning, logistics, execution for all club events', tags: 'Events · Ops' }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden bg-background">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.015)_1px,transparent_1px)] bg-[size:32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          <div className="lg:col-span-7 space-y-6 text-left">
            <ScrollReveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-semibold text-primary bg-primary/10 rounded-full border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                VIT Bhopal Tech Community — Est. 2020
              </div>
            </ScrollReveal>
            
            <TextReveal
              text="We Build Bit by Bit."
              className="font-sans font-bold text-4xl md:text-6xl tracking-tight text-foreground leading-[1.05]"
            />
            
            <ScrollReveal delay={0.2}>
              <p className="text-text-sec text-base md:text-lg max-w-xl leading-relaxed">
                VIT Bhopal's premier tech community — a launchpad for developers, designers, and innovators who want to build real things, win hackathons, and grow together.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/contact#join"
                  className="px-6 py-3 font-mono text-xs uppercase font-bold tracking-wider text-white bg-primary hover:bg-primary-hover rounded-full transition-all duration-200 hover:-translate-y-0.5"
                >
                  ⚡ Apply to Join
                </Link>
                <Link
                  href="/events"
                  className="px-6 py-3 font-mono text-xs uppercase font-bold tracking-wider text-text-sec hover:text-foreground bg-card-bg border border-border-custom hover:border-primary rounded-full transition-all duration-200 hover:-translate-y-0.5"
                >
                  Explore Events →
                </Link>
              </div>
            </ScrollReveal>

            {/* Quick stats inline */}
            <ScrollReveal delay={0.4}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-border-custom/40">
                <div className="flex flex-col">
                  <Counter to={500} suffix="+" />
                  <span className="font-mono text-[10px] text-text-sec uppercase tracking-wider mt-1">Members</span>
                </div>
                <div className="flex flex-col">
                  <Counter to={24} />
                  <span className="font-mono text-[10px] text-text-sec uppercase tracking-wider mt-1">Hackathons</span>
                </div>
                <div className="flex flex-col">
                  <Counter to={80} />
                  <span className="font-mono text-[10px] text-text-sec uppercase tracking-wider mt-1">Workshops</span>
                </div>
                <div className="flex flex-col">
                  <Counter to={12} suffix="K+" />
                  <span className="font-mono text-[10px] text-text-sec uppercase tracking-wider mt-1">Reach</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 w-full mt-10 lg:mt-0 animate-fade-in-up">
            <ScrollReveal delay={0.3}>
              <Terminal />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-card-bg border-y border-border-custom py-24 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-6">
            <ScrollReveal>
              <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Our Story</div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-sans font-bold text-3xl tracking-tight text-foreground">
                More Than Just a Tech Club.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-text-sec text-sm leading-relaxed">
                Founded by 5 students in a hostel room in 2020, Bit-By-Bit grew from a small study group into VIT Bhopal's most active tech community. No prerequisites. No gatekeeping. Just builders helping builders.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-text-sec text-sm leading-relaxed">
                We focus on hands-on sessions, building real-world projects, and fostering teams that compete and win in national level hackathons.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <Link
                href="/about"
                className="inline-flex items-center text-primary font-semibold text-sm hover:underline"
              >
                Read full story →
              </Link>
            </ScrollReveal>
          </div>

          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ScrollReveal delay={0.1}>
              <SpotlightCard className="p-5 bg-background h-full">
                <span className="text-2xl mb-3 block">🔥</span>
                <h4 className="font-sans font-bold text-sm text-foreground mb-1">Build Together</h4>
                <p className="text-text-sec text-xs">Ship real projects alongside high-agency peers.</p>
              </SpotlightCard>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <SpotlightCard className="p-5 bg-background h-full">
                <span className="text-2xl mb-3 block">🧠</span>
                <h4 className="font-sans font-bold text-sm text-foreground mb-1">Learn Daily</h4>
                <p className="text-text-sec text-xs">Access workshops, technical guides, and labs.</p>
              </SpotlightCard>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <SpotlightCard className="p-5 bg-background h-full">
                <span className="text-2xl mb-3 block">🏅</span>
                <h4 className="font-sans font-bold text-sm text-foreground mb-1">Win Big</h4>
                <p className="text-text-sec text-xs">Form competitive hackathon teams and win prizes.</p>
              </SpotlightCard>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <SpotlightCard className="p-5 bg-background h-full">
                <span className="text-2xl mb-3 block">🤝</span>
                <h4 className="font-sans font-bold text-sm text-foreground mb-1">Grow Network</h4>
                <p className="text-text-sec text-xs">Connect with seniors, mentors, and industry leads.</p>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section className="py-24 bg-background transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <ScrollReveal>
              <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">What We Do</div>
            </ScrollReveal>
            <TextReveal
              text="Find Your Domain."
              as="h2"
              className="font-sans font-bold text-3xl tracking-tight text-foreground justify-center"
            />
            <ScrollReveal delay={0.1}>
              <p className="text-text-sec text-sm leading-relaxed">
                Every skill has a home here. Build, design, write, or organize — pick your path and grow with people who share your passion.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {domains.map((domain, idx) => (
              <ScrollReveal key={domain.name} delay={idx * 0.05}>
                <SpotlightCard className="p-6 flex flex-col items-center text-center justify-between border border-border-custom bg-card-bg hover:-translate-y-2 transition-all duration-300 group h-full">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      {domain.icon}
                    </div>
                    <h3 className="font-sans font-bold text-sm text-foreground mb-2">{domain.name}</h3>
                    <p className="text-text-sec text-xs leading-relaxed">{domain.desc}</p>
                  </div>
                  <div className="mt-6 font-mono text-[9px] font-semibold text-primary tracking-tight px-2 py-0.5 rounded border border-primary/20 bg-primary/5">
                    {domain.tags}
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic News / Announcements Feed & Events */}
      <section className="py-24 bg-card-bg border-y border-border-custom transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Feed Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <ScrollReveal>
                <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Live Notice Board
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-sans font-bold text-3xl tracking-tight text-foreground">
                  What's Happening
                </h2>
              </ScrollReveal>
            </div>

            <div className="flex flex-col gap-4">
              {announcements.map((item, idx) => (
                <ScrollReveal key={item.id} delay={idx * 0.1}>
                  <div
                    className={`p-5 rounded-xl border transition-all duration-200 ${
                      item.pinned
                        ? 'border-primary/30 bg-primary/5'
                        : 'border-border-custom bg-background'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] font-bold text-primary px-2 py-0.5 rounded border border-primary/20 bg-primary/10 uppercase tracking-widest">
                        {item.tag}
                      </span>
                      <span className="text-[10px] text-text-sec font-mono">
                        {item.pinned ? '📌 PINNED' : 'Recent'}
                      </span>
                    </div>
                    <h4 className="font-sans font-bold text-sm text-foreground mb-1.5">{item.title}</h4>
                    <p className="text-text-sec text-xs leading-relaxed">{item.content}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Events Preview Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-end justify-between">
              <div className="space-y-4">
                <ScrollReveal>
                  <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Upcoming Program</div>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <h2 className="font-sans font-bold text-3xl tracking-tight text-foreground">
                    Events & Hackathons
                  </h2>
                </ScrollReveal>
              </div>
              <ScrollReveal delay={0.1}>
                <Link
                  href="/events"
                  className="text-primary font-bold text-xs uppercase tracking-wider font-mono border-b border-primary pb-0.5 hover:border-primary-hover hover:text-primary-hover transition-colors"
                >
                  All Events
                </Link>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.slice(0, 3).map((item, idx) => (
                <ScrollReveal key={item.id} delay={idx * 0.1}>
                  <SpotlightCard className="bg-background overflow-hidden flex flex-col justify-between h-full">
                    <div className="p-5 space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 text-lg flex items-center justify-center">
                        {item.imageUrl || '📅'}
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-sm text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-text-sec text-xs leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 border-t border-border-custom/40 bg-foreground/[0.01] flex flex-col gap-2.5 mt-auto">
                      <div className="flex items-center gap-1.5 text-text-sec text-[10px] font-mono">
                        <Calendar size={12} className="text-primary" />
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5 text-text-sec text-[10px] font-mono">
                        <MapPin size={12} className="text-primary" />
                        {item.location || 'VIT Bhopal'}
                      </div>
                      <Link
                        href="/events"
                        className="mt-2 py-2 flex items-center justify-center font-mono text-[10px] uppercase font-bold text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors"
                      >
                        Register Now
                      </Link>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background overflow-hidden transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <ScrollReveal>
              <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Community Voices</div>
            </ScrollReveal>
            <TextReveal
              text="What Members Are Saying."
              as="h2"
              className="font-sans font-bold text-3xl tracking-tight text-foreground justify-center"
            />
            <ScrollReveal delay={0.1}>
              <p className="text-text-sec text-sm leading-relaxed">
                Real experiences from students who joined Bit-By-Bit and never looked back.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <Testimonials />
          </ScrollReveal>
        </div>
      </section>

      {/* Apply CTA Section */}
      <section className="relative py-24 bg-card-bg border-t border-border-custom overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.03),transparent_40%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.02),transparent_40%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold text-primary bg-primary/10 rounded-full border border-primary/20">
              <Sparkles size={12} />
              Ready to Build?
            </div>
          </ScrollReveal>
          <TextReveal
            text="Join 500+ Builders at VIT Bhopal."
            as="h2"
            className="font-sans font-bold text-3xl md:text-5xl tracking-tight text-foreground leading-tight justify-center"
          />
          <ScrollReveal delay={0.1}>
            <p className="text-text-sec text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Whether you code, design, write, or organize — there's a place for you in Bit-By-Bit. Your next project, your next team, your next opportunity starts here.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex justify-center gap-3 pt-4">
              <Link
                href="/contact#join"
                className="px-8 py-3.5 font-mono text-xs uppercase font-bold tracking-wider text-white bg-primary hover:bg-primary-hover rounded-full transition-all duration-200 hover:-translate-y-0.5"
              >
                ⚡ Apply Now
              </Link>
              <Link
                href="/about"
                className="px-8 py-3.5 font-mono text-xs uppercase font-bold tracking-wider text-text-sec hover:text-foreground bg-background border border-border-custom hover:border-primary rounded-full transition-all duration-200 hover:-translate-y-0.5"
              >
                Learn More
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
