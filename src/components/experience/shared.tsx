"use client"

import { useEffect, useRef, useState } from "react"
import { animate } from "framer-motion"
import {
  Award,
  Brain,
  Calculator,
  CheckCircle2,
  CircleAlert,
  Info,
  Map,
  Sparkles,
  Store,
  TrendingUp,
  Truck,
  Trophy,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { STAGES, type StageDef } from "@/lib/stages"
import type { SiteConfig } from "@/lib/content"

// ---------- Texto efectivo de una etapa (config + defectos) ----------
export function getStageText(
  stageIndex: number,
  config: SiteConfig
): { stage: StageDef; kicker: string; title: string; subtitle: string } {
  const stage = STAGES[Math.max(0, Math.min(stageIndex, STAGES.length - 1))]
  const override = (config.stages && config.stages[stage.id]) || {}
  return {
    stage,
    kicker: stage.kicker,
    title: override.title ?? stage.title,
    subtitle: override.subtitle ?? stage.subtitle,
  }
}

// ---------- Iconos de insignias ----------
const BADGE_ICONS: Record<string, LucideIcon> = {
  brain: Brain,
  trending: TrendingUp,
  store: Store,
  truck: Truck,
  calculator: Calculator,
  map: Map,
  trophy: Trophy,
  sparkles: Sparkles,
}

export function BadgeIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = BADGE_ICONS[icon] ?? Award
  return <Icon className={className} aria-hidden />
}

// ---------- Encabezado de etapa ----------
export function StageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string
  title: string
  subtitle?: string
}) {
  return (
    <header className="mb-6 sm:mb-8">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-purple-300 uppercase">
        <Sparkles className="h-3.5 w-3.5" aria-hidden />
        {kicker}
      </p>
      <h1 className="font-display text-2xl leading-[1.12] font-bold tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">{subtitle}</p>
      ) : null}
    </header>
  )
}

// ---------- Contenedor de sección dentro de una etapa ----------
export function StageSection({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <section className={cn("mb-6 sm:mb-8", className)}>{children}</section>
}

// ---------- Nota / disclaimer ----------
export function InfoNote({
  children,
  variant = "info",
  className,
}: {
  children: React.ReactNode
  variant?: "info" | "warning"
  className?: string
}) {
  const Icon = variant === "warning" ? CircleAlert : Info
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border px-4 py-3 text-xs leading-relaxed sm:text-[13px]",
        variant === "warning"
          ? "border-amber-500/25 bg-amber-500/[0.06] text-amber-200/90"
          : "border-purple-500/25 bg-purple-500/[0.06] text-purple-200/80",
        className
      )}
      role="note"
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0 opacity-80" aria-hidden />
      <p className="font-light">{children}</p>
    </div>
  )
}

// ---------- Número animado ----------
export function AnimatedNumber({
  value,
  format,
  className,
  duration = 0.9,
}: {
  value: number
  format: (v: number) => string
  className?: string
  duration?: number
}) {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)
  useEffect(() => {
    const from = prev.current
    const to = value
    prev.current = value
    if (from === to) return
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [value, duration])
  return <span className={className}>{format(display)}</span>
}
