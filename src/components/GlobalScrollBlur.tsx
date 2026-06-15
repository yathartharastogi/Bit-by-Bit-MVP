'use client'

import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

export default function GlobalScrollBlur() {
  const { scrollY } = useScroll()

  // Blur goes from 0px at top to 6px max when scrolled 1000px down
  const blurValue = useTransform(scrollY, [0, 1000], [0, 4.5])

  // Opacity for the background tint goes from 0.0 to 0.65 max 
  // (so it never becomes completely opaque, preserving the 3D background)
  const opacityValue = useTransform(scrollY, [0, 1000], [0.0, 0.55])

  const filter = useMotionTemplate`blur(${blurValue}px)`
  const bg = useMotionTemplate`rgba(var(--background-rgb), ${opacityValue})`

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none transition-colors duration-300"
      style={{
        zIndex: 0,
        backdropFilter: filter,
        WebkitBackdropFilter: filter,
        backgroundColor: bg,
      }}
      aria-hidden="true"
    />
  )
}
