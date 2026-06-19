/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import { Folder, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import SpotlightCard from '@/components/SpotlightCard'
import { useRef } from 'react'

interface MobileCarouselGalleryProps {
  albums: any[]
  onSelectAlbum: (id: string) => void
}

export default function MobileCarouselGallery({ albums, onSelectAlbum }: MobileCarouselGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-10">
      
      {/* 2D Carousel Container */}
      <div 
        ref={scrollRef}
        className="w-full flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-8 pt-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {albums.map((album) => (
          <div 
            key={album.id} 
            className="w-[85vw] max-w-[320px] shrink-0 snap-center"
            onClick={() => onSelectAlbum(album.id)}
          >
            <SpotlightCard className="group cursor-pointer p-5 bg-card-bg/98 border border-border-custom hover:border-primary/50 transition-all duration-300 flex flex-col h-[340px] shadow-xl">
              {/* Folder Photo Pile Visual */}
              <div className="relative w-full aspect-video rounded-xl bg-background/50 border border-border-custom/50 flex items-center justify-center overflow-hidden mb-5 group-hover:bg-primary/[0.05] transition-colors duration-300">
                <div className="relative w-2/3 h-2/3 flex items-center justify-center">
                  <div className="absolute w-[80%] h-[80%] rounded-lg overflow-hidden border-2 border-border-custom shadow-2xl rotate-[-8deg] -translate-x-4 translate-y-2 group-hover:rotate-[-14deg] group-hover:-translate-x-8 group-hover:-translate-y-2 transition-all duration-500 origin-bottom-left ease-out">
                    <Image src={album.images[0].src} alt="preview 1" fill sizes="300px" className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="absolute w-[80%] h-[80%] rounded-lg overflow-hidden border-2 border-border-custom shadow-2xl rotate-[8deg] translate-x-4 translate-y-2 group-hover:rotate-[14deg] group-hover:translate-x-8 group-hover:-translate-y-2 transition-all duration-500 origin-bottom-right ease-out">
                    <Image src={album.images[1].src} alt="preview 2" fill sizes="300px" className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="absolute w-[85%] h-[85%] rounded-lg overflow-hidden border-2 border-border-custom shadow-2xl z-10 group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-500 ease-out">
                    <Image src={album.cover} alt="cover" fill sizes="300px" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>

                <div className="absolute top-2 left-2 px-2.5 py-1 bg-card-bg/95 border border-border-custom/50 rounded-full flex items-center gap-1.5 z-20">
                  <Folder size={10} className="text-primary" />
                  <span className="font-mono text-[9px] text-text-sec uppercase tracking-wider">{album.count} Photos</span>
                </div>
              </div>

              {/* Text Metadata */}
              <div className="text-left space-y-1.5 mt-auto">
                <div className="flex items-center gap-2 text-primary font-mono text-[9px] uppercase tracking-wider">
                  <Calendar size={10} />
                  {album.date}
                </div>
                <h3 className="font-sans font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                  {album.title}
                </h3>
                <p className="text-text-sec text-xs leading-relaxed line-clamp-2">
                  {album.desc}
                </p>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4 mt-2">
        <button 
          onClick={scrollLeft}
          className="w-10 h-10 rounded-full border border-border-custom bg-card-bg flex items-center justify-center text-text-sec hover:text-white hover:border-white transition-all duration-200"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="font-mono text-[10px] text-text-sec uppercase tracking-widest">
          Swipe or Click
        </span>
        <button 
          onClick={scrollRight}
          className="w-10 h-10 rounded-full border border-border-custom bg-card-bg flex items-center justify-center text-text-sec hover:text-white hover:border-white transition-all duration-200"
        >
          <ChevronRight size={18} />
        </button>
      </div>

    </div>
  )
}
