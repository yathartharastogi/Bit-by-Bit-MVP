import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Simple in-memory rate limiter fallback for development
const memoryStore = new Map<string, { count: number; expiresAt: number }>()

function memoryRateLimit(ip: string, limit = 5, windowMs = 60000): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now()
  const key = `ratelimit:${ip}`
  const entry = memoryStore.get(key)

  if (!entry || now > entry.expiresAt) {
    const expiresAt = now + windowMs
    memoryStore.set(key, { count: 1, expiresAt })
    return { success: true, limit, remaining: limit - 1, reset: expiresAt }
  }

  if (entry.count >= limit) {
    return { success: false, limit, remaining: 0, reset: entry.expiresAt }
  }

  entry.count += 1
  memoryStore.set(key, entry)
  return { success: true, limit, remaining: limit - entry.count, reset: entry.expiresAt }
}

export async function rateLimit(ip: string, limit = 5, windowSeconds = 60) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (redisUrl && redisToken) {
    try {
      const redis = new Redis({
        url: redisUrl,
        token: redisToken,
      })
      const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
        analytics: true,
      })
      const result = await ratelimit.limit(ip)
      return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      }
    } catch (error) {
      console.warn('Upstash Redis rate limiter error, falling back to in-memory limiter:', error)
    }
  }

  // Fallback to local memory limiter
  return memoryRateLimit(ip, limit, windowSeconds * 1000)
}
