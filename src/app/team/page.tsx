/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useMemo } from 'react'
import SpotlightCard from '@/components/SpotlightCard'
import ScrollReveal from '@/components/ScrollReveal'
import TextReveal from '@/components/TextReveal'
import { Mail, Phone, Search, Copy, Check, Eye, EyeOff } from 'lucide-react'
import MemberAvatar from '@/components/MemberAvatar'

// Executive Committee (Core Board)
const CORE_TEAM = [
  {
    name: 'Atherva Sahai',
    role: 'President',
    reg: '24BCE10072',
    email: 'atherverva.24bce10072@vitbhopal.ac.in',
    phone: '8817136170',
    av: 'AS',
    color: 'border-blue-500/30 text-blue-500 bg-blue-500/10',
    gradient: 'from-blue-600 via-indigo-600 to-violet-600',
    avatar: '/team/atherva.png',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Chavi Agrawal',
    role: 'Vice President',
    reg: '24BCY10035',
    email: 'chhavi.24bcy10035@vitbhopal.ac.in',
    phone: '9471009641',
    av: 'CA',
    color: 'border-purple-500/30 text-purple-500 bg-purple-500/10',
    gradient: 'from-purple-600 via-fuchsia-600 to-pink-600',
    avatar: '/team/chavi.jpg',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Jiya Arora',
    role: 'General Secretary',
    reg: '24BAI10034',
    email: 'jiya.24bai10034@vitbhopal.ac.in',
    phone: '9910448908',
    av: 'JA',
    color: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    avatar: '/team/jiya.jpeg',
    quote: 'Insert personal quote here...'
  }
]

