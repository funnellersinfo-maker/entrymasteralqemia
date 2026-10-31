"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"
import { TOTAL_STAGES } from "@/lib/stages"
import { cn } from "@/lib/utils"

export function BottomNav({
  current,
  total = TOTAL_STAGES,
  onBack,
  onNext,
  nextLabel = "Continuar",
  backLabel = "Volver",
  isLast,
  completedCount,
  onRestart,
}: {
  current: number
  total?: number
  onBack: () => void
  onNext: () => void
  nextLabel?: string
  backLabel?: string
  isLast: boolean
  completedCount: number
  onRestart?: () => void
}) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.07] bg-[#0a0614]/90 backdrop-blur-xl"
      aria-label="Navegación entre etapas"
    >
      {/* Puntos de etapa */}
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-1 px-4 pt-2.5 sm:gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={undefined}
            tabIndex={-1}
            aria-hidden
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i < completedCount
                ? "w-3 bg-purple-500/70 sm:w-4"
                : i === current
                  ? "w-6 bg-gradient-to-r from-purple-500 to-fuchsia-500 sm:w-8"
                  : "w-1.5 bg-white/15 sm:w-2"
            )}
          />
        ))}
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-1.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-3">
        <button
          onClick={onBack}
          disabled={current === 0}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all",
            current === 0
              ? "cursor-not-allowed border-white/5 text-zinc-700"
              : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-purple-500/40 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400"
          )}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {backLabel}
        </button>

        {isLast ? (
          onRestart ? (
            <button
              onClick={onRestart}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-300 transition-all hover:border-purple-500/40 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Reiniciar experiencia
            </button>
          ) : null
        ) : (
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_28px_-8px_rgba(168,85,247,0.7)] transition-shadow hover:shadow-[0_0_38px_-6px_rgba(217,70,239,0.8)] focus-visible:outline-2 focus-visible:outline-purple-400"
          >
            {nextLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </motion.button>
        )}
      </div>
    </nav>
  )
}
