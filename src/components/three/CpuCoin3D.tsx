'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, MeshTransmissionMaterial, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// ─── Palette ──────────────────────────────────────────────────────────────────
const SILVER = '#d4dde8'
const SILVER_DARK = '#9eafc2'
const BLUE_GLOW = '#38bdf8'
const BLUE_DEEP = '#1d4ed8'
const WHITE_METAL = '#e8eef5'
const GOLD = '#c5a84a'
const GOLD_DARK = '#8a7030'
const GREEN_PCB = '#1a5c3a'

// ─── Helper: silver PBR material ─────────────────────────────────────────────
function silverMat(color = SILVER) {
    return (
        <meshStandardMaterial
            color={color}
            metalness={0.92}
            roughness={0.18}
            envMapIntensity={1.4}
        />
    )
}



// ─── BitByBit 3-bar logo (ascending bars) flat on the chip face ──────────────
function BitByBitLogo() {
    // Three bars ascending left→right — laid FLAT on the surface
    // w = width (X), d = depth/height of bar (Z), all share the same thin Y
    const bars: { w: number; d: number; x: number; z: number }[] = [
        { w: 0.045, d: 0.09, x: -0.065, z: 0.025 },  // short bar
        { w: 0.045, d: 0.13, x: 0.000, z: 0.005 },  // medium bar
        { w: 0.045, d: 0.17, x: 0.065, z: -0.015 },  // tall bar
    ]

    return (
        <group position={[0, 0.004, 0]}>
            {bars.map(({ w, d, x, z }, i) => (
                <mesh key={i} position={[x, 0, z]}>
                    <boxGeometry args={[w, 0.006, d]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#ffffff"
                        emissiveIntensity={3.0}
                        metalness={0.1}
                        roughness={0.35}
                    />
                </mesh>
            ))}
        </group>
    )
}

// ─── Rear CPU: LGA contact pads grid ─────────────────────────────────────────
function ContactPadGrid() {
    const pads = useMemo(() => {
        const list: { x: number; z: number }[] = []

        // Denser grid for realistic LGA socket appearance
        const gridSize = 24
        const spacing = 0.055
        const half = (gridSize - 1) * spacing * 0.5

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cx = col * spacing - half
                const cz = row * spacing - half

                // Cut out a centre rectangle (the "notch" area)
                if (Math.abs(cx) < 0.18 && Math.abs(cz) < 0.18) continue
                // Cut out one corner (alignment key)
                if (cx < -0.45 && cz < -0.45) continue

                list.push({ x: cx, z: cz })
            }
        }
        return list
    }, [])

    // Build a single InstancedMesh for performance
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Explicit geometry and material to avoid R3F args undefined bugs
    const geometry = useMemo(() => new THREE.BoxGeometry(0.035, 0.012, 0.035), [])
    const material = useMemo(() => new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0.9, roughness: 0.15 }), [])

    useEffect(() => {
        if (!meshRef.current) return
        pads.forEach((p, i) => {
            dummy.position.set(p.x, 0, p.z)
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    }, [pads, dummy])

    return (
        <instancedMesh ref={meshRef} args={[geometry, material, pads.length]} />
    )
}

// ─── Rear side of the CPU ────────────────────────────────────────────────────
function ChipRear() {
    return (
        <group position={[0, -0.11, 0]} rotation={[Math.PI, 0, 0]}>
            {/* Green PCB substrate (height 0.015 -> max radius 0.0075) */}
            <RoundedBox args={[1.50, 0.015, 1.50]} radius={0.006} smoothness={4} position={[0, 0, 0]}>
                <meshStandardMaterial color={GREEN_PCB} metalness={0.3} roughness={0.65} />
            </RoundedBox>

            {/* Contact pads grid — pushed to y=0.015 to strongly protrude */}
            <group position={[0, 0.015, 0]}>
                <ContactPadGrid />
            </group>

            {/* Central dark capacitor notch area */}
            <RoundedBox args={[0.24, 0.012, 0.24]} radius={0.004} smoothness={2} position={[0, 0.013, 0]}>
                <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.5} />
            </RoundedBox>

            {/* 4 tiny silver SMD capacitors around the centre */}
            {[
                [-0.10, 0.10],
                [0.10, 0.10],
                [-0.10, -0.10],
                [0.10, -0.10],
            ].map(([x, z], i) => (
                <mesh key={i} position={[x, 0.015, z]}>
                    <boxGeometry args={[0.040, 0.014, 0.020]} />
                    <meshStandardMaterial color={SILVER_DARK} metalness={0.88} roughness={0.15} />
                </mesh>
            ))}

            {/* Corner alignment triangle / key */}
            <mesh position={[-0.62, 0.012, -0.62]}>
                <cylinderGeometry args={[0.04, 0.04, 0.005, 3]} />
                <meshStandardMaterial color={GOLD_DARK} metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Opposite corner alignment mark */}
            <mesh position={[0.62, 0.012, 0.62]}>
                <cylinderGeometry args={[0.025, 0.025, 0.005, 32]} />
                <meshStandardMaterial color={GOLD_DARK} metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Edge traces (subtle gold lines along edges) */}
            {[
                { pos: [0, 0.012, 0.70] as [number, number, number], scale: [1.40, 0.003, 0.008] as [number, number, number] },
                { pos: [0, 0.012, -0.70] as [number, number, number], scale: [1.40, 0.003, 0.008] as [number, number, number] },
                { pos: [0.70, 0.012, 0] as [number, number, number], scale: [0.008, 0.003, 1.40] as [number, number, number] },
                { pos: [-0.70, 0.012, 0] as [number, number, number], scale: [0.008, 0.003, 1.40] as [number, number, number] },
            ].map(({ pos, scale }, i) => (
                <mesh key={i} position={pos} scale={scale}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color={GOLD_DARK} metalness={0.7} roughness={0.35} />
                </mesh>
            ))}
        </group>
    )
}

