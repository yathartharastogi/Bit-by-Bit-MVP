'use client'

import { useState, useEffect, useRef } from 'react'

interface TerminalLine {
  text: string
  type: 'input' | 'output' | 'error' | 'success' | 'comment'
}

export default function AnimatedTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: '// Bit-By-Bit Club · VIT Bhopal', type: 'comment' },
    { text: 'Type "help" to see all commands.', type: 'output' }
  ])
  const [inputVal, setInputVal] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const normalizedX = (x / rect.width) - 0.5
    const normalizedY = (y / rect.height) - 0.5

    const maxRotate = 5

    setTilt({
      rotateX: -normalizedY * maxRotate,
      rotateY: normalizedX * maxRotate
    })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  const focusTerminal = () => {
    inputRef.current?.focus()
    setIsFocused(true)
  }

  // Scroll the console container down locally on updates
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = inputVal.trim()
      const newHistory = [...history, { text: `visitor@bitbybit:~$ ${inputVal}`, type: 'input' } as TerminalLine]
      
      if (command) {
        const cmdLower = command.toLowerCase()
        if (cmdLower === 'help') {
          newHistory.push({ text: 'Available commands:', type: 'success' })
          newHistory.push({ text: '  help     - Show this guidance listing', type: 'output' })
          newHistory.push({ text: '  about    - Reveal club details and motto', type: 'output' })
          newHistory.push({ text: '  events   - List upcoming programs and hackathons', type: 'output' })
          newHistory.push({ text: '  devs     - Display the website developers', type: 'output' })
          newHistory.push({ text: '  contact  - Show support emails and office locations', type: 'output' })
          newHistory.push({ text: '  clear    - Clear all terminal outputs', type: 'output' })
        } else if (cmdLower === 'about') {
          newHistory.push({ text: '==================================================', type: 'success' })
          newHistory.push({ text: 'BIT-BY-BIT TECH CLUB — Est. 2020', type: 'success' })
          newHistory.push({ text: '==================================================', type: 'success' })
          newHistory.push({ text: 'VIT Bhopal\'s premier tech community.', type: 'output' })
          newHistory.push({ text: 'We build things bit by bit, peer-by-peer.', type: 'output' })
        } else if (cmdLower === 'events') {
          newHistory.push({ text: 'Upcoming Programs:', type: 'success' })
          newHistory.push({ text: '- Mindzilla 2026: Flagship technical problem-solving competition.', type: 'output' })
          newHistory.push({ text: '  Date: November 20, 2026 | Location: Tech Park Labs, VIT Bhopal', type: 'output' })
          newHistory.push({ text: '- BitHack 2026: 36-Hour National Level Hackathon.', type: 'output' })
          newHistory.push({ text: '  Date: October 25-26, 2026 | Prize Pool: ₹1.5 Lakhs', type: 'output' })
        } else if (cmdLower === 'devs') {
          newHistory.push({ text: '==================================================', type: 'success' })
          newHistory.push({ text: '               WEBSITE DEVELOPERS', type: 'success' })
          newHistory.push({ text: '==================================================', type: 'success' })
          newHistory.push({ text: '  Lead Developer:', type: 'comment' })
          newHistory.push({ text: '    • Yathartha Rastogi', type: 'output' })
          newHistory.push({ text: '  Development Crew:', type: 'comment' })
          newHistory.push({ text: '    • Joydeep Dutta', type: 'output' })
          newHistory.push({ text: '    • Vansh Singh', type: 'output' })
          newHistory.push({ text: '    • Yashwant Sonawane', type: 'output' })
        } else if (cmdLower === 'contact') {
          newHistory.push({ text: 'Get in Touch:', type: 'success' })
          newHistory.push({ text: '  Email: bitbybit@vitbhopal.ac.in', type: 'output' })
          newHistory.push({ text: '  Location: VIT Bhopal University Tech Park, MP', type: 'output' })
          newHistory.push({ text: '  Application Form: Navigate to /contact page to apply.', type: 'output' })
        } else if (cmdLower === 'clear') {
          setHistory([
            { text: '// Bit-By-Bit Club · VIT Bhopal', type: 'comment' },
            { text: 'Type "help" to see all commands.', type: 'output' }
          ])
          setInputVal('')
          return
        } else {
          newHistory.push({ text: `command not found: ${command}. Type 'help' to see valid options.`, type: 'error' })
        }
      }
      setHistory(newHistory)
      setInputVal('')

    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
  }

  return (
    <div 
      onClick={focusTerminal}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.015, 1.015, 1.015)`,
        transition: isHovered 
          ? 'none' 
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        cursor: 'text'
      }}
      className="w-full h-[320px] bg-[#030912]/95 border border-border-custom rounded-2xl p-5 font-mono text-[11px] shadow-2xl relative overflow-hidden group select-none"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.012)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500/80 via-cyan-400/80 to-purple-500/80" />

      {/* Top Window Bar */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] block" />
        </div>
        <span className="text-[10px] text-text-sec/40 select-none">terminal - sh</span>
      </div>

      {/* Hidden Terminal Input Focus Hook */}
      <input
        ref={inputRef}
        type="text"
        value={inputVal}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="absolute w-0 h-0 opacity-0 pointer-events-none"
      />

      {/* Content Area */}
      <div 
        ref={containerRef}
        className="h-[230px] overflow-y-auto space-y-2 text-text-sec scrollbar-none pr-1"
        style={{
          transform: isHovered ? 'translateZ(15px)' : 'none',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {history.map((line, idx) => {
          let colorClass = 'text-white'
          if (line.type === 'comment') colorClass = 'text-text-sec/45'
          else if (line.type === 'error') colorClass = 'text-red-400'
          else if (line.type === 'success') colorClass = 'text-emerald-400'
          else if (line.type === 'output') colorClass = 'text-blue-200/90'

          return (
            <div key={idx} className={`${colorClass} leading-relaxed whitespace-pre-wrap`}>
              {line.text}
            </div>
          )
        })}

        {/* Input line */}
        <div className="flex items-center text-white leading-relaxed">
          <span className="text-primary font-bold mr-1.5 select-none">visitor@bitbybit:~$</span>
          <span>{inputVal}</span>
          <span className={`inline-block w-1.5 h-3.5 bg-primary ml-0.5 ${isFocused ? 'animate-pulse' : 'opacity-40'}`} />
        </div>
      </div>

      {!isFocused && (
        <span className="text-[9px] text-text-sec/20 absolute bottom-3 right-4 select-none pointer-events-none animate-pulse">
          [ Click to type / interact ]
        </span>
      )}
    </div>
  )
}



