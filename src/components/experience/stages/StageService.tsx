"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Bot,
  CheckCheck,
  Coins,
  Copy,
  Eye,
  MoonStar,
  Play,
  Repeat2,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  UserRound,
  Zap,
} from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { getStageText, InfoNote, StageHeader, StageSection } from "../shared"
import { cn } from "@/lib/utils"

const CONVERSATION = [
  { from: "client" as const, text: "¡Hola! Vi el serum facial, ¿tienen disponibilidad?" },
  { from: "seller" as const, text: "¡Hola! Sí, está disponible. Te cuento: hidrata y da luminosidad desde la primera semana. ¿Te muestro el video de cómo se usa? \u{1F3A5}" },
  { from: "client" as const, text: "Sí, y ¿hacen envíos a Medellín? Cra 43 #12-30" },
  { from: "seller" as const, text: "¡Claro! Entregamos en esa dirección en 2 a 4 días hábiles. Si compras hoy, tu pedido queda despachado mañana. \u{1F69A}" },
  { from: "client" as const, text: "Perfecto, ya pagué." },
  { from: "seller" as const, text: "¡Listo! Recibí tu pedido y ya quedó registrado en el sistema. Te envío el número de guía apenas salga a despacho. ✅" },
]

/** Flujo del ecosistema automatizado: Sellerchat + MasterShop */
const ECOSYSTEM_FLOW = [
  {
    icon: UserRound,
    title: "El cliente llega",
    text: "Escribe por WhatsApp, TikTok o Instagram… a cualquier hora del día.",
    tone: "text-zinc-300 border-white/15 bg-white/[0.04]",
  },
  {
    icon: Bot,
    title: "Sellerchat atiende",
    text: "El agente de IA recibe 24/7, entiende imágenes, videos y direcciones, resuelve dudas y cierra la venta como un vendedor humano.",
    tone: "text-cyan-300 border-cyan-500/40 bg-cyan-500/[0.08]",
  },
  {
    icon: Store,
    title: "MasterShop toma el pedido",
    text: "Con la integración directa, Sellerchat capta y carga la orden automáticamente: MasterShop la recibe y continúa el flujo con el proveedor.",
    tone: "text-emerald-300 border-emerald-500/40 bg-emerald-500/[0.08]",
  },
  {
    icon: Coins,
    title: "Tú cobras y diriges",
    text: "El negocio opera en piloto automático: tú cobras, optimizas tus campañas y eliges los próximos productos.",
    tone: "text-fuchsia-300 border-fuchsia-500/40 bg-fuchsia-500/[0.08]",
  },
] as const

/** Beneficios transformativos del ecosistema */
const BENEFITS = [
  {
    icon: MoonStar,
    title: "Vende mientras duermes",
    text: "El agente de IA recibe a las personas 24/7 y las atiende como un ser humano: pregunta, resuelve y vende.",
  },
  {
    icon: Eye,
    title: "Entiende como una persona",
    text: "Interpreta imágenes, videos, direcciones y el contexto completo de cada conversación.",
  },
  {
    icon: Zap,
    title: "La orden se carga sola",
    text: "Sellerchat capta el pedido y lo carga con la integración directa a MasterShop. Nada de pasar datos a mano.",
  },
  {
    icon: ShoppingBag,
    title: "MasterShop sigue el flujo",
    text: "La plataforma toma el pedido y continúa la gestión con el proveedor hasta la entrega.",
  },
  {
    icon: TrendingUp,
    title: "Tú optimizas, no atiendes",
    text: "Tu tiempo va en lo que hace crecer el negocio: campañas, tráfico y nuevos productos.",
  },
  {
    icon: Repeat2,
    title: "Replica el ecosistema",
    text: "Con el sistema aprendido, montas nuevas tiendas y replicas el mismo modelo una y otra vez.",
  },
] as const

/** Tu rol real cuando el negocio va en automático */
const YOUR_ROLE = [
  { icon: Coins, label: "Cobrar tus ventas" },
  { icon: TrendingUp, label: "Optimizar campañas y tráfico" },
  { icon: Sparkles, label: "Elegir nuevos productos" },
  { icon: Copy, label: "Montar y replicar ecosistemas" },
] as const