// Domain Leads (Leads & Co-leads)
const DOMAIN_LEADS = [
  {
    name: 'Yashodhara Singh',
    domain: 'Event Management',
    role: 'Domain Lead',
    reg: '24BCE10696',
    email: 'yashodhara.24bce10696@vitbhopal.ac.in',
    phone: '6265440730',
    av: 'YS',
    color: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10',
    gradient: 'from-teal-500 to-emerald-500',
    avatar: '/team/yashodhara.jpeg',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Abhimanyu Singh',
    domain: 'Event Management',
    role: 'Co-Lead',
    reg: '24BCE10726',
    email: 'abhimanyu.24bce10726@vitbhopal.ac.in',
    phone: '9460389012',
    av: 'AS',
    color: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10',
    gradient: 'from-teal-400 to-emerald-400',
    avatar: '/team/abhimanyu.png',
    objectPosition: 'top',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Vedant Mishra',
    domain: 'Technical Team',
    role: 'Domain Lead',
    reg: '24BCE10779',
    email: 'vedant.24bce10779@vitbhopal.ac.in',
    phone: '7565842406',
    av: 'VM',
    color: 'border-blue-500/30 text-blue-500 bg-blue-500/10',
    gradient: 'from-blue-500 to-cyan-500',
    avatar: '/team/vedant.jpg',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Dipanshu Joshi',
    domain: 'Technical Team',
    role: 'Co-Lead',
    reg: '24BAI10707',
    email: 'dipanshu.24bai10707@vitbhopal.ac.in',
    phone: '8502076849',
    av: 'DJ',
    color: 'border-blue-500/30 text-blue-500 bg-blue-500/10',
    gradient: 'from-blue-400 to-cyan-400',
    avatar: '/team/dipanshu.jpeg',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Tanisha Sharma',
    domain: 'Content Team',
    role: 'Domain Lead',
    reg: '24BAI10165',
    email: 'tanisha.24bai10165@vitbhopal.ac.in',
    phone: '8094444766',
    av: 'TS',
    color: 'border-pink-500/30 text-pink-500 bg-pink-500/10',
    gradient: 'from-pink-500 to-rose-500',
    avatar: '/team/tanisha.jpg',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Divyansh Singh',
    domain: 'Content Team',
    role: 'Co-Lead',
    reg: '24BCE11135',
    email: 'divyansh.24bce11135@vitbhopal.ac.in',
    phone: '9695391306',
    av: 'DS',
    color: 'border-pink-500/30 text-pink-500 bg-pink-500/10',
    gradient: 'from-pink-400 to-rose-400',
    avatar: '/team/divyansh.jpg',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Shreya Mittal',
    domain: 'PR & Outreach',
    role: 'Domain Lead',
    reg: '24BSA10056',
    email: 'shreya.24bsa10056@vitbhopal.ac.in',
    phone: '9893161565',
    av: 'SM',
    color: 'border-orange-500/30 text-orange-500 bg-orange-500/10',
    gradient: 'from-amber-500 to-orange-500',
    avatar: '/team/shreya.jpg',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Akshit Bakshi',
    domain: 'Design Team',
    role: 'Domain Lead',
    reg: '24BCY10356',
    email: 'akshit.24bcy10356@vitbhopal.ac.in',
    phone: '9818394521',
    av: 'AB',
    color: 'border-purple-500/30 text-purple-500 bg-purple-500/10',
    gradient: 'from-violet-500 to-fuchsia-500',
    avatar: '',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Gayatri Palodkar',
    domain: 'Design Team',
    role: 'Co-Lead',
    reg: '25MIM10096',
    email: 'gayatri.25mim10096@vitbhopal.ac.in',
    phone: '9699188461',
    av: 'GP',
    color: 'border-purple-500/30 text-purple-500 bg-purple-500/10',
    gradient: 'from-violet-400 to-fuchsia-400',
    avatar: '/team/gayatri.jpeg',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Dhyan Patel',
    domain: 'Finance Team',
    role: 'Domain Lead',
    reg: '24BSA10274',
    email: 'dhyan.24bsa10274@vitbhopal.ac.in',
    phone: '9426151944',
    av: 'DP',
    color: 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10',
    gradient: 'from-yellow-500 to-amber-500',
    avatar: '/team/dhyan.jpg',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Sarika Parmar',
    domain: 'Finance Team',
    role: 'Co-Lead',
    reg: '23MIM10210',
    email: 'sarika.23mim10210@vitbhopal.ac.in',
    phone: '6268646624',
    av: 'SP',
    color: 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10',
    gradient: 'from-yellow-400 to-amber-400',
    avatar: '/team/sarika.jpg',
    quote: 'Insert personal quote here...'
  }
]

// Web Development Team Roster
const DEV_TEAM_LEAD = {
  name: 'Yathartha Rastogi',
  role: 'Lead of Development',
  reg: '24BCE10410',
  email: 'yathartha.24bce10410@vitbhopal.ac.in',
  phone: '7984509001',
  av: 'YR',
  color: 'border-indigo-500/30 text-indigo-500 bg-indigo-500/10',
  gradient: 'from-indigo-600 via-blue-600 to-cyan-500',
  avatar: '/team/yathartha.jpg',
  quote: 'Insert personal quote here...'
}

const DEV_TEAM_MEMBERS = [
  {
    name: 'Joydeep Dutta',
    role: 'Core Developer',
    reg: '25BCY10002',
    email: 'joydeep.25bcy10002@vitbhopal.ac.in',
    phone: '7905083253',
    av: 'JD',
    color: 'border-cyan-500/30 text-cyan-500 bg-cyan-500/10',
    gradient: 'from-cyan-500 to-teal-500',
    avatar: '/team/joy.jpeg',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Vansh Singh',
    role: 'Core Developer',
    reg: '25BCE10723',
    email: 'vansh.25bce10723@vitbhopal.ac.in',
    phone: '9997503925',
    av: 'VS',
    color: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10',
    gradient: 'from-emerald-500 to-teal-500',
    avatar: '',
    quote: 'Insert personal quote here...'
  },
  {
    name: 'Yashwant Sonawane',
    role: 'Core Developer',
    reg: '25BAI10061',
    email: 'yashwant.25bai10061@vitbhopal.ac.in',
    phone: '7744942169',
    av: 'YS',
    color: 'border-blue-500/30 text-blue-500 bg-blue-500/10',
    gradient: 'from-blue-500 to-indigo-500',
    avatar: '/team/yashwant.jpg',
    quote: 'Insert personal quote here...'
  }
]

