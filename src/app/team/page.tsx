'use client'

import { useState, useMemo } from 'react'
import SpotlightCard from '@/components/SpotlightCard'
import ScrollReveal from '@/components/ScrollReveal'
import TextReveal from '@/components/TextReveal'
import { Mail, Phone, Search, Copy, Check, Eye, EyeOff } from 'lucide-react'

// Heads data from official CSV
const HEADS = [
  { name: 'Atherva Sahai', role: 'President', reg: '24BCE10072', email: 'atherverva.24bce10072@vitbhopal.ac.in', phone: '8817136170', av: 'AS', color: 'border-blue-500/30 text-blue-500 bg-blue-500/10' },
  { name: 'Chavi Agrawal', role: 'Vice President', reg: '24BCY10035', email: 'chhavi.24bcy10035@vitbhopal.ac.in', phone: '9471009641', av: 'CA', color: 'border-purple-500/30 text-purple-500 bg-purple-500/10' },
  { name: 'Jiya Arora', role: 'General Secretary', reg: '24BAI10034', email: 'jiya.24bai10034@vitbhopal.ac.in', phone: '9910448908', av: 'JA', color: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' }
]

// Domain Teams data from official CSV
const DOMAIN_TEAMS = [
  {
    name: 'Event Management Team',
    color: 'emerald',
    themeClass: {
      border: 'border-emerald-500/20 group-hover:border-emerald-500/40 focus-within:border-emerald-500/50',
      text: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    leads: [
      { name: 'Yashodhara Singh', role: 'Lead', reg: '24BCE10696', email: 'yashodhara.24bce10696@vitbhopal.ac.in', phone: '6265440730', av: 'YS' },
      { name: 'Abhimanyu Singh', role: 'Co-Lead', reg: '24BCE10726', email: 'abhimanyu.24bce10726@vitbhopal.ac.in', phone: '9460389012', av: 'AS' }
    ],
    members: [
      { name: 'Sonu Kumar', reg: '24BSA10142', email: 'sonu.24bsa10142@vitbhopal.ac.in', phone: '8109246603', av: 'SK' },
      { name: 'Anupriya', reg: '24BCE10726', email: 'anupriya.24bce11110@vitbhopal.ac.in', phone: '8298534101', av: 'AN' },
      { name: 'Ambuj Singh', reg: '24BAI10729', email: 'ambuj.24bai10729@vitbhopal.ac.in', phone: '8090116306', av: 'AS' },
      { name: 'Sandhya Kumari', reg: '24BCY10154', email: 'sandhya.24bcy10154@vitbhopal.ac.in', phone: '6207476796', av: 'SK' },
      { name: 'Ritambhar Advait', reg: '25BCY10086', email: 'ritambhar.25bcy10086@vitbhopal.ac.in', phone: '7800889005', av: 'RA' },
      { name: 'Ayonija Tripathi', reg: '25BCE10679', email: 'ayonija.25bce10679@vitbhopal.ac.in', phone: '9528211781', av: 'AT' },
      { name: 'Aditya Raj', reg: '25BAI10708', email: 'aditya.25bai10708@vitbhopal.ac.in', phone: '7482891365', av: 'AR' },
      { name: 'Yashila Verma', reg: '25BAI11574', email: 'yashila.25bai11574@vitbhopal.ac.in', phone: '8208746701', av: 'YV' },
      { name: 'Pratyaksha Singh', reg: '25BCE10604', email: 'pratyaksha.25bce10604@vitbhopal.ac.in', phone: '9793535557', av: 'PS' },
      { name: 'Aayush Shukla', reg: '25BCE10125', email: 'aayush.25bce10125@vitbhopal.ac.in', phone: '9838302038', av: 'AS' },
      { name: 'Nupur Hedau', reg: '25MIP10123', email: 'nupur.25mip10123@vitbhopal.ac.in', phone: '9073194252', av: 'NH' },
      { name: 'Jeet Biswas', reg: '25MIM10181', email: 'jeet.25mim10181@vitbhopal.ac.in', phone: '8777316349', av: 'JB' }
    ]
  },
  {
    name: 'Technical Team',
    color: 'blue',
    themeClass: {
      border: 'border-blue-500/20 group-hover:border-blue-500/40 focus-within:border-blue-500/50',
      text: 'text-blue-500',
      bg: 'bg-blue-500/10',
      badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    },
    leads: [
      { name: 'Vedant Mishra', role: 'Lead', reg: '24BCE10779', email: 'vedant.24bce10779@vitbhopal.ac.in', phone: '7565842406', av: 'VM' },
      { name: 'Dipanshu Joshi', role: 'Co-Lead', reg: '24BAI10707', email: 'dipanshu.24bai10707@vitbhopal.ac.in', phone: '8502076849', av: 'DJ' }
    ],
    members: [
      { name: 'Raghav Gupta', reg: '24BCE10427', email: 'raghav.24bce10427@vitbhopal.ac.in', phone: '8630299661', av: 'RG' },
      { name: 'Divyanshu Karma', reg: '24BET10016', email: 'divyanshu.24bet10016@vitbhopal.ac.in', phone: '7974440319', av: 'DK' },
      { name: 'Adarsh Kumar Raiwal', reg: '25BCY10183', email: 'adarsh.25bcy10183@vitbhopal.ac.in', phone: '8825302299', av: 'AR' },
      { name: 'Kripa Mehndiratta', reg: '25BAI10906', email: 'kripa.25bai10906@vitbhopal.ac.in', phone: '8737086169', av: 'KM' },
      { name: 'Prerna Sharma', reg: '25BAI11432', email: 'prerna.25bai11432@vitbhopal.ac.in', phone: '7827577066', av: 'PS' },
      { name: 'Yathartha Rastogi', reg: '24BCE10410', email: 'yathartha.24bce10410@vitbhopal.ac.in', phone: '7984509001', av: 'YR' },
      { name: 'Yashwant Ravindra Sonawane', reg: '25BAI10061', email: 'yashwant.25bai10061@vitbhopal.ac.in', phone: '7744942169', av: 'YS' },
      { name: 'Aman Garg', reg: '24BAI10826', email: 'aman.24bai10826@vitbhopal.ac.in', phone: '7302359973', av: 'AG' },
      { name: 'Vansh Singh', reg: '25BCE10723', email: 'vansh.25bce10723@vitbhopal.ac.in', phone: '9997503925', av: 'VS' },
      { name: 'Paarth Juneja', reg: '24BAI10160', email: 'paarth.24bai10160@vitbhopal.ac.in', phone: '9899050969', av: 'PJ' },
      { name: 'Joydeep Dutta', reg: '25BCY10002', email: 'joydeep.25bcy10002@vitbhopal.ac.in', phone: '7905083253', av: 'JD' }
    ]
  },
  {
    name: 'Content Team',
    color: 'pink',
    themeClass: {
      border: 'border-pink-500/20 group-hover:border-pink-500/40 focus-within:border-pink-500/50',
      text: 'text-pink-500',
      bg: 'bg-pink-500/10',
      badge: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20'
    },
    leads: [
      { name: 'Tanisha Sharma', role: 'Lead', reg: '24BAI10165', email: 'tanisha.24bai10165@vitbhopal.ac.in', phone: '8094444766', av: 'TS' },
      { name: 'Divyansh Singh', role: 'Co-Lead', reg: '24BCE11135', email: 'divyansh.24bce11135@vitbhopal.ac.in', phone: '9695391306', av: 'DS' }
    ],
    members: [
      { name: 'Bhuvi Jain', reg: '24BCE10650', email: 'bhuvi.24bce10650@vitbhopal.ac.in', phone: '8305970767', av: 'BJ' },
      { name: 'Naina Yadav', reg: '24BCE10400', email: 'naina.24bce10400@vitbhopal.ac.in', phone: '8859190888', av: 'NY' },
      { name: 'Purna Jain', reg: '24BCE10221', email: 'purna.24bce10221@vitbhopal.ac.in', phone: '7426933240', av: 'PJ' },
      { name: 'Aadi Jain', reg: '25BCE10331', email: 'aadi.25bce10331@vitbhopal.ac.in', phone: '9039220771', av: 'AJ' }
    ]
  },
  {
    name: 'PR and Outreach Team',
    color: 'orange',
    themeClass: {
      border: 'border-orange-500/20 group-hover:border-orange-500/40 focus-within:border-orange-500/50',
      text: 'text-orange-500',
      bg: 'bg-orange-500/10',
      badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
    },
    leads: [
      { name: 'Shreya Mittal', role: 'Lead', reg: '24BSA10056', email: 'shreya.24bsa10056@vitbhopal.ac.in', phone: '9893161565', av: 'SM' }
    ],
    members: [
      { name: 'Prakhar Srivastava', reg: '24MSI10008', email: 'prakhar.24msi10008@vitbhopal.ac.in', phone: '7011171787', av: 'PS' },
      { name: 'Priyanshi Dengre', reg: '25BBA10060', email: 'priyanshi.25bba10060@vitbhopal.ac.in', phone: '6265736887', av: 'PD' },
      { name: 'Sara', reg: '24bsa10335', email: 'sara.24bsa10335@vitbhopal.ac.in', phone: '8708064963', av: 'SA' },
      { name: 'Kaustubh Maniar', reg: '24bce11322', email: 'kaustubh.24bce11322@vitbhopal.ac.in', phone: '8708064963', av: 'KM' },
      { name: 'Vardaan Yadav', reg: '25bai11227', email: 'vardaan.25bai11227@vitbhopal.ac.in', phone: '8400883952', av: 'VY' },
      { name: 'Pratyush Kumar', reg: '24bce10473', email: 'pratyush.24bce10473@vitbhopal.ac.in', phone: '9142358413', av: 'PK' }
    ]
  },
  {
    name: 'Design Team',
    color: 'purple',
    themeClass: {
      border: 'border-purple-500/20 group-hover:border-purple-500/40 focus-within:border-purple-500/50',
      text: 'text-purple-500',
      bg: 'bg-purple-500/10',
      badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
    },
    leads: [
      { name: 'Akshit Bakshi', role: 'Lead', reg: '24BCY10356', email: 'akshit.24bcy10356@vitbhopal.ac.in', phone: '9818394521', av: 'AB' },
      { name: 'Gayatri Palodkar', role: 'Co-Lead', reg: '25MIM10096', email: 'gayatri.25mim10096@vitbhopal.ac.in', phone: '9699188461', av: 'GP' }
    ],
    members: [
      { name: 'Krrish Ambwani', reg: '24BAI10644', email: 'krrish.24bai10644@vitbhopal.ac.in', phone: '8010172401', av: 'KA' },
      { name: 'Srija Panda', reg: '24BAS10126', email: 'srija.24bas10126@vitbhopal.ac.in', phone: '7439107101', av: 'SP' },
      { name: 'P Jahnavi', reg: '24MIP10157', email: 'jahnavi.24mip10157@vitbhopal.ac.in', phone: '9573803997', av: 'PJ' },
      { name: 'Dhairya Garg', reg: '25BAI10224', email: 'dhairya.25bai10224@vitbhopal.ac.in', phone: '9818482302', av: 'DG' },
      { name: 'Moksh Patel', reg: '25MIM10028', email: 'moksh.25mim10028@vitbhopal.ac.in', phone: '9027686419', av: 'MP' }
    ]
  },
  {
    name: 'Finance Team',
    color: 'yellow',
    themeClass: {
      border: 'border-yellow-500/20 group-hover:border-yellow-500/40 focus-within:border-yellow-500/50',
      text: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      badge: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
    },
    leads: [
      { name: 'Dhyan Patel', role: 'Lead', reg: '24BSA10274', email: 'dhyan.24bsa10274@vitbhopal.ac.in', phone: '9426151944', av: 'DP' },
      { name: 'Sarika Parmar', role: 'Co-Lead', reg: '23MIM10210', email: 'sarika.23mim10210@vitbhopal.ac.in', phone: '6268646624', av: 'SP' }
    ],
    members: [
      { name: 'Manim Rohit Rao', reg: '24BCE10737', email: 'manim.24bce10737@vitbhopal.ac.in', phone: '9330646450', av: 'MR' },
      { name: 'Soumyadeep Mondal', reg: '24BSA10018', email: 'soumyadeep.24bsa10018@vitbhopal.ac.in', phone: '9475413827', av: 'SM' },
      { name: 'Havya Thakar', reg: '24BCE10148', email: 'havya.24bce10148@vitbhopal.ac.in', phone: '9638881030', av: 'HT' },
      { name: 'Bhavya Vyas', reg: '25BCE10400', email: 'bhavya.25bce10400@vitbhopal.ac.in', phone: '9925033667', av: 'BV' },
      { name: 'Rishita', reg: '25BSA10096', email: 'rishita.25bsa10096@vitbhopal.ac.in', phone: '9311250709', av: 'RI' }
    ]
  },
  {
    name: 'Social Media Team',
    color: 'cyan',
    themeClass: {
      border: 'border-cyan-500/20 group-hover:border-cyan-500/40 focus-within:border-cyan-500/50',
      text: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
      badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20'
    },
    leads: [],
    members: [
      { name: 'Tejas Singh', reg: '24BCE11418', email: 'tejas.24bce11418@vitbhopal.ac.in', phone: '6386232192', av: 'TS' },
      { name: 'Karthik Gupta', reg: '25BAI11416', email: 'gupta.25bai11416@vitbhopal.ac.in', phone: '9879942627', av: 'KG' },
      { name: 'Palak Jain', reg: '23MIM10175', email: 'palakjain.23mim10175@vitbhopal.ac.in', phone: '7879239020', av: 'PJ' },
      { name: 'Rishi Raj', reg: '24BAI10593', email: 'rishi.24bai10593@vitbhopal.ac.in', phone: '9728106776', av: 'RR' },
      { name: 'Lokesh Kiraula', reg: '24BAI10521', email: 'lokesh.24bai10521@vitbhopal.ac.in', phone: '9056535491', av: 'LK' }
    ]
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
  const filteredHeads = useMemo(() => {
    if (!searchQuery) return HEADS
    const query = searchQuery.toLowerCase()
    return HEADS.filter(h => 
      h.name.toLowerCase().includes(query) || 
      h.role.toLowerCase().includes(query) || 
      h.reg.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const filteredTeams = useMemo(() => {
    return DOMAIN_TEAMS.map(team => {
      const query = searchQuery.toLowerCase()
      const filteredLeads = team.leads.filter(lead => 
        lead.name.toLowerCase().includes(query) || 
        lead.role.toLowerCase().includes(query) || 
        lead.reg.toLowerCase().includes(query)
      )
      const filteredMembers = team.members.filter(member => 
        member.name.toLowerCase().includes(query) || 
        member.reg.toLowerCase().includes(query)
      )

      return {
        ...team,
        leads: filteredLeads,
        members: filteredMembers,
        totalMatches: filteredLeads.length + filteredMembers.length
      }
    }).filter(team => searchQuery === '' || team.totalMatches > 0)
  }, [searchQuery])

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Page Hero */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
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
                A highly skilled group of developers, designers, writers, and organizers pushing technical limits.
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
      {filteredHeads.length > 0 && (
        <section className="py-10 border-t border-border-custom bg-card-bg/20 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-6 bg-primary/50" />
                <h2 className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-primary">
                  Executive Committee
                </h2>
                <span className="h-px flex-grow bg-border-custom" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {filteredHeads.map((head, idx) => (
                <ScrollReveal key={head.name} delay={idx * 0.05}>
                  <SpotlightCard className="p-6 bg-card-bg/50 border border-border-custom flex flex-col items-center text-center justify-between rounded-2xl min-h-[200px] hover:border-primary/30 transition-colors duration-300">
                    <div className="flex flex-col items-center w-full">
                      {/* Initials Avatar */}
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg mb-4 border transition-all duration-300 ${head.color}`}>
                        {head.av}
                      </div>
                      <h3 className="font-sans font-bold text-base text-foreground mb-1">{head.name}</h3>
                      <div className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider mb-2">
                        {head.role}
                      </div>
                      <div className="font-mono text-[9px] text-text-sec px-2 py-0.5 rounded bg-background border border-border-custom">
                        {head.reg}
                      </div>
                    </div>

                    {/* Contact Details (Conditional Draw) */}
                    {showContacts && (
                      <div className="w-full mt-5 pt-4 border-t border-border-custom/50 flex flex-col gap-2 text-left">
                        {/* Email */}
                        <div className="flex items-center justify-between text-[10px] text-text-sec font-mono group/field bg-background/50 rounded-lg p-2 border border-border-custom/30 hover:border-primary/20 transition-all">
                          <span className="flex items-center gap-1.5 truncate">
                            <Mail className="w-3 h-3 text-primary/70 flex-shrink-0" />
                            <span className="truncate">{head.email}</span>
                          </span>
                          <button
                            onClick={() => handleCopy(head.email, `${head.name}-email`)}
                            className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0 ml-1.5"
                          >
                            {copiedId === `${head.name}-email` ? (
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
                            <span>{head.phone}</span>
                          </span>
                          <button
                            onClick={() => handleCopy(head.phone, `${head.name}-phone`)}
                            className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0"
                          >
                            {copiedId === `${head.name}-phone` ? (
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

      {/* Domain Teams Section */}
      <section className="py-8 border-t border-border-custom">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          {filteredTeams.map((team, teamIdx) => {
            const hasLeads = team.leads.length > 0
            
            return (
              <div key={team.name} className="space-y-6">
                {/* Team Header */}
                <ScrollReveal>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-text-sec font-bold">
                      0{teamIdx + 1} /
                    </span>
                    <h2 className="font-sans font-bold text-lg md:text-xl text-foreground tracking-tight">
                      {team.name}
                    </h2>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-full border border-border-custom text-text-sec bg-card-bg">
                      {team.leads.length + team.members.length}
                    </span>
                    <span className="h-px flex-grow bg-border-custom" />
                  </div>
                </ScrollReveal>

                {/* Team Content Grid */}
                <div className="space-y-4">
                  {/* Leads Sub-grid */}
                  {hasLeads && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {team.leads.map((lead, idx) => (
                        <ScrollReveal key={lead.name} delay={idx * 0.04}>
                          <SpotlightCard className={`p-5 bg-card-bg flex flex-col justify-between rounded-xl min-h-[160px] border border-border-custom hover:border-primary/20 transition-all duration-300 relative group`}>
                            <div>
                              <div className="flex items-start justify-between w-full mb-3">
                                {/* Initials avatar with team accent styling */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border transition-all duration-300 ${team.themeClass.border} ${team.themeClass.text} ${team.themeClass.bg}`}>
                                  {lead.av}
                                </div>
                                <span className={`text-[8px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full border ${team.themeClass.badge}`}>
                                  {lead.role}
                                </span>
                              </div>
                              <h4 className="font-sans font-bold text-sm text-foreground mb-1 leading-tight">{lead.name}</h4>
                              <div className="font-mono text-[9px] text-text-sec mb-2">
                                {lead.reg}
                              </div>
                            </div>

                            {/* Contact Details (Conditional Draw) */}
                            {showContacts && (
                              <div className="w-full pt-3 mt-2 border-t border-border-custom/30 flex flex-col gap-1.5 text-left">
                                <div className="flex items-center justify-between text-[9px] text-text-sec font-mono bg-background/50 rounded p-1.5 border border-border-custom/30">
                                  <span className="flex items-center gap-1 truncate">
                                    <Mail className="w-2.5 h-2.5 text-primary/70 flex-shrink-0" />
                                    <span className="truncate">{lead.email}</span>
                                  </span>
                                  <button
                                    onClick={() => handleCopy(lead.email, `${lead.name}-email`)}
                                    className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0 ml-1"
                                  >
                                    {copiedId === `${lead.name}-email` ? (
                                      <Check className="w-2.5 h-2.5 text-emerald-500" />
                                    ) : (
                                      <Copy className="w-2.5 h-2.5" />
                                    )}
                                  </button>
                                </div>
                                <div className="flex items-center justify-between text-[9px] text-text-sec font-mono bg-background/50 rounded p-1.5 border border-border-custom/30">
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-2.5 h-2.5 text-primary/70 flex-shrink-0" />
                                    <span>{lead.phone}</span>
                                  </span>
                                  <button
                                    onClick={() => handleCopy(lead.phone, `${lead.name}-phone`)}
                                    className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0"
                                  >
                                    {copiedId === `${lead.name}-phone` ? (
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

                  {/* Members Sub-grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {team.members.map((member, idx) => (
                      <ScrollReveal key={member.name} delay={idx * 0.02} className="h-full">
                        <SpotlightCard className="p-4 bg-background flex flex-col justify-between border border-border-custom hover:-translate-y-0.5 rounded-xl hover:border-primary/20 transition-all duration-300 relative group overflow-hidden h-full min-h-[140px]">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              {/* Simple initials avatar */}
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border text-text-sec/80 border-border-custom/50 bg-card-bg/50`}>
                                {member.av}
                              </div>
                              <span className="text-[8px] font-mono text-text-sec/60 bg-card-bg border border-border-custom/50 px-1.5 py-0.5 rounded">
                                Member
                              </span>
                            </div>
                            <h5 className="font-sans font-bold text-xs text-foreground mb-0.5 leading-snug group-hover:text-primary transition-colors duration-200">
                              {member.name}
                            </h5>
                            <div className="font-mono text-[9px] text-text-sec/70">
                              {member.reg}
                            </div>
                          </div>

                          {/* Contact Details (Conditional Draw) */}
                          {showContacts && (
                            <div className="w-full pt-3 mt-2 border-t border-border-custom/30 flex flex-col gap-1 text-left">
                              <div className="flex items-center justify-between text-[8px] text-text-sec font-mono bg-background/50 rounded p-1 border border-border-custom/30">
                                <span className="flex items-center gap-1 truncate">
                                  <Mail className="w-2 h-2 text-primary/70 flex-shrink-0" />
                                  <span className="truncate">{member.email}</span>
                                </span>
                                <button
                                  onClick={() => handleCopy(member.email, `${member.name}-email`)}
                                  className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0 ml-1"
                                >
                                  {copiedId === `${member.name}-email` ? (
                                    <Check className="w-2 h-2 text-emerald-500" />
                                  ) : (
                                    <Copy className="w-2 h-2" />
                                  )}
                                </button>
                              </div>
                              <div className="flex items-center justify-between text-[8px] text-text-sec font-mono bg-background/50 rounded p-1 border border-border-custom/30">
                                <span className="flex items-center gap-1">
                                  <Phone className="w-2 h-2 text-primary/70 flex-shrink-0" />
                                  <span>{member.phone}</span>
                                </span>
                                <button
                                  onClick={() => handleCopy(member.phone, `${member.name}-phone`)}
                                  className="text-text-sec/60 hover:text-foreground cursor-pointer flex-shrink-0"
                                >
                                  {copiedId === `${member.name}-phone` ? (
                                    <Check className="w-2 h-2 text-emerald-500" />
                                  ) : (
                                    <Copy className="w-2 h-2" />
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
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
