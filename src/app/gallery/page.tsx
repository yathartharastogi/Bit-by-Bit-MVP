'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Folder, ArrowLeft, X, ChevronLeft, ChevronRight, Calendar, Sparkles, ExternalLink, Play } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import TextReveal from '@/components/TextReveal'
import SpotlightCard from '@/components/SpotlightCard'
import dynamic from 'next/dynamic'

const OrbitalGallery = dynamic(() => import('@/components/OrbitalGallery'), { ssr: false })
const MobileCarouselGallery = dynamic(() => import('@/components/MobileCarouselGallery'))

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
  fullStory: string[]
}

const albums: Album[] = [
  {
    id: 'mindzilla',
    title: 'Mindzilla 2025',
    desc: "Relive the high-energy problem-solving atmosphere of Bit-By-Bit's flagship logic and coding sprint event held at AdVITya.",
    cover: '/events/mindzilla/1The Gateway.jpeg',
    date: 'February 20, 2025',
    count: 12,
    driveUrl: 'https://drive.google.com/drive/folders/156kT6R9hKENkpQoOti0k4ZoeqeQlMts_',
    fullStory: [
      "MindZilla: Chaos and Cheer was a one-of-a-kind experience by Bit By Bit Club where technology met strategy, creativity, and pure excitement. It was not just about winning — it was about thinking differently, taking on challenges, making quick decisions, and enjoying every moment along the way.",
      "The event brought out the problem-solvers, strategists, and innovators through a series of engaging challenges. In the Brainwave Battle, participants stepped into a world of puzzles, tech-based tasks, and unexpected twists, where teamwork, creativity, and the ability to think on their feet became the key to success.",
      "The excitement continued with Market Mavericks, where participants entered a fast-paced world of trading and strategy. With every decision carrying a risk, teams had to trust their instincts, analyze situations, and make smart moves to rise above the competition.",
      "And even when the competition got intense, the fun never stopped. The FunFest kept the energy alive with interactive games, laughter, and entertainment, making sure everyone had a chance to be part of the experience. It gave students a chance to challenge themselves, discover new strengths, and create memories where chaos turned into creativity and ideas turned into action."
    ],
    images: [
      { src: '/events/mindzilla/1The Gateway.jpeg', title: 'The Gateway', desc: 'The marathon begins at registration, where our team streamlined check-ins to set a high-energy tone for the hackathon.' },
      { src: '/events/mindzilla/2Core Synergy.jpeg', title: 'Core Synergy', desc: 'The visionary minds behind the Bit By Bit club, steering logistics, technical roadmaps, and event execution.' },
      { src: '/events/mindzilla/3AcademicStewardship.jpeg', title: 'Academic Stewardship', desc: 'Faculty and domain experts providing real-time architectural reviews and code debugging sessions for the teams.' },
      { src: '/events/mindzilla/4ContinuousIntegration.jpeg', title: 'Continuous Integration', desc: 'Turning runtime errors into breakthroughs. Teams worked closely over laptops to review and optimize their applications.' },
      { src: '/events/mindzilla/5TechnicalGrind.jpeg', title: 'Technical Grind', desc: 'Absolute concentration in the lab. Developers dived deep into their stacks, translating logic into code against the clock.' },
      { src: '/events/mindzilla/6CreativeInterlude.jpeg', title: 'Creative Interlude', desc: 'Breaking the binary. Participants stepped away from screens to engage in paper crafts, refreshing their minds for the next sprint.' },
      { src: '/events/mindzilla/7StrategicDecisions.jpeg', title: 'Strategic Decisions', desc: 'Testing cross-platform performance. Teams analyzed mobile layouts to ensure highly responsive and secure applications.' },
      { src: '/events/mindzilla/8CapturingMemories.jpeg', title: 'Capturing Memories', desc: 'Framing hard work with community spirit. Our custom hand-drawn frame captured lasting social media memories.' },
      { src: '/events/mindzilla/9JailbreakMoments.jpeg', title: 'Jailbreak Moments', desc: 'Bringing cheer to the chaos. The humorous "Jail" prop offered a lighthearted escape from intense compilation loops.' },
      { src: '/events/mindzilla/10TheCelebrationHub.jpeg', title: 'The Celebration Hub', desc: 'Pure relief and joy as faculty and students witness a breakthrough, celebrating a successful project run and a beautifully completed milestone.' },
      { src: '/events/mindzilla/11UnifiedCommunity.jpeg', title: 'Unified Community', desc: 'Standing tall after 48 hours of building. A triumphant group photo capturing the shared grit of our developers and faculty.' },
      { src: '/events/mindzilla/12TriumphantFinale.jpeg', title: 'Triumphant Finale', desc: 'The ultimate celebration. Honoring the top-performing teams who pushed technical boundaries to secure the podium.' }
    ]
  },
  {
    id: 'playtopia',
    title: 'Playtopia 2026',
    desc: 'Moments of ultimate gaming tournaments, interactive sports setups, and vibrant student participation during the Playtopia event.',
    cover: '/events/playtopia/1TheWelcomeTerminal.jpeg',
    date: 'February 26-27, 2026',
    count: 12,
    driveUrl: 'https://drive.google.com/drive/folders/1cQ7FwA51Qf4Bu4yfbqLl8sckmix4i_97',
    fullStory: [
      "PlayTopia was an exciting interactive gaming event organized by Bit By Bit Club, created with the idea of bringing students together through fun, challenges, and shared experiences. The event was all about stepping away from the usual routine and creating a space where everyone could participate, connect, and enjoy themselves.",
      "The event featured a variety of quick and engaging games that tested creativity, teamwork, focus, and problem-solving skills. From solving puzzles in a mini escape-style challenge to competing in skill-based games and taking on fun tasks, every activity was designed to keep the energy high and encourage active participation.",
      "The highlight of PlayTopia was the perfect mix of entertainment and strategy, where participants not only competed but also collaborated, interacted with new people, and made memorable moments. The Tech Mafia City Takeover added an extra layer of excitement with strategy, negotiation, and teamwork coming into play.",
      "More than just a gaming event, PlayTopia was an experience that celebrated creativity, interaction, and the spirit of participation — proving that even simple ideas can create unforgettable campus memories."
    ],
    images: [
      { src: '/events/playtopia/1TheWelcomeTerminal.jpeg', title: 'The Welcome Terminal', desc: 'Welcoming eager crowds at the front registration desk, officially kickstarting the high-energy gaming arena.' },
      { src: '/events/playtopia/2StrategicDebriefs.jpeg', title: 'Strategic Debriefs', desc: 'Club organizers and faculty leads aligning backstage to ensure flawless coordination across all gaming zones.' },
      { src: '/events/playtopia/3TheVisualShowcase.jpeg', title: 'The Visual Showcase', desc: 'Checking out the official event poster on screen, featuring bold gaming graphics and character artwork that set the tone for the entire arena.' },
      { src: '/events/playtopia/4VIP.jpeg', title: 'VIP', desc: 'Honored guests and senior faculty touring the arena, experiencing the vibrant atmosphere and creative event setups firsthand.' },
      { src: '/events/playtopia/5ThePhotobooth.jpeg', title: 'The Photobooth', desc: 'Striking a pose at our dedicated event photobooth to capture high-energy memories and showcase our official participant passes.' },
      { src: '/events/playtopia/6MatchTactics.jpeg', title: 'Match Tactics', desc: 'Competitors huddling up to discuss their next moves, map out team coordination, and claim the competitive edge.' },
      { src: '/events/playtopia/7PlayZones.jpeg', title: 'Play Zones', desc: 'A vibrant mix of console setups, custom arcade zones, and physical layout designs built for maximum entertainment.' },
      { src: '/events/playtopia/8ScoringCheckpoint.jpeg', title: 'Scoring Checkpoint', desc: 'Faculty and leads monitoring the tournament brackets, ensuring fair play and keeping track of leaderboard standouts.' },
      { src: '/events/playtopia/9TheJoyofPlay.jpeg', title: 'The Joy of Play', desc: 'Pure enjoyment and laughter as faculty and players share a casual gaming moment, celebrating a fun and successful match.' },
      { src: '/events/playtopia/10TheFeedbackStation.jpeg', title: 'The Feedback Station', desc: 'Faculty and organizers checking out the live player feedback station, capturing real-time impressions and tournament reviews.' },
      { src: '/events/playtopia/11UnifiedCore.jpeg', title: 'Unified Core', desc: 'Standing together after an unforgettable event—a triumphant snapshot capturing the shared energy of the entire team.' },
      { src: '/events/playtopia/12Winners.jpeg', title: 'Winners', desc: 'Celebrating the gaming champions as they claim their podium finishes and lift their well-deserved prizes.' }
    ]
  }
]

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(6)
  }, [activeAlbum])


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

        <div className="max-w-7xl mx-auto px-6 space-y-6 text-left relative z-10">
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
              Explore the archives of Bit-By-Bit&apos;s flagship events, technical hackathons, game design arenas, and community sprints.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 transition-colors duration-300 min-h-[60vh] relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {activeAlbum === null ? (
              // ------------------- ALBUM SELECTION VIEW -------------------
              // ------------------- ALBUM SELECTION ORBITAL VIEW -------------------
              <motion.div
                key="orbital-carousel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {!isMounted ? (
                  <div className="w-full h-[600px] flex items-center justify-center">
                    <div className="animate-pulse bg-primary/10 rounded-xl w-full max-w-md h-[400px]" />
                  </div>
                ) : isMobile ? (
                  <MobileCarouselGallery albums={albums} onSelectAlbum={setActiveAlbum} />
                ) : (
                  <OrbitalGallery albums={albums} onSelectAlbum={setActiveAlbum} />
                )}
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

                  </div>
                </div>

                {/* Grid of Images */}
                <div className="w-full flex flex-col lg:flex-row gap-8 items-start lg:items-stretch">
                  <div className="flex-1 flex flex-col gap-6">
                    <ScrollReveal>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentAlbum?.images.slice(0, visibleCount).map((item, idx) => (
                          <div
                            key={idx}
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
                        ))}
                      </div>
                    </ScrollReveal>
                    
                    {currentAlbum && visibleCount < currentAlbum.images.length && (
                      <div className="flex justify-center mt-2 pb-4">
                        <button
                          onClick={() => setVisibleCount(prev => prev + 6)}
                          className="px-6 py-2.5 rounded-full border border-border-custom bg-card-bg/50 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-200 font-mono text-xs uppercase tracking-wider text-text-sec"
                        >
                          Load More
                        </button>
                      </div>
                    )}
                  </div>

                  {/* RIGHT SIDE: Smooth Scrollable Narrative Story Panel - Now visible instantly on Album Click! */}
                  <div className="w-full lg:w-[420px] bg-card-bg/20 border border-border-custom/50 rounded-2xl p-6 flex flex-col justify-between overflow-y-auto max-h-[60vh] lg:max-h-[80vh] scrollbar-thin text-left sticky top-6">
                    <div className="space-y-6">
                      <div className="border-b border-white/10 pb-4 text-left">
                        <span className="text-[10px] font-mono tracking-widest text-primary uppercase">Event Memoir</span>
                        <h3 className="text-xl font-sans font-extrabold text-white mt-1">{currentAlbum?.title} Story</h3>
                      </div>

                      {/* Renders your 4 content paragraphs cleanly line by line */}
                      <div className="space-y-4 text-xs md:text-sm text-text-sec font-normal leading-relaxed text-left">
                        {currentAlbum?.fullStory?.map((paragraph, i) => (
                          <p key={i} className="hover:text-white/90 transition-colors duration-150">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between shrink-0 font-mono text-[10px] text-text-sec">
                      <span>SYSTEM: ACTIVE VIEW</span>
                      <span className="text-primary font-bold">ALBUM JOURNAL</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Fullscreen Modal Viewer */}
      <AnimatePresence>
        {lightboxIndex !== null && currentAlbum && currentAlbum.images[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-black/98 backdrop-blur-md overflow-y-auto lg:overflow-hidden p-4 md:p-6 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar Controls */}
            <div className="w-full flex items-center justify-between z-10 pb-4 shrink-0">
              <span className="font-mono text-xs text-text-sec uppercase tracking-widest">
                {currentAlbum.title} • Archive Edition
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

            {/* Immersive Responsive Grid Container */}
            <div
              className="flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* LEFT SIDE: Hardware-Accelerated Image Container */}
              <div className="flex-1 flex flex-col items-center justify-center relative min-h-[45vh] lg:min-h-0 bg-neutral-900/20 border border-white/5 rounded-2xl p-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : currentAlbum.images.length - 1))
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-border-custom bg-black/50 backdrop-blur-md flex items-center justify-center text-text-sec hover:text-white hover:border-white transition-all duration-150 z-20"
                >
                  <ChevronLeft size={22} />
                </button>

                <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lightboxIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="w-full h-full relative"
                      style={{ willChange: 'transform, opacity' }} // Mobile GPU acceleration trigger
                    >
                      <Image
                        src={currentAlbum.images[lightboxIndex].src}
                        alt={currentAlbum.images[lightboxIndex].title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex(prev => (prev !== null && prev < currentAlbum.images.length - 1 ? prev + 1 : 0))
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-border-custom bg-black/50 backdrop-blur-md flex items-center justify-center text-text-sec hover:text-white hover:border-white transition-all duration-150 z-20"
                >
                  <ChevronRight size={22} />
                </button>

                {/* Image Details Floating Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md border border-white/5 rounded-xl p-3 text-left">
                  <h4 className="font-sans font-bold text-sm text-white">{currentAlbum.images[lightboxIndex].title}</h4>
                  <p className="text-[11px] text-text-sec line-clamp-1">{currentAlbum.images[lightboxIndex].desc}</p>
                </div>
              </div>

              {/* RIGHT SIDE: Smooth Scrollable Narrative Story Panel
              <div className="w-full lg:w-[420px] bg-card-bg/20 border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-y-auto lg:h-full max-h-[50vh] lg:max-h-none scrollbar-thin">
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-4 text-left">
                    <span className="text-[10px] font-mono tracking-widest text-primary uppercase">Event Memoir</span>
                    <h3 className="text-xl font-sans font-extrabold text-white mt-1">{currentAlbum.title} Story</h3>
                  </div> */}

              {/* Renders your 4 content paragraphs cleanly line by line
                  <div className="space-y-4 text-xs md:text-sm text-text-sec font-normal leading-relaxed text-left">
                    {currentAlbum.fullStory.map((paragraph, i) => (
                      <p key={i} className="hover:text-white/90 transition-colors duration-150">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div> */}

              {/* Bottom View Metadata Counter
                <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between shrink-0 font-mono text-[10px] text-text-sec">
                  <span>SYSTEM: ACTIVE VIEW</span>
                  <span className="text-primary font-bold">IMAGE {lightboxIndex + 1} / {currentAlbum.images.length}</span>
                </div>
              </div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
