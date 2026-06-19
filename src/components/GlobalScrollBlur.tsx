'use client'

import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

export default function GlobalScrollBlur() {
  const { scrollY } = useScroll()

  // Opacity for the background tint goes from 0.0 to 0.65 max 
  // (so it never becomes completely opaque, preserving the 3D background)
  const opacityValue = useTransform(scrollY, [0, 1000], [0.0, 0.55])

  const bg = useMotionTemplate`rgba(var(--background-rgb), ${opacityValue})`

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none transition-colors duration-300"
      style={{
        zIndex: 0,
        backgroundColor: bg,
      }}
      aria-hidden="true"
    />
  )
}
