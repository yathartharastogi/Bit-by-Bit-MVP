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

  for (const e of events) {
    await prisma.event.create({ data: e })
  }

  // Seed Announcements
  const announcements = [
    {
      title: 'InnoFusion Fest Registrations Open!',
      content: '🚀 InnoFusion Fest registrations are now OPEN! 2 Online + 2 Offline days Hackathon Series · ₹18.5K total budget · Register now!',
      tag: 'HACKATHON',
      pinned: true
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
