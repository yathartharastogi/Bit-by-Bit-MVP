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
      title: 'Mindzilla',
      description: 'Flagship technical problem-solving competition of Bit-By-Bit Club. Challenge your critical thinking, resolve logical sprints, and solve analytical puzzles under pressure.',
      date: new Date('2026-11-20T10:00:00Z'),
      type: 'hackathon',
      capacity: 250,
      imageUrl: '/events/mindzilla/1The Gateway.jpeg',
      status: 'UPCOMING',
      location: 'Tech Park Lab, VIT Bhopal'
    }
  ]

  for (const e of events) {
    await prisma.event.create({ data: e })
  }

  // Seed Announcements
  const announcements = [
    {
      title: 'Mindzilla Registrations Open!',
      content: '🚀 Mindzilla registrations are now OPEN! 6-hour logical coding challenge · ₹50K prize pool · Tech Park Arena. Register now!',
      tag: 'HACKATHON',
      pinned: true
    },
    {
      title: 'Mindzilla Photo Gallery is Live',
      content: '📸 The official Mindzilla 2025 photo gallery is live! Relive the high-energy problem-solving atmosphere and check out team photos.',
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
