'use client'

import { useState } from 'react'
import { Calendar, MapPin, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SpotlightCard from '@/components/SpotlightCard'
import ScrollReveal from '@/components/ScrollReveal'

interface Event {
  id: string
  title: string
  description: string
  date: string | Date
  type: string
  capacity?: number | null
  imageUrl?: string | null
  status: string
  location?: string | null
}

interface EventsClientProps {
  initialEvents: Event[]
}

export default function EventsClient({ initialEvents }: EventsClientProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [registrationEvent, setRegistrationEvent] = useState<Event | null>(null)
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regStatus, setRegStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const categories = [
    { key: 'all', name: 'All' },
    { key: 'hackathon', name: 'Hackathons' },
    { key: 'workshop', name: 'Workshops' },
    { key: 'design', name: 'Design' }
  ]

  const filteredEvents = initialEvents.filter((e) => {
    const matchesCategory = activeFilter === 'all' || e.type.toLowerCase() === activeFilter
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!registrationEvent) return

    setRegStatus('loading')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          subject: `Register: ${registrationEvent.title}`,
          message: `Registration request for event: ${registrationEvent.title} (ID: ${registrationEvent.id}). Candidate name: ${regName}, email: ${regEmail}.`
        })
      })

      const data = await response.json()
      if (data.success) {
        setRegStatus('success')
        setTimeout(() => {
          setRegistrationEvent(null)
          setRegName('')
          setRegEmail('')
          setRegStatus('idle')
        }, 2000)
      } else {
        setRegStatus('error')
        setErrorMsg(data.error || 'Failed to submit registration')
      }
    } catch (error) {
      setRegStatus('error')
      setErrorMsg('An error occurred. Please try again.')
    }
  }

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl border border-border-custom bg-card-bg transition-colors duration-300">
          {/* Category Tabs with layoutId animated pill */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const active = activeFilter === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveFilter(cat.key)}
                  className="relative px-4 py-2 text-xs font-sans font-bold tracking-tight rounded-lg transition-colors duration-200"
                >
                  {active && (
                    <motion.span
                      layoutId="eventCategoryTabPill"
                      className="absolute inset-0 bg-primary rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={active ? 'text-white' : 'text-text-sec hover:text-foreground'}>
                    {cat.name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-sec" size={16} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-background border border-border-custom text-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Grid of Events */}
      {filteredEvents.length === 0 ? (
        <ScrollReveal>
          <div className="text-center py-20 border border-dashed border-border-custom rounded-2xl bg-card-bg/50">
            <p className="text-text-sec text-sm">No events found matching your filter criteria.</p>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((item, idx) => {
            const dateStr = new Date(item.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })

            return (
              <ScrollReveal key={item.id} delay={idx * 0.05} className="h-full">
                <SpotlightCard className="overflow-hidden flex flex-col justify-between group h-full border border-border-custom bg-background transition-all duration-300">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold text-primary px-2 py-0.5 rounded border border-primary/20 bg-primary/10 uppercase tracking-widest">
                        {item.type}
                      </span>
                      <span className={`text-[9px] font-mono font-semibold uppercase px-2 py-0.5 rounded ${
                        item.status === 'UPCOMING'
                          ? 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/20'
                          : 'text-text-sec bg-foreground/5 border border-border-custom'
                      }`}>
                        {item.status.toLowerCase()}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-sans font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-text-sec text-xs leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 border-t border-border-custom/50 bg-foreground/[0.01] flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-text-sec text-[10px] font-mono">
                      <Calendar size={14} className="text-primary" />
                      {dateStr}
                    </div>
                    <div className="flex items-center gap-2 text-text-sec text-[10px] font-mono">
                      <MapPin size={14} className="text-primary" />
                      {item.location || 'VIT Bhopal'}
                    </div>

                    {item.status === 'UPCOMING' ? (
                      <button
                        onClick={() => setRegistrationEvent(item)}
                        className="mt-4 w-full py-2.5 flex items-center justify-center font-mono text-[10px] uppercase font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                      >
                        Register Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="mt-4 w-full py-2.5 flex items-center justify-center font-mono text-[10px] uppercase font-bold text-text-sec bg-foreground/5 border border-border-custom rounded-xl cursor-not-allowed"
                      >
                        Registration Closed
                      </button>
                    )}
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            )
          })}
        </div>
      )}

      {/* Registration Modal Overlay with smooth AnimatePresence */}
      <AnimatePresence>
        {registrationEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRegistrationEvent(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-card-bg border border-border-custom w-full max-w-md rounded-2xl p-6 shadow-2xl relative z-10"
            >
              <h3 className="font-sans font-bold text-lg text-foreground mb-1">
                Event Registration
              </h3>
              <p className="text-text-sec text-xs mb-6">
                Confirm your registration for <strong className="text-foreground">{registrationEvent.title}</strong>
              </p>

              {regStatus === 'success' ? (
                <div className="text-center py-6 space-y-3">
                  <span className="text-4xl text-emerald-500 block">✓</span>
                  <h4 className="font-bold text-sm text-foreground">Registration Complete!</h4>
                  <p className="text-text-sec text-xs">We have successfully recorded your details.</p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {regStatus === 'error' && (
                    <div className="p-3 text-xs text-red-500 border border-red-500/20 bg-red-500/5 rounded-xl">
                      {errorMsg}
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Enter your name"
                      className="px-3.5 py-2 text-xs rounded-xl bg-background border border-border-custom text-foreground outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="px-3.5 py-2 text-xs rounded-xl bg-background border border-border-custom text-foreground outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-4 justify-end">
                    <button
                      type="button"
                      onClick={() => setRegistrationEvent(null)}
                      className="px-4 py-2.5 text-xs font-mono font-semibold uppercase text-text-sec hover:text-foreground hover:bg-foreground/5 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={regStatus === 'loading'}
                      className="px-6 py-2.5 text-xs font-mono font-bold uppercase text-white bg-primary hover:bg-primary-hover rounded-xl disabled:opacity-50"
                    >
                      {regStatus === 'loading' ? 'Confirming...' : 'Confirm Registration'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
