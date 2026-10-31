"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Bot,
  CheckCheck,
  Clock3,
  MessageCircle,
  Play,
  RotateCcw,
  Sparkles,
  Tag,
  Undo2,
  Zap,
} from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { getStageText, StageHeader, StageSection } from "../shared"
import { cn } from "@/lib/utils"

const CONVERSATION = [
  { from: "client" as const, text: "¡Hola! Vi el serum facial, ¿tienen disponibilidad?" },
  { from: "seller" as const, text: "¡Hola! Sí, está disponible. Te cuento: hidrata y da luminosidad desde la primera semana." },
  { from: "client" as const, text: "¿Cuánto cuesta el envío a Medellín?" },
  { from: "seller" as const, text: "El envío llega en 2 a 4 días hábiles. Si compras hoy, te lo despachamos mañana." },
  { from: "client" as const, text: "Perfecto, ya hice el pedido." },
  { from: "seller" as const, text: "¡Recibido! Te envío el número de guía apenas el proveedor lo despache." },
]

const PRACTICES = [
  { icon: Clock3, title: "Respuestas oportunas", text: "Contestar rápido multiplica la conversión: el cliente decide en minutos." },
  { icon: MessageCircle, title: "Preguntas frecuentes", text: "Tener respuestas listas para envíos, pagos, garantías y tiempos." },
  { icon: Undo2, title: "Recuperación de conversaciones", text: "Seguir a quien preguntó y no compró: la mayoría de ventas se cierran así." },
  { icon: Tag, title: "Organización de contactos", text: "Etiquetar conversaciones por estado: nuevo, interesado, compró, seguimiento." },
  { icon: Zap, title: "Automatizaciones", text: "Mensajes de bienvenida, respuestas frecuentes y avisos de envío automáticos." },
  { icon: Bot, title: "IA aplicada a la atención", text: "Asistentes que responden dudas comunes mientras tú gestionas lo importante." },
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

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        {/* Mockup de chat */}
        <StageSection className="lg:mb-0">
          <div className="mx-auto w-full max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-5 rounded-3xl bg-emerald-500/10 blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-[#0b0f14]/95 shadow-[0_25px_70px_-25px_rgba(16,185,129,0.3)]">
                {/* Encabezado del chat */}
                <div className="flex items-center gap-3 border-b border-white/[0.07] bg-gradient-to-r from-emerald-950/60 to-teal-950/40 px-4 py-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 font-display text-[10px] font-bold text-white">
                    TT
                  </span>
                  <div className="flex-1 leading-tight">
                    <p className="text-xs font-bold text-white">Cliente · Interesada en sérum</p>
                    <p className="flex items-center gap-1 text-[10px] text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                      en línea
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-300 uppercase">
                    WhatsApp
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
                          "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed",
                          msg.from === "client"
                            ? "self-start rounded-bl-md border border-white/[0.08] bg-white/[0.06] text-zinc-200"
                            : "self-end rounded-br-md bg-gradient-to-br from-emerald-700/70 to-teal-700/60 text-emerald-50"
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
                      className="self-center rounded-full border border-emerald-500/40 bg-emerald-500/15 px-4 py-1.5 text-[10px] font-bold text-emerald-300"
                    >
                      Venta cerrada · etiqueta: compró
                    </motion.div>
                  )}
                </div>

                {/* Control */}
                <div className="flex items-center gap-2 border-t border-white/[0.07] px-3.5 py-2.5">
                  <button
                    onClick={play}
                    className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs font-bold text-white transition-transform hover:scale-[1.02]"
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
                Simulación ilustrativa de una conversación de ventas.
              </p>
            </motion.div>
          </div>
        </StageSection>

        {/* Prácticas */}
        <StageSection>
          <p className="mb-4 font-display text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase">
            El sistema de atención
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {PRACTICES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06 }}
                className="glass-card glass-card-hover p-4"
              >
                <p.icon className="mb-3 h-5 w-5 text-emerald-400" aria-hidden />
                <h3 className="font-display text-[13px] font-bold text-white">{p.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed font-light text-zinc-400">{p.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Sellerchat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-[#0e1626] to-purple-950/30 p-5"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600">
                <Bot className="h-5.5 w-5.5 text-white" aria-hidden />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-white">
                  Herramientas como <span className="text-cyan-300">Sellerchat</span>
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed font-light text-zinc-300">
                  Pueden complementar el proceso de atención y automatización{" "}
                  <strong className="text-white">
                    cuando las necesidades del negocio y las integraciones disponibles lo permitan
                  </strong>
                  . La conveniencia de usarlas se evalúa caso por caso.
                </p>
              </div>
            </div>
          </motion.div>
        </StageSection>
      </div>
    </div>
  )
}
