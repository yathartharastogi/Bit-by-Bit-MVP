'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import type { CanvasProps } from '@react-three/fiber'
import ErrorBoundary from '@/components/ErrorBoundary'

// ─── Quality Tier Detection ───────────────────────────────────────────────────
type QualityTier = 1 | 2 | 3

function detectQualityTier(): QualityTier {
  if (typeof window === 'undefined') return 2

  // Tier 3: reduced-motion or very low-spec
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 3
  if (typeof navigator !== 'undefined') {
    if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 2) return 3
    // @ts-expect-error — connection API is not in all TypeScript lib defs
    const conn = navigator.connection
    if (conn && (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g')) return 3
  }

  // Tier 2: mid-range
  const dpr = window.devicePixelRatio ?? 1
  if (dpr < 1.5 && navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4) return 2

  return 1
}

function getDpr(tier: QualityTier): [number, number] {
  if (tier === 1) return [1, 2]
  if (tier === 2) return [1, 1.5]
  return [1, 1]
}

// ─── WebGL Support Check ──────────────────────────────────────────────────────
function supportsWebGL(): boolean {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface SceneWrapperProps extends Omit<CanvasProps, 'children'> {
  children: ReactNode
  /** Outer container className */
  className?: string
  /** Static fallback element when WebGL or reduced-motion is unavailable */
  fallback?: ReactNode
  /** Force demand-based frame rendering (default: true) */
  demandFrameloop?: boolean
}

export default function SceneWrapper({
  children,
  className = '',
  fallback = null,
  demandFrameloop = true,
  ...canvasProps
}: SceneWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [tier, setTier] = useState<QualityTier>(2)
  const [webglOk, setWebglOk] = useState(true)

  // Detect tier and WebGL support after mount (client only)
  useEffect(() => {
    setMounted(true)
    setTier(detectQualityTier())
    setWebglOk(supportsWebGL())
  }, [])

  // IntersectionObserver — pause rendering when off-screen
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '100px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!mounted) {
    // Server-side / pre-hydration placeholder — same dimensions, no flicker
    return <div ref={containerRef} className={className} aria-hidden="true" />
  }

  // Tier 3 or no WebGL → show fallback
  if (tier === 3 || !webglOk) {
    return (
      <div ref={containerRef} className={className}>
        {fallback}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={className}>
      <ErrorBoundary fallback={fallback}>
        <Canvas
          frameloop={!visible ? 'never' : demandFrameloop ? 'demand' : 'always'}
          dpr={getDpr(tier)}
          aria-hidden="true"
          role="presentation"
          gl={{ antialias: tier === 1, powerPreference: 'default', alpha: true }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          {...canvasProps}
        >
          {children}
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
