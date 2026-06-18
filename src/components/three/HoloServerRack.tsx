'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// ─── Design Tokens ────────────────────────────────────────────────────────────
const BLADE_COUNT = 6
const BLADE_THICKNESS = 0.08
const RACK_SIZE = 2.4
const CORE_COLOR = '#0ea5e9' // Neon Blue/Cyan
const GLASS_COLOR = '#e2e8f0'

interface HoloServerRackProps {
    globalRotation?: { get: () => number }
}

export default function HoloServerRack({ globalRotation }: HoloServerRackProps) {
    const rackRef = useRef<THREE.Group>(null)
    const bladesRef = useRef<THREE.Group>(null)
    
    // Smooth scroll interpolation
    const scrollSmooth = useRef(0)
    const visibilitySmooth = useRef(0)
    const visibilityTarget = useRef(0)
    
    const { gl } = useThree()

    // ─── Scroll Tracker ───────────────────────────────────────────────────────
    useEffect(() => {
        const onScroll = () => {
            if (!gl.domElement) return
            const rect = gl.domElement.getBoundingClientRect()
            const windowHeight = window.innerHeight
            
            // Calculate distance from center of screen
            const elementCenterY = rect.top + rect.height / 2
            const screenCenterY = windowHeight / 2
            const distance = Math.abs(elementCenterY - screenCenterY)
            
            // Normalize: 1 = perfectly centered, 0 = completely offscreen
            const maxDistance = (windowHeight + rect.height) / 2
            const normalizedDist = Math.min(1, distance / maxDistance)
            
            // Let the blades separate slightly before fully centered
            const deadzone = 0.3
            let vis = 1
            if (normalizedDist > deadzone) {
                vis = 1 - ((normalizedDist - deadzone) / (1 - deadzone))
            }
            
            // Ease for smoother mechanical feel
            vis = Math.pow(vis, 1.5)
            visibilityTarget.current = vis
        }
        
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll() // Init
        return () => window.removeEventListener('scroll', onScroll)
    }, [gl])

    // ─── Animation Loop ───────────────────────────────────────────────────────
    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime
        
        // Smooth visibility interpolation
        visibilitySmooth.current += (visibilityTarget.current - visibilitySmooth.current) * 0.05
        const vis = visibilitySmooth.current

        if (rackRef.current) {
            // Apply global interactive rotation (scaled down to 60% speed for the 3D core) + gentle continuous floating
            let userRot = 0
            if (globalRotation) userRot = globalRotation.get() * (Math.PI / 180) * 0.6

            rackRef.current.rotation.y = userRot
            rackRef.current.position.y = Math.sin(elapsed * 0.5) * 0.1
        }

        if (bladesRef.current) {
            // Distribute blades physically based on visibility
            const maxSeparation = 0.6 // Gap between blades when fully open
            const minSeparation = 0.12 // Gap when closed
            const currentSeparation = minSeparation + (maxSeparation - minSeparation) * vis

            bladesRef.current.children.forEach((child, i) => {
                // Center the stack around Y=0
                const yOffset = (i - (BLADE_COUNT - 1) / 2) * currentSeparation
                child.position.y = yOffset
            })
        }
    })

    return (
        <group ref={rackRef} rotation={[0.2, 0, 0]} scale={1.35}>
            {/* ─── Glowing Core Pillar ───────────────────────────────────────── */}
            <mesh>
                <cylinderGeometry args={[0.3, 0.3, BLADE_COUNT * 0.5, 32]} />
                <meshStandardMaterial 
                    color={CORE_COLOR} 
                    emissive={CORE_COLOR}
                    emissiveIntensity={2.5}
                    toneMapped={false}
                />
            </mesh>

            {/* Internal Core Lights */}
            <pointLight position={[0, 1.5, 0]} intensity={1.5} color={CORE_COLOR} distance={8} />
            <pointLight position={[0, -1.5, 0]} intensity={1.5} color={CORE_COLOR} distance={8} />

            {/* ─── Holographic Glass Blades ──────────────────────────────────── */}
            <group ref={bladesRef}>
                {Array.from({ length: BLADE_COUNT }).map((_, i) => (
                    <group key={i}>
                        <RoundedBox args={[RACK_SIZE, BLADE_THICKNESS, RACK_SIZE]} radius={0.02} smoothness={4}>
                            <MeshTransmissionMaterial 
                                color={GLASS_COLOR}
                                transmission={0.95}
                                thickness={0.1}
                                roughness={0.1}
                                ior={1.3}
                                chromaticAberration={0.08}
                                distortionScale={0.2}
                                distortion={0.3}
                                temporalDistortion={0.05}
                            />
                        </RoundedBox>

                        {/* Edge highlights for the blades */}
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[RACK_SIZE + 0.02, BLADE_THICKNESS + 0.01, RACK_SIZE + 0.02]} />
                            <meshBasicMaterial 
                                color="#ffffff" 
                                wireframe 
                                transparent 
                                opacity={0.1} 
                            />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* ─── Ambient / Directional Lighting ────────────────────────────── */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <directionalLight position={[-5, -2, -5]} intensity={0.5} color={CORE_COLOR} />
        </group>
    )
}
