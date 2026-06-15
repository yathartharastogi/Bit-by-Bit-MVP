'use client'

import { useState } from 'react'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
}

export default function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCoords({ x, y })

    // Normalize coordinates: range -0.5 to 0.5
    const normalizedX = (x / rect.width) - 0.5
    const normalizedY = (y / rect.height) - 0.5

    // Angle of rotation (max 10 degrees)
    const maxRotate = 10

    setTilt({
      rotateX: -normalizedY * maxRotate,
      rotateY: normalizedX * maxRotate
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden bento-card ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: isHovered 
          ? 'none' 
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
        willChange: 'transform',
        transformStyle: 'preserve-3d'
      }}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none inset-0 transition-opacity duration-300 opacity-100 z-0"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.09), transparent 85%)`
          }}
        />
      )}
      <div 
        className="relative z-10 h-full w-full flex flex-col justify-between"
        style={{
          transform: isHovered ? 'translateZ(18px)' : 'none',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d'
        }}
      >
        {children}
      </div>
    </div>
  )
}

