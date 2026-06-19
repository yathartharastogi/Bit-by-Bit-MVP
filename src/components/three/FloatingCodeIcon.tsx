'use client'

import { useRef, useEffect, Suspense } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import dynamic from 'next/dynamic'
import ErrorBoundary from '@/components/ErrorBoundary'

// Lazy load the SceneWrapper so we don't block SSR
const SceneWrapper = dynamic(() => import('@/components/three/SceneWrapper'), { ssr: false })

function WebDevElement() {
  const groupRef = useRef<THREE.Group>(null)
  
  // For pointer tracking tilt
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })

  const eyesRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window === 'undefined') return
      
      const width = Math.max(1, window.innerWidth)
      const height = Math.max(1, window.innerHeight)
      
      // Normalize mouse coordinates to -1 to 1
      const x = (e.clientX / width) * 2 - 1
      const y = -(e.clientY / height) * 2 + 1
      
      // Target rotation (tilt limits)
      targetRotation.current.y = x * 0.4
      targetRotation.current.x = -y * 0.4
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    
    // Smooth interpolation towards target pointer rotation
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.1
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.1
    
    const t = clock.elapsedTime
    
    // Floating motion with slightly more vertical travel
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.15
    
    // Combine base auto-rotation and pointer tilt
    groupRef.current.rotation.x = currentRotation.current.x + Math.sin(t * 0.8) * 0.08
    groupRef.current.rotation.y = currentRotation.current.y + Math.sin(t * 1.2) * 0.08
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.04

    // Move the tracking eyes
    if (eyesRef.current) {
      // exaggerated local movement for the eyes based on pointer
      eyesRef.current.position.x = currentRotation.current.y * 1.5
      eyesRef.current.position.y = -currentRotation.current.x * 1.5
    }
  })

  // Materials for cyborg metallic style
  const silverMaterial = (
    <meshStandardMaterial
      color="#cbd5e1"
      metalness={0.9}
      roughness={0.15}
      emissive="#0f172a"
      emissiveIntensity={0.2}
    />
  )

  const cyanMaterial = (
    <meshStandardMaterial
      color="#06b6d4"
      metalness={0.8}
      roughness={0.2}
      emissive="#083344"
      emissiveIntensity={0.6}
    />
  )

  // Dimensions
  const thick = 0.28
  const length = 1.4
  const offset = length / 2 * 0.707 // ~0.495

  return (
    <group rotation={[-0.15, -0.4, 0.1]}>
      <group ref={groupRef} scale={1.9}>
        {/* Left Bracket < */}
        <group position={[-1.3, 0, 0]}>
        {/* Top arm (goes up-right) */}
        <RoundedBox args={[length, thick, thick]} radius={0.06} position={[offset, offset, 0]} rotation={[0, 0, Math.PI / 4]}>
          {silverMaterial}
        </RoundedBox>
        {/* Bottom arm (goes down-right) - tiny Z offset to prevent z-fighting */}
        <RoundedBox args={[length, thick, thick]} radius={0.06} position={[offset, -offset, -0.015]} rotation={[0, 0, -Math.PI / 4]}>
          {silverMaterial}
        </RoundedBox>
      </group>

      {/* Slash / */}
      <RoundedBox args={[thick, 3.2, thick]} radius={0.06} position={[0, 0, 0.12]} rotation={[0, 0, -Math.PI / 6]}>
        {cyanMaterial}
      </RoundedBox>

      {/* Right Bracket > */}
      <group position={[1.3, 0, 0]}>
        {/* Top arm (goes up-left) */}
        <RoundedBox args={[length, thick, thick]} radius={0.06} position={[-offset, offset, 0]} rotation={[0, 0, 3 * Math.PI / 4]}>
          {silverMaterial}
        </RoundedBox>
        {/* Bottom arm (goes down-left) - tiny Z offset to prevent z-fighting */}
        <RoundedBox args={[length, thick, thick]} radius={0.06} position={[-offset, -offset, -0.015]} rotation={[0, 0, -3 * Math.PI / 4]}>
          {silverMaterial}
        </RoundedBox>
      </group>

      {/* Tracking Eyes (floating slightly in front of the central slash) */}
      <group ref={eyesRef}>
        {/* Left Eye */}
        <mesh position={[-0.35, 0.2, 0.2]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#ffffff" emissive="#0ea5e9" emissiveIntensity={2} />
        </mesh>
        {/* Right Eye */}
        <mesh position={[0.35, 0.2, 0.2]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#ffffff" emissive="#0ea5e9" emissiveIntensity={2} />
        </mesh>
      </group>

    </group>
    </group>
  )
}

export default function FloatingCodeIcon() {
  return (
    <ErrorBoundary fallback={<div className="w-72 h-72 lg:w-96 lg:h-96 -my-8 lg:-my-12 opacity-0 pointer-events-none" />}>
      <div className="relative flex items-center justify-center w-72 h-72 lg:w-96 lg:h-96 -my-8 lg:-my-12">
        <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full scale-150 pointer-events-none" />

        <Suspense fallback={<div className="w-full h-full rounded-full bg-cyan-500/10 animate-pulse" />}>
          <SceneWrapper className="w-full h-full" camera={{ position: [0, 0, 8.5], fov: 50 }} demandFrameloop={false} fallback={<div className="w-full h-full rounded-full bg-cyan-500/10" />}>
            {/* Lighting to enhance the metallic/cyborg look */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
            <directionalLight position={[-5, -10, -5]} intensity={0.5} color="#06b6d4" />
            <pointLight position={[0, 0, 4]} intensity={2.5} color="#0ea5e9" distance={10} />
            <pointLight position={[-3, 2, 2]} intensity={1} color="#38bdf8" />
            
            <WebDevElement />
          </SceneWrapper>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}