export default function Team() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showContacts, setShowContacts] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Copy to clipboard helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 1500)
    })
  }

  // Filter lists based on search query
  const filteredCores = useMemo(() => {
    if (!searchQuery) return CORE_TEAM
    const q = searchQuery.toLowerCase()
    return CORE_TEAM.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q) ||
      c.reg.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const filteredLeads = useMemo(() => {
    if (!searchQuery) return DOMAIN_LEADS
    const q = searchQuery.toLowerCase()
    return DOMAIN_LEADS.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.role.toLowerCase().includes(q) ||
      l.domain.toLowerCase().includes(q) ||
      l.reg.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const filteredDevLead = useMemo(() => {
    if (!searchQuery) return [DEV_TEAM_LEAD]
    const q = searchQuery.toLowerCase()
    const match =
      DEV_TEAM_LEAD.name.toLowerCase().includes(q) ||
      DEV_TEAM_LEAD.role.toLowerCase().includes(q) ||
      DEV_TEAM_LEAD.reg.toLowerCase().includes(q)
    return match ? [DEV_TEAM_LEAD] : []
  }, [searchQuery])

  const filteredDevMembers = useMemo(() => {
    if (!searchQuery) return DEV_TEAM_MEMBERS
    const q = searchQuery.toLowerCase()
    return DEV_TEAM_MEMBERS.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.role.toLowerCase().includes(q) ||
      d.reg.toLowerCase().includes(q)
    )
  }, [searchQuery])

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Page Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div className="space-y-5 text-left max-w-xl">
            <ScrollReveal>
              <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full w-fit">
                ROSTER 2026-27
              </div>
            </ScrollReveal>
            <TextReveal
              text="Meet the Bit-By-Bit Team"
              className="font-sans font-extrabold text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]"
            />
            <ScrollReveal delay={0.1}>
              <p className="text-text-sec text-base md:text-lg leading-relaxed">
                The builders, designers, and organizers leading our community forward.
              </p>
            </ScrollReveal>
          </div>

          {/* Interactive controls bar */}
          <ScrollReveal delay={0.2} className="w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search Bar */}
              <div className="relative flex-grow sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sec/60" />
                <input
                  type="text"
                  placeholder="Search by name, reg..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-card-bg border border-border-custom rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                />
              </div>

              {/* Show/Hide Contacts Toggle */}
              <button
                onClick={() => setShowContacts(!showContacts)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-sans font-bold border border-border-custom bg-card-bg hover:bg-card-bg/80 active:scale-[0.98] text-foreground transition-all cursor-pointer"
              >
                {showContacts ? (
                  <>
                    <EyeOff className="w-4 h-4 text-primary" />
                    <span>Clean View</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 text-primary" />
                    <span>Show Contacts</span>
                  </>
                )}
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Heads / Leadership Section */}
      {filteredCores.length > 0 && (
        <section className="py-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-6 bg-primary/50" />
                <h2 className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-primary">
                  Executive Committee
                </h2>
                <span className="h-px flex-grow bg-border-custom" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredCores.map((member, idx) => (
                <ScrollReveal key={member.name} delay={idx * 0.05}>
                  <SpotlightCard className="p-6 bg-card-bg/50 border border-border-custom flex flex-col justify-between rounded-2xl min-h-[350px] hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex flex-col w-full">
                      {/* Portrait Avatar Frame */}
                      <MemberAvatar
                        src={member.avatar}
                        name={member.name}
                        initials={member.av}
                        gradient={member.gradient}
                        objectPosition={(member as any).objectPosition}
                      />

                      <h3 className="font-sans font-bold text-lg text-foreground mt-4 mb-0.5 leading-tight">{member.name}</h3>
                      <div className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider mb-2">
                        {member.role}
                      </div>

                      {/* Quote block */}
                      <div className="relative mt-2 mb-4 px-3 py-2 bg-foreground/[0.015] border-l-2 border-primary/50 rounded-r-lg font-sans text-xs italic text-text-sec leading-relaxed">
                        {member.quote}
                      </div>

                      <div className="font-mono text-[9px] text-text-sec px-2 py-0.5 rounded bg-background border border-border-custom w-fit">
                        {member.reg}
                      </div>
                    </div>

                    {/* Contact Details (Conditional Draw) */}
                    {showContacts && (
                      <div className="w-full mt-4 pt-3 border-t border-border-custom/50 flex flex-col gap-2 text-left">
                        {/* Email */}
                        <div className="flex items-center justify-between text-[10px] text-text-sec font-mono group/field bg-background/50 rounded-lg p-2 border border-border-custom/30 hover:border-primary/20 transition-all">
                          <span className="flex items-center gap-1.5 truncate">
                            <Mail className="w-3 h-3 text-primary/70 flex-shrink-0" />
                            <span className="truncate">{member.email}</span>
                          </span>
                          <button
                            onClick={() => handleCopy(member.email, `${member.name}-email`)}
                            className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0 ml-1.5"
                          >
                            {copiedId === `${member.name}-email` ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        {/* Phone */}
                        <div className="flex items-center justify-between text-[10px] text-text-sec font-mono group/field bg-background/50 rounded-lg p-2 border border-border-custom/30 hover:border-primary/20 transition-all">
                          <span className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-primary/70 flex-shrink-0" />
                            <span>{member.phone}</span>
                          </span>
                          <button
                            onClick={() => handleCopy(member.phone, `${member.name}-phone`)}
                            className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0"
                          >
                            {copiedId === `${member.name}-phone` ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Domain Leads Section */}
      {filteredLeads.length > 0 && (
        <section className="py-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-6 bg-primary/50" />
                <h2 className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-primary">
                  Domain Leadership
                </h2>
                <span className="h-px flex-grow bg-border-custom" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {filteredLeads.map((member, idx) => (
                <ScrollReveal key={member.name} delay={idx * 0.04}>
                  <SpotlightCard className="p-5 bg-card-bg/50 border border-border-custom flex flex-col justify-between rounded-2xl min-h-[300px] hover:border-primary/20 transition-all duration-300 group">
                    <div className="flex flex-col w-full">
                      {/* Portrait Avatar Frame */}
                      <MemberAvatar
                        src={member.avatar}
                        name={member.name}
                        initials={member.av}
                        gradient={member.gradient}
                        objectPosition={(member as any).objectPosition}
                      />

                      <h3 className="font-sans font-bold text-base text-foreground mt-4 mb-0.5 leading-tight">{member.name}</h3>

                      <div className="flex flex-wrap items-center gap-1.5 mt-1 mb-2">
                        <span className="font-mono text-[8px] font-bold text-primary uppercase tracking-wider bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                          {member.domain}
                        </span>
                        <span className="font-mono text-[8px] font-bold text-text-sec uppercase tracking-wider bg-foreground/5 border border-border-custom/50 px-2 py-0.5 rounded-full">
                          {member.role}
                        </span>
                      </div>

                      {/* Quote block */}
                      <div className="relative mt-2 mb-4 px-3 py-2 bg-foreground/[0.015] border-l-2 border-primary/50 rounded-r-lg font-sans text-xs italic text-text-sec leading-relaxed">
                        {member.quote}
                      </div>

                      <div className="font-mono text-[9px] text-text-sec px-2 py-0.5 rounded bg-background border border-border-custom w-fit">
                        {member.reg}
                      </div>
                    </div>

                    {/* Contact Details (Conditional Draw) */}
                    {showContacts && (
                      <div className="w-full mt-4 pt-3 border-t border-border-custom/30 flex flex-col gap-1.5 text-left">
                        <div className="flex items-center justify-between text-[9px] text-text-sec font-mono bg-background/50 rounded p-1.5 border border-border-custom/30">
                          <span className="flex items-center gap-1 truncate">
                            <Mail className="w-2.5 h-2.5 text-primary/70 flex-shrink-0" />
                            <span className="truncate">{member.email}</span>
                          </span>
                          <button
                            onClick={() => handleCopy(member.email, `${member.name}-email`)}
                            className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0 ml-1"
                          >
                            {copiedId === `${member.name}-email` ? (
                              <Check className="w-2.5 h-2.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-2.5 h-2.5" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-[9px] text-text-sec font-mono bg-background/50 rounded p-1.5 border border-border-custom/30">
                          <span className="flex items-center gap-1">
                            <Phone className="w-2.5 h-2.5 text-primary/70 flex-shrink-0" />
                            <span>{member.phone}</span>
                          </span>
                          <button
                            onClick={() => handleCopy(member.phone, `${member.name}-phone`)}
                            className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0"
                          >
                            {copiedId === `${member.name}-phone` ? (
                              <Check className="w-2.5 h-2.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-2.5 h-2.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Website Development Crew Section */}
      {(filteredDevLead.length > 0 || filteredDevMembers.length > 0) && (
        <section className="py-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-6 bg-primary/50" />
                <h2 className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-primary">
                  Website Development Crew
                </h2>
                <span className="h-px flex-grow bg-border-custom" />
              </div>
            </ScrollReveal>

            {/* Development Lead Card (Prominent Center/Left placement) */}
            {filteredDevLead.length > 0 && (
              <div className="max-w-md mx-auto md:mx-0 mb-10">
                <ScrollReveal>
                  <SpotlightCard className="p-6 bg-card-bg/60 border border-primary/30 flex flex-col justify-between rounded-2xl min-h-[350px] shadow-lg shadow-primary/5 hover:border-primary/50 transition-all duration-300 group">
                    <div className="flex flex-col w-full">
                      {/* Portrait Avatar Frame */}
                      <MemberAvatar
                        src={DEV_TEAM_LEAD.avatar}
                        name={DEV_TEAM_LEAD.name}
                        initials={DEV_TEAM_LEAD.av}
                        gradient={DEV_TEAM_LEAD.gradient}
                        objectPosition={(DEV_TEAM_LEAD as any).objectPosition}
                      />

                      <h3 className="font-sans font-bold text-lg text-foreground mt-4 mb-0.5 leading-tight flex items-center gap-2">
                        {DEV_TEAM_LEAD.name}
                        <span className="text-[9px] font-mono font-black uppercase text-[#3b82f6] bg-[#3b82f6]/10 px-2 py-0.5 rounded border border-[#3b82f6]/20">
                          DEV LEAD
                        </span>
                      </h3>
                      <div className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider mb-2">
                        {DEV_TEAM_LEAD.role}
                      </div>

                      {/* Quote block */}
                      <div className="relative mt-2 mb-4 px-3 py-2 bg-[#3b82f6]/5 border-l-2 border-[#3b82f6] rounded-r-lg font-sans text-xs italic text-text-sec leading-relaxed">
                        {DEV_TEAM_LEAD.quote}
                      </div>

                      <div className="font-mono text-[9px] text-text-sec px-2 py-0.5 rounded bg-background border border-border-custom w-fit">
                        {DEV_TEAM_LEAD.reg}
                      </div>
                    </div>

                    {/* Contact Details (Conditional Draw) */}
                    {showContacts && (
                      <div className="w-full mt-4 pt-3 border-t border-border-custom/50 flex flex-col gap-2 text-left">
                        <div className="flex items-center justify-between text-[10px] text-text-sec font-mono group/field bg-background/50 rounded-lg p-2 border border-border-custom/30 hover:border-primary/20 transition-all">
                          <span className="flex items-center gap-1.5 truncate">
                            <Mail className="w-3 h-3 text-primary/70 flex-shrink-0" />
                            <span className="truncate">{DEV_TEAM_LEAD.email}</span>
                          </span>
                          <button
                            onClick={() => handleCopy(DEV_TEAM_LEAD.email, `${DEV_TEAM_LEAD.name}-email`)}
                            className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0 ml-1.5"
                          >
                            {copiedId === `${DEV_TEAM_LEAD.name}-email` ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-text-sec font-mono group/field bg-background/50 rounded-lg p-2 border border-border-custom/30 hover:border-primary/20 transition-all">
                          <span className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-primary/70 flex-shrink-0" />
                            <span>{DEV_TEAM_LEAD.phone}</span>
                          </span>
                          <button
                            onClick={() => handleCopy(DEV_TEAM_LEAD.phone, `${DEV_TEAM_LEAD.name}-phone`)}
                            className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0"
                          >
                            {copiedId === `${DEV_TEAM_LEAD.name}-phone` ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </SpotlightCard>
                </ScrollReveal>
              </div>
            )}

            {/* Developers Grid */}
            {filteredDevMembers.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {filteredDevMembers.map((member, idx) => (
                  <ScrollReveal key={member.name} delay={idx * 0.04}>
                    <SpotlightCard className="p-5 bg-card-bg/40 border border-border-custom flex flex-col justify-between rounded-2xl min-h-[300px] hover:border-primary/20 transition-all duration-300 group">
                      <div className="flex flex-col w-full">
                        {/* Portrait Avatar Frame */}
                        <MemberAvatar
                          src={member.avatar}
                          name={member.name}
                          initials={member.av}
                          gradient={member.gradient}
                          objectPosition={(member as any).objectPosition}
                        />

                        <h3 className="font-sans font-bold text-base text-foreground mt-4 mb-0.5 leading-tight">{member.name}</h3>
                        <div className="font-mono text-[9px] font-bold text-text-sec uppercase tracking-wider mb-2">
                          {member.role}
                        </div>

                        {/* Quote block */}
                        <div className="relative mt-2 mb-4 px-3 py-2 bg-foreground/[0.015] border-l-2 border-primary/50 rounded-r-lg font-sans text-xs italic text-text-sec leading-relaxed">
                          {member.quote}
                        </div>

                        <div className="font-mono text-[9px] text-text-sec px-2 py-0.5 rounded bg-background border border-border-custom w-fit">
                          {member.reg}
                        </div>
                      </div>

                      {/* Contact Details (Conditional Draw) */}
                      {showContacts && (
                        <div className="w-full mt-4 pt-3 border-t border-border-custom/30 flex flex-col gap-1.5 text-left">
                          <div className="flex items-center justify-between text-[9px] text-text-sec font-mono bg-background/50 rounded p-1.5 border border-border-custom/30">
                            <span className="flex items-center gap-1 truncate">
                              <Mail className="w-2.5 h-2.5 text-primary/70 flex-shrink-0" />
                              <span className="truncate">{member.email}</span>
                            </span>
                            <button
                              onClick={() => handleCopy(member.email, `${member.name}-email`)}
                              className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0 ml-1"
                            >
                              {copiedId === `${member.name}-email` ? (
                                <Check className="w-2.5 h-2.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-2.5 h-2.5" />
                              )}
                            </button>
                          </div>
                          <div className="flex items-center justify-between text-[9px] text-text-sec font-mono bg-background/50 rounded p-1.5 border border-border-custom/30">
                            <span className="flex items-center gap-1">
                              <Phone className="w-2.5 h-2.5 text-primary/70 flex-shrink-0" />
                              <span>{member.phone}</span>
                            </span>
                            <button
                              onClick={() => handleCopy(member.phone, `${member.name}-phone`)}
                              className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0"
                            >
                              {copiedId === `${member.name}-phone` ? (
                                <Check className="w-2.5 h-2.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-2.5 h-2.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </SpotlightCard>
                  </ScrollReveal>
                ))}
              </div>
            )}

          </div>
        </section>
      )}
    </div>
  )
}
