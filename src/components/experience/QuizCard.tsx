"use client"

import { motion } from "framer-motion"
import { CheckCircle2, XCircle } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import type { QuizDef } from "@/lib/stages"

export function QuizCard({
  quiz,
  answeredCorrectly,
  onCorrect,
}: {
  quiz: QuizDef
  answeredCorrectly: boolean
  onCorrect: () => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  const isCorrect = selected === quiz.correctIndex

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass-card relative overflow-hidden p-4 sm:p-6"
      role="group"
      aria-label="Pregunta de comprobación"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-md bg-gradient-to-r from-purple-600 to-fuchsia-600 px-2 py-0.5 font-display text-[10px] font-bold tracking-widest text-white uppercase">
          Comprobación
        </span>
        {answeredCorrectly && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> +5 XP
          </span>
        )}
      </div>
      <p className="mb-4 font-display text-sm font-semibold text-white sm:text-base">{quiz.question}</p>

      <div className="grid gap-2 sm:grid-cols-3">
        {quiz.options.map((option, i) => {
          const isSelected = selected === i
          const showState = answered && isSelected
          return (
            <button
              key={i}
              onClick={() => {
                if (answeredCorrectly) return
                setSelected(i)
                if (i === quiz.correctIndex && !answeredCorrectly) onCorrect()
              }}
              disabled={answeredCorrectly}
              aria-pressed={isSelected}
              className={cn(
                "min-h-11 rounded-xl border px-3.5 py-2.5 text-left text-[13px] leading-snug font-medium transition-all duration-200",
                !answered &&
                  "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white",
                showState && isCorrect && "border-emerald-500/60 bg-emerald-500/15 text-emerald-200",
                showState && !isCorrect && "border-rose-500/60 bg-rose-500/15 text-rose-200",
                answered && !isSelected && "border-white/5 bg-white/[0.02] text-zinc-600",
                answeredCorrectly &&
                  i === quiz.correctIndex &&
                  "border-emerald-500/60 bg-emerald-500/15 text-emerald-200"
              )}
            >
              <span className="flex items-center gap-2">
                {showState ? (
                  isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                  ) : (
                    <XCircle className="h-4 w-4 shrink-0" aria-hidden />
                  )
                ) : (
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold",
                      isSelected
                        ? isCorrect
                          ? "border-emerald-400 text-emerald-300"
                          : "border-rose-400 text-rose-300"
                        : "border-white/20 text-zinc-500"
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                )}
                {option}
              </span>
            </button>
          )
        })}
      </div>

      {answered && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={cn(
            "mt-3 rounded-lg border px-3.5 py-2.5 text-xs leading-relaxed",
            isCorrect
              ? "border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-200/90"
              : "border-rose-500/25 bg-rose-500/[0.07] text-rose-200/90"
          )}
        >
          {isCorrect ? quiz.explanation : "Aún no. Inténtalo de nuevo: revisa la pista en la pantalla."}
        </motion.p>
      )}
    </motion.div>
  )
}
