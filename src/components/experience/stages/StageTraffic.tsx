"use client"

import { motion } from "framer-motion"
import {
  Megaphone,
  Sprout,
  Users,
  Wallet,
  Filter,
  ChevronDown,
  MousePointerClick,
  MessageCircle,
  ShoppingCart,
} from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { getStageText, InfoNote, StageHeader, StageSection } from "../shared"
import { QuizCard } from "../QuizCard"

const ORGANIC = [
  "TikTok",
  "Instagram",
  "Facebook",
  "Reels",
  "Videos cortos",
  "Comunidades",
] as const

const PAID = [
  "Meta Ads",
  "Campañas",
  "Públicos",
  "Presupuestos",
  "Creatividades",
  "Optimización",
] as const

const FUNNEL = [
  { icon: Users, label: "Alcance", detail: "Personas que ven tu contenido o anuncio" },
  { icon: MousePointerClick, label: "Interacción", detail: "Likes, comentarios, clics a tu tienda" },
  { icon: MessageCircle, label: "Conversación", detail: "Preguntas por WhatsApp o DM" },
  { icon: ShoppingCart, label: "Compra", detail: "El pedido se concreta en tu tienda" },
] as const

export function StageTraffic({ config, stageIndex, quizDone, onQuizCorrect }: StageProps) {
  const { stage, kicker, title, subtitle } = getStageText(stageIndex, config)

  return (
    <div>
      <StageHeader kicker={kicker} title={title} subtitle={subtitle} />

      {/* Dos caminos */}
      <StageSection>
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Orgánico */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card relative overflow-hidden p-5 sm:p-6"
          >
            <div className="pointer-events-none absolute -top-14 -right-14 h-40 w-40 rounded-full bg-emerald-600/20 blur-3xl" aria-hidden />
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600">
                <Sprout className="h-5.5 w-5.5 text-white" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-white">Tráfico orgánico</h3>
                <p className="text-[11px] text-emerald-300/80">Sin pagar por impresiones</p>
              </div>
            </div>
            <p className="mb-4 text-[13px] leading-relaxed font-light text-zinc-400">
              Contenido constante que atrae personas interesadas en tus productos. Tarda más en
              escalar, pero construye comunidad y confianza.
            </p>
            <div className="flex flex-wrap gap-2">
              {ORGANIC.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3 py-1.5 text-xs font-medium text-emerald-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Pago */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card relative overflow-hidden p-5 sm:p-6"
          >
            <div className="pointer-events-none absolute -top-14 -right-14 h-40 w-40 rounded-full bg-fuchsia-600/25 blur-3xl" aria-hidden />
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-600 to-purple-600 neon-glow">
                <Megaphone className="h-5.5 w-5.5 text-white" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-white">Tráfico pago</h3>
                <p className="text-[11px] text-fuchsia-300/80">Impulso con inversión publicitaria</p>
              </div>
            </div>
            <p className="mb-4 text-[13px] leading-relaxed font-light text-zinc-400">
              La publicidad pone tu producto frente a miles de personas hoy mismo. A cambio, exige
              gestión, presupuesto y criterio para optimizar.
            </p>
            <div className="flex flex-wrap gap-2">
              {PAID.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-fuchsia-500/25 bg-fuchsia-500/[0.08] px-3 py-1.5 text-xs font-medium text-fuchsia-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </StageSection>

      {/* Embudo */}
      <StageSection>
        <p className="mb-4 font-display text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase">
          El embudo de una venta
        </p>
        <div className="grid gap-2 sm:grid-cols-4">
          {FUNNEL.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="glass-card glass-card-hover relative p-4"
            >
              <div
                className="mb-3 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 py-2.5"
                style={{
                  clipPath:
                    i < 3
                      ? `polygon(0 0, 100% 0, 100% 100%, ${Math.max(8, 34 - i * 8)}% 100%, 0 ${Math.max(
                          8,
                          34 - i * 8
                        )}%)`
                      : undefined,
                }}
              >
                <f.icon className="h-5 w-5 text-white" aria-hidden />
              </div>
              <p className="font-display text-sm font-bold text-white">{f.label}</p>
              <p className="mt-1 text-[11px] leading-relaxed font-light text-zinc-500">{f.detail}</p>
              {i < FUNNEL.length - 1 && (
                <ChevronDown className="absolute top-1/2 -right-3 hidden h-4 w-4 -translate-y-1/2 text-purple-500/60 sm:block" aria-hidden />
              )}
            </motion.div>
          ))}
        </div>
      </StageSection>

      {/* Inversión realista */}
      <StageSection>
        <div className="flex items-start gap-4 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 to-transparent p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/20">
            <Wallet className="h-5.5 w-5.5 text-amber-400" aria-hidden />
          </div>
          <div>
            <p className="font-display text-sm font-bold text-amber-200">
              La publicidad es inversión, no magia
            </p>
            <p className="mt-1 text-[13px] leading-relaxed font-light text-zinc-300">
              Requiere <strong className="text-white">presupuesto</strong>,{" "}
              <strong className="text-white">pruebas constantes</strong> y{" "}
              <strong className="text-white">optimización</strong> basada en datos. En la mentoría
              aprenderás los fundamentos para decidir con criterio.
            </p>
          </div>
        </div>
      </StageSection>

      <InfoNote variant="warning" className="mb-6">
        Ninguna estrategia de tráfico orgánico o pago garantiza ventas. Los resultados dependen del
        producto, el mercado, la ejecución y la inversión realizada.
      </InfoNote>

      {stage.quiz && (
        <QuizCard quiz={stage.quiz} answeredCorrectly={quizDone} onCorrect={onQuizCorrect} />
      )}
    </div>
  )
}