// ─── Layered CPU chip body ───────────────────────────────────────────────────
function ChipBody() {
    return (
        <group>
            {/* ══ FRONT / TOP FACE ═══════════════════════════════════════════════ */}

            {/* Dark PCB base */}
            <RoundedBox args={[1.55, 0.065, 1.55]} radius={0.03} smoothness={4} position={[0, -0.075, 0]}>
                <meshStandardMaterial color="#111827" metalness={0.55} roughness={0.55} />
            </RoundedBox>

            {/* Silver substrate */}
            <RoundedBox args={[1.05, 0.09, 1.05]} radius={0.032} smoothness={4} position={[0, -0.01, 0]}>
                {silverMat(SILVER_DARK)}
            </RoundedBox>

            {/* IHS top plate */}
            <RoundedBox args={[0.82, 0.10, 0.82]} radius={0.026} smoothness={4} position={[0, 0.075, 0]}>
                {silverMat(WHITE_METAL)}
            </RoundedBox>

            {/* Engraved ridge panel */}
            <RoundedBox args={[0.57, 0.125, 0.57]} radius={0.016} smoothness={4} position={[0, 0.082, 0]}>
                {silverMat(SILVER)}
            </RoundedBox>

            {/* Transmission glass window */}
            <mesh position={[0, 0.145, 0]}>
                <boxGeometry args={[0.40, 0.013, 0.40]} />
                <MeshTransmissionMaterial
                    color={BLUE_GLOW}
                    transmission={0.88}
                    thickness={0.04}
                    roughness={0.04}
                    chromaticAberration={0.05}
                    emissive={BLUE_DEEP}
                    emissiveIntensity={1.4}
                    transparent
                />
            </mesh>



            {/* ── BitByBit 3-bar logo in the blue core ──────────────────────────── */}
            <group position={[0, 0.152, 0]}>
                <BitByBitLogo />
            </group>

            {/* Corner accent dots on IHS */}
            {[[-0.34, 0.34], [0.34, 0.34], [-0.34, -0.34], [0.34, -0.34]].map(([x, z], i) => (
                <mesh key={i} position={[x, 0.132, z]}>
                    <cylinderGeometry args={[0.025, 0.025, 0.006, 16]} />
                    <meshStandardMaterial color={SILVER_DARK} metalness={0.95} roughness={0.1} />
                </mesh>
            ))}

            {/* ══ REAR / BOTTOM FACE ═════════════════════════════════════════════ */}
            <ChipRear />
        </group>
    )
}

// ─── Pulsing glow ring around the chip ───────────────────────────────────────
function GlowRing() {
    const ref = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        if (!ref.current) return
        const t = clock.elapsedTime
        ref.current.scale.setScalar(1 + Math.sin(t * 1.3) * 0.055)
            ; (ref.current.material as THREE.MeshStandardMaterial).opacity =
                0.16 + Math.sin(t * 1.3) * 0.07
    })

    return (
        <mesh ref={ref} position={[0, -0.042, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.82, 1.0, 64]} />
            <meshStandardMaterial
                color={BLUE_GLOW}
                emissive={BLUE_GLOW}
                emissiveIntensity={2.2}
                transparent
                opacity={0.18}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

// ─── Interactive controls that blend with scroll ─────────────────────────────
function InteractiveControls() {
    return (
        <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.12}
            rotateSpeed={0.6}
            // Prevent full vertical flipping — keep it intuitive
            minPolarAngle={Math.PI * 0.15}
            maxPolarAngle={Math.PI * 0.85}
        />
    )
}

