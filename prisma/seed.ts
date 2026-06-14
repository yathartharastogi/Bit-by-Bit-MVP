import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.event.deleteMany()
  await prisma.announcement.deleteMany()

  // Seed Events
  const events = [
    {
      title: 'BitHack 2026',
      description: '36-hour national hackathon with ₹1.5L in prizes. 500+ developers, designers, and builders expected.',
      date: new Date('2026-10-25T10:00:00Z'),
      type: 'hackathon',
      capacity: 500,
      imageUrl: '🏗️',
      status: 'UPCOMING',
      location: 'VIT Bhopal Campus'
    },
    {
      title: 'Design Jam 3.0',
      description: 'High-energy UI/UX design sprint. Build beautiful products fast. Teams of 2–3.',
      date: new Date('2026-11-08T10:00:00Z'),
      type: 'design',
      capacity: 60,
      imageUrl: '🎨',
      status: 'UPCOMING',
      location: 'Innovation Lab'
    },
    {
      title: 'ML Foundations Bootcamp',
      description: 'From linear regression to deep neural networks — intensive 2-day bootcamp for beginners.',
      date: new Date('2026-11-15T09:00:00Z'),
      type: 'workshop',
      capacity: 80,
      imageUrl: '🤖',
      status: 'UPCOMING',
      location: 'CR-401'
    },
    {
      title: 'Full-Stack Bootcamp S2',
      description: 'Next.js + Supabase + Tailwind. Ship a full-stack app in one day.',
      date: new Date('2026-11-22T09:00:00Z'),
      type: 'workshop',
      capacity: 100,
      imageUrl: '🌐',
      status: 'UPCOMING',
      location: 'CR-302'
    },
    {
      title: 'IntraHack — Summer Ed.',
      description: '24-hour members-only hackathon. Perfect for newcomers to learn coding and pitching.',
      date: new Date('2026-12-05T10:00:00Z'),
      type: 'hackathon',
      capacity: 150,
      imageUrl: '⚡',
      status: 'UPCOMING',
      location: 'Tech Park'
    },
    {
      title: 'Intro to Ethical Hacking',
      description: 'CTF competitions, ethical hacking fundamentals, and cybersecurity basics.',
      date: new Date('2026-12-12T10:00:00Z'),
      type: 'workshop',
      capacity: 80,
      imageUrl: '🔐',
      status: 'UPCOMING',
      location: 'Lab 5'
    },
    // Past events
    {
      title: 'BitHack 2024',
      description: '240 participants · 42 teams · 36 hours. Winner built an AI-powered navigation app.',
      date: new Date('2024-05-25T10:00:00Z'),
      type: 'hackathon',
      capacity: 240,
      imageUrl: '🏆',
      status: 'PAST',
      location: 'VIT Bhopal Campus'
    },
    {
      title: 'BitHack 2023',
      description: '180 participants · 30 teams · 36 hours. Winner built a real-time collaborative code editor.',
      date: new Date('2023-05-25T10:00:00Z'),
      type: 'hackathon',
      capacity: 180,
      imageUrl: '⚡',
      status: 'PAST',
      location: 'VIT Bhopal Campus'
    },
    {
      title: 'BitHack 2022',
      description: '120 participants · 24 teams · 24 hours. Focused on Web3 applications.',
      date: new Date('2022-05-25T10:00:00Z'),
      type: 'hackathon',
      capacity: 120,
      imageUrl: '🚀',
      status: 'PAST',
      location: 'VIT Bhopal Campus'
    }
  ]

  for (const e of events) {
    await prisma.event.create({ data: e })
  }

  // Seed Announcements
  const announcements = [
    {
      title: 'BitHack registrations are OPEN!',
      content: '🚀 BitHack registrations are OPEN! 36-hour national hackathon · ₹1.5L prize pool · 500+ participants expected. Register now!',
      tag: 'HACKATHON',
      pinned: true
    },
    {
      title: 'Full-Stack Bootcamp Resources',
      content: '📚 Full-Stack Bootcamp — Session 3 resources uploaded! Git repos, slides & project templates in the drive. Next session: Saturday 6 PM in CR-401.',
      tag: 'WORKSHOP',
      pinned: false
    },
    {
      title: 'Design Jam 3.0 Sprint',
      content: '🎨 Design Jam 3.0 — Call for participants! 6-hour collaborative UI/UX sprint · Teams of 2–3 · Register by Sunday 11:59 PM.',
      tag: 'EVENT',
      pinned: false
    },
    {
      title: 'BitHack Gallery is Live',
      content: '📸 BitHack gallery is live! Relive the 36-hour madness. 240 participants, 42 teams — the memories are now on the website.',
      tag: 'GENERAL',
      pinned: false
    }
  ]

  for (const a of announcements) {
    await prisma.announcement.create({ data: a })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
