"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Banknote,
  ChevronRight,
  Coins,
  DollarSign,
  Package,
  Play,
  ShoppingCart,
  Store,
  TrendingUp,
  Truck,
  User,
  Warehouse,
} from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { AnimatedNumber, getStageText, InfoNote, StageHeader, StageSection } from "../shared"
import { QuizCard } from "../QuizCard"
import { formatCOP } from "@/lib/format"
import { cn } from "@/lib/utils"

// Etapa fusionada (alta conversión): el modelo de e-commerce + dropshipping
// en una sola pantalla — el flujo de una venta y el margen que te queda.

const FLOW = [
  {
    id: "cliente",
    icon: User,
    label: "Cliente",
    detail:
      "Una persona descubre tu tienda por redes sociales o publicidad, explora tus productos y decide comprar.",
  },
  {
    id: "tienda",
    icon: Store,
    label: "Tienda online",
    detail: "Tu tienda recibe el pedido: registra el producto, los datos de entrega y el pago del cliente.",
  },
  {
    id: "pedido",
    icon: ShoppingCart,
    label: "Pedido",
    detail:
      "El pedido queda registrado como una venta: sabes qué compró, a quién enviarlo y cuánto cobraste.",
  },
  {
    id: "proveedor",
    icon: Warehouse,
    label: "Proveedor",
    detail:
      "Gestionas el pedido con el proveedor, quien prepara el producto para el despacho según sus condiciones.",
  },
  {
    id: "despacho",
    icon: Truck,
    label: "Despacho",
    detail: "El proveedor o el servicio logístico envía el paquete hacia la dirección del cliente.",
  },
  {
    id: "entrega",
    icon: Package,
    label: "Entrega",
    detail:
      "El cliente recibe su producto. Haces seguimiento hasta confirmar la entrega y revisas el resultado de la venta.",
  },
] as const

export function StageModel({ config, stageIndex, quizDone, onQuizCorrect }: StageProps) {
  const { stage, kicker, title, subtitle } = getStageText(stageIndex, config)
  const [selected, setSelected] = useState<string>("cliente")
  const selectedFlow = FLOW.find((f) => f.id === selected) ?? FLOW[0]
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

      {/* Diagrama de flujo interactivo */}
      <StageSection>
        <div className="glass-card p-4 sm:p-6">
          <p className="mb-4 text-center font-display text-[10px] font-bold tracking-[0.25em] text-zinc-500 uppercase">
            Toca cada paso del recorrido
          </p>
          <ol className="flex flex-wrap items-stretch justify-center gap-y-3 sm:flex-nowrap">
            {FLOW.map((node, i) => {
              const isSelected = selected === node.id
              return (
                <li key={node.id} className="flex items-center">
                  <motion.button
                    onClick={() => setSelected(node.id)}
                    whileTap={{ scale: 0.94 }}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex w-[5.4rem] flex-col items-center gap-2 rounded-xl border px-2 py-3 transition-all duration-300 sm:w-24 sm:py-4",
                      isSelected
                        ? "border-purple-500/70 bg-purple-500/15 shadow-[0_0_28px_-8px_rgba(168,85,247,0.6)]"
                        : "border-white/10 bg-white/[0.03] hover:border-purple-500/40 hover:bg-purple-500/[0.08]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg transition-colors sm:h-10 sm:w-10",
                        isSelected
                          ? "bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white"
                          : "bg-white/[0.06] text-purple-300"
                      )}
                    >
                      <node.icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" aria-hidden />
                    </span>
                    <span
                      className={cn(
                        "text-center font-display text-[9px] leading-tight font-bold tracking-wide uppercase sm:text-[10px]",
                        isSelected ? "text-white" : "text-zinc-400"
                      )}
                    >
                      {node.label}
                    </span>
                    <span className="font-mono text-[8px] text-zinc-600">{String(i + 1).padStart(2, "0")}</span>
                  </motion.button>
                  {i < FLOW.length - 1 && (
                    <ChevronRight
                      className="mx-0.5 h-4 w-4 shrink-0 text-purple-500/50 sm:mx-1 sm:h-5 sm:w-5"
                      aria-hidden
                    />
                  )}
                </li>
              )
            })}
          </ol>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFlow.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-5 rounded-xl border border-purple-500/25 bg-purple-500/[0.07] p-4"
            >
              <p className="mb-1 flex items-center gap-2 font-display text-sm font-bold text-purple-200">
                <selectedFlow.icon className="h-4 w-4" aria-hidden />
                {selectedFlow.label}
              </p>
              <p className="text-[13px] leading-relaxed font-light text-zinc-300">{selectedFlow.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </StageSection>

      {/* Simulación de una venta: cuánto te queda */}
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
            <SimCard
              active={simStep >= 1}
              step={1}
              icon={DollarSign}
              label="El cliente paga"
              value={simStep >= 1 ? 100000 : 0}
              tone="income"
            />
            <SimCard
              active={simStep >= 2}
              step={2}
              icon={Banknote}
              label="Producto + operación"
              value={simStep >= 2 ? 65000 : 0}
              tone="cost"
            />
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
                <Coins className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
                <p className="text-[13px] leading-snug text-emerald-200">
                  <span className="font-bold">$100.000 (venta) − $65.000 (costos) = $35.000 de margen bruto.</span>{" "}
                  <span className="font-light text-emerald-200/70">
                    Ese margen debe cubrir tus otros costos (publicidad, servicios) para convertirse en utilidad.
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </StageSection>

      <InfoNote variant="warning" className="mb-6">
        Ejemplo hipotético con fines educativos: no representa una ganancia garantizada. Los costos
        reales, márgenes y resultados varían según cada producto, proveedor y operación. El
        funcionamiento operativo concreto depende de las condiciones del proveedor y del servicio
        logístico.
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