// ─── Root component ───────────────────────────────────────────────────────────
export default function CpuCoin3D() {
    const outerRef = useRef<THREE.Group>(null)
    const innerRef = useRef<THREE.Group>(null)

    // Track whether the user is dragging (interacting)
    const [isDragging, setIsDragging] = useState(false)
    const dragTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Smoothed scroll state for rotation
    const scrollTarget = useRef(0)
    const scrollSmooth = useRef(0)

    // Viewport intersection state for scaling effect
    const visibilityTarget = useRef(0)
    const visibilitySmooth = useRef(0)
    const { gl } = useThree()

    useEffect(() => {
        const onScroll = () => {
            // Global scroll for continuous rotation
            const maxScroll = Math.max(
                1,
                document.documentElement.scrollHeight - window.innerHeight
            )
            scrollTarget.current = window.scrollY / maxScroll

            // Local element intersection for scale pop-in
            if (!gl.domElement) return
            const rect = gl.domElement.getBoundingClientRect()
            const windowHeight = window.innerHeight
            
            const elementCenterY = rect.top + rect.height / 2
            const screenCenterY = windowHeight / 2
            const distance = Math.abs(elementCenterY - screenCenterY)
            
            // Max distance before element fully leaves viewport
            const maxDistance = (windowHeight + rect.height) / 2
            const normalizedDist = Math.min(1, distance / maxDistance)
            
            // Deadzone: stay fully scaled when near center
            const deadzone = 0.2
            let vis = 1
            if (normalizedDist > deadzone) {
                vis = 1 - ((normalizedDist - deadzone) / (1 - deadzone))
            }
            
            // Ease-out curve for more explosive pop-in
            vis = vis * (2 - vis)
            
            visibilityTarget.current = vis
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll() // Init immediately
        return () => window.removeEventListener('scroll', onScroll)
    }, [gl])

    // Pointer handlers to detect drag interaction
    const onPointerDown = () => {
        setIsDragging(true)
        if (dragTimeout.current) clearTimeout(dragTimeout.current)
    }
    const onPointerUp = () => {
        // Resume scroll-driven rotation after 2s of no interaction
        dragTimeout.current = setTimeout(() => setIsDragging(false), 2000)
    }

    useFrame(({ clock }) => {
        scrollSmooth.current += (scrollTarget.current - scrollSmooth.current) * 0.08
        visibilitySmooth.current += (visibilityTarget.current - visibilitySmooth.current) * 0.08

        const t = scrollSmooth.current
        const elapsed = clock.elapsedTime

        if (outerRef.current) {
            // Emerge out from a tiny point light to full scale (1.75)
            const targetScale = 0.01 + (1.75 - 0.01) * visibilitySmooth.current
            outerRef.current.scale.setScalar(targetScale)
        }

        if (innerRef.current && !isDragging) {
            // Sideways coin-flip driven by scroll
            innerRef.current.rotation.y = t * Math.PI * 4

            // Slow Z drift
            innerRef.current.rotation.z = elapsed * 0.26

            // Gentle vertical float
            innerRef.current.position.y = Math.sin(elapsed * 0.55) * 0.07
        }
    })

    return (
        <>
            {/* ── Lighting ─────────────────────────────────────────────────────── */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 7, 5]} intensity={1.8} color="#ffffff" castShadow />
            <directionalLight position={[-3, -4, -3]} intensity={0.6} color="#c7d8f0" />
            <pointLight position={[0, 0, 4]} intensity={0.9} color={BLUE_GLOW} distance={10} />
            <pointLight position={[0, 0, -4]} intensity={0.5} color={BLUE_GLOW} distance={10} />
            <pointLight position={[-4, 3, 0]} intensity={0.5} color="#8b5cf6" distance={12} />
            {/* Extra bottom light so the rear gold pads catch light */}
            <directionalLight position={[0, -6, 2]} intensity={0.7} color="#fef3c7" />

            {/* ── Interactive drag-to-rotate ────────────────────────────────────── */}
            <InteractiveControls />

            <group
                ref={outerRef}
                rotation={[-0.42, 0.30, 0]}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
            >
                <group ref={innerRef}>
                    <ChipBody />
                    <GlowRing />
                </group>
            </group>
        </>
    )
}
