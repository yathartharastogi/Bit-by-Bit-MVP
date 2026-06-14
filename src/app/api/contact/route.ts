import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { rateLimit } from '@/lib/rateLimit'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(4, 'Subject must be at least 4 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

export async function POST(req: NextRequest) {
  try {
    // Determine client IP
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'

    // Apply rate limiting (5 submissions per minute)
    const { success } = await rateLimit(ip, 5, 60)
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please wait a minute and try again.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const parseResult = contactSchema.safeParse(body)

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = parseResult.data

    // Save submission to database
    const submission = await db.formSubmission.create({
      data: {
        type: 'CONTACT',
        payload: JSON.stringify({ name, email, subject, message })
      }
    })

    return NextResponse.json({ success: true, id: submission.id })
  } catch (error) {
    console.error('Error in /api/contact:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
