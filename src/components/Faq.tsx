'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  { q: "Who can participate in BitHack?", a: "Any student enrolled at VIT Bhopal can participate, from any branch or year. You do not need to be a club member." },
  { q: "What's the team size?", a: "Teams of 2–4 members. Solo participation is not permitted. You can form teams with peers on our community Discord server." },
  { q: "Is food provided during the hackathon?", a: "Yes! All meals, snacks, and refreshments during the 36-hour event are provided free of cost for all registered participants." },
  { q: "How are projects judged?", a: "Projects are evaluated on innovation, technical complexity, UI/UX design, potential impact, and presentation quality by a panel of external industry experts." },
  { q: "Can I use existing code?", a: "All code must be written during the hackathon. Using public APIs, libraries, and frameworks is permitted, but submitting pre-built personal projects is strictly prohibited." }
]

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx
        return (
          <div key={idx} className="bento-card bg-background overflow-hidden border border-border-custom transition-colors duration-300">
            <button
              onClick={() => toggle(idx)}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-sans font-bold text-sm text-foreground hover:text-primary transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown
                size={16}
                className={`text-text-sec transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}
              />
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-t border-border-custom/50"
                >
                  <div className="p-6 text-xs text-text-sec leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
