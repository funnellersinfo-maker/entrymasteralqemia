"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  BadgeCheck,
  Bot,
  CheckCheck,
  ClipboardList,
  Package,
  PackageCheck,
  Truck,
} from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { getStageText, InfoNote, StageHeader, StageSection } from "../shared"
import { QuizCard } from "../QuizCard"
import { cn } from "@/lib/utils"

const TIMELINE = [
  {
    icon: Package,
    title: "El cliente realiza un pedido",
    detail:
      "Alguien entra a tu tienda, elige un producto, completa sus datos de envío y paga. Tu tienda registra la venta.",
    status: "Pedido recibido",
    tone: "text-purple-300 border-purple-500/40 bg-purple-500/10",
  },
  {
    icon: Bot,
    title: "La orden se capta y carga sola",
    detail:
      "Sellerchat capta la orden y la carga automáticamente con la integración directa a MasterShop: qué producto se vendió, a qué dirección entregar y el valor cobrado. Sin pasar datos a mano.",
    status: "Carga automática",
    tone: "text-cyan-300 border-cyan-500/40 bg-cyan-500/10",
  },
  {
    icon: ClipboardList,
    title: "MasterShop toma el pedido",
    detail:
      "MasterShop recibe el pedido y continúa el flujo con el proveedor para que prepare el producto, según sus condiciones.",
    status: "En gestión",
    tone: "text-fuchsia-300 border-fuchsia-500/40 bg-fuchsia-500/10",
  },
  {
    icon: Truck,
    title: "Se coordina el despacho",
    detail:
      "El proveedor o el servicio logístico organiza el envío hacia la dirección del cliente.",
    status: "Despachado",
    tone: "text-pink-300 border-pink-500/40 bg-pink-500/10",
  },
  {
    icon: BadgeCheck,
    title: "Realizas el seguimiento",
    detail:
      "Consultas el estado del envío y mantienes al cliente informado. La proactividad genera confianza.",
    status: "En tránsito",
    tone: "text-amber-300 border-amber-500/40 bg-amber-500/10",
  },
  {
    icon: PackageCheck,
    title: "Entrega confirmada y cierre",
    detail:
      "El cliente recibe su producto. Confirmas la entrega y revisas el resultado económico de la venta.",
    status: "Entregado",
    tone: "text-emerald-300 border-emerald-500/40 bg-emerald-500/10",
  },
] as const

export function StageOrders({ config, stageIndex, quizDone, onQuizCorrect }: StageProps) {
  const { stage, kicker, title, subtitle } = getStageText(stageIndex, config)
  const [active, setActive] = useState<number>(0)

  return (
    <div>
      <StageHeader kicker={kicker} title={title} subtitle={subtitle} />

      <StageSection>
        <div className="relative">
          {/* Línea vertical */}
          <div
            className="absolute top-4 bottom-4 left-[1.4rem] w-px bg-gradient-to-b from-purple-500/60 via-fuchsia-500/50 to-emerald-500/60 sm:left-[1.55rem]"
            aria-hidden
          />
          <ol className="space-y-3">
            {TIMELINE.map((item, i) => {
              const isActive = active === i
              const isPast = i < active
              return (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.07 * i }}
                >
                  <button
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className="group relative flex w-full items-start gap-4 text-left"
                  >
                    {/* Nodo */}
                    <span
                      className={cn(
                        "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 sm:h-12 sm:w-12",
                        isActive
                          ? "scale-110 border-fuchsia-500/70 bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white neon-glow"
                          : isPast
                            ? "border-purple-500/40 bg-purple-500/15 text-purple-300"
                            : "border-white/10 bg-[#0d0819] text-zinc-500 group-hover:border-purple-500/40 group-hover:text-purple-300"
                      )}
                    >
                      <item.icon className="h-5 w-5" aria-hidden />
                    </span>
                    {/* Tarjeta */}
                    <div
                      className={cn(
                        "glass-card flex-1 p-4 transition-all duration-300",
                        isActive
                          ? "border-purple-500/50 bg-purple-500/[0.06]"
                          : "hover:border-purple-500/30"
                      )}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="flex items-center gap-2 font-display text-sm font-bold text-white">
                          <span className="font-mono text-[10px] text-zinc-600">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {item.title}
                        </p>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold",
                            item.tone
                          )}
                        >
                          {i === 5 ? (
                            <CheckCheck className="h-3 w-3" aria-hidden />
                          ) : null}
                          {item.status}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden text-[13px] leading-relaxed font-light text-zinc-400"
                          >
                            <span className="mt-2 block">{item.detail}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </StageSection>

      <InfoNote className="mb-6">
        Los tiempos y responsables de cada estado dependen del proveedor y del servicio logístico
        asignado. El seguimiento se hace desde las herramientas disponibles en la plataforma.
      </InfoNote>

      {stage.quiz && (
        <QuizCard quiz={stage.quiz} answeredCorrectly={quizDone} onCorrect={onQuizCorrect} />
      )}
    </div>
  )
}
