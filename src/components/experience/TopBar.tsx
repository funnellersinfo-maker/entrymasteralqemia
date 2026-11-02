"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Zap, Award } from "lucide-react"
import { TOTAL_STAGES } from "@/lib/stages"
import type { SiteConfig } from "@/lib/content"

export function TopBar({
  progressPercent,
  stageLabel,
  etapeLabel,
  xp,
  badgeCount,
  config,
}: {
  progressPercent: number
  stageLabel: string
  etapeLabel: string
  xp: number
  badgeCount: number
  config: SiteConfig
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.07] bg-[#0a0614]/85 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-3 pt-2.5 pb-2 sm:px-6 sm:pt-3.5">
        {/* Fila superior */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-emerald-500/25 bg-[#03130b] sm:h-9 sm:w-9">
              <Image
                src={config.mastershop.logoUrl}
                alt=""
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 leading-tight">
              <p className="truncate font-display text-[11px] font-bold tracking-wide text-white sm:text-sm">
                {config.brand.name}{" "}
                <span className="hidden text-purple-400 sm:inline">{config.brand.program}</span>
              </p>
              <p className="truncate text-[10px] text-zinc-500 sm:text-[11px]">
                Tienda llave en mano · con {config.brand.presenter}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full border border-amber-400/25 bg-amber-400/[0.08] px-2 py-1 text-[10px] font-bold text-amber-300 sm:px-2.5 sm:text-xs"
              title="Puntos de experiencia"
            >
              <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
              <motion.span key={xp} initial={{ scale: 1.35 }} animate={{ scale: 1 }} className="tabular-nums">
                {xp}
              </motion.span>
              <span className="hidden sm:inline">XP</span>
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full border border-fuchsia-400/25 bg-fuchsia-400/[0.08] px-2 py-1 text-[10px] font-bold text-fuchsia-300 sm:px-2.5 sm:text-xs"
              title="Insignias obtenidas"
            >
              <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
              <span className="tabular-nums">{badgeCount}</span>
            </span>
          </div>
        </div>

        {/* Fila de progreso */}
        <div className="flex items-center gap-2 sm:gap-3">
          <p
            className="w-24 shrink-0 truncate text-[10px] font-semibold tracking-wide text-zinc-500 uppercase sm:w-40 sm:text-[11px]"
            aria-live="polite"
          >
            {etapeLabel}
          </p>
          <div
            className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.09]"
            role="progressbar"
            aria-valuenow={Math.round(progressPercent)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progreso de la experiencia: ${Math.round(progressPercent)}%`}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500"
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 18 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60" />
            </motion.div>
          </div>
          <p className="w-12 shrink-0 text-right font-display text-[11px] font-bold text-purple-300 tabular-nums sm:text-sm">
            {Math.round(progressPercent)}%
          </p>
        </div>
        <p className="mt-1 hidden truncate text-center text-[10px] text-zinc-600 sm:block">
          {stageLabel} · {TOTAL_STAGES} etapas en total
        </p>
      </div>
    </header>
  )
}
