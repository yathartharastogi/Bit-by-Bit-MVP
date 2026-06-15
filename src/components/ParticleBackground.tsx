'use client'

import { useEffect, useRef } from 'react'

interface Point3D {
  x: number
  y: number
  z: number
  char: string
}

interface Model3D {
  points: Point3D[]
  connections: Array<[number, number]>
  xOffset: number // fraction of width, e.g., 0.5 for center
  yOffset: number // fraction of height, e.g., 0.5 for center
  scaleMultiplier: number
  rotateSpeedX: number
  rotateSpeedY: number
  colorType: 'cyan' | 'green' | 'purple'
}

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

    const isDarkMode = () => document.documentElement.classList.contains('dark')

    // 1. Matrix digital rain columns setup
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
      const colWidth = 20
      const colCount = Math.floor(width / colWidth)

      for (let i = 0; i < colCount; i++) {
        const rand = Math.random()
        let depth = 2
        let fontSize = 11
        let opacity = 0.25
        let speed = 1.0 + Math.random() * 1.0

        if (rand < 0.45) {
          depth = 1 // Far background
          fontSize = 8
          opacity = 0.08
          speed = 0.4 + Math.random() * 0.4
        } else if (rand > 0.92) {
          depth = 3 // Foreground close
          fontSize = 14
          opacity = 0.42
          speed = 2.0 + Math.random() * 1.0
        }

        const y = Math.random() * height * -1.5 - 100
        const streamLength = Math.floor(Math.random() * 10) + 5
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

    // 2. 3D Model generators
    const createSpherePoints = (radius: number, count: number): Point3D[] => {
      const pts: Point3D[] = []
      for (let i = 0; i < count; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / count)
        const theta = Math.sqrt(count * Math.PI) * phi
        pts.push({
          x: radius * Math.sin(phi) * Math.cos(theta),
          y: radius * Math.sin(phi) * Math.sin(theta),
          z: radius * Math.cos(phi),
          char: Math.random() > 0.5 ? '1' : '0'
        })
      }
      return pts
    }

    const createCubeModel = (size: number): { points: Point3D[]; connections: Array<[number, number]> } => {
      const vertices: Point3D[] = [
        { x: -size, y: -size, z: -size, char: '0' },
        { x: size, y: -size, z: -size, char: '1' },
        { x: size, y: size, z: -size, char: '0' },
        { x: -size, y: size, z: -size, char: '1' },
        { x: -size, y: -size, z: size, char: '1' },
        { x: size, y: -size, z: size, char: '0' },
        { x: size, y: size, z: size, char: '1' },
        { x: -size, y: size, z: size, char: '0' }
      ]
      
      const points = [...vertices]
      const baseEdges: Array<[number, number]> = [
        [0, 1], [1, 2], [2, 3], [3, 0], // back
        [4, 5], [5, 6], [6, 7], [7, 4], // front
        [0, 4], [1, 5], [2, 6], [3, 7]  // vertical link lines
      ]
      
      const connections: Array<[number, number]> = []
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
            char: Math.random() > 0.5 ? '1' : '0'
          })
          connections.push([prev, currIdx])
          prev = currIdx
          currIdx++
        }
        connections.push([prev, v])
      })

      return { points, connections }
    }

    const createTorusModel = (R: number, r: number, uSegs: number, vSegs: number): { points: Point3D[]; connections: Array<[number, number]> } => {
      const points: Point3D[] = []
      const connections: Array<[number, number]> = []

      for (let i = 0; i < uSegs; i++) {
        const u = (i / uSegs) * Math.PI * 2
        for (let j = 0; j < vSegs; j++) {
          const v = (j / vSegs) * Math.PI * 2
          points.push({
            x: (R + r * Math.cos(v)) * Math.cos(u),
            y: (R + r * Math.cos(v)) * Math.sin(u),
            z: r * Math.sin(v),
            char: Math.random() > 0.5 ? '1' : '0'
          })
        }
      }

      for (let i = 0; i < uSegs; i++) {
        for (let j = 0; j < vSegs; j++) {
          const curr = i * vSegs + j
          const nextU = ((i + 1) % uSegs) * vSegs + j
          const nextV = i * vSegs + ((j + 1) % vSegs)
          connections.push([curr, nextU])
          connections.push([curr, nextV])
        }
      }

      return { points, connections }
    }

    // Initialize 3D Models array
    const models: Model3D[] = []
    const initModels = () => {
      models.length = 0
      const baseRadius = Math.min(width, height)
      
      // 1. Giant Center Sphere (full screen size on launch)
      const sphereRadius = baseRadius * 0.35
      const spherePoints = createSpherePoints(sphereRadius, 115)
      const sphereConnections: Array<[number, number]> = []
      
      for (let i = 0; i < spherePoints.length; i++) {
        let conns = 0
        for (let j = i + 1; j < spherePoints.length; j++) {
          if (conns >= 2) break
          const d = Math.sqrt(
            Math.pow(spherePoints[i].x - spherePoints[j].x, 2) +
            Math.pow(spherePoints[i].y - spherePoints[j].y, 2) +
            Math.pow(spherePoints[i].z - spherePoints[j].z, 2)
          )
          if (d < sphereRadius * 0.42) {
            sphereConnections.push([i, j])
            conns++
          }
        }
      }

      models.push({
        points: spherePoints,
        connections: sphereConnections,
        xOffset: 0.5, // Screen center
        yOffset: 0.5,
        scaleMultiplier: 1.0,
        rotateSpeedX: 0.0012,
        rotateSpeedY: 0.0015,
        colorType: 'cyan'
      })

      // 2. Floating Cube (upper-left side)
      const cubeSize = baseRadius * 0.12
      const cube = createCubeModel(cubeSize)
      models.push({
        points: cube.points,
        connections: cube.connections,
        xOffset: 0.18,
        yOffset: 0.26,
        scaleMultiplier: 0.9,
        rotateSpeedX: 0.0028,
        rotateSpeedY: 0.0035,
        colorType: 'purple'
      })

      // 3. Floating Torus (lower-right side)
      const torus = createTorusModel(baseRadius * 0.11, baseRadius * 0.035, 12, 6)
      models.push({
        points: torus.points,
        connections: torus.connections,
        xOffset: 0.82,
        yOffset: 0.74,
        scaleMultiplier: 0.9,
        rotateSpeedX: -0.002,
        rotateSpeedY: 0.0028,
        colorType: 'green'
      })
    }

    initColumns()
    initModels()

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initColumns()
      initModels()
    }

    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX - width / 2
      mouse.y = e.clientY - height / 2
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    // Helper: Euler rotation matrix rotation
    const rotatePoints = (points: Point3D[], angleX: number, angleY: number) => {
      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)
      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)

      points.forEach(p => {
        // Rotate X axis
        const y1 = p.y * cosX - p.z * sinX
        const z1 = p.y * sinX + p.z * cosX
        
        // Rotate Y axis
        const x2 = p.x * cosY + z1 * sinY
        const z2 = -p.x * sinY + z1 * cosY

        p.x = x2
        p.y = y1
        p.z = z2
      })
    }

    const animate = () => {
      const dark = isDarkMode()
      
      // Clear with slight trailing alpha to create digital blur trails
      ctx.fillStyle = dark ? 'rgba(3, 7, 18, 0.13)' : 'rgba(247, 243, 238, 0.15)'
      ctx.fillRect(0, 0, width, height)

      // 1. Draw matrix rain columns (background layers)
      columns.forEach((col) => {
        col.y += col.speed
        if (col.y > height + 150) {
          col.y = Math.random() * -200 - 100
        }

        const parallaxOffsetX = mouse.x * (col.depth - 2) * 0.03
        const parallaxOffsetY = mouse.y * (col.depth - 2) * 0.015
        const drawX = col.x + parallaxOffsetX

        for (let i = 0; i < col.chars.length; i++) {
          const charY = col.y - i * col.fontSize
          const drawY = charY + parallaxOffsetY

          if (drawY < -20 || drawY > height + 20) continue

          if (Math.random() < 0.02) {
            col.chars[i] = Math.random() > 0.5 ? '1' : '0'
          }

          const tailFade = 1 - i / col.chars.length
          const currentOpacity = col.opacity * tailFade

          let charColor = ''
          if (i === 0) {
            charColor = dark 
              ? `rgba(34, 211, 238, ${col.opacity})` 
              : `rgba(29, 78, 216, ${col.opacity})`
          } else {
            charColor = dark
              ? `rgba(16, 185, 129, ${currentOpacity})`
              : `rgba(5, 150, 105, ${currentOpacity})`
          }

          ctx.fillStyle = charColor
          ctx.font = `${col.fontSize}px monospace`
          ctx.fillText(col.chars[i], drawX, drawY)
        }
      })

      // 2. Render 3D Models (Transparent wireframes)
      models.forEach(model => {
        const centerX = width * model.xOffset
        const centerY = height * model.yOffset
        const sizeBound = Math.min(width, height) * 0.38

        // Calculate rotation speeds: constant automatic spin + mouse tilt influence
        let rotateAngleX = model.rotateSpeedX
        let rotateAngleY = model.rotateSpeedY

        // Mouse coordinates distance ratio
        const mouseDistX = mouse.x / (width / 2)
        const mouseDistY = mouse.y / (height / 2)
        
        rotateAngleX += mouseDistY * 0.0006
        rotateAngleY += mouseDistX * 0.0006

        // Rotate vertices
        rotatePoints(model.points, rotateAngleX, rotateAngleY)

        // Project points using perspective mapping
        const perspective = sizeBound * 2.3
        const projected = model.points.map((p, idx) => {
          const scale = perspective / (perspective + p.z)
          const pX = p.x * scale * model.scaleMultiplier + centerX
          const pY = p.y * scale * model.scaleMultiplier + centerY
          
          return {
            x: pX,
            y: pY,
            z: p.z,
            scale,
            char: p.char,
            originalIndex: idx
          }
        })

        // Draw connections (faint lines)
        if (dark) {
          if (model.colorType === 'cyan') ctx.strokeStyle = 'rgba(34, 211, 238, 0.028)'
          else if (model.colorType === 'purple') ctx.strokeStyle = 'rgba(168, 85, 247, 0.025)'
          else ctx.strokeStyle = 'rgba(16, 185, 129, 0.02)'
        } else {
          if (model.colorType === 'cyan') ctx.strokeStyle = 'rgba(37, 99, 235, 0.02)'
          else if (model.colorType === 'purple') ctx.strokeStyle = 'rgba(147, 51, 234, 0.015)'
          else ctx.strokeStyle = 'rgba(5, 150, 105, 0.015)'
        }
        ctx.lineWidth = 0.4
        ctx.shadowBlur = 0

        model.connections.forEach(([u, v]) => {
          const p1 = projected[u]
          const p2 = projected[v]
          
          if (!p1 || !p2) return
          if (p1.x < 0 || p1.x > width || p1.y < 0 || p1.y > height) return
          if (p2.x < 0 || p2.x > width || p2.y < 0 || p2.y > height) return

          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        })

        // Render binary digits (vertices) sorted by Z depth
        const sortedProjected = [...projected].sort((a, b) => a.z - b.z)
        
        sortedProjected.forEach(p => {
          if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) return

          const zNorm = (p.z + sizeBound) / (2 * sizeBound)
          const opacity = 0.06 + zNorm * 0.38
          const fontSize = Math.max(6.5, Math.floor(10.5 * p.scale))

          if (Math.random() < 0.005) {
            model.points[p.originalIndex].char = Math.random() > 0.5 ? '1' : '0'
          }

          let color = ''
          if (model.colorType === 'cyan') {
            color = dark ? `rgba(34, 211, 238, ${opacity})` : `rgba(37, 99, 235, ${opacity})`
          } else if (model.colorType === 'purple') {
            color = dark ? `rgba(192, 132, 252, ${opacity})` : `rgba(147, 51, 234, ${opacity})`
          } else {
            color = dark ? `rgba(110, 231, 183, ${opacity})` : `rgba(5, 150, 105, ${opacity})`
          }

          ctx.fillStyle = color
          ctx.font = `bold ${fontSize}px monospace`
          ctx.fillText(p.char, p.x, p.y)
        })
      })

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
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-transparent"
    />
  )
}
