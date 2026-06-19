'use client'

import { useRef, Suspense, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import dynamic from 'next/dynamic'
import ErrorBoundary from '@/components/ErrorBoundary'

// Lazy load the SceneWrapper so we don't block SSR
const SceneWrapper = dynamic(() => import('@/components/three/SceneWrapper'), { ssr: false })

function InstagramCoin() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.1
    groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.1 + 0.1
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.05
  })

  // Create a perfect hollow rounded square shape for the Instagram outline
  const outlineShape = useMemo(() => {
    const shape = new THREE.Shape()
    const width = 0.9, height = 0.9, radius = 0.25
    
    // Outer rounded rect
    shape.moveTo(-width/2 + radius, -height/2)
    shape.lineTo(width/2 - radius, -height/2)
    shape.quadraticCurveTo(width/2, -height/2, width/2, -height/2 + radius)
    shape.lineTo(width/2, height/2 - radius)
    shape.quadraticCurveTo(width/2, height/2, width/2 - radius, height/2)
    shape.lineTo(-width/2 + radius, height/2)
    shape.quadraticCurveTo(-width/2, height/2, -width/2, height/2 - radius)
    shape.lineTo(-width/2, -height/2 + radius)
    shape.quadraticCurveTo(-width/2, -height/2, -width/2 + radius, -height/2)

    // Inner hole
    const hole = new THREE.Path()
    const iW = 0.65, iH = 0.65, iR = 0.15
    hole.moveTo(-iW/2 + iR, -iH/2)
    hole.lineTo(iW/2 - iR, -iH/2)
    hole.quadraticCurveTo(iW/2, -iH/2, iW/2, -iH/2 + iR)
    hole.lineTo(iW/2, iH/2 - iR)
    hole.quadraticCurveTo(iW/2, iH/2, iW/2 - iR, iH/2)
    hole.lineTo(-iW/2 + iR, iH/2)
    hole.quadraticCurveTo(-iW/2, iH/2, -iW/2, iH/2 - iR)
    hole.lineTo(-iW/2, -iH/2 + iR)
    hole.quadraticCurveTo(-iW/2, -iH/2, -iW/2 + iR, -iH/2)
    
    shape.holes.push(hole)
    return shape
  }, [])

  // Generate Instagram's actual gradient using a canvas texture
  const gradientTexture = useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 512, 512, 0) // Bottom-left to top-right
      gradient.addColorStop(0, '#f09433')
      gradient.addColorStop(0.25, '#e6683c')
      gradient.addColorStop(0.5, '#dc2743')
      gradient.addColorStop(0.75, '#cc2366')
      gradient.addColorStop(1, '#bc1888')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 512, 512)
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  const baseMaterial = (
    <meshStandardMaterial 
      map={gradientTexture || undefined} 
      color={!gradientTexture ? "#e11d48" : "#ffffff"} 
      roughness={0.2} 
      metalness={0.4} 
    />
  )
  const whiteMaterial = (
    <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} />
  )

  return (
    <group 
      rotation={[0.15, -0.25, -0.1]} 
      position={[-1.4, 0, 0]} 
      onClick={() => window.open('https://www.instagram.com/bitbybit_vitb/', '_blank', 'noopener,noreferrer')}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      <group ref={groupRef} scale={1.2}>
        {/* Base Coin */}
        <RoundedBox args={[1.5, 1.5, 0.3]} radius={0.35} smoothness={4}>
          {baseMaterial}
        </RoundedBox>

        {/* Instagram Outline */}
        <mesh position={[0, 0, 0.15]}>
          <extrudeGeometry args={[outlineShape, { depth: 0.05, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 }]} />
          {whiteMaterial}
        </mesh>

        {/* Lens (Torus) */}
        <mesh position={[0, 0, 0.18]}>
          <torusGeometry args={[0.18, 0.05, 12, 24]} />
          {whiteMaterial}
        </mesh>

        {/* Dot */}
        <mesh position={[0.26, 0.26, 0.18]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          {whiteMaterial}
        </mesh>
      </group>
    </group>
  )
}

function LinkedInCoin() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    // Offset the sine waves slightly so they bob out of sync
    groupRef.current.position.y = Math.sin(t * 1.5 + 1) * 0.1
    groupRef.current.rotation.y = Math.sin(t * 0.8 + 1) * 0.1 - 0.1
    groupRef.current.rotation.z = Math.sin(t * 0.5 + 1) * 0.05
  })

  const baseMaterial = (
    <meshStandardMaterial color="#0a66c2" roughness={0.2} metalness={0.4} />
  )
  const whiteMaterial = (
    <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} />
  )

  return (
    <group 
      rotation={[-0.15, 0.25, 0.1]} 
      position={[1.4, 0, 0]}
      onClick={() => window.open('https://www.linkedin.com/company/bit-by-bit-club?originalSubdomain=in', '_blank', 'noopener,noreferrer')}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      <group ref={groupRef} scale={1.2}>
        {/* Base Coin */}
        <RoundedBox args={[1.5, 1.5, 0.3]} radius={0.35} smoothness={4}>
          {baseMaterial}
        </RoundedBox>

        {/* LinkedIn Letters 'in' */}
        <group position={[0, -0.05, 0.16]}>
          {/* The 'i' */}
          <mesh position={[-0.35, -0.1, 0]}>
            <boxGeometry args={[0.18, 0.5, 0.1]} />
            {whiteMaterial}
          </mesh>
          <mesh position={[-0.35, 0.32, 0]}>
            <sphereGeometry args={[0.11, 12, 12]} />
            {whiteMaterial}
          </mesh>

          {/* The 'n' */}
          <group position={[0.2, 0, 0]}>
            {/* Left stem */}
            <mesh position={[-0.15, -0.1, 0]}>
              <boxGeometry args={[0.16, 0.5, 0.1]} />
              {whiteMaterial}
            </mesh>
            {/* Arch */}
            <mesh position={[0, 0, 0]} scale={[1, 1, 0.625]}>
              <torusGeometry args={[0.15, 0.08, 12, 24, Math.PI]} />
              {whiteMaterial}
            </mesh>
            {/* Right stem */}
            <mesh position={[0.15, -0.175, 0]}>
              <boxGeometry args={[0.16, 0.35, 0.1]} />
              {whiteMaterial}
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

function CoinsScene() {
  return (
    <group>
      <InstagramCoin />
      <LinkedInCoin />
    </group>
  )
}

export default function SocialCoins3D() {
  return (
    <ErrorBoundary fallback={<div className="w-56 h-40 lg:w-80 lg:h-56 opacity-0 pointer-events-none" />}>
      <div className="relative flex items-center justify-center w-56 h-40 lg:w-80 lg:h-56 -my-4 lg:-my-8">
        
        <Suspense fallback={
          <div className="flex gap-6 mt-8 mb-2">
            <a href="https://www.instagram.com/bitbybit_vitb/" target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-lg shadow-pink-500/20 active:scale-95 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/bit-by-bit-club?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-2xl bg-[#0a66c2] text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        }>
          <SceneWrapper 
            className="w-full h-full" 
            camera={{ position: [0, 0, 5], fov: 50 }} 
            demandFrameloop={false} 
            dpr={[1, 1.25]} 
            fallback={
              <div className="flex items-center justify-center w-full h-full">
                <div className="flex gap-6">
                  <a href="https://www.instagram.com/bitbybit_vitb/" target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-lg shadow-pink-500/20 active:scale-95 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/bit-by-bit-club?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-2xl bg-[#0a66c2] text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            }
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
            
            <CoinsScene />
          </SceneWrapper>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}
