"use client"

import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  x: number
  color: string
  delay: number
  duration: number
  size: number
}

interface ConfettiCelebrationProps {
  isActive: boolean
  onComplete: () => void
}

export function ConfettiCelebration({ isActive, onComplete }: ConfettiCelebrationProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (isActive) {
      // Generate confetti pieces
      const colors = ["#10b981", "#34d399", "#6ee7b7", "#fbbf24", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899"]
      const newPieces: ConfettiPiece[] = []
      
      for (let i = 0; i < 150; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
          duration: 2 + Math.random() * 2,
          size: 8 + Math.random() * 8,
        })
      }
      
      setPieces(newPieces)
      setShowMessage(true)

      // Clear confetti and message after animation
      const timer = setTimeout(() => {
        setPieces([])
        setShowMessage(false)
        onComplete()
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [isActive, onComplete])

  if (!isActive && pieces.length === 0) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Confetti pieces */}
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0"
          style={{
            left: `${piece.x}%`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `confettiFall ${piece.duration}s ease-out forwards`,
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}

      {/* Success message */}
      {showMessage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="bg-gray-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl px-8 py-6 shadow-2xl"
            style={{
              animation: "messagePopIn 0.5s ease-out forwards, messagePopOut 0.5s ease-in forwards 3s",
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ animation: "checkmarkDraw 0.5s ease-out forwards 0.3s", strokeDasharray: 24, strokeDashoffset: 24 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Login Successful!</h2>
              <p className="text-emerald-400 text-sm">Welcome to Quicklink Namibia</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes messagePopIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes messagePopOut {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0;
          }
        }
        @keyframes checkmarkDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  )
}
