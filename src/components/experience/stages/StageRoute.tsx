"use client"

import { motion } from "framer-motion"
import {
  Brain,
  Rocket,
  Target,
  Store,
  Package,
  Settings2,
  Video,
  Megaphone,
  ClipboardList,
  BarChart3,
  Lock,
  Check,
} from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { getStageText, StageHeader, StageSection } from "../shared"
import { cn } from "@/lib/utils"

const LEVELS = [
  { icon: Brain, title: "Comprender el modelo", stageId: "model" },
  { icon: Store, title: "Conocer MasterShop", stageId: "mastershop" },
  { icon: Package, title: "Seleccionar productos", stageId: "products" },
  { icon: Target, title: "Construir la tienda", stageId: "store" },
  { icon: Settings2, title: "Configurar la operación", stageId: "orders" },
  { icon: Video, title: "Crear contenido", stageId: "content" },
  { icon: Megaphone, title: "Atraer clientes", stageId: "traffic" },
  { icon: ClipboardList, title: "Gestionar pedidos", stageId: "service" },
  { icon: BarChart3, title: "Medir resultados", stageId: "numbers" },
  { icon: Rocket, title: "Optimizar y escalar", stageId: null },
] as const

export function StageRoute({ config, stageIndex, completedStageIds }: StageProps) {
  const { kicker, title, subtitle } = getStageText(stageIndex, config)

  return (
    <div>
      <StageHeader kicker={kicker} title={title} subtitle={subtitle} />

      <StageSection>
        <div className="relative">
          {/* Línea del camino */}
          <div
            className="absolute top-6 bottom-6 left-[1.35rem] w-0.5 bg-gradient-to-b from-purple-500/70 via-fuchsia-500/50 to-zinc-700/60 sm:left-1/2 sm:-translate-x-px"
            aria-hidden
          />

          <ol className="space-y-4 sm:space-y-5">
            {LEVELS.map((level, i) => {
              const done = level.stageId !== null && completedStageIds.includes(level.stageId)
              const isFuture = level.stageId === null
              const leftSide = i % 2 === 0
              return (
                <motion.li
                  key={level.title}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className={cn(
                    "relative flex items-center gap-4 sm:w-1/2",
                    leftSide
                      ? "sm:self-start sm:flex-row-reverse sm:pr-8 sm:text-right"
                      : "sm:self-end sm:pl-8"
                  )}
                >
                  {/* Nodo */}
                  <span
                    className={cn(
                      "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                      done
                        ? "border-fuchsia-500/70 bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white neon-glow"
                        : isFuture
                          ? "border-zinc-700 bg-[#0d0819] text-zinc-600"
                          : "border-purple-500/40 bg-purple-500/15 text-purple-300"
                    )}
                  >
                    {done ? (
                      <level.icon className="h-5 w-5" aria-hidden />
                    ) : isFuture ? (
                      <Lock className="h-4 w-4" aria-hidden />
                    ) : (
                      <level.icon className="h-5 w-5" aria-hidden />
                    )}
                  </span>

                  {/* Tarjeta del nivel */}
                  <div
                    className={cn(
                      "glass-card flex-1 p-3.5 sm:p-4",
                      done
                        ? "border-purple-500/40 bg-purple-500/[0.06]"
                        : isFuture
                          ? "opacity-70"
                          : ""
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2.5",
                        leftSide && "sm:flex-row-reverse"
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[10px] font-bold",
                          done ? "text-fuchsia-400" : "text-zinc-600"
                        )}
                      >
                        NIVEL {String(i + 1).padStart(2, "0")}
                      </span>
                      {done && (
                        <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-300 uppercase">
                          <Check className="h-2.5 w-2.5" aria-hidden />
                          Explorado
                        </span>
                      )}
                      {isFuture && (
                        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold text-amber-300 uppercase">
                          Tu reto
                        </span>
                      )}
                    </div>
                    <p
                      className={cn(
                        "mt-1 font-display text-sm font-bold",
                        done || !isFuture ? "text-white" : "text-zinc-400"
                      )}
                    >
                      {level.title}
                    </p>
                    {!isFuture && (
                      <p className="mt-0.5 text-[11px] font-light text-zinc-500">
                        {done
                          ? "Ya exploraste este tema en la experiencia."
                          : "Aún no visitas esta etapa de la experiencia."}
                      </p>
                    )}
                    {isFuture && (
                      <p className="mt-0.5 text-[11px] font-light text-zinc-500">
                        Lo trabajarás dentro de la mentoría: optimizar y escalar tu operación.
                      </p>
                    )}
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </StageSection>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/50 to-fuchsia-950/30 p-5 text-center"
      >
        <p className="font-display text-sm font-bold text-white sm:text-base">
          Este es el mapa que recorrerás con la mentoría
        </p>
        <p className="mt-1 text-xs font-light text-zinc-400">
          Nivel por nivel, de entender el modelo a escalar tu operación — con acompañamiento en el
          camino.
        </p>
      </motion.div>
    </div>
  )
}