export function StageService({ config, stageIndex }: StageProps) {
  const { kicker, title, subtitle } = getStageText(stageIndex, config)
  const [visible, setVisible] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing || visible >= CONVERSATION.length) return
    const t = setTimeout(() => setVisible((v) => v + 1), 1400)
    return () => clearTimeout(t)
  }, [playing, visible])

  useEffect(() => {
    if (playing && visible >= CONVERSATION.length) {
      const t = setTimeout(() => setPlaying(false), 800)
      return () => clearTimeout(t)
    }
  }, [playing, visible])

  const play = () => {
    if (visible >= CONVERSATION.length) setVisible(0)
    setPlaying(true)
  }

  return (
    <div>
      <StageHeader kicker={kicker} title={title} subtitle={subtitle} />

      {/* ===== El ecosistema: PUV ===== */}
      <StageSection>
        <div className="glass-card relative overflow-hidden p-5 sm:p-7">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <p className="mb-1 font-display text-[10px] font-bold tracking-[0.3em] text-cyan-300 uppercase">
            El ecosistema completo
          </p>
          <h2 className="font-display text-xl leading-tight font-extrabold text-white sm:text-3xl">
            Tu negocio en <span className="text-gradient">piloto automático</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed font-light text-zinc-400">
            Sellerchat siempre va incluido en el ecosistema: capta y carga la orden con la
            integración directa a MasterShop, y MasterShop coge el pedido. Literal:{" "}
            <strong className="text-white">todo es automático</strong> — la persona al final solo
            cobra y optimiza sus campañas y su tráfico.
          </p>

          {/* Flujo */}
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {ECOSYSTEM_FLOW.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="relative"
              >
                <div className={cn("h-full rounded-2xl border p-4 transition-colors", step.tone)}>
                  <div className="mb-2.5 flex items-center justify-between">
                    <step.icon className="h-5 w-5" aria-hidden />
                    <span className="font-mono text-[9px] text-zinc-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="font-display text-[13px] font-bold text-white">{step.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed font-light text-zinc-400">
                    {step.text}
                  </p>
                </div>
                {i < ECOSYSTEM_FLOW.length - 1 && (
                  <span
                    className="absolute top-1/2 -right-1.5 hidden -translate-y-1/2 text-fuchsia-500/60 lg:block"
                    aria-hidden
                  >
                    →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </StageSection>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        {/* ===== Chat: el agente IA vendiendo ===== */}
        <StageSection className="lg:mb-0">
          <div className="mx-auto w-full max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-5 rounded-3xl bg-cyan-500/10 blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#0a0f16]/95 shadow-[0_25px_70px_-25px_rgba(6,182,212,0.3)]">
                {/* Encabezado del chat */}
                <div className="flex items-center gap-3 border-b border-white/[0.07] bg-gradient-to-r from-cyan-950/60 to-purple-950/40 px-4 py-3">
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-600">
                    <Bot className="h-4.5 w-4.5 text-white" aria-hidden />
                    <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-[#0a0f16] bg-emerald-400" />
                  </span>
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="truncate text-xs font-bold text-white">Sellerchat · Agente IA</p>
                    <p className="flex items-center gap-1 text-[10px] text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                      en línea 24/7 · atiende por ti
                    </p>
                  </div>
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[9px] font-semibold text-cyan-300 uppercase">
                    IA
                  </span>
                </div>

                {/* Mensajes */}
                <div className="flex h-72 flex-col gap-2.5 overflow-y-auto custom-scrollbar p-3.5">
                  <AnimatePresence initial={false}>
                    {CONVERSATION.slice(0, visible).map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 14, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 320, damping: 26 }}
                        className={cn(
                          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed break-words",
                          msg.from === "client"
                            ? "self-start rounded-bl-md border border-white/[0.08] bg-white/[0.06] text-zinc-200"
                            : "self-end rounded-br-md bg-gradient-to-br from-cyan-700/70 to-teal-700/60 text-cyan-50"
                        )}
                      >
                        {msg.text}
                        <span className="mt-1 flex items-center justify-end gap-1 text-[8px] opacity-60">
                          10:0{i + 1}
                          {msg.from === "seller" && <CheckCheck className="h-2.5 w-2.5" aria-hidden />}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {playing && visible < CONVERSATION.length && (
                    <div className="flex gap-1 self-start rounded-2xl border border-white/[0.08] bg-white/[0.06] px-3.5 py-3">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-zinc-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                        />
                      ))}
                    </div>
                  )}
                  {visible >= CONVERSATION.length && !playing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="self-center rounded-full border border-emerald-500/40 bg-emerald-500/15 px-4 py-1.5 text-center text-[10px] font-bold text-emerald-300"
                    >
                      Venta cerrada por la IA · orden cargada a MasterShop
                    </motion.div>
                  )}
                </div>

                {/* Control */}
                <div className="flex items-center gap-2 border-t border-white/[0.07] px-3.5 py-2.5">
                  <button
                    onClick={play}
                    className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 px-4 py-2 text-xs font-bold text-white transition-transform hover:scale-[1.02]"
                  >
                    {visible >= CONVERSATION.length ? (
                      <>
                        <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Repetir conversación
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 fill-white" aria-hidden /> Reproducir conversación
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="mt-3 text-center text-[10px] text-zinc-600">
                Simulación ilustrativa: el agente de IA entiende imágenes, videos y direcciones, y
                responde como un vendedor humano.
              </p>
            </motion.div>
          </div>
        </StageSection>

        {/* ===== Beneficios + tu rol ===== */}
        <StageSection>
          <p className="mb-4 font-display text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase">
            Beneficios que transforman tu operación
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06 }}
                className="glass-card glass-card-hover p-4"
              >
                <b.icon className="mb-3 h-5 w-5 text-cyan-400" aria-hidden />
                <h3 className="font-display text-[13px] font-bold text-white">{b.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed font-light text-zinc-400">{b.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Tu rol real */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 rounded-2xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-950/40 via-[#150a20] to-purple-950/30 p-5"
          >
            <p className="font-display text-sm font-bold text-white">
              Cuando el negocio opera solo, <span className="text-fuchsia-300">tu rol real</span> es:
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {YOUR_ROLE.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-[13px] font-light text-zinc-200"
                >
                  <r.icon className="h-4 w-4 shrink-0 text-fuchsia-400" aria-hidden />
                  {r.label}
                </li>
              ))}
            </ul>
          </motion.div>
        </StageSection>
      </div>

      <InfoNote className="mb-6">
        La activación del agente de IA y sus integraciones se configura dentro del ecosistema,
        según el alcance del acompañamiento y las funciones disponibles de cada plataforma. Los
        tiempos de entrega dependen del proveedor y la logística asignada.
      </InfoNote>
    </div>
  )
}
