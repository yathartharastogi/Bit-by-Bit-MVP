'use client'

import dynamic from 'next/dynamic'
import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'

// ─── Reactive CSS variable — updates on dark/light toggle ────────────────────
function useCSSColor(varName: string, fallback: string): string {
  const [color, setColor] = useState(fallback)

  useEffect(() => {
    function read() {
      const val = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim()
      setColor(val || fallback)
    }
    read()

    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [varName, fallback])

  return color
}

// ─── Orbital Ring ─────────────────────────────────────────────────────────────
function OrbitalRing({
  radius,
  tubeRadius,
  rotX,
  rotZ,
  speed,
  color,
}: {
  radius: number
  tubeRadius: number
  rotX: number
  rotZ: number
  speed: number
  color: string
}) {
  const ringRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!ringRef.current) return
    ringRef.current.rotation.y += delta * speed
    ringRef.current.rotation.x += delta * speed * 0.3
  })

  const geometry = useMemo(
    () => new THREE.TorusGeometry(radius, tubeRadius, 16, 100),
    [radius, tubeRadius]
  )

  const [binaries] = useState(() => {
    const chars = []
    const count = 12
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      chars.push({
        char: Math.random() > 0.5 ? '1' : '0',
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rot: Math.random() * Math.PI
      })
    }
    return chars
  })

  return (
    <group ref={ringRef} rotation={[rotX, 0, rotZ]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.55}
          roughness={0.2}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      {binaries.map((b, i) => (
        <Text
          key={i}
          position={[b.x, b.y, 0]}
          rotation={[0, 0, b.rot]}
          fontSize={0.15}
          color={color}
          fillOpacity={0.45}
          anchorX="center"
          anchorY="middle"
        >
          {b.char}
        </Text>
      ))}
    </group>
  )
}

// ─── Core Icosahedron ─────────────────────────────────────────────────────────
function IcoMesh({ primaryColor }: { primaryColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const edgesRef = useRef<THREE.LineSegments>(null)

  const [geometry, edgesGeom] = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.1, 1)
    const edges = new THREE.EdgesGeometry(geo)
    return [geo, edges]
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current || !edgesRef.current) return
    meshRef.current.rotation.y += delta * 0.18
    meshRef.current.rotation.x += delta * 0.07
    edgesRef.current.rotation.copy(meshRef.current.rotation)
    const pulse = 1 + 0.025 * Math.sin(state.clock.elapsedTime * 1.4)
    meshRef.current.scale.setScalar(pulse)
    edgesRef.current.scale.setScalar(pulse)
  })

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color={primaryColor}
          transparent
          opacity={0.22}
          roughness={0.05}
          metalness={0.9}
          transmission={0.4}
          thickness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments ref={edgesRef} geometry={edgesGeom}>
        <lineBasicMaterial color={primaryColor} transparent opacity={0.85} />
      </lineSegments>
    </group>
  )
}

// ─── Scene contents (requires Canvas context) ─────────────────────────────────
function SceneContents() {
  const primary = useCSSColor('--primary', '#2563eb')
  const accent = '#7c3aed'

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={2.5} color={primary} />
      <pointLight position={[-4, -2, -4]} intensity={1} color={accent} />

      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.6}>
        <IcoMesh primaryColor={primary} />

        {/* Ring 1 — equatorial */}
        <OrbitalRing radius={1.7} tubeRadius={0.014} rotX={Math.PI / 2} rotZ={0} speed={0.4} color={primary} />
        {/* Ring 2 — tilted */}
        <OrbitalRing radius={2.1} tubeRadius={0.010} rotX={Math.PI / 4} rotZ={Math.PI / 6} speed={-0.25} color={accent} />
        {/* Ring 3 — near-vertical */}
        <OrbitalRing radius={2.4} tubeRadius={0.008} rotX={0.15} rotZ={Math.PI / 2.4} speed={0.18} color={primary} />
      </Float>
    </>
  )
}

// ─── Canvas wrapper (lazy, ssr:false) ─────────────────────────────────────────
const SceneWrapper = dynamic(() => import('./SceneWrapper'), { ssr: false })

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-primary/5 border border-primary/10 animate-pulse ${className ?? ''}`}
    />
  )
}

// ─── Public export ────────────────────────────────────────────────────────────
export default function CoreNodeScene({
  className = 'w-full h-[340px] lg:h-[420px]',
}: {
  className?: string
}) {
  return (
    <Suspense fallback={<Skeleton className={className} />}>
      <SceneWrapper
        className={`${className} rounded-2xl overflow-hidden`}
        demandFrameloop={false}
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        fallback={<Skeleton className={className} />}
      >
        <SceneContents />
      </SceneWrapper>
    </Suspense>
  )
}
