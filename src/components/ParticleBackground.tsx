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

    // Check dark mode
    const isDarkMode = () => document.documentElement.classList.contains('dark')

    const columns: Array<{
      x: number
      y: number
      speed: number
      depth: number // 1: far (bg), 2: mid, 3: close (fg)
      fontSize: number
      opacity: number
      chars: string[]
    }> = []

    const initColumns = () => {
      columns.length = 0
      // Dynamic column spacing: each stream gets about 18px of horizontal width
      const colWidth = 18
      const colCount = Math.floor(width / colWidth)

      for (let i = 0; i < colCount; i++) {
        // Randomize depth layers to create a 3D space effect
        const rand = Math.random()
        let depth = 2 // Midground
        let fontSize = 11
        let opacity = 0.32
        let speed = 1.0 + Math.random() * 1.2

        if (rand < 0.4) {
          depth = 1 // Far background
          fontSize = 8
          opacity = 0.12
          speed = 0.4 + Math.random() * 0.5
        } else if (rand > 0.88) {
          depth = 3 // Foreground close
          fontSize = 15
          opacity = 0.55
          speed = 2.2 + Math.random() * 1.5
        }

        // Stagger initial vertical position (fully off-screen)
        const y = Math.random() * height * -1.5 - 100

        // Create stream binary chars (0s and 1s)
        const streamLength = Math.floor(Math.random() * 12) + 6
        const chars = Array.from({ length: streamLength }, () => 
          Math.random() > 0.5 ? '1' : '0'
        )

        columns.push({
          x: i * colWidth,
          y,
          speed,
          depth,
          fontSize,
          opacity,
          chars
        })
      }
    }

    initColumns()

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initColumns()
    }

    // Keep track of cursor coordinates relative to center for parallax
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX - width / 2
      mouse.y = e.clientY - height / 2
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      const dark = isDarkMode()
      
      // Clear with slight opacity to get the trailing cmatrix blur effect
      ctx.fillStyle = dark ? 'rgba(3, 7, 18, 0.12)' : 'rgba(247, 243, 238, 0.15)'
      ctx.fillRect(0, 0, width, height)

      // Draw scrolling columns
      columns.forEach((col) => {
        // Update vertical position
        col.y += col.speed

        // Reset once stream goes fully off screen
        if (col.y > height + 150) {
          col.y = Math.random() * -200 - 100
          col.speed = col.depth === 1 
            ? 0.4 + Math.random() * 0.5 
            : col.depth === 3 
              ? 2.2 + Math.random() * 1.5 
              : 1.0 + Math.random() * 1.2
        }

        // Parallax X & Y offsets: Foreground streams (depth 3) shift more than Background (depth 1)
        const parallaxOffsetX = mouse.x * (col.depth - 2) * 0.035
        const parallaxOffsetY = mouse.y * (col.depth - 2) * 0.02
        
        const drawX = col.x + parallaxOffsetX

        // Render characters
        for (let i = 0; i < col.chars.length; i++) {
          const charY = col.y - i * col.fontSize
          const drawY = charY + parallaxOffsetY

          // Skip drawing if characters are out of bounds
          if (drawY < -20 || drawY > height + 20) continue

          // Random bit flip mutation
          if (Math.random() < 0.025) {
            col.chars[i] = Math.random() > 0.5 ? '1' : '0'
          }

          // Calculate fading tail opacity
          const tailFade = 1 - i / col.chars.length
          const currentOpacity = col.opacity * tailFade

          let charColor = ''
          if (i === 0) {
            // Glowing stream head (Cyan in dark mode, Blue in light mode)
            charColor = dark 
              ? `rgba(34, 211, 238, ${col.opacity})` 
              : `rgba(29, 78, 216, ${col.opacity})`
            
            // Apply a neon glow matching depth
            if (col.depth === 3) {
              ctx.shadowColor = dark ? 'rgba(34, 211, 238, 0.95)' : 'rgba(29, 78, 216, 0.95)'
              ctx.shadowBlur = 12
            } else if (col.depth === 2) {
              ctx.shadowColor = dark ? 'rgba(16, 185, 129, 0.8)' : 'rgba(5, 150, 105, 0.8)'
              ctx.shadowBlur = 6
            } else {
              ctx.shadowBlur = 0
            }
          } else {
            // Classic matrix green body
            charColor = dark
              ? `rgba(16, 185, 129, ${currentOpacity})`
              : `rgba(5, 150, 105, ${currentOpacity})`
            ctx.shadowBlur = 0
          }

          ctx.fillStyle = charColor
          ctx.font = `bold ${col.fontSize}px monospace`
          ctx.fillText(col.chars[i], drawX, drawY)
        }
      })

      // Reset shadow blur so other canvas draws aren't affected
      ctx.shadowBlur = 0

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  )
}
