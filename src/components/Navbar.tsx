'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const defaultTheme = prefersDark ? 'dark' : 'light'
      setTheme(defaultTheme)
      document.documentElement.classList.toggle('dark', defaultTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Events', href: '/events' },
    { name: 'Hackathons', href: '/hackathons' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border-custom transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo with Image and Typography */}
        <Link href="/" className="font-sans font-bold text-lg tracking-tight select-none flex items-center gap-2 group">
          <div className="relative w-8 h-8 group-hover:rotate-6 transition-transform duration-200">
            <Image
              src="/logo.png"
              alt="Bit-By-Bit Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-foreground">Bit</span>
          <span className="text-primary font-bold">-By-</span>
          <span className="text-foreground">Bit</span>
        </Link>

        {/* Desktop Links with Animated Hover Pill */}
        <div className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-3 py-1.5 text-xs font-sans font-bold tracking-tight rounded-lg transition-colors duration-200"
              >
                {active && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={active ? 'text-primary' : 'text-text-sec hover:text-foreground'}>
                  {link.name}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-border-custom bg-card-bg text-text-sec hover:text-foreground transition-colors duration-200 hover:scale-105"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* CTA Button */}
          <Link
            href="/contact#join"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-mono tracking-tight uppercase font-semibold text-white bg-primary hover:bg-primary-hover rounded-full transition-all duration-200 hover:-translate-y-0.5"
          >
            Join Us ↗
          </Link>

          {/* Hamburger Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border-custom bg-card-bg text-text-sec hover:text-foreground transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-lg border-b border-border-custom overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25, ease: 'easeOut' }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 text-base font-bold border-b border-border-custom/40 transition-colors ${
                      isActive(link.href) ? 'text-primary' : 'text-text-sec hover:text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.04, duration: 0.3 }}
              >
                <Link
                  href="/contact#join"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 w-full py-3 flex items-center justify-center text-sm font-mono tracking-tight uppercase font-bold text-white bg-primary rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-transform duration-200"
                >
                  Join Us ↗
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
