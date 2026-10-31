"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Banknote, Calculator, Coins, Percent, Receipt, TrendingDown, TrendingUp } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import type { StageProps } from "../ExperienceApp"
import { AnimatedNumber, getStageText, InfoNote, StageHeader, StageSection } from "../shared"
import { QuizCard } from "../QuizCard"
import { formatCOP, formatNumber } from "@/lib/format"
import { cn } from "@/lib/utils"

interface CalcInputs {
  price: number
  cost: number
  otherCosts: number
  adSpend: number
  sales: number
}

const DEFAULT_INPUTS: CalcInputs = {
  price: 100000,
  cost: 65000,
  otherCosts: 8000,
  adSpend: 150000,
  sales: 10,
}

export function StageNumbers({ config, stageIndex, quizDone, onQuizCorrect }: StageProps) {
  const { stage, kicker, title, subtitle } = getStageText(stageIndex, config)
  const [inputs, setInputs] = useState<CalcInputs>(DEFAULT_INPUTS)

  const r = useMemo(() => {
    const revenue = inputs.price * inputs.sales
    const productCosts = inputs.cost * inputs.sales
    const otherTotal = inputs.otherCosts * inputs.sales
    const grossMargin = revenue - productCosts - otherTotal
    const profit = grossMargin - inputs.adSpend
    const unitMargin = inputs.price - inputs.cost - inputs.otherCosts
    const cac = inputs.sales > 0 ? inputs.adSpend / inputs.sales : 0
    const breakEven = unitMargin > 0 ? Math.ceil(inputs.adSpend / unitMargin) : Infinity
    return { revenue, productCosts, otherTotal, grossMargin, profit, unitMargin, cac, breakEven }
  }, [inputs])

  const update = (key: keyof CalcInputs) => (value: number[]) => {
    setInputs((prev) => ({ ...prev, [key]: value[0] }))
  }

  const barTotal = Math.max(r.revenue, 1)
  const segments = [
    { label: "Costo productos", value: r.productCosts, className: "bg-rose-500/80" },
    { label: "Otros costos", value: r.otherTotal, className: "bg-amber-500/80" },
    { label: "Publicidad", value: inputs.adSpend, className: "bg-fuchsia-500/80" },
    {
      label: "Utilidad estimada",
      value: Math.max(r.profit, 0),
      className: "bg-emerald-500/90",
    },
  ]

  return (
    <div>
      <StageHeader kicker={kicker} title={title} subtitle={subtitle} />

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        {/* PANEL DE CONTROLES */}
        <StageSection className="lg:mb-0">
          <div className="glass-card p-5 sm:p-6">
            <p className="mb-5 flex items-center gap-2 font-display text-xs font-bold tracking-[0.22em] text-purple-300 uppercase">
              <Calculator className="h-4 w-4" aria-hidden />
              Calculadora de rentabilidad
            </p>

            <div className="space-y-6">
              <SliderInput
                label="Precio de venta (por unidad)"
                value={inputs.price}
                min={10000}
                max={300000}
                step={5000}
                onChange={update("price")}
                format={formatCOP}
                accent="purple"
              />
              <SliderInput
                label="Costo del producto (por unidad)"
                value={inputs.cost}
                min={0}
                max={200000}
                step={1000}
                onChange={update("cost")}
                format={formatCOP}
                accent="rose"
              />
              <SliderInput
                label="Otros costos (por venta)"
                value={inputs.otherCosts}
                min={0}
                max={50000}
                step={500}
                onChange={update("otherCosts")}
                format={formatCOP}
                accent="amber"
                hint="Empaque, logística, servicios…"
              />
              <SliderInput
                label="Inversión publicitaria (total)"
                value={inputs.adSpend}
                min={0}
                max={2000000}
                step={10000}
                onChange={update("adSpend")}
                format={formatCOP}
                accent="fuchsia"
              />
              <SliderInput
                label="Cantidad de ventas"
                value={inputs.sales}
                min={1}
                max={100}
                step={1}
                onChange={update("sales")}
                format={(v) => `${formatNumber(v)} ventas`}
                accent="violet"
              />
            </div>

            <button
              onClick={() => setInputs(DEFAULT_INPUTS)}
              className="mt-6 w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 text-xs font-semibold text-zinc-400 transition-colors hover:border-purple-500/40 hover:text-white"
            >
              Restablecer valores
            </button>
          </div>
        </StageSection>

        {/* RESULTADOS */}
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard
              icon={Banknote}
              label="Facturación"
              value={r.revenue}
              tone="neutral"
              note="Todo lo que entra por ventas"
            />
            <ResultCard
              icon={Coins}
              label="Margen bruto"
              value={r.grossMargin}
              tone="purple"
              note="Facturación − productos − otros costos"
            />
            <ResultCard
              icon={Receipt}
              label="Inversión publicitaria"
              value={inputs.adSpend}
              tone="fuchsia"
              note="Lo destinado a campañas"
            />
            <ResultCard
              icon={r.profit >= 0 ? TrendingUp : TrendingDown}
              label="Utilidad estimada"
              value={r.profit}
              tone={r.profit >= 0 ? "green" : "red"}
              note={r.profit >= 0 ? "Lo que queda para ti" : "Ojo: estarías en pérdida"}
            />
          </div>

          {/* Barra apilada */}
          <div className="mt-4">
            <p className="mb-2 font-display text-[10px] font-bold tracking-[0.22em] text-zinc-500 uppercase">
              Reparto de la facturación
            </p>
            <div className="flex h-10 w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              {segments.map((s) => {
                const pct = (s.value / barTotal) * 100
                if (pct <= 0) return null
                return (
                  <motion.div
                    key={s.label}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(pct, 100)}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={cn("flex items-center justify-center overflow-hidden", s.className)}
                    title={`${s.label}: ${formatCOP(s.value)}`}
                  >
                    {pct > 12 && (
                      <span className="truncate px-1 text-[9px] font-bold text-white">
                        {s.label}
                      </span>
                    )}
                  </motion.div>
                )
              })}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
              {segments.map((s) => (
                <span key={s.label} className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                  <span className={cn("h-2 w-2 rounded-full", s.className)} aria-hidden />
                  {s.label} · {formatCOP(s.value)}
                </span>
              ))}
            </div>
          </div>

          {/* Métricas por venta */}
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            <MetricChip
              icon={Percent}
              label="Margen por venta"
              value={formatCOP(r.unitMargin)}
              positive={r.unitMargin > 0}
            />
            <MetricChip
              icon={Receipt}
              label="Publicidad por venta"
              value={formatCOP(r.cac)}
            />
            <MetricChip
              icon={Calculator}
              label="Punto de equilibrio"
              value={r.breakEven === Infinity ? "No alcanza" : `${r.breakEven} ventas`}
            />
          </div>

          {/* Definiciones */}
          <div className="mt-4 space-y-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <p className="font-display text-[10px] font-bold tracking-[0.22em] text-zinc-500 uppercase">
              Facturación ≠ Ganancia
            </p>
            <ul className="space-y-1.5 text-[11px] leading-relaxed font-light text-zinc-400">
              <li>
                <strong className="text-white">Facturación:</strong> todo el dinero que entra por
                ventas. No es tuyo todavía.
              </li>
              <li>
                <strong className="text-white">Margen bruto:</strong> lo que queda tras pagar productos
                y otros costos de la operación.
              </li>
              <li>
                <strong className="text-white">Utilidad estimada:</strong> el margen menos la inversión
                publicitaria. Esto sí sería tu resultado.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <InfoNote variant="warning" className="mt-6 mb-6">
        Herramienta educativa con valores ilustrativos: no representa resultados garantizados. Los
        costos, márgenes e impuestos reales varían según cada operación.
      </InfoNote>

      {stage.quiz && (
        <QuizCard quiz={stage.quiz} answeredCorrectly={quizDone} onCorrect={onQuizCorrect} />
      )}
    </div>
  )
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  accent,
  hint,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number[]) => void
  format: (v: number) => string
  accent: "purple" | "rose" | "amber" | "fuchsia" | "violet"
  hint?: string
}) {
  const accents = {
    purple: "[&_[data-slot=slider-range]]:bg-purple-500",
    rose: "[&_[data-slot=slider-range]]:bg-rose-500",
    amber: "[&_[data-slot=slider-range]]:bg-amber-500",
    fuchsia: "[&_[data-slot=slider-range]]:bg-fuchsia-500",
    violet: "[&_[data-slot=slider-range]]:bg-violet-500",
  } as const
  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between gap-2">
        <label className="text-xs font-medium text-zinc-400">
          {label}
          {hint ? <span className="ml-1.5 text-[10px] text-zinc-600">({hint})</span> : null}
        </label>
        <span className="font-display text-sm font-bold text-white tabular-nums">{format(value)}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={onChange}
        aria-label={label}
        className={cn("py-1", accents[accent])}
      />
    </div>
  )
}

