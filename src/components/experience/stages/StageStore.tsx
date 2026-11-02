"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  BarChart3,
  Check,
  CheckCircle2,
  DollarSign,
  Eye,
  KeyRound,
  Layers,
  ListChecks,
  Package,
  Percent,
  ShoppingCart,
  Sparkles,
  Target,
  Truck,
  User,
} from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { getStageText, InfoNote, StageHeader, StageSection } from "../shared"
import { DesktopStoreMockup, PhoneStoreMockup } from "../mockups/StoreMockups"
import { cn } from "@/lib/utils"

// Etapa fusionada (alta conversión): productos + construcción + pedidos
// en una sola pantalla — "tu tienda llave en mano" de principio a fin.

const CRITERIA = [
  { icon: BarChart3, label: "Demanda" },
  { icon: DollarSign, label: "Precio" },
  { icon: Layers, label: "Costos" },
  { icon: Percent, label: "Margen" },
  { icon: Eye, label: "Competencia" },
  { icon: Sparkles, label: "Presentación" },
  { icon: Target, label: "Público" },
  { icon: CheckCircle2, label: "Proveedor" },
] as const

const STEPS = [
  {
    title: "Configuración inicial",
    detail: "Apertura y ajustes base de tu tienda dentro de la plataforma MasterShop.",
  },
  {
    title: "Identidad de la tienda",
    detail: "Nombre, colores y presentación que representan a tu marca.",
  },
  {
    title: "Selección de productos",
    detail: "Elección del catálogo inicial aplicando criterios de rentabilidad.",
  },
  {
    title: "Presentación y precios",
    detail: "Fotos, descripciones y precios definidos con margen objetivo: una vitrina que vende.",
  },
  {
    title: "Experiencia de navegación",
    detail: "Flujo claro del inicio al checkout: menos fricción, más conversión.",
  },
  {
    title: "Lista para recibir pedidos",
    detail: "Tu tienda queda operando y preparada para registrar ventas.",
  },
] as const

const ORDER_FLOW = [
  { icon: User, title: "El cliente compra", text: "El pedido llega a tu tienda con el pago registrado." },
  { icon: Package, title: "El proveedor despacha", text: "Coordinas el pedido desde el panel; él envía el producto." },
  { icon: Truck, title: "El cliente recibe", text: "Haces seguimiento al envío hasta la puerta de tu cliente." },
] as const

export function StageStore({ config, stageIndex }: StageProps) {
  const { kicker, title, subtitle } = getStageText(stageIndex, config)
  const [openStep, setOpenStep] = useState<number | null>(0)

  return (
    <div>
      <StageHeader kicker={kicker} title={title} subtitle={subtitle} />

      {/* Banner llave en mano */}
      <StageSection>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl border border-fuchsia-500/40 bg-gradient-to-r from-purple-950/80 via-[#1c0f36] to-fuchsia-950/60 p-5 sm:p-6"
        >
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-fuchsia-600/30 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-fuchsia-400/80 to-transparent" />
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-600 to-purple-600 neon-glow-strong">
              <KeyRound className="h-6 w-6 text-white" aria-hidden />
            </div>
            <div>
              <p className="font-display text-lg font-extrabold tracking-wide text-white sm:text-xl">
                TIENDA <span className="text-gradient">LLAVE EN MANO</span>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed font-light text-zinc-300">
                No la construyes solo: recibes acompañamiento para construir y dejar configurada la
                estructura inicial de tu tienda, según el alcance contratado y las funciones
                disponibles en la plataforma.
              </p>
            </div>
          </div>
        </motion.div>
      </StageSection>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          {/* Criterios de selección */}
          <StageSection className="lg:mb-0">
            <p className="mb-3 flex items-center gap-2 font-display text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase">
              <Sparkles className="h-4 w-4 text-fuchsia-400" aria-hidden />
              Cómo se eligen los productos
            </p>
            <div className="flex flex-wrap gap-2">
              {CRITERIA.map((c, i) => (
                <motion.span
                  key={c.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/25 bg-purple-500/[0.07] px-3 py-1.5 text-xs font-medium text-purple-200"
                >
                  <c.icon className="h-3.5 w-3.5" aria-hidden />
                  {c.label}
                </motion.span>
              ))}
            </div>
            <p className="mt-2.5 text-xs leading-relaxed font-light text-zinc-500">
              No se vende "lo que te guste": se analiza demanda, margen, competencia y presentación —
              el catálogo se define con criterio de rentabilidad.
            </p>
          </StageSection>

          {/* Pasos de construcción */}
          <StageSection>
            <p className="mb-3 flex items-center gap-2 font-display text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase">
              <ListChecks className="h-4 w-4 text-purple-400" aria-hidden />
              Ruta de construcción
            </p>
            <ol className="glass-card divide-y divide-white/[0.06] p-0">
              {STEPS.map((step, i) => {
                const isOpen = openStep === i
                return (
                  <li key={step.title}>
                    <button
                      onClick={() => setOpenStep(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-purple-500/[0.06]"
                    >
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-bold transition-all",
                        isOpen
                          ? "bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white"
                          : "bg-white/[0.06] text-purple-300"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                      <span className="flex-1 font-display text-[13px] font-semibold text-zinc-200">
                        {step.title}
                      </span>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-zinc-500">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="flex items-start gap-2 px-4 pb-3.5 pl-14 text-xs leading-relaxed font-light text-zinc-400">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden />
                            {step.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ol>
          </StageSection>

          {/* Flujo del pedido (fusión de la antigua etapa de operación) */}
          <StageSection>
            <p className="mb-3 flex items-center gap-2 font-display text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase">
              <ShoppingCart className="h-4 w-4 text-emerald-400" aria-hidden />
              Cuando alguien compra
            </p>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {ORDER_FLOW.map((o, i) => (
                <motion.div
                  key={o.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i }}
                  className="glass-card glass-card-hover p-3.5"
                >
                  <o.icon className="mb-2 h-4.5 w-4.5 text-emerald-400" aria-hidden />
                  <h4 className="font-display text-xs font-bold text-white">{o.title}</h4>
                  <p className="mt-1 text-[11px] leading-relaxed font-light text-zinc-400">{o.text}</p>
                </motion.div>
              ))}
            </div>
          </StageSection>
        </div>

        {/* Mockups de tienda */}
        <div className="flex flex-col items-center gap-6 lg:sticky lg:top-32">
          <PhoneStoreMockup />
          <DesktopStoreMockup className="w-full max-w-md" />
          <p className="text-center text-[10px] text-zinc-600">
            Mockups ilustrativos de una tienda online — así se vería tu vitrina en móvil y escritorio.
          </p>
        </div>
      </div>

      <InfoNote className="mt-6">
        El detalle operativo de cada paso depende de las condiciones del proveedor, del servicio
        logístico y de las funciones disponibles en la plataforma según el plan contratado.
      </InfoNote>
    </div>
  )
}
