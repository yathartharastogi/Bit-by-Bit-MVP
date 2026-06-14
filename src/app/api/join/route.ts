import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { rateLimit } from '@/lib/rateLimit'

const joinSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').refine(
    (email) => email.endsWith('@vitbhopal.ac.in') || email.length > 0, 
    { message: 'Please use a valid email' }
  ),
  branch: z.string().min(2, 'Please specify your branch'),
  year: z.string().min(1, 'Please specify your year of study'),
  domain: z.string().min(2, 'Please select a domain of interest'),
  whyJoin: z.string().min(10, 'Please provide a reasoning of at least 10 characters')
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
    const parseResult = joinSchema.safeParse(body)

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, email, branch, year, domain, whyJoin } = parseResult.data

    // Save submission to database
    const submission = await db.formSubmission.create({
      data: {
        type: 'JOIN',
        payload: JSON.stringify({ name, email, branch, year, domain, whyJoin })
      }
    })

    return NextResponse.json({ success: true, id: submission.id })
  } catch (error) {
    console.error('Error in /api/join:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
