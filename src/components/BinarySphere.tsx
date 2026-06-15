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
  const [shape, setShape] = useState<'sphere' | 'cube' | 'torus'>('sphere')
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
    let height = (canvas.height = container.clientHeight || 190)

    const points: Point[] = []
    const connections: Array<[number, number]> = []
    const radius = Math.min(width, height) * 0.38

    const isDarkMode = () => document.documentElement.classList.contains('dark')

    // Generator logic depending on current shape state
    if (shape === 'sphere') {
      const numPoints = 85
      for (let i = 0; i < numPoints; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints)
        const theta = Math.sqrt(numPoints * Math.PI) * phi
        points.push({
          x: radius * Math.sin(phi) * Math.cos(theta),
          y: radius * Math.sin(phi) * Math.sin(theta),
          z: radius * Math.cos(phi),
          char: Math.random() > 0.5 ? '1' : '0',
          color: Math.random() < 0.25 ? 'head' : 'body'
        })
      }
      
      for (let i = 0; i < points.length; i++) {
        let conns = 0
        for (let j = i + 1; j < points.length; j++) {
          if (conns >= 2) break
          const d = Math.sqrt(
            Math.pow(points[i].x - points[j].x, 2) +
            Math.pow(points[i].y - points[j].y, 2) +
            Math.pow(points[i].z - points[j].z, 2)
          )
          if (d < radius * 0.45) {
            connections.push([i, j])
            conns++
          }
        }
      }
    } else if (shape === 'cube') {
      const size = radius * 0.68
      const vertices = [
        { x: -size, y: -size, z: -size, char: '0', color: 'head' },
        { x: size, y: -size, z: -size, char: '1', color: 'head' },
        { x: size, y: size, z: -size, char: '0', color: 'head' },
        { x: -size, y: size, z: -size, char: '1', color: 'head' },
        { x: -size, y: -size, z: size, char: '1', color: 'head' },
        { x: size, y: -size, z: size, char: '0', color: 'head' },
        { x: size, y: size, z: size, char: '1', color: 'head' },
        { x: -size, y: size, z: size, char: '0', color: 'head' }
      ]
      
      vertices.forEach(v => points.push(v))

      const baseEdges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ]

      const subdivisions = 2
      let currIdx = vertices.length

      baseEdges.forEach(([u, v]) => {
        const p1 = vertices[u]
        const p2 = vertices[v]
        let prev = u

        for (let s = 1; s <= subdivisions; s++) {
          const t = s / (subdivisions + 1)
          points.push({
            x: p1.x + (p2.x - p1.x) * t,
            y: p1.y + (p2.y - p1.y) * t,
            z: p1.z + (p2.z - p1.z) * t,
            char: Math.random() > 0.5 ? '1' : '0',
            color: 'body'
          })
          connections.push([prev, currIdx])
          prev = currIdx
          currIdx++
        }
        connections.push([prev, v])
      })
    } else if (shape === 'torus') {
      const R = radius * 0.72
      const r = radius * 0.24
      const uSegments = 10
      const vSegments = 5

      for (let i = 0; i < uSegments; i++) {
        const u = (i / uSegments) * Math.PI * 2
        for (let j = 0; j < vSegments; j++) {
          const v = (j / vSegments) * Math.PI * 2
          points.push({
            x: (R + r * Math.cos(v)) * Math.cos(u),
            y: (R + r * Math.cos(v)) * Math.sin(u),
            z: r * Math.sin(v),
            char: Math.random() > 0.5 ? '1' : '0',
            color: Math.random() < 0.25 ? 'head' : 'body'
          })
        }
      }

      for (let i = 0; i < uSegments; i++) {
        for (let j = 0; j < vSegments; j++) {
          const curr = i * vSegments + j
          const nextU = ((i + 1) % uSegments) * vSegments + j
          const nextV = i * vSegments + ((j + 1) % vSegments)
          connections.push([curr, nextU])
          connections.push([curr, nextV])
        }
      }
    }

    const handleResize = () => {
      if (!canvas || !container) return
      width = canvas.width = container.clientWidth || 360
      height = canvas.height = container.clientHeight || 190
    }

    window.addEventListener('resize', handleResize)

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
        speedX = (mouseRef.current.targetY - mouseRef.current.y) * 0.0003
        speedY = (mouseRef.current.targetX - mouseRef.current.x) * 0.0003
        rotationRef.current.x = speedX
        rotationRef.current.y = speedY
      } else {
        if (isHovered) {
          const targetSpeedX = (mouseRef.current.targetY - centerY) * 0.00003
          const targetSpeedY = (mouseRef.current.targetX - centerX) * 0.00003
          rotationRef.current.x += (targetSpeedX - rotationRef.current.x) * 0.05
          rotationRef.current.y += (targetSpeedY - rotationRef.current.y) * 0.05
        } else {
          rotationRef.current.x += (0.003 - rotationRef.current.x) * 0.02
          rotationRef.current.y += (0.003 - rotationRef.current.y) * 0.02
        }
      }

      points.forEach(point => {
        rotateX(point, rotationRef.current.x)
        rotateY(point, rotationRef.current.y)
      })

      const sortedPoints = [...points].sort((a, b) => a.z - b.z)

      sortedPoints.forEach(point => {
        const scale = perspective / (perspective + point.z)
        const projX = point.x * scale + centerX
        const projY = point.y * scale + centerY

        if (projX < 0 || projX > width || projY < 0 || projY > height) return

        const zNorm = (point.z + radius) / (2 * radius)
        const opacity = 0.15 + zNorm * 0.8
        const fontSize = Math.max(7, Math.floor(10.5 * scale))

        let fontColor = ''
        if (point.color === 'head') {
          fontColor = dark ? `rgba(34, 211, 238, ${opacity})` : `rgba(29, 78, 216, ${opacity})`
          if (point.z > 0) {
            ctx.shadowColor = dark ? 'rgba(34, 211, 238, 0.7)' : 'rgba(29, 78, 216, 0.7)'
            ctx.shadowBlur = 6 * scale
          } else {
            ctx.shadowBlur = 0
          }
        } else {
          fontColor = dark ? `rgba(16, 185, 129, ${opacity})` : `rgba(5, 150, 105, ${opacity})`
          ctx.shadowBlur = 0
        }

        ctx.fillStyle = fontColor
        ctx.font = `bold ${fontSize}px monospace`
        ctx.fillText(point.char, projX, projY)
      })

      ctx.strokeStyle = dark ? 'rgba(59, 130, 246, 0.05)' : 'rgba(37, 99, 235, 0.03)'
      ctx.lineWidth = 0.4
      ctx.shadowBlur = 0

      connections.forEach(([u, v]) => {
        const p1 = points[u]
        const p2 = points[v]

        const scale1 = perspective / (perspective + p1.z)
        const projX1 = p1.x * scale1 + centerX
        const projY1 = p1.y * scale1 + centerY

        const scale2 = perspective / (perspective + p2.z)
        const projX2 = p2.x * scale2 + centerX
        const projY2 = p2.y * scale2 + centerY

        ctx.beginPath()
        ctx.moveTo(projX1, projY1)
        ctx.lineTo(projX2, projY2)
        ctx.stroke()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [shape, isHovered])

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
    <div className="flex flex-col items-center w-full gap-3">
      {/* 3D Canvas Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[190px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
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
        <div className="absolute bottom-0 text-center pointer-events-none font-mono text-[8px] tracking-wider text-text-sec/40 uppercase">
          ◄ drag to rotate 3D model ►
        </div>
      </div>

      {/* Model toggle controls */}
      <div className="flex gap-2 relative z-10 w-full justify-center border-t border-border-custom/30 pt-3 select-none">
        {(['sphere', 'cube', 'torus'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setShape(s)}
            className={`px-3 py-1 font-mono text-[9px] font-bold rounded-md uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              shape === s
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-sec hover:bg-foreground/5 hover:text-foreground border border-border-custom/40'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
