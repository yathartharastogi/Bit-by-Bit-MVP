'use client'

import { useState } from 'react'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
}

export default function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden bento-card ${className}`}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none inset-0 transition-opacity duration-300 opacity-100 z-0"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(37, 99, 235, 0.08), transparent 80%)`
          }}
        />
      )}
      <div className="relative z-10 h-full w-full flex flex-col justify-between">{children}</div>
    </div>
  )
}
