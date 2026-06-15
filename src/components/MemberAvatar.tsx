'use client'

import { useState } from 'react'
import Image from 'next/image'

interface MemberAvatarProps {
  src: string
  name: string
  initials: string
  gradient: string
}

export default function MemberAvatar({ src, name, initials, gradient }: MemberAvatarProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-foreground/[0.03] border border-border-custom/50 shadow-inner group">
      {!imgError ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-4 relative`}>
          {/* Cybernetic grid lines inside fallback */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1.5px,transparent_1.5px)] bg-[size:16px_16px] opacity-20" />
          
          {/* Glowing initials */}
          <span className="text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.45)] select-none">
            {initials}
          </span>
        </div>
      )}
      
      {/* Premium dark vignette fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}
