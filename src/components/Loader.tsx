'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Loader() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Check sessionStorage to prevent repeated delays on page navigation
    const hasLoaded = sessionStorage.getItem('bitbybit-loaded')
    if (hasLoaded) {
      setLoading(false)
      return
    }

    setLoading(true)
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          sessionStorage.setItem('bitbybit-loaded', 'true')
          setTimeout(() => setLoading(false), 300)
          return 100
        }
        return prev + 4 // Slightly slower increment for a smooth large asset transition
      })
    }, 45)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle background glow effect */}
          <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

          <div className="flex flex-col items-center gap-6 relative z-10 max-w-lg w-full text-center">
            {/* Big Logo Image with responsive bounds and glowing pulse */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ 
                scale: [0.95, 1.05, 0.95],
                opacity: 1
              }}
              transition={{ 
                scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                opacity: { duration: 0.8, ease: "easeOut" }
              }}
              className="relative w-28 h-28 sm:w-44 sm:h-44 md:w-48 md:h-48 drop-shadow-[0_0_35px_rgba(59,130,246,0.25)]"
            >
              <Image
                src="/logo.png"
                alt="Bit-By-Bit Logo"
                fill
                priority
                className="object-contain"
              />
            </motion.div>

            <div className="space-y-4 w-full flex flex-col items-center">
              {/* Large Responsive Club Brand Name */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-none uppercase"
              >
                Bit<span className="text-primary font-black">-By-</span>Bit
              </motion.h1>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="font-mono text-[9px] sm:text-xs tracking-widest text-blue-400 font-semibold uppercase"
              >
                VIT Bhopal Tech Community
              </motion.div>

              {/* Progress bar and numeric percentage */}
              <div className="flex flex-col items-center gap-2 pt-2 w-48 sm:w-64">
                <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
                <div className="font-mono text-[9px] text-text-sec tracking-wider">
                  LOADING: {progress}%
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
