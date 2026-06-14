import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const announcements = await db.announcement.findMany({
      orderBy: [
        { pinned: 'desc' },
        { createdAt: 'desc' }
      ]
    })
    return NextResponse.json({ success: true, data: announcements })
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
