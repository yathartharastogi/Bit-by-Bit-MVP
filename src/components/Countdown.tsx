'use client'

import { useState, useEffect } from 'react'

interface CountdownProps {
  targetDate: string
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const target = new Date(targetDate).getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!isMounted) {
    return (
      <div className="flex gap-4 items-center justify-center font-mono py-2 animate-pulse">
        <span className="text-text-sec text-xs uppercase tracking-wider">Calculating countdown...</span>
      </div>
    )
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex gap-4 items-center justify-center">
      <div className="flex flex-col items-center">
        <span className="font-sans font-bold text-2xl md:text-3xl text-primary leading-none">
          {pad(timeLeft.days)}
        </span>
        <span className="font-mono text-[9px] text-text-sec mt-1 uppercase tracking-wider">Days</span>
      </div>
      <span className="font-sans text-xl text-text-sec/30 -mt-4">:</span>
      
      <div className="flex flex-col items-center">
        <span className="font-sans font-bold text-2xl md:text-3xl text-primary leading-none">
          {pad(timeLeft.hours)}
        </span>
        <span className="font-mono text-[9px] text-text-sec mt-1 uppercase tracking-wider">Hours</span>
      </div>
      <span className="font-sans text-xl text-text-sec/30 -mt-4">:</span>
      
      <div className="flex flex-col items-center">
        <span className="font-sans font-bold text-2xl md:text-3xl text-primary leading-none">
          {pad(timeLeft.minutes)}
        </span>
        <span className="font-mono text-[9px] text-text-sec mt-1 uppercase tracking-wider">Min</span>
      </div>
      <span className="font-sans text-xl text-text-sec/30 -mt-4">:</span>
      
      <div className="flex flex-col items-center">
        <span className="font-sans font-bold text-2xl md:text-3xl text-primary leading-none animate-pulse">
          {pad(timeLeft.seconds)}
        </span>
        <span className="font-mono text-[9px] text-text-sec mt-1 uppercase tracking-wider">Sec</span>
      </div>
    </div>
  )
}
