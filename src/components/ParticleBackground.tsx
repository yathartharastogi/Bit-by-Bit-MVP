'use client'

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      char: '0' | '1'
    }> = []

    // Adjust count based on screen size for optimal performance
    const particleCount = Math.min(80, Math.floor((width * height) / 18000))
    const connectionDistance = 110
    const mouse = { x: -1000, y: -1000, active: false }

    // Initialize particles as binary bits
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: 6, // Radius bounds for line connection calculations
        char: Math.random() > 0.5 ? '1' : '0'
      })
    }

    // Resize handler
    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Check dark mode
    const isDarkMode = () => document.documentElement.classList.contains('dark')

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      const dark = isDarkMode()
      const colorParticle = dark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.25)'
      const colorLine = dark ? 'rgba(37, 99, 235, ' : 'rgba(29, 78, 216, '
      const colorMouseLine = dark ? 'rgba(139, 92, 246, ' : 'rgba(168, 85, 247, '

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        // Wall collisions
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Mouse interaction (soft repel away from cursor)
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const force = (120 - dist) / 120
            const angle = Math.atan2(dy, dx)
            p.x += Math.cos(angle) * force * 1.5
            p.y += Math.sin(angle) * force * 1.5
          }
        }

        // Randomly flip bit values (0 <-> 1) over time to represent active data streams
        if (Math.random() < 0.005) {
          p.char = p.char === '1' ? '0' : '1'
        }

        // Draw binary character
        ctx.fillStyle = colorParticle
        ctx.font = 'bold 10px monospace'
        ctx.fillText(p.char, p.x - 3, p.y + 4)
      })

      // Draw connections between bits
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * (dark ? 0.08 : 0.04)
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `${colorLine}${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Draw connection lines to mouse cursor
        if (mouse.active) {
          const dx = p1.x - mouse.x
          const dy = p1.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const alpha = (1 - dist / 120) * (dark ? 0.12 : 0.06)
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `${colorMouseLine}${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-500"
    />
  )
}
