'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useInView } from 'framer-motion'

interface Milestone {
  date?: string
  day?: string
  title: string
  desc: string
}

interface TracingTimelineProps {
  items: Milestone[]
}

function MilestoneItem({ item }: { item: Milestone }) {
  const ref = useRef<HTMLDivElement>(null)
  
  // Triggers when the milestone enters the upper 50% of the viewport (meaning the scroll line has reached it)
  const isInView = useInView(ref, {
    once: false,
    margin: '0px 0px -50% 0px',
  })

  return (
    <div ref={ref} className="relative text-left">
      {/* Glow dot that blends into the line when active */}
      <motion.span
        initial={false}
        animate={{
          backgroundColor: isInView ? 'var(--primary)' : 'var(--background)',
          borderColor: isInView ? 'var(--primary)' : 'var(--border-color)',
          scale: isInView ? 1.25 : 1,
          boxShadow: isInView
            ? '0 0 8px var(--primary), 0 0 16px var(--primary)'
            : '0 0 0px transparent',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute -left-[24px] top-1.5 w-2 h-2 rounded-full border z-10"
      />
      
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
  )
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
          <MilestoneItem key={idx} item={item} />
        ))}
      </div>
    </div>
  )
}
