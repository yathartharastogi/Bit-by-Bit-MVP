import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 bg-card-bg border-t border-border-custom py-16 px-6 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="md:col-span-2">
          <Link href="/" className="font-sans font-bold text-lg tracking-tight select-none flex items-center gap-1.5 mb-4">
            <span className="text-foreground">Bit</span>
            <span className="text-primary">-By-</span>
            <span className="text-foreground">Bit</span>
            <span className="font-mono text-xs font-normal text-text-sec px-1.5 py-0.5 rounded border border-border-custom bg-background">CLUB</span>
          </Link>
          <p className="text-text-sec text-sm max-w-sm leading-relaxed">
            VIT Bhopal's premier tech community — a launchpad for developers, designers, and innovators who want to build real things, win hackathons, and grow together.
          </p>
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary mt-6 font-semibold">
            Community first. Always.
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-foreground mb-4">Navigate</h5>
          <div className="flex flex-col gap-2.5">
            <Link href="/" className="text-text-sec hover:text-primary text-sm transition-colors">Home</Link>
            <Link href="/about" className="text-text-sec hover:text-primary text-sm transition-colors">About Us</Link>
            <Link href="/team" className="text-text-sec hover:text-primary text-sm transition-colors">Our Team</Link>
            <Link href="/gallery" className="text-text-sec hover:text-primary text-sm transition-colors">Gallery</Link>
          </div>
        </div>

        {/* Community Column */}
        <div>
          <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-foreground mb-4">Programs</h5>
          <div className="flex flex-col gap-2.5">
            <Link href="/events" className="text-text-sec hover:text-primary text-sm transition-colors">Events</Link>
            <Link href="/hackathons" className="text-text-sec hover:text-primary text-sm transition-colors">Hackathons</Link>
            <Link href="/contact" className="text-text-sec hover:text-primary text-sm transition-colors">Join Community</Link>
            <Link href="/contact" className="text-text-sec hover:text-primary text-sm transition-colors">Inquiries</Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between border-t border-border-custom/50 mt-12 pt-8 text-xs text-text-sec">
        <div>
          &copy; {currentYear} Bit-By-Bit Club, VIT Bhopal. All rights reserved.
        </div>
        <div className="flex gap-4 mt-4 sm:mt-0 font-mono text-[10px] tracking-tight">
          <span>Designed with absolute simplicity</span>
          <span className="text-primary font-bold">Bit-By-Bit</span>
        </div>
      </div>
    </footer>
  )
}
