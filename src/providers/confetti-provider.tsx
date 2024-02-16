"use client"

import { useConfettiStore } from "@/hooks/use-confetti-store"
import ReactConfetti from "react-confetti"

export function ConfettiProvider() {
  const confetti = useConfettiStore()

  if (!confetti.isOpen) return null

  return (
    <ReactConfetti
      numberOfPieces={500}
      style={{
        zIndex: 100,
        pointerEvents: "none",
      }}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose()
      }}
    />
  )
}
