"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowDown,
  Banknote,
  Coins,
  DollarSign,

  Package,
  Play,
  Plus,
  Scale,
  TrendingUp,
  Warehouse,
  X,
} from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { AnimatedNumber, getStageText, InfoNote, StageHeader, StageSection } from "../shared"
import { QuizCard } from "../QuizCard"
import { formatCOP } from "@/lib/format"
import { cn } from "@/lib/utils"

const COMPARISON = [
  { label: "Inversión inicial", inventory: "Alta: compras mercancía por adelantado", drop: "Baja: pagas cuando ya vendiste" },
  { label: "Almacenamiento", inventory: "Necesitas bodega o espacio físico", drop: "El proveedor almacena por ti" },
  { label: "Despacho", inventory: "Tú empaquetas y envías", drop: "Se coordina con el proveedor" },
  { label: "Riesgo", inventory: "Quedarte con stock sin vender", drop: "Menos capital atado en inventario" },
] as const

export function StageDropshipping({ config, stageIndex, quizDone, onQuizCorrect }: StageProps) {
  const { stage, kicker, title, subtitle } = getStageText(stageIndex, config)
  const [simStep, setSimStep] = useState(0) // 0 = inicial, 1..3 pasos

  useEffect(() => {
    if (simStep === 0) return
    if (simStep >= 3) return
    const t = setTimeout(() => setSimStep((s) => s + 1), 1100)
    return () => clearTimeout(t)
  }, [simStep])

  const runSim = () => setSimStep(1)

  return (
    <div>
      <StageHeader kicker={kicker} title={title} subtitle={subtitle} />

      {/* Comparación */}
      <StageSection>
        <div className="glass-card overflow-hidden p-0">
          <div className="grid grid-cols-[1fr] sm:grid-cols-[0.8fr_1fr_1fr]">
            <p className="hidden pt-4 pl-5 font-display text-[10px] font-bold tracking-widest text-zinc-600 uppercase sm:block">
              Comparativa
            </p>
            <p className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-3 font-display text-xs font-bold text-zinc-300 sm:border-b-0 sm:pt-4">
              <Warehouse className="h-4 w-4 text-zinc-500" aria-hidden />
              Tienda con inventario
            </p>
            <p className="flex items-center gap-2 border-b border-purple-500/20 bg-purple-500/[0.08] px-4 py-3 font-display text-xs font-bold text-purple-200 sm:border-b-0 sm:pt-4">
              <Package className="h-4 w-4 text-fuchsia-400" aria-hidden />
              Dropshipping
            </p>
          </div>
          {COMPARISON.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i }}
              className="grid grid-cols-1 border-t border-white/5 sm:grid-cols-[0.8fr_1fr_1fr]"
            >
              <p className="px-4 pt-3 text-[11px] font-semibold tracking-wide text-zinc-500 uppercase sm:py-3">
                {row.label}
              </p>
              <p className="flex items-center gap-2 px-4 pb-1 text-[13px] font-light text-zinc-400 sm:py-3">
                <X className="h-3.5 w-3.5 shrink-0 text-zinc-600" aria-hidden />
                {row.inventory}
              </p>
              <p className="flex items-center gap-2 border-t border-white/5 px-4 py-2 text-[13px] font-light text-zinc-200 sm:border-t-0 sm:py-3">
                <Plus className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden />
                {row.drop}
              </p>
            </motion.div>
          ))}
        </div>
      </StageSection>

      {/* Simulación de venta */}
      <StageSection>
        <div className="glass-card relative overflow-hidden p-4 sm:p-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/70 to-transparent" />
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-xs font-bold tracking-[0.22em] text-fuchsia-300 uppercase">
              Simulación de una venta
            </p>
            <button
              onClick={runSim}
              disabled={simStep > 0}
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-2 text-xs font-bold text-white transition-all",
                simStep > 0 ? "cursor-not-allowed opacity-40" : "animate-pulse-glow hover:scale-[1.03]"
              )}
            >
              <Play className="h-3.5 w-3.5 fill-white" aria-hidden />
              {simStep > 0 ? "Simulación en curso…" : "Simular venta"}
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {/* Paso 1 */}
            <SimCard
              active={simStep >= 1}
              step={1}
              icon={DollarSign}
              label="El cliente paga"
              value={simStep >= 1 ? 100000 : 0}
              tone="income"
            />
            {/* Paso 2 */}
            <SimCard
              active={simStep >= 2}
              step={2}
              icon={Banknote}
              label="Producto + operación"
              value={simStep >= 2 ? 65000 : 0}
              tone="cost"
            />
            {/* Paso 3 */}
            <SimCard
              active={simStep >= 3}
              step={3}
              icon={TrendingUp}
              label="Margen bruto"
              value={simStep >= 3 ? 35000 : 0}
              tone="margin"
            />
          </div>

          {/* Barra proporcional */}
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
              <span>Reparto de cada $100.000</span>
              <span>{simStep >= 3 ? "65% costos · 35% margen" : "—"}</span>
            </div>
            <div className="flex h-9 w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              <motion.div
                className="flex items-center justify-center bg-gradient-to-r from-rose-500/70 to-rose-600/70 text-[10px] font-bold text-white"
                initial={{ width: "0%" }}
                animate={{ width: simStep >= 2 ? "65%" : "0%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {simStep >= 2 ? "Costos $65.000" : ""}
              </motion.div>
              <motion.div
                className="flex items-center justify-center bg-gradient-to-r from-emerald-500/70 to-emerald-600/80 text-[10px] font-bold text-white"
                initial={{ width: "0%" }}
                animate={{ width: simStep >= 3 ? "35%" : "0%" }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {simStep >= 3 ? "Margen $35.000" : ""}
              </motion.div>
            </div>
          </div>

          <AnimatePresence>
            {simStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.08] px-4 py-3"
              >
                <Coins className="h-5 w-5 text-emerald-400" aria-hidden />
                <p className="text-[13px] leading-snug text-emerald-200">
                  <span className="font-bold">$100.000 (venta) − $65.000 (costos) = $35.000 de margen bruto.</span>{" "}
                  <span className="font-light text-emerald-200/70">
                    Ese margen debe cubrir tus otros costos (publicidad, servicios) para convertirce en
                    utilidad.
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </StageSection>

      {/* Cómo se coordina */}
      <StageSection>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Package,
              title: "Vendes sin almacenar",
              text: "Publicas el producto en tu tienda; el stock físico lo mantiene el proveedor.",
            },
            {
              icon: ArrowDown,
              title: "Coordinas el pedido",
              text: "Cuando alguien compra, gestionas el pedido con el proveedor desde la plataforma.",
            },
            {
              icon: Scale,
              title: "Calculas tu margen",
              text: "Tu ganancia por venta = precio de venta − costo del producto − otros costos.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="glass-card glass-card-hover p-4"
            >
              <c.icon className="mb-3 h-5 w-5 text-purple-300" aria-hidden />
              <h3 className="font-display text-sm font-bold text-white">{c.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed font-light text-zinc-400">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </StageSection>

      <InfoNote variant="warning" className="mb-6">
        Ejemplo hipotético con fines educativos: no representa una ganancia garantizada. Los costos
        reales, márgenes y resultados varían según cada producto, proveedor y operación.
      </InfoNote>

      {stage.quiz && (
        <QuizCard quiz={stage.quiz} answeredCorrectly={quizDone} onCorrect={onQuizCorrect} />
      )}
    </div>
  )
}

function SimCard({
  active,
  step,
  icon: Icon,
  label,
  value,
  tone,
}: {
  active: boolean
  step: number
  icon: typeof DollarSign
  label: string
  value: number
  tone: "income" | "cost" | "margin"
}) {
  const tones = {
    income: "border-purple-500/40 bg-purple-500/[0.08] text-purple-200",
    cost: "border-rose-500/40 bg-rose-500/[0.08] text-rose-200",
    margin: "border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-200",
  } as const
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: active ? 1 : 0.35,
        scale: active ? 1 : 0.97,
        borderColor: active ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.08)",
      }}
      className={cn("rounded-xl border bg-white/[0.03] p-4 transition-colors", active && tones[tone])}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
          <Icon className="h-4 w-4" aria-hidden />
          {label}
        </span>
        <span className="font-mono text-[10px] text-zinc-500">PASO {step}</span>
      </div>
      <p className="font-display text-xl font-extrabold text-white tabular-nums sm:text-2xl">
        {active ? <AnimatedNumber value={value} format={formatCOP} /> : <span className="text-zinc-600">—</span>}
      </p>
    </motion.div>
  )
}
