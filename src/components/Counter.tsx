'use client'

import { useState, useEffect, useRef } from 'react'

interface CounterProps {
  to: number
  suffix?: string
}

export default function Counter({ to, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) return

    let start = 0
    const duration = 1200 // Slightly faster counting for snappier feedback
    const stepTime = 20
    const steps = duration / stepTime
    const increment = to / steps

    const timer = setInterval(() => {
      start += increment
      if (start >= to) {
        setCount(to)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [to, hasStarted])

  return (
    <span ref={elementRef} className="font-sans font-bold text-3xl md:text-4xl text-primary tracking-tight">
      {count}
      {suffix}
    </span>
  )
}
