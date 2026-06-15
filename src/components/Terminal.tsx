'use client'

import { useState, useEffect } from 'react'

export default function Terminal() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [outputsVisible, setOutputsVisible] = useState(0)
  const [activeLine, setActiveLine] = useState(1) // 1: typing cmd1, 2: output, 3: typing cmd2, 4: complete

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const cmd1 = 'git clone community/bitbybit'
  const cmd2 = 'npm run grow-together'

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Normalize coordinates: range -0.5 to 0.5
    const normalizedX = (x / rect.width) - 0.5
    const normalizedY = (y / rect.height) - 0.5

    // Angle of rotation (max 6 degrees for a larger card)
    const maxRotate = 6

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

  useEffect(() => {
    let isMounted = true

    const runAnimation = () => {
      if (!isMounted) return

      // Reset states
      setText1('')
      setText2('')
      setOutputsVisible(0)
      setActiveLine(1)

      // 1. Type command 1
      let charIdx1 = 0
      const typeCmd1 = () => {
        if (!isMounted) return
        if (charIdx1 < cmd1.length) {
          setText1(cmd1.slice(0, charIdx1 + 1))
          charIdx1++
          setTimeout(typeCmd1, 90 + Math.random() * 50) // Human-like typing speed variation
        } else {
          // Pause, then start showing outputs
          setTimeout(() => {
            if (!isMounted) return
            setActiveLine(2)
            showOutputs(1)
          }, 700)
        }
      }

      // 2. Show status outputs sequentially
      const showOutputs = (step: number) => {
        if (!isMounted) return
        if (step <= 4) {
          setOutputsVisible(step)
          setTimeout(() => showOutputs(step + 1), 550)
        } else {
          // Pause, then start typing command 2
          setTimeout(() => {
            if (!isMounted) return
            setActiveLine(3)
            typeCmd2()
          }, 900)
        }
      }

      // 3. Type command 2
      let charIdx2 = 0
      const typeCmd2 = () => {
        if (!isMounted) return
        if (charIdx2 < cmd2.length) {
          setText2(cmd2.slice(0, charIdx2 + 1))
          charIdx2++
          setTimeout(typeCmd2, 95 + Math.random() * 30)
        } else {
          if (!isMounted) return
          setActiveLine(4)
          // Loop animation after a 12 second pause
          setTimeout(() => {
            if (isMounted) runAnimation()
          }, 12000)
        }
      }

      // Start typing first command after a brief delay
      setTimeout(typeCmd1, 400)
    }

    runAnimation()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.015, 1.015, 1.015)`,
        transition: isHovered 
          ? 'none' 
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        transformStyle: 'preserve-3d'
      }}
      className="w-full bg-[#030912]/95 border border-border-custom rounded-2xl p-5 font-mono text-xs shadow-2xl relative overflow-hidden group"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.012)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      {/* Top Border Cyan-Blue Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500/80 via-cyan-400/80 to-purple-500/80" />

      {/* Terminal window buttons */}
      <div className="flex gap-1.5 mb-4 relative z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] block" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] block" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] block" />
      </div>

      <div 
        className="space-y-3 text-text-sec relative z-10"
        style={{
          transform: isHovered ? 'translateZ(25px)' : 'none',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Comment block */}
        <div>
          <span className="text-text-sec/40 select-none">// Bit-By-Bit Club · VIT Bhopal</span>
        </div>
        
        {/* Command 1 Line */}
        <div className="text-foreground flex items-center flex-wrap">
          <span className="text-primary font-bold mr-2 select-none">$ </span>
          <span>{text1}</span>
          {activeLine === 1 && (
            <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse" />
          )}
        </div>
        
        {/* Outputs Grid */}
        <div className="space-y-2 pl-4">
          {outputsVisible >= 1 && (
            <div className="text-emerald-400 flex items-center gap-2 animate-fade-in">
              <span>✓</span>
              <span>Initializing 500+ member network</span>
            </div>
          )}
          
          {outputsVisible >= 2 && (
            <div className="text-emerald-400 flex items-center gap-2 animate-fade-in">
              <span>✓</span>
              <span>Loading hackathons, workshops...</span>
            </div>
          )}
          
          {outputsVisible >= 3 && (
            <div className="text-emerald-400 flex items-center gap-2 animate-fade-in">
              <span>✓</span>
              <span>Building real-world projects</span>
            </div>
          )}
          
          {outputsVisible >= 4 && (
            <div className="text-purple-400 font-semibold flex items-center gap-2 animate-fade-in">
              <span>✓</span>
              <span>Community first. Always.</span>
            </div>
          )}
        </div>

        {/* Command 2 Line */}
        {activeLine >= 3 && (
          <div className="text-foreground flex items-center flex-wrap">
            <span className="text-primary font-bold mr-2 select-none">$ </span>
            <span>{text2}</span>
            {activeLine === 3 && (
              <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse" />
            )}
            {activeLine === 4 && (
              <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
