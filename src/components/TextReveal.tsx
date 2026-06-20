'use client'

import { motion } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
}

export default function TextReveal({ text, className = '', as = 'h1' }: TextRevealProps) {
  const MotionComponent = (motion as any)[as] || motion.h1

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.1 },
    },
  }

  const child = {
    visible: {
      opacity: 1,
      display: 'inline-block',
    },
    hidden: {
      opacity: 0,
      display: 'inline-block',
    },
  }

  return (
    <MotionComponent
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
    >
      {text.split('').map((char, index) => (
        <motion.span variants={child} key={index}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </MotionComponent>
  )
}
