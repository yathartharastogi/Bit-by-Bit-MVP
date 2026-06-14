'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

interface Milestone {
  date?: string
  day?: string
  title: string
  desc: string
}

interface TracingTimelineProps {
  items: Milestone[]
}

export default function TracingTimeline({ items }: TracingTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 15,
    restDelta: 0.001
  })

  return (
    <div ref={containerRef} className="relative pl-6">
      {/* Background track line */}
      <div className="absolute left-[3px] top-1.5 bottom-1.5 w-[2px] bg-border-custom" />
      
      {/* Interactive scroll progress line */}
      <motion.div
        style={{ scaleY }}
        className="absolute left-[3px] top-1.5 bottom-1.5 w-[2px] bg-primary origin-top"
      />

      <div className="space-y-10">
        {items.map((item, idx) => (
          <div key={idx} className="relative text-left">
            {/* Pulsing trace circle */}
            <span className="absolute -left-[27px] top-1.5 w-2 h-2 rounded-full border border-primary bg-background z-10" />
            
            <div className="font-mono text-[9px] text-primary font-bold uppercase tracking-wider">
              {item.date || item.day}
            </div>
            <h3 className="font-sans font-bold text-sm text-foreground mt-1 mb-1">
              {item.title}
            </h3>
            <p className="text-text-sec text-xs leading-relaxed max-w-lg">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