function ResultCard({
  icon: Icon,
  label,
  value,
  tone,
  note,
}: {
  icon: typeof Banknote
  label: string
  value: number
  tone: "neutral" | "purple" | "fuchsia" | "green" | "red"
  note?: string
}) {
  const tones = {
    neutral: "border-white/10 bg-white/[0.03] text-white",
    purple: "border-purple-500/40 bg-purple-500/[0.08] text-purple-100",
    fuchsia: "border-fuchsia-500/40 bg-fuchsia-500/[0.08] text-fuchsia-100",
    green: "border-emerald-500/50 bg-emerald-500/[0.1] text-emerald-100",
    red: "border-rose-500/50 bg-rose-500/[0.1] text-rose-100",
  } as const
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className={cn("rounded-2xl border p-4", tones[tone])}>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">{label}</p>
        <Icon className="h-4 w-4 text-zinc-500" aria-hidden />
      </div>
      <p className="font-display text-lg font-extrabold tabular-nums sm:text-xl">
        <AnimatedNumber value={value} format={formatCOP} duration={0.5} />
      </p>
      {note ? <p className="mt-1 text-[10px] font-light text-zinc-500">{note}</p> : null}
    </motion.div>
  )
}

function MetricChip({
  icon: Icon,
  label,
  value,
  positive,
}: {
  icon: typeof Percent
  label: string
  value: string
  positive?: boolean
}) {
  return (
    <div className="glass-card p-3 text-center">
      <p className="flex items-center justify-center gap-1 text-[9px] font-semibold tracking-wider text-zinc-500 uppercase">
        <Icon className="h-3 w-3" aria-hidden />
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-display text-xs font-bold sm:text-sm",
          positive === undefined ? "text-white" : positive ? "text-emerald-300" : "text-rose-300"
        )}
      >
        {value}
      </p>
    </div>
  )
}
