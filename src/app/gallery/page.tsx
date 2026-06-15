'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Folder, ArrowLeft, X, ChevronLeft, ChevronRight, Calendar, Sparkles, ExternalLink } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import TextReveal from '@/components/TextReveal'
import SpotlightCard from '@/components/SpotlightCard'

interface GalleryImage {
  src: string
  title: string
  desc: string
}

interface Album {
  id: string
  title: string
  desc: string
  cover: string
  date: string
  count: number
  driveUrl: string
  images: GalleryImage[]
}

const albums: Album[] = [
  {
    id: 'mindzilla',
    title: 'Mindzilla 2025',
    desc: "Relive the high-energy problem-solving atmosphere of Bit-By-Bit's flagship logic and coding sprint event held at AdVITya.",
    cover: '/events/mindzilla/20250220_091159.webp',
    date: 'February 20, 2025',
    count: 12,
    driveUrl: 'https://drive.google.com/drive/folders/156kT6R9hKENkpQoOti0k4ZoeqeQlMts_',
    images: [
      { src: '/events/mindzilla/20250220_091023.webp', title: 'Mindzilla Briefing', desc: 'Participants gathering for the event introduction and problem statement release.' },
      { src: '/events/mindzilla/20250220_091031.webp', title: 'Brainstorming Session', desc: 'Teams whiteboard sketching ideas and logical maps for the analytical puzzles.' },
      { src: '/events/mindzilla/20250220_091102.webp', title: 'Problem Solving', desc: 'Working through algorithmic optimization challenges under pressure.' },
      { src: '/events/mindzilla/20250220_091146.webp', title: 'Collaboration Phase', desc: 'Peer-to-peer technical debugging and cross-team knowledge share.' },
      { src: '/events/mindzilla/20250220_091159.webp', title: 'Strategic Decisions', desc: 'Analyzing trade-offs between speed, accuracy, and execution complexity.' },
      { src: '/events/mindzilla/20250220_092640.webp', title: 'Logic Sprint', desc: 'Developing solutions for the interactive logic challenges.' },
      { src: '/events/mindzilla/20250220_094043.webp', title: 'Tech Stack Check', desc: 'Validating deployment parameters and runtime safety checklists.' },
      { src: '/events/mindzilla/20250220_094056.webp', title: 'Mentorship Checkpoint', desc: 'Seniors reviewing repository status and code quality parameters.' },
      { src: '/events/mindzilla/20250220_094151.webp', title: 'Competition Arena', desc: 'The high-energy environment inside the VIT Bhopal tech park lab.' },
      { src: '/events/mindzilla/20250220_095925.webp', title: 'Analytical Puzzles', desc: 'Decoupling complex data structures into simpler, solvable units.' },
      { src: '/events/mindzilla/20250220_100317.webp', title: 'Final Code Commits', desc: 'Teams finalizing code pushes to their GitHub repositories.' },
      { src: '/events/mindzilla/20250220_103004.webp', title: 'Mindzilla Champions', desc: 'Celebrating top teams and creative technical pitches at AdVITya.' }
    ]
  },
  {
    id: 'playtopia',
    title: 'Playtopia 2026',
    desc: 'Moments of ultimate gaming tournaments, interactive sports setups, and vibrant student participation during the Playtopia event.',
    cover: '/events/playtopia/IMG20260226180720.webp',
    date: 'February 26-27, 2026',
    count: 12,
    driveUrl: 'https://drive.google.com/drive/folders/1cQ7FwA51Qf4Bu4yfbqLl8sckmix4i_97',
    images: [
      { src: '/events/playtopia/20260227_103309.webp', title: 'Gaming Stations Setup', desc: 'Consoles and gaming rigs prepped for tournament-style matchplay.' },
      { src: '/events/playtopia/20260227_103550.webp', title: 'Intense Matchups', desc: 'Competitors locked in head-to-head fighting game duels.' },
      { src: '/events/playtopia/20260227_103552.webp', title: 'Spectator Crowd', desc: 'Vocal crowd cheering for their favorite players in the arena.' },
      { src: '/events/playtopia/20260227_103744.webp', title: 'Strategy Briefing', desc: 'Coordinating team gameplay roles and map layouts before match launch.' },
      { src: '/events/playtopia/20260227_103755.webp', title: 'Victory Celebration', desc: 'Players celebrating a clutch match-point win in the closing round.' },
      { src: '/events/playtopia/20260227_104038.webp', title: 'Interactive Zone', desc: 'Students exploring VR and motion-sensing game installations.' },
      { src: '/events/playtopia/20260227_112131.webp', title: 'Console Showdowns', desc: 'FIFA tournament group stages running concurrently under neon lights.' },
      { src: '/events/playtopia/20260227_112134.webp', title: 'LAN Play Action', desc: 'Competitive PC multiplayer setups buzzing with tactical comms.' },
      { src: '/events/playtopia/IMG20260226180718.webp', title: 'Playtopia Front Desk', desc: 'Club registrations and bracket validation counters.' },
      { src: '/events/playtopia/IMG20260226180720.webp', title: 'Neon Lounge Vibes', desc: 'Atmospheric gaming zone featuring LED glow and background music.' },
      { src: '/events/playtopia/IMG20260226180751.webp', title: 'Arcade Classics Section', desc: 'Retro gaming cabinets drawing long lines of nostalgic players.' },
      { src: '/events/playtopia/IMG20260226180753.webp', title: 'Award Ceremony', desc: 'Handing over the custom trophies to the Playtopia champion squad.' }
    ]
  }
]

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const currentAlbum = albums.find(a => a.id === activeAlbum)

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null || !currentAlbum) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < currentAlbum.images.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : currentAlbum.images.length - 1))
      } else if (e.key === 'Escape') {
        setLightboxIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, currentAlbum])

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [lightboxIndex])

  return (
    <div className="flex flex-col min-h-screen bg-background relative z-10">
      {/* Page Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 space-y-6 text-left relative z-10">
          <ScrollReveal>
            <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={12} className="text-primary animate-pulse" />
              Event Gallery
            </div>
          </ScrollReveal>
          
          <TextReveal
            text="Club Memories."
            className="font-sans font-bold text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]"
          />
          
          <ScrollReveal delay={0.2}>
            <p className="text-text-sec text-base md:text-lg max-w-xl leading-relaxed">
              Explore the archives of Bit-By-Bit's flagship events, technical hackathons, game design arenas, and community sprints.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 transition-colors duration-300 min-h-[60vh] relative">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {activeAlbum === null ? (
              // ------------------- ALBUM SELECTION VIEW -------------------
              <motion.div
                key="album-list"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              >
                {albums.map((album, idx) => (
                  <ScrollReveal key={album.id} delay={idx * 0.1}>
                    <div 
                      onClick={() => setActiveAlbum(album.id)}
                      className="group cursor-pointer flex flex-col h-full"
                    >
                      <SpotlightCard className="p-6 bg-background border border-border-custom hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
                        {/* Folder Photo Pile Visual */}
                        <div className="relative w-full aspect-video rounded-xl bg-card-bg/50 border border-border-custom/50 flex items-center justify-center overflow-hidden mb-6 group-hover:bg-primary/[0.02] transition-colors duration-300">
                          {/* Photo Deck stacking effect */}
                          <div className="relative w-2/3 h-2/3 flex items-center justify-center">
                            {/* Left stacked image */}
                            <div className="absolute w-[80%] h-[80%] rounded-lg overflow-hidden border-2 border-border-custom shadow-2xl rotate-[-8deg] -translate-x-6 translate-y-2 group-hover:rotate-[-14deg] group-hover:-translate-x-10 group-hover:-translate-y-2 transition-all duration-500 origin-bottom-left ease-out">
                              <Image 
                                src={album.images[0].src} 
                                alt="preview 1" 
                                fill 
                                className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500" 
                              />
                            </div>
                            
                            {/* Right stacked image */}
                            <div className="absolute w-[80%] h-[80%] rounded-lg overflow-hidden border-2 border-border-custom shadow-2xl rotate-[8deg] translate-x-6 translate-y-2 group-hover:rotate-[14deg] group-hover:translate-x-10 group-hover:-translate-y-2 transition-all duration-500 origin-bottom-right ease-out">
                              <Image 
                                src={album.images[1].src} 
                                alt="preview 2" 
                                fill 
                                className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500" 
                              />
                            </div>
                            
                            {/* Center prominent stacked image */}
                            <div className="absolute w-[85%] h-[85%] rounded-lg overflow-hidden border-2 border-border-custom shadow-2xl z-10 group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-500 ease-out">
                              <Image 
                                src={album.cover} 
                                alt="cover" 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                              />
                            </div>
                          </div>
                          
                          {/* Folder Tab Overlay Tag */}
                          <div className="absolute top-3 left-3 px-3 py-1 bg-background/80 border border-border-custom/50 rounded-full flex items-center gap-1.5 backdrop-blur-sm z-20">
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
                  </ScrollReveal>
                ))}
              </motion.div>
            ) : (
              // ------------------- ALBUM ACTIVE GRID VIEW -------------------
              <motion.div
                key="album-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 text-left"
              >
                {/* Back Button and Album Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-custom/50 pb-6 gap-4">
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveAlbum(null)}
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase text-text-sec hover:text-primary transition-colors duration-200 group mb-2"
                    >
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      Back to Albums
                    </button>
                    <h2 className="font-sans font-bold text-2xl md:text-3xl text-foreground">
                      {currentAlbum?.title}
                    </h2>
                    <p className="text-text-sec text-xs md:text-sm max-w-2xl leading-relaxed">
                      {currentAlbum?.desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 self-start sm:self-center">
                    <div className="flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                      <Folder size={14} />
                      {currentAlbum?.images.length} Photos
                    </div>
                    {currentAlbum?.driveUrl && (
                      <a
                        href={currentAlbum.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-1.5 font-mono text-xs uppercase font-bold tracking-wider text-white bg-primary hover:bg-primary-hover border border-primary/30 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-primary/10"
                      >
                        <ExternalLink size={12} />
                        View All on Drive
                      </a>
                    )}
                  </div>
                </div>

                {/* Grid of Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentAlbum?.images.map((item, idx) => (
                    <ScrollReveal key={idx} delay={idx * 0.05}>
                      <div
                        onClick={() => setLightboxIndex(idx)}
                        className="group cursor-pointer flex flex-col h-full"
                      >
                        <SpotlightCard 
                          className="overflow-hidden bg-background border border-border-custom hover:border-primary/50 transition-all duration-300 relative h-full"
                        >
                        <div className="relative w-full aspect-video overflow-hidden">
                          {/* Dot matrix grid texture on hover */}
                          <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] bg-[size:16px_16px] opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10 pointer-events-none" />
                          
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                            priority={idx < 3}
                          />
                        </div>

                        <div className="p-4 border-t border-border-custom/50 bg-card-bg relative z-10">
                          <h4 className="font-sans font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                            {item.title}
                          </h4>
                          <p className="text-text-sec text-[11px] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </SpotlightCard>
                    </div>
                  </ScrollReveal>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Fullscreen Modal Viewer */}
      <AnimatePresence>
        {lightboxIndex !== null && currentAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-md p-6 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar Controls */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="font-mono text-xs text-text-sec uppercase tracking-widest">
                {currentAlbum.title}
              </span>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex(null)
                }}
                className="w-10 h-10 rounded-full border border-border-custom bg-card-bg/35 flex items-center justify-center text-text-sec hover:text-white hover:border-white transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Central Slide Viewer Container */}
            <div className="flex-1 w-full max-w-5xl mx-auto flex items-center justify-between relative gap-4">
              {/* Navigation Left */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : currentAlbum.images.length - 1))
                }}
                className="w-12 h-12 rounded-full border border-border-custom bg-card-bg/25 flex items-center justify-center text-text-sec hover:text-white hover:border-white transition-all duration-200 shrink-0 relative z-10"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Main Active Image Display */}
              <div 
                className="flex-1 h-[65vh] md:h-[75vh] w-full relative flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={currentAlbum.images[lightboxIndex].src}
                      alt={currentAlbum.images[lightboxIndex].title}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Right */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex(prev => (prev !== null && prev < currentAlbum.images.length - 1 ? prev + 1 : 0))
                }}
                className="w-12 h-12 rounded-full border border-border-custom bg-card-bg/25 flex items-center justify-center text-text-sec hover:text-white hover:border-white transition-all duration-200 shrink-0 relative z-10"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption Info Bar */}
            <div className="w-full max-w-xl mx-auto text-center space-y-1.5 z-10 pb-4" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-sans font-bold text-base text-white">
                    {currentAlbum.images[lightboxIndex].title}
                  </h4>
                  <p className="text-text-sec text-[11px] max-w-md mx-auto leading-relaxed">
                    {currentAlbum.images[lightboxIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="font-mono text-[10px] text-primary pt-2">
                {lightboxIndex + 1} of {currentAlbum.images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
