'use client'

import { useRef, Suspense, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { RoundedBox } from '@react-three/drei'
import dynamic from 'next/dynamic'
import ErrorBoundary from '@/components/ErrorBoundary'

// Lazy load the SceneWrapper so we don't block SSR
const SceneWrapper = dynamic(() => import('@/components/three/SceneWrapper'), { ssr: false })

function GrowingRing({ args, rotation, position, offset }: any) {
  const geomRef = useRef<THREE.TorusGeometry>(null)

  useFrame(({ clock }) => {
    if (!geomRef.current) return
    const total = geomRef.current.index?.count || 0
    if (total === 0) return

    const CYCLE_DURATION = 17
    const t = clock.elapsedTime % CYCLE_DURATION

    // Each ring grows over 2 seconds
    const growStart = offset
    const growEnd = offset + 2.0

    // Each ring shrinks over 2 seconds
    const shrinkStart = 7.0 + offset
    const shrinkEnd = 7.0 + offset + 2.0

    let progress = 0

    if (t >= growStart && t <= growEnd) {
      // Smoothly growing
      const p = (t - growStart) / 2.0
      progress = p * p * (3 - 2 * p) // Smoothstep ease-in-out
    } else if (t > growEnd && t < shrinkStart) {
      // Fully formed
      progress = 1
    } else if (t >= shrinkStart && t <= shrinkEnd) {
      // Smoothly shrinking
      const p = (t - shrinkStart) / 2.0
      progress = 1 - (p * p * (3 - 2 * p))
    } else {
      // Empty
      progress = 0
    }

    const count = Math.floor(progress * total)
    // Draw only a portion of the vertices to simulate the pipe drawing itself
    geomRef.current.setDrawRange(0, Math.max(0, count - (count % 3)))
  })

  const material = useMemo(() => (
    <meshStandardMaterial color="#cbd5e1" roughness={0.15} metalness={0.9} />
  ), [])

  return (
    <mesh rotation={rotation} position={position}>
      <torusGeometry ref={geomRef} args={args} />
      {material}
    </mesh>
  )
}

function ThreeBarsLogo() {
  const groupRef = useRef<THREE.Group>(null)

  const bar1Ref = useRef<THREE.Group>(null)
  const bar2Ref = useRef<THREE.Group>(null)
  const bar3Ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    const CYCLE_DURATION = 17
    const cycleT = t % CYCLE_DURATION

    // Floating bob (static, no rotation as requested)
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.15 - 0.2

    // Helper to calculate sequential scale growing from bottom
    const getScale = (appearStart: number, disappearStart: number) => {
      let progress = 0
      const duration = 1.5
      const appearEnd = appearStart + duration
      const disappearEnd = disappearStart + duration

      if (cycleT >= disappearStart && cycleT <= disappearEnd) {
        // Shrinking
        const p = (cycleT - disappearStart) / duration
        progress = 1 - (p * p * (3 - 2 * p))
      } else if (cycleT > disappearEnd && cycleT < appearStart) {
        // Empty
        progress = 0
      } else if (cycleT >= appearStart && cycleT <= appearEnd) {
        // Growing
        const p = (cycleT - appearStart) / duration
        progress = p * p * (3 - 2 * p)
      } else {
        // Full
        progress = 1
      }
      return progress
    }

    // Globe finishes shrinking at 12.0. Bars start appearing at 10.0 to overlap with the last rings disappearing.
    const p1 = getScale(10.0, 0.0)
    const p2 = getScale(10.5, 0.5)
    const p3 = getScale(11.0, 1.0)

    if (bar1Ref.current) {
      bar1Ref.current.scale.y = Math.max(0.0001, p1)
      bar1Ref.current.visible = p1 > 0.01
    }
    if (bar2Ref.current) {
      bar2Ref.current.scale.y = Math.max(0.0001, p2)
      bar2Ref.current.visible = p2 > 0.01
    }
    if (bar3Ref.current) {
      bar3Ref.current.scale.y = Math.max(0.0001, p3)
      bar3Ref.current.visible = p3 > 0.01
    }
  })

  // Metallic blue material
  const barMaterial = useMemo(() => (
    <meshStandardMaterial
      color="#2563eb"
      roughness={0.2}
      metalness={0.8}
    />
  ), [])

  return (
    <group ref={groupRef} scale={1.4}>
      {/* 
        To make bars grow from the bottom, the group's origin is at the bottom.
        The RoundedBox is shifted up by half its height so it rests exactly on the group origin.
      */}
      <group position={[-0.4, -0.4, 0]} ref={bar1Ref}>
        <RoundedBox args={[0.25, 0.6, 0.25]} position={[0, 0.3, 0]} radius={0.05}>
          {barMaterial}
        </RoundedBox>
      </group>

      <group position={[0, -0.4, 0]} ref={bar2Ref}>
        <RoundedBox args={[0.25, 1.0, 0.25]} position={[0, 0.5, 0]} radius={0.05}>
          {barMaterial}
        </RoundedBox>
      </group>

      <group position={[0.4, -0.4, 0]} ref={bar3Ref}>
        <RoundedBox args={[0.25, 1.4, 0.25]} position={[0, 0.7, 0]} radius={0.05}>
          {barMaterial}
        </RoundedBox>
      </group>
    </group>
  )
}

