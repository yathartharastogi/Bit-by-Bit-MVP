'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useAnimationFrame } from 'framer-motion'
import { Folder, Calendar, ArrowLeft, ArrowRight } from 'lucide-react'
import SpotlightCard from '@/components/SpotlightCard'
import dynamic from 'next/dynamic'

const SceneWrapper = dynamic(() => import('@/components/three/SceneWrapper'), { ssr: false })
const HoloServerRack = dynamic(() => import('@/components/three/HoloServerRack'), { ssr: false })

interface OrbitalGalleryProps {
  albums: any[]
  onSelectAlbum: (id: string) => void
}

function AlbumCard({ album, index, totalAlbums, totalRotation, autoRotation, dragRotation, onSelectAlbum }: any) {
  const angleOffset = (360 / totalAlbums) * index
  const cardRotation = useTransform(totalRotation, (r: number) => r + angleOffset)

  const x = useTransform(cardRotation, (r: number) => Math.sin((r * Math.PI) / 180) * 350)
  const scale = useTransform(cardRotation, (r: number) => {
    const cos = Math.cos((r * Math.PI) / 180)
    return 0.75 + (cos * 0.25)
  })
  const zIndex = useTransform(cardRotation, (r: number) => Math.round(Math.cos((r * Math.PI) / 180) * 100) + 100)
  const opacity = useTransform(cardRotation, (r: number) => {
    const cos = Math.cos((r * Math.PI) / 180)
    return 0.4 + ((cos + 1) * 0.4)
  })

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -mt-[180px] -ml-[200px] w-[400px] md:-ml-[240px] md:w-[480px]"
      style={{ x, scale, zIndex, opacity }}
    >
      <div
        onClick={(e) => {
          if (scale.get() < 0.9) {
              e.stopPropagation()
              dragRotation.set(-angleOffset - autoRotation.get())
              return
          }
          onSelectAlbum(album.id)
        }}
        className="group cursor-pointer flex flex-col h-full pointer-events-auto"
      >
        <SpotlightCard className="p-6 bg-card-bg/98 border border-border-custom hover:border-primary/50 transition-all duration-300 flex flex-col h-[360px] shadow-2xl">
          {/* Folder Photo Pile Visual */}
          <div className="relative w-full aspect-video rounded-xl bg-background/50 border border-border-custom/50 flex items-center justify-center overflow-hidden mb-6 group-hover:bg-primary/[0.05] transition-colors duration-300">
            <div className="relative w-2/3 h-2/3 flex items-center justify-center">
              <div className="absolute w-[80%] h-[80%] rounded-lg overflow-hidden border-2 border-border-custom shadow-2xl rotate-[-8deg] -translate-x-6 translate-y-2 group-hover:rotate-[-14deg] group-hover:-translate-x-10 group-hover:-translate-y-2 transition-all duration-500 origin-bottom-left ease-out">
                <Image src={album.images[0].src} alt="preview 1" fill className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="absolute w-[80%] h-[80%] rounded-lg overflow-hidden border-2 border-border-custom shadow-2xl rotate-[8deg] translate-x-6 translate-y-2 group-hover:rotate-[14deg] group-hover:translate-x-10 group-hover:-translate-y-2 transition-all duration-500 origin-bottom-right ease-out">
                <Image src={album.images[1].src} alt="preview 2" fill className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="absolute w-[85%] h-[85%] rounded-lg overflow-hidden border-2 border-border-custom shadow-2xl z-10 group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-500 ease-out">
                <Image src={album.cover} alt="cover" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>

            <div className="absolute top-3 left-3 px-3 py-1 bg-card-bg/95 border border-border-custom/50 rounded-full flex items-center gap-1.5 z-20">
              <Folder size={12} className="text-primary" />
              <span className="font-mono text-[10px] text-text-sec uppercase tracking-wider">{album.count} Photos</span>
            </div>
          </div>

          {/* Text Metadata */}
          <div className="text-left space-y-2 mt-auto">
            <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-wider">
              <Calendar size={12} />
              {album.date}
            </div>
            <h3 className="font-sans font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
              {album.title}
            </h3>
            <p className="text-text-sec text-xs leading-relaxed line-clamp-2">
              {album.desc}
            </p>
          </div>
        </SpotlightCard>
      </div>
    </motion.div>
  )
}

export default function OrbitalGallery({ albums, onSelectAlbum }: OrbitalGalleryProps) {
  // Global rotation value driven by drag
  const dragRotation = useMotionValue(0)
  const autoRotation = useMotionValue(0)

  // Spring for smooth momentum when dragging stops
  const smoothDragRotation = useSpring(dragRotation, { stiffness: 50, damping: 20, mass: 1 })
  const totalRotation = useTransform(() => smoothDragRotation.get() + autoRotation.get())

  // Drive the continuous floating rotation from the parent so 2D and 3D are perfectly synced
  useAnimationFrame((time) => {
    const elapsed = time / 1000
    // Very smooth, slow constant rotation
    const radians = elapsed * 0.05
    autoRotation.set(radians * (180 / Math.PI))
  })

  // Handle Drag to rotate
  const handleDrag = (_: any, info: any) => {
    // Modify rotation. Adjust multiplier for drag sensitivity.
    dragRotation.set(dragRotation.get() + info.delta.x * 0.6)
  }

  // To snap to nearest card when drag ends
  const handleDragEnd = (_: any, info: any) => {
    const currentTotal = totalRotation.get()
    const velocity = info.velocity.x
    
    // Add some momentum based on velocity
    const targetTotal = currentTotal + velocity * 0.2
    
    // Snap to nearest multiple of (360 / albums.length)
    const anglePerCard = 360 / albums.length
    const snappedTotal = Math.round(targetTotal / anglePerCard) * anglePerCard
    
    // Set dragRotation to reach snappedTotal
    dragRotation.set(snappedTotal - autoRotation.get())
  }

  return (
    <div className="relative w-full h-[600px] lg:h-[750px] flex items-center justify-center overflow-hidden touch-none">
      
      {/* 3D HoloServerRack in the center */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.12)_0%,transparent_60%)]" />
        <SceneWrapper className="w-full h-full" demandFrameloop={false}>
          <HoloServerRack globalRotation={totalRotation} />
        </SceneWrapper>
      </div>

      {/* Orbiting 2D Cards Container */}
      <motion.div
        className="absolute inset-0 z-10"
        drag="x"
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ cursor: 'grab' }}
        whileTap={{ cursor: 'grabbing' }}
        dragElastic={0} // No bouncing on edges, infinite rotation
        dragConstraints={{ left: 0, right: 0 }} // Dummy constraints to allow free drag
      >
        <AnimatePresence>
          {albums.map((album, index) => (
            <AlbumCard
              key={album.id}
              album={album}
              index={index}
              totalAlbums={albums.length}
              totalRotation={totalRotation}
              autoRotation={autoRotation}
              dragRotation={dragRotation}
              onSelectAlbum={onSelectAlbum}
            />
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* Helper text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex flex-col items-center gap-2 opacity-60">
        <div className="flex items-center gap-2 font-mono text-[10px] text-text-sec uppercase tracking-widest">
            <ArrowLeft size={10} className="text-primary" />
            Drag to Orbit
            <ArrowRight size={10} className="text-primary" />
        </div>
      </div>
    </div>
  )
}
