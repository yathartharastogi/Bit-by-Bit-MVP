'use client'

import { useEffect, useRef, useState } from 'react'

interface Point {
  x: number
  y: number
  z: number
  char: string
  color: string
}

export default function BinarySphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, down: false, startX: 0, startY: 0 })
  const rotationRef = useRef({ x: 0.004, y: 0.004 })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = container.clientWidth || 360)
    let height = (canvas.height = container.clientHeight || 300)

    const points: Point[] = []
    const numPoints = 110
    const radius = Math.min(width, height) * 0.35

    const isDarkMode = () => document.documentElement.classList.contains('dark')

    // Generate coordinates on a sphere using Fibonacci spiral distribution
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints)
      const theta = Math.sqrt(numPoints * Math.PI) * phi

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      const char = Math.random() > 0.5 ? '1' : '0'
      const colorRand = Math.random()
      const color = colorRand < 0.25 ? 'head' : 'body' // cyan heads or green bodies

      points.push({ x, y, z, char, color })
    }

    const handleResize = () => {
      if (!canvas || !container) return
      width = canvas.width = container.clientWidth || 360
      height = canvas.height = container.clientHeight || 300
    }

    window.addEventListener('resize', handleResize)

    // Euler rotation matrices
    const rotateX = (point: Point, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const y = point.y * cos - point.z * sin
      const z = point.y * sin + point.z * cos
      point.y = y
      point.z = z
    }

    const rotateY = (point: Point, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const x = point.x * cos + point.z * sin
      const z = -point.x * sin + point.z * cos
      point.x = x
      point.z = z
    }

    const animate = () => {
      const dark = isDarkMode()
      ctx.clearRect(0, 0, width, height)

      const perspective = radius * 2.2
      const centerX = width / 2
      const centerY = height / 2

      let speedX = rotationRef.current.x
      let speedY = rotationRef.current.y

      if (mouseRef.current.down) {
        // Drag rotation speed relative to drag distance
        speedX = (mouseRef.current.targetY - mouseRef.current.y) * 0.0003
        speedY = (mouseRef.current.targetX - mouseRef.current.x) * 0.0003
        rotationRef.current.x = speedX
        rotationRef.current.y = speedY
      } else {
        // If hovered, drift gets influenced by cursor coordinates
        if (isHovered) {
          const targetSpeedX = (mouseRef.current.targetY - centerY) * 0.00002
          const targetSpeedY = (mouseRef.current.targetX - centerX) * 0.00002
          rotationRef.current.x += (targetSpeedX - rotationRef.current.x) * 0.05
          rotationRef.current.y += (targetSpeedY - rotationRef.current.y) * 0.05
        } else {
          // Slow down back to constant gentle drift
          rotationRef.current.x += (0.003 - rotationRef.current.x) * 0.02
          rotationRef.current.y += (0.003 - rotationRef.current.y) * 0.02
        }
      }

      // Rotate points
      points.forEach(point => {
        rotateX(point, rotationRef.current.x)
        rotateY(point, rotationRef.current.y)
      })

      // Painter's algorithm: sort points by Z depth to render back points first
      const sortedPoints = [...points].sort((a, b) => a.z - b.z)

      // Render points
      sortedPoints.forEach(point => {
        const scale = perspective / (perspective + point.z)
        const projX = point.x * scale + centerX
        const projY = point.y * scale + centerY

        if (projX < 0 || projX > width || projY < 0 || projY > height) return

        const zNorm = (point.z + radius) / (2 * radius) // 0 (far) to 1 (close)
        const opacity = 0.15 + zNorm * 0.8
        const fontSize = Math.max(7, Math.floor(10.5 * scale))

        let fontColor = ''
        if (point.color === 'head') {
          fontColor = dark
            ? `rgba(34, 211, 238, ${opacity})`
            : `rgba(29, 78, 216, ${opacity})`
          
          if (point.z > 0) {
            ctx.shadowColor = dark ? 'rgba(34, 211, 238, 0.7)' : 'rgba(29, 78, 216, 0.7)'
            ctx.shadowBlur = 6 * scale
          } else {
            ctx.shadowBlur = 0
          }
        } else {
          fontColor = dark
            ? `rgba(16, 185, 129, ${opacity})`
            : `rgba(5, 150, 105, ${opacity})`
          ctx.shadowBlur = 0
        }

        ctx.fillStyle = fontColor
        ctx.font = `bold ${fontSize}px monospace`
        ctx.fillText(point.char, projX, projY)
      })

      // Draw wireframe connecting plexus lines in 3D
      ctx.strokeStyle = dark ? 'rgba(59, 130, 246, 0.05)' : 'rgba(37, 99, 235, 0.03)'
      ctx.lineWidth = 0.4
      ctx.shadowBlur = 0

      for (let i = 0; i < sortedPoints.length; i++) {
        const p1 = sortedPoints[i]
        // Skip connecting points that are deep inside the background to keep layout clear
        if (p1.z < -radius * 0.3) continue

        const scale1 = perspective / (perspective + p1.z)
        const projX1 = p1.x * scale1 + centerX
        const projY1 = p1.y * scale1 + centerY

        let connections = 0
        for (let j = i + 1; j < sortedPoints.length; j++) {
          if (connections >= 2) break

          const p2 = sortedPoints[j]
          if (p2.z < -radius * 0.3) continue

          const dist3D = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) +
            Math.pow(p1.y - p2.y, 2) +
            Math.pow(p1.z - p2.z, 2)
          )

          if (dist3D < radius * 0.45) {
            const scale2 = perspective / (perspective + p2.z)
            const projX2 = p2.x * scale2 + centerX
            const projY2 = p2.y * scale2 + centerY

            ctx.beginPath()
            ctx.moveTo(projX1, projY1)
            ctx.lineTo(projX2, projY2)
            ctx.stroke()
            connections++
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isHovered])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current.targetX = e.clientX - rect.left
    mouseRef.current.targetY = e.clientY - rect.top

    if (mouseRef.current.down) {
      const deltaX = e.clientX - mouseRef.current.startX
      const deltaY = e.clientY - mouseRef.current.startY
      rotationRef.current.x = deltaY * 0.00025
      rotationRef.current.y = deltaX * 0.00025
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current.down = true
    mouseRef.current.startX = e.clientX
    mouseRef.current.startY = e.clientY
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }

  const handleMouseUp = () => {
    mouseRef.current.down = false
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[230px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseRef.current.down = false
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="w-full h-full"
      />
      <div className="absolute bottom-0 text-center pointer-events-none font-mono text-[9px] tracking-wider text-text-sec/40 uppercase">
        ◄ drag to spin 3D sphere ►
      </div>
    </div>
  )
}
