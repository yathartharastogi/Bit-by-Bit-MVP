'use client'

const testimonials = [
  { text: "Bit-By-Bit completely changed my trajectory. I walked in knowing basic HTML and left with a full-stack internship at a Series B startup. The community pushes you in ways classes never can.", author: "Aditya Verma", role: "CSE '24", badge: "SDE Intern @ Razorpay", av: "AV" },
  { text: "I landed my first freelance client through a connection I made at a Bit-By-Bit workshop. The network is genuinely invaluable — everyone wants to help each other grow.", author: "Shreya Kapoor", role: "ECE '24", badge: "Freelance Dev · ₹2L+ earned", av: "SK" },
  { text: "Our BitHack 2024 winning project became an actual product used by 300+ students. That would never have happened without the mentorship and culture here.", author: "Karan Mehta", role: "CSE (AI/ML) '25", badge: "BitHack 2024 Winner", av: "KM" },
  { text: "As someone from a non-CS branch, I was nervous about joining. But the club genuinely welcomed me. Now I'm leading the design team and speaking at workshops.", author: "Priya Nair", role: "ECE '25", badge: "Design Domain Lead", av: "PN" },
  { text: "The Full-Stack Bootcamp was the most practical learning I've done in 3 years of college. Shipped a real product in 2 days. Nothing in the curriculum comes close.", author: "Rohan Das", role: "CSE '24", badge: "SWE @ Microsoft (intern)", av: "RD" },
  { text: "Before Bit-By-Bit I had no direction. After 6 months of workshops and building side projects with club members, I had a portfolio that got me 5 interview calls.", author: "Ananya Singh", role: "IT '24", badge: "FAANG Interview Track", av: "AS" },
  { text: "The Design Jam was the most fun I've had at college. You're solving real design challenges with people you just met, and the energy is electric. I keep coming back.", author: "Vibha Reddy", role: "CSE '25", badge: "UI/UX Intern @ Zomato", av: "VR" },
  { text: "I was skeptical about a 'club' making a real difference. Two hackathon wins and one startup co-founder later — I was very, very wrong. This community is the real deal.", author: "Sameer Khan", role: "CSE (IoT) '24", badge: "Co-founder @ BuildX", av: "SA" }
]

export default function Testimonials() {
  // Duplicate array to enable seamless infinite scroll loop
  const list = [...testimonials, ...testimonials]

  return (
    <div className="w-full overflow-hidden py-4 relative [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
      <div className="flex gap-6 w-max animate-marquee">
        {list.map((t, idx) => (
          <div
            key={idx}
            className="w-[300px] md:w-[350px] shrink-0 bg-card-bg border border-border-custom p-6 rounded-2xl flex flex-col justify-between whitespace-normal select-none"
          >
            <div>
              <span className="text-3xl text-primary/30 font-serif leading-none">“</span>
              <p className="text-text-sec text-xs leading-relaxed mb-6 font-medium italic -mt-1">
                {t.text}
              </p>
            </div>
            
            <div className="flex items-center gap-3 border-t border-border-custom/50 pt-4 mt-auto">
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                {t.av}
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs text-foreground">{t.author}</h4>
                <div className="flex flex-wrap gap-1.5 items-center mt-0.5">
                  <span className="text-text-sec text-[10px] font-mono">{t.role}</span>
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded border border-primary/20 text-primary bg-primary/5">
                    {t.badge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
