"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Boxes,
  ChevronRight,
  Package,
  ShoppingCart,
  Store,
  Truck,
  User,
  Users,
  Warehouse,
} from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { getStageText, InfoNote, StageHeader, StageSection } from "../shared"
import { QuizCard } from "../QuizCard"
import { cn } from "@/lib/utils"

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
    detail:
      "Tu tienda recibe el pedido: registra el producto, los datos de entrega y el pago del cliente.",
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
    detail:
      "El proveedor o el servicio logístico envía el paquete hacia la dirección del cliente.",
  },
  {
    id: "entrega",
    icon: Package,
    label: "Entrega",
    detail:
      "El cliente recibe su producto. Haces seguimiento hasta confirmar la entrega y revisas el resultado de la venta.",
  },
] as const

const ACTORS = [
  {
    icon: Boxes,
    title: "Los productos",
    text: "Lo que vendes. Se eligen con criterio: demanda, margen, competencia y presentación.",
  },
  {
    icon: Warehouse,
    title: "Los proveedores",
    text: "Quienes tienen el producto físico y lo despachan. Son tu conexión con la mercancía.",
  },
  {
    icon: Users,
    title: "Los clientes",
    text: "Las personas que compran en tu tienda. Llegan por contenido, publicidad o recomendación.",
  },
  {
    icon: Truck,
    title: "La logística",
    text: "El transporte y la entrega. Coordina que el pedido llegue a la dirección del cliente.",
  },
] as const

export function StageModel({ config, stageIndex, quizDone, onQuizCorrect }: StageProps) {
  const { stage, kicker, title, subtitle } = getStageText(stageIndex, config)
  const [selected, setSelected] = useState<string>("cliente")
  const selectedFlow = FLOW.find((f) => f.id === selected) ?? FLOW[0]

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

      {/* Actores del ecosistema */}
      <StageSection>
        <p className="mb-4 font-display text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase">
          Los 4 protagonistas del e-commerce
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ACTORS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="glass-card glass-card-hover p-4"
            >
              <a.icon className="mb-3 h-6 w-6 text-fuchsia-400" aria-hidden />
              <h3 className="font-display text-sm font-bold text-white">{a.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed font-light text-zinc-400">{a.text}</p>
            </motion.div>
          ))}
        </div>
      </StageSection>

      <InfoNote className="mb-6">
        El funcionamiento operativo concreto de cada paso depende de las condiciones del proveedor y
        del servicio logístico que gestiona la entrega.
      </InfoNote>

      {stage.quiz && (
        <QuizCard quiz={stage.quiz} answeredCorrectly={quizDone} onCorrect={onQuizCorrect} />
      )}
    </div>
  )
}
