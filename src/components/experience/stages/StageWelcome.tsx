"use client"

import { motion, useReducedMotion } from "framer-motion"
import { BookOpen, Hammer, Megaphone, MoveRight, Play, ShieldCheck, Zap } from "lucide-react"
import Image from "next/image"
import type { StageProps } from "../ExperienceApp"

const CONCEPTS = [
  {
    icon: BookOpen,
    title: "Aprende",
    text: "El modelo de negocio del e-commerce y el dropshipping explicados desde cero, sin tecnicismos.",
    accent: "from-violet-600 to-purple-600",
  },
  {
    icon: Hammer,
    title: "Construye",
    text: "Tu tienda online con MasterShop, con acompañamiento para dejar la estructura inicial lista.",
    accent: "from-purple-600 to-fuchsia-600",
  },
  {
    icon: Megaphone,
    title: "Comercializa",
    text: "Contenido, clientes y atención: cómo presentar productos y conseguir ventas.",
    accent: "from-fuchsia-600 to-pink-600",
  },
] as const

export function StageWelcome({ config, goNext }: StageProps) {
  const reduced = useReducedMotion()

  return (
    <div className="pt-2 sm:pt-6">
      {/* HÉROE */}
      <div className="relative mb-10 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        <div className="relative z-10 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-4 py-1.5 font-display text-[10px] font-bold tracking-[0.18em] text-fuchsia-300 uppercase sm:text-[11px]"
          >
            <Zap className="h-3.5 w-3.5" aria-hidden />
            {config.hero.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="font-display text-[2rem] leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            {config.hero.title}
            <span className="mt-2 block text-gradient animate-shimmer">{config.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base lg:mx-0"
          >
            {config.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start sm:justify-center"
          >
            <motion.button
              onClick={goNext}
              whileHover={reduced ? undefined : { scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex min-h-12 items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-7 py-3.5 font-display text-sm font-bold tracking-wide text-white animate-pulse-glow focus-visible:outline-2 focus-visible:outline-purple-400 sm:text-base"
            >
              <Play className="h-4 w-4 fill-white" aria-hidden />
              {config.hero.ctaLabel}
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </motion.button>
            <p className="flex items-center gap-2 text-[11px] text-zinc-500">
              <ShieldCheck className="h-4 w-4 text-purple-400/70" aria-hidden />
              Sin registro · Guarda tu progreso automáticamente
            </p>
          </motion.div>
        </div>

        {/* Imagen holográfica */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="absolute -inset-6 rounded-full bg-purple-600/25 blur-3xl" aria-hidden />
          <div className={`relative ${reduced ? "" : "animate-float"}`}>
            <Image
              src={config.hero.imageUrl}
              alt="Holograma futurista de una tienda de comercio electrónico"
              width={1152}
              height={864}
              priority
              className="rounded-3xl border border-purple-500/25 object-cover shadow-[0_0_70px_-18px_rgba(168,85,247,0.55)]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-[#07040f]/60 via-transparent to-transparent" />
          </div>
          {/* Tarjetas flotantes decorativas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute -bottom-4 -left-3 rounded-xl border border-white/10 bg-[#0f0a1e]/90 px-3.5 py-2.5 backdrop-blur-xl sm:-left-8"
          >
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Modelo</p>
            <p className="font-display text-xs font-bold text-fuchsia-300">Dropshipping</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85 }}
            className="absolute -top-4 -right-2 rounded-xl border border-white/10 bg-[#0f0a1e]/90 px-3.5 py-2.5 backdrop-blur-xl sm:-right-6"
          >
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Plataforma</p>
            <p className="font-display text-xs font-bold text-purple-300">MasterShop</p>
          </motion.div>
        </motion.div>
      </div>

      {/* CONCEPTOS */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.32 }}
        className="mb-4 text-center font-display text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase sm:text-sm"
      >
        Tres conceptos · un mismo camino
      </motion.p>

      <div className="grid gap-4 sm:grid-cols-3">
        {CONCEPTS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.12 }}
            whileHover={reduced ? undefined : { y: -6 }}
            className="glass-card glass-card-hover group relative overflow-hidden p-5 sm:p-6"
          >
            <div
              className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${c.accent} opacity-60 transition-opacity group-hover:opacity-100`}
              aria-hidden
            />
            <div
              className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.accent} shadow-lg`}
            >
              <c.icon className="h-5 w-5 text-white" aria-hidden />
            </div>
            <h3 className="font-display text-lg font-bold text-white">{c.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed font-light text-zinc-400">{c.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Indicador de recorrido */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex items-center justify-center gap-3 text-center"
      >
        <p className="text-[11px] text-zinc-500">
          Una experiencia guiada de 8 etapas · responde tus dudas de principiante · llega al final
          y solicita tu tienda
        </p>
      </motion.div>
    </div>
  )
}