function GlobeElement() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime

    // Continuous floating bob
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.15

    // Very slowly rotate on Y-axis as requested
    groupRef.current.rotation.y = t * 0.2

    // Maintain a slight tilt so the intersecting rings look 3D and dynamic
    groupRef.current.rotation.x = 0.25
    groupRef.current.rotation.z = 0.15
  })

  const radius = 1.6
  const tube = 0.06

  // For the latitude rings, we calculate the radius using trigonometry (cos 30 degrees = ~0.866)
  const tropicRadius = radius * 0.866

  return (
    <group ref={groupRef}>
      <GrowingRing args={[radius, tube, 16, 64]} rotation={[Math.PI / 2, 0, 0]} offset={0.0} />
      <GrowingRing args={[radius, tube, 16, 64]} offset={0.5} />
      <GrowingRing args={[radius, tube, 16, 64]} rotation={[0, Math.PI / 2, 0]} offset={1.0} />
      <GrowingRing args={[radius, tube, 16, 64]} rotation={[0, Math.PI / 4, 0]} offset={1.5} />
      <GrowingRing args={[radius, tube, 16, 64]} rotation={[0, -Math.PI / 4, 0]} offset={2.0} />
      <GrowingRing args={[tropicRadius, tube, 16, 64]} position={[0, radius * 0.5, 0]} rotation={[Math.PI / 2, 0, 0]} offset={2.5} />
      <GrowingRing args={[tropicRadius, tube, 16, 64]} position={[0, -radius * 0.5, 0]} rotation={[Math.PI / 2, 0, 0]} offset={3.0} />
    </group>
  )
}

export default function WebGlobe3D() {
  return (
    <ErrorBoundary fallback={<div className="w-72 h-72 lg:w-96 lg:h-96 -my-8 lg:-my-12 opacity-0 pointer-events-none" />}>
      <div className="relative flex items-center justify-center w-72 h-72 lg:w-96 lg:h-96 -my-8 lg:-my-12">
        {/* NO background glow or lighting as explicitly requested */}
        <Suspense fallback={<div className="w-full h-full rounded-full bg-transparent" />}>
          <SceneWrapper className="w-full h-full" camera={{ position: [0, 0, 5.5], fov: 50 }} demandFrameloop={false} fallback={<div className="w-full h-full rounded-full bg-transparent" />}>

            <ambientLight intensity={0.4} />
            {/* Primary spotlight for harsh metallic glints */}
            <directionalLight position={[5, 10, 5]} intensity={3} color="#ffffff" castShadow />
            {/* Fill light from opposite side */}
            <directionalLight position={[-5, -10, -5]} intensity={0.8} color="#f8fafc" />
            {/* Cold blue light to give the steel a realistic environmental reflection */}
            <pointLight position={[-3, 2, 4]} intensity={1.5} color="#93c5fd" />

            <GlobeElement />
            <ThreeBarsLogo />
          </SceneWrapper>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}
