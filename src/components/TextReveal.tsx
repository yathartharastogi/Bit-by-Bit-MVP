'use client'

import { useState, useEffect, useRef } from 'react'

interface TextRevealProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'p'
}

export default function TextReveal({ text, className = '', as = 'h1' }: TextRevealProps) {
  const [displayText, setDisplayText] = useState('')
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true)
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
    if (!hasTriggered) return

    let charIdx = 0
    const interval = setInterval(() => {
      if (charIdx < text.length) {
        setDisplayText(text.slice(0, charIdx + 1))
        charIdx++
      } else {
        clearInterval(interval)
      }
    }, 70) // Balanced slow writing speed

    return () => clearInterval(interval)
  }, [text, hasTriggered])

  const Component = as

  return (
    <Component
      ref={elementRef as any}
      className={className}
    >
      <span>{displayText}</span>
      {hasTriggered && displayText.length < text.length && (
        <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />
      )}
    </Component>
  )
}
