'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react'

export default function Contact() {
  // Contact Form State
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactSubject, setContactSubject] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [contactError, setContactError] = useState('')

  // Join Us Form State
  const [joinName, setJoinName] = useState('')
  const [joinEmail, setJoinEmail] = useState('')
  const [joinBranch, setJoinBranch] = useState('')
  const [joinYear, setJoinYear] = useState('')
  const [joinDomain, setJoinDomain] = useState('')
  const [joinWhy, setJoinWhy] = useState('')
  const [joinStatus, setJoinStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [joinError, setJoinError] = useState('')

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactStatus('loading')
    setContactError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage
        })
      })

      const data = await response.json()
      if (data.success) {
        setContactStatus('success')
        setContactName('')
        setContactEmail('')
        setContactSubject('')
        setContactMessage('')
        setTimeout(() => setContactStatus('idle'), 3000)
      } else {
        setContactStatus('error')
        setContactError(data.error || 'Failed to send message')
      }
    } catch (err) {
      setContactStatus('error')
      setContactError('An unexpected error occurred. Please try again.')
    }
  }

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setJoinStatus('loading')
    setJoinError('')

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: joinName,
          email: joinEmail,
          branch: joinBranch,
          year: joinYear,
          domain: joinDomain,
          whyJoin: joinWhy
        })
      })

      const data = await response.json()
      if (data.success) {
        setJoinStatus('success')
        setJoinName('')
        setJoinEmail('')
        setJoinBranch('')
        setJoinYear('')
        setJoinDomain('')
        setJoinWhy('')
        setTimeout(() => setJoinStatus('idle'), 3000)
      } else {
        setJoinStatus('error')
        setJoinError(data.error || 'Failed to submit application')
      }
    } catch (err) {
      setJoinStatus('error')
      setJoinError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Page Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 space-y-6 text-left relative z-10">
          <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">Connect</div>
          <h1 className="font-sans font-bold text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]">
            Get in <span className="text-primary bg-clip-text">Touch.</span>
          </h1>
          <p className="text-text-sec text-base md:text-lg max-w-xl leading-relaxed">
            Apply to join our student developer ranks, register general questions, or coordinate sponsorship opportunities.
          </p>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info and General Contact Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="font-sans font-bold text-xl text-foreground">Contact Details</h2>
              <p className="text-text-sec text-xs leading-relaxed max-w-sm">
                Have a quick question about workshops, hackathons, or operations? Reach out via our channels or submit a note.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border-custom bg-background">
                <Mail className="text-primary" size={18} />
                <div>
                  <div className="font-mono text-[9px] text-text-sec uppercase tracking-wider">Email Support</div>
                  <div className="text-xs font-bold text-foreground">bitbybit@vitbhopal.ac.in</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl border border-border-custom bg-background">
                <MapPin className="text-primary" size={18} />
                <div>
                  <div className="font-mono text-[9px] text-text-sec uppercase tracking-wider">Location</div>
                  <div className="text-xs font-bold text-foreground">VIT Bhopal University, Kotri Kalan, MP</div>
                </div>
              </div>
            </div>

            {/* General Contact Form */}
            <div className="bento-card p-6 bg-background">
              <h3 className="font-sans font-bold text-sm text-foreground mb-4">Send a Message</h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {contactStatus === 'success' && (
                  <div className="p-3 text-xs text-emerald-500 border border-emerald-500/20 bg-emerald-500/5 rounded-xl font-medium">
                    ✓ Message sent successfully! We will get back to you shortly.
                  </div>
                )}
                {contactStatus === 'error' && (
                  <div className="p-3 text-xs text-red-500 border border-red-500/20 bg-red-500/5 rounded-xl font-medium">
                    {contactError}
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold">Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Enter your name"
                    className="px-3.5 py-2 text-xs rounded-xl bg-card-bg border border-border-custom text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold">Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-3.5 py-2 text-xs rounded-xl bg-card-bg border border-border-custom text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold">Subject</label>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="Enter message subject"
                    className="px-3.5 py-2 text-xs rounded-xl bg-card-bg border border-border-custom text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Enter your query details..."
                    className="px-3.5 py-2 text-xs rounded-xl bg-card-bg border border-border-custom text-foreground outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactStatus === 'loading'}
                  className="w-full py-2.5 flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-colors disabled:opacity-50"
                >
                  <Send size={12} />
                  {contactStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Join Us Form Column */}
          <div id="join" className="lg:col-span-7 bento-card p-6 md:p-8 bg-background scroll-mt-20">
            <div className="space-y-2 mb-6 text-left">
              <h2 className="font-sans font-bold text-lg text-foreground">Apply for Membership</h2>
              <p className="text-text-sec text-xs">
                Fill in the details below to register your interest in joining the Bit-By-Bit community domains.
              </p>
            </div>

            <form onSubmit={handleJoinSubmit} className="space-y-4">
              {joinStatus === 'success' && (
                <div className="p-3 text-xs text-emerald-500 border border-emerald-500/20 bg-emerald-500/5 rounded-xl font-medium">
                  ✓ Application submitted successfully! Welcome to the loop.
                </div>
              )}
              {joinStatus === 'error' && (
                <div className="p-3 text-xs text-red-500 border border-red-500/20 bg-red-500/5 rounded-xl font-medium">
                  {joinError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold">Full Name</label>
                  <input
                    type="text"
                    required
                    value={joinName}
                    onChange={(e) => setJoinName(e.target.value)}
                    placeholder="Enter your name"
                    className="px-3.5 py-2 text-xs rounded-xl bg-card-bg border border-border-custom text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={joinEmail}
                    onChange={(e) => setJoinEmail(e.target.value)}
                    placeholder="name@vitbhopal.ac.in"
                    className="px-3.5 py-2 text-xs rounded-xl bg-card-bg border border-border-custom text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold">Branch</label>
                  <input
                    type="text"
                    required
                    value={joinBranch}
                    onChange={(e) => setJoinBranch(e.target.value)}
                    placeholder="e.g. CSE, ECE, EEE"
                    className="px-3.5 py-2 text-xs rounded-xl bg-card-bg border border-border-custom text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold">Year of Study</label>
                  <select
                    required
                    value={joinYear}
                    onChange={(e) => setJoinYear(e.target.value)}
                    className="px-3.5 py-2 text-xs rounded-xl bg-card-bg border border-border-custom text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold">Domain Preference</label>
                <select
                  required
                  value={joinDomain}
                  onChange={(e) => setJoinDomain(e.target.value)}
                  className="px-3.5 py-2 text-xs rounded-xl bg-card-bg border border-border-custom text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="">Select Domain</option>
                  <option value="Tech Domain">Tech (Web, ML, Cloud)</option>
                  <option value="Design Domain">Design (UI/UX, Branding)</option>
                  <option value="Content Domain">Content (Writing, Media)</option>
                  <option value="PR Domain">PR & Outreach (Relations, Sponsorships)</option>
                  <option value="Events Domain">Event Management (Ops, Execution)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold">Why do you want to join Bit-By-Bit?</label>
                <textarea
                  required
                  rows={4}
                  value={joinWhy}
                  onChange={(e) => setJoinWhy(e.target.value)}
                  placeholder="Share a short reasoning (min 10 characters)..."
                  className="px-3.5 py-2 text-xs rounded-xl bg-card-bg border border-border-custom text-foreground outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={joinStatus === 'loading'}
                className="w-full py-3.5 flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-colors disabled:opacity-50"
              >
                <HelpCircle size={12} />
                {joinStatus === 'loading' ? 'Submitting Application...' : 'Submit Application ⚡'}
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  )
}
