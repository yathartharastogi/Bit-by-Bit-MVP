'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'

const SceneWrapper = dynamic(() => import('./SceneWrapper'), { ssr: false })

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Generate random node positions
  const nodeCount = 40
  const radius = 3.5
  
  const [{ positions, connections }] = useState(() => {
    const pos: [number, number, number][] = []
    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const r = radius * Math.cbrt(Math.random()) * 1.2
      
      pos.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ])
    }
    
    // Create connections based on distance
    const conns: { start: [number, number, number], end: [number, number, number] }[] = []
    for (let i = 0; i < nodeCount; i++) {
      let edges = 0
      for (let j = i + 1; j < nodeCount; j++) {
        if (edges >= 3) break // max 3 connections per node to keep it clean
        
        const dx = pos[i][0] - pos[j][0]
        const dy = pos[i][1] - pos[j][1]
        const dz = pos[i][2] - pos[j][2]
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz)
        
        if (dist < 3.0) {
          conns.push({ start: pos[i], end: pos[j] })
          edges++
        }
      }
    }
    
    return { positions: pos, connections: conns }
  })

  useFrame((state) => {
    if (groupRef.current) {
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
      groupRef.current.rotation.y = (state.clock.elapsedTime * 0.08) + (scrollY * 0.002)
      groupRef.current.rotation.x = (state.clock.elapsedTime * 0.04) + (scrollY * 0.001)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Edges */}
      {connections.map((conn, idx) => (
        <Line 
          key={`line-${idx}`} 
          points={[conn.start, conn.end]} 
          color="#3b82f6" 
          opacity={0.12} 
          transparent 
          lineWidth={1}
        />
      ))}
      
      {/* Nodes */}
      {positions.map((pos, idx) => (
        <Sphere key={`node-${idx}`} args={[0.07, 16, 16]} position={pos}>
          <meshPhysicalMaterial 
            color="#22d3ee" 
            emissive="#1d4ed8"
            emissiveIntensity={0.5}
            roughness={0.1}
            transmission={0.9}
            thickness={0.5}
            transparent
            opacity={0.55}
          />
        </Sphere>
      ))}

    </group>
  )
}

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
      
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <NetworkNodes />
      </Float>
    </>
  )
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-primary/5 animate-pulse ${className ?? ''}`}
    />
  )
}

export default function NexusScene({
  className = 'w-full h-full min-h-[400px]',
}: {
  className?: string
}) {
  return (
    <Suspense fallback={<Skeleton className={className} />}>
      <SceneWrapper
        className={className}
        demandFrameloop={false}
        camera={{ position: [0, 0, 9], fov: 70 }}
        fallback={<Skeleton className={className} />}
      >
        <SceneContents />
      </SceneWrapper>
    </Suspense>
  )
}
