'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PosterPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Show popup shortly after page load
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
  }

  const handleClick = () => {
    setIsVisible(false)
    router.push('/events#innofusion-fest')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-end px-4 md:px-8">
          {/* Click outside overlay */}
          <div 
            className="absolute inset-0 pointer-events-auto" 
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative pointer-events-auto z-10 w-full max-w-[280px] md:max-w-[340px] shadow-2xl rounded-2xl overflow-hidden cursor-pointer border-2 border-primary/20 hover:border-primary/50 transition-colors"
            onClick={handleClick}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <img 
              src="/events/innofusion/poster.png" 
              alt="InnoFusion Fest" 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
