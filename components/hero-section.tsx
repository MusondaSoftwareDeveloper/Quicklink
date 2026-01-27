"use client"

import { useEffect, useState } from "react"

// Icon components for each category
const icons = [
  {
    name: "Accommodation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    name: "Transport",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    name: "Food",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12" />
      </svg>
    ),
  },
  {
    name: "Activities",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
  },
  {
    name: "Health",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    name: "Essentials",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    name: "Shopping",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
  },
  {
    name: "Services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const radius = 210 // Distance from center (50% further from logo)
  const iconCount = icons.length

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="relative flex items-center justify-center">
        {/* Rotating container for icons */}
        <div
          className="absolute"
          style={{
            width: radius * 2 + 60,
            height: radius * 2 + 60,
            animation: mounted ? "rotateClockwise 30s linear infinite" : "none",
          }}
        >
          {icons.map((item, index) => {
            // Calculate position on circle (equal spacing)
            const angle = (index / iconCount) * 2 * Math.PI - Math.PI / 2 // Start from top
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <div
                key={index}
                className="absolute flex flex-col items-center gap-1 group cursor-pointer"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  animation: mounted ? "counterRotate 30s linear infinite" : "none",
                  opacity: mounted ? 1 : 0,
                  transition: "opacity 0.5s ease-out",
                }}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 p-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 group-hover:text-white group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  {item.icon}
                </div>
                <span className="text-[8px] sm:text-[10px] text-white/60 group-hover:text-white/90 transition-colors font-medium whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            )
          })}
        </div>

        {/* Logo in center */}
        <div className="relative z-10 animate-fade-in-hero">
          <img
            src="/images/design-mode/photo_2025-10-04_15-28-47.jpg"
            alt="Quicklink Namibia Logo"
            className="h-32 w-auto object-contain"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes rotateClockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes counterRotate {
          from {
            transform: translate(-50%, -50%) translate(var(--x), var(--y)) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) translate(var(--x), var(--y)) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  )
}
