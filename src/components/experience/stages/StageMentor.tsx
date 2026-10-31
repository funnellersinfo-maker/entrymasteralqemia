"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { BadgeCheck, Crown, GraduationCap, Quote, Rocket, Sparkles } from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { getStageText, InfoNote, StageHeader, StageSection } from "../shared"

export function StageMentor({ config, stageIndex }: StageProps) {
  const { kicker } = getStageText(stageIndex, config)

  return (
    <div>
      <StageHeader
        kicker={kicker}
        title={`Conoce a ${config.mentor.name}`}
        subtitle="Autoridad construida con experiencia real: 9 años acompañando negocios y formando emprendedores desde cero."
      />

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        {/* Fotografía */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xs"
        >
          <div className="absolute -inset-6 rounded-full bg-purple-600/25 blur-3xl" aria-hidden />
          <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 shadow-[0_25px_80px_-20px_rgba(126,34,206,0.5)]">
            <Image
              src={config.mentor.photoUrl}
              alt={`${config.mentor.name}, ${config.mentor.founderTitle}`}
              width={864}
              height={1152}
              priority
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0614]/95 via-[#0a0614]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="flex items-center gap-2 font-display text-lg font-extrabold text-white">
                <BadgeCheck className="h-5 w-5 text-fuchsia-400" aria-hidden />
                {config.mentor.name}
              </p>
              <p className="text-xs font-medium text-purple-200/90">{config.mentor.role}</p>
            </div>
            {/* Marco holográfico */}
            <div className="pointer-events-none absolute inset-3 rounded-2xl border border-purple-400/20" aria-hidden />
            {/* Insignia de años */}
            <div className="absolute top-4 left-4 rounded-2xl border border-fuchsia-500/40 bg-[#0a0614]/80 px-3.5 py-2 backdrop-blur-xl">
              <p className="font-display text-xl leading-none font-extrabold text-fuchsia-300">
                {config.mentor.years}
              </p>
              <p className="mt-0.5 text-[9px] leading-tight font-bold tracking-wider text-zinc-400 uppercase">
                años de
                <br />
                trayectoria
              </p>
            </div>
          </div>
          {config.mentor.photoNote ? (
            <p className="mt-3 text-center text-[10px] font-light text-zinc-600">
              {config.mentor.photoNote}
            </p>
          ) : null}
        </motion.div>

        {/* Identidad + trayectoria */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card relative p-5 sm:p-6"
          >
            <Quote className="absolute top-4 right-5 h-8 w-8 text-purple-500/20" aria-hidden />
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-fuchsia-300 uppercase">
              <Crown className="h-3 w-3" aria-hidden />
              {config.mentor.founderTitle}
            </p>
            <p className="text-[15px] leading-relaxed font-light text-zinc-200 sm:text-base">
              {config.mentor.bio}
            </p>
          </motion.div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {[
              { value: config.mentor.years, label: "años de experiencia real" },
              { value: "0→100", label: "emprendedores desde cero" },
              { value: "360°", label: "ecommerce · ads · automatización" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
                className="glass-card p-3 text-center sm:p-4"
              >
                <p className="font-display text-lg font-extrabold text-gradient-soft sm:text-2xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[9px] leading-tight font-medium text-zinc-500 sm:text-[10px]">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          <StageSection className="mt-6 mb-0">
            <p className="mb-3 font-display text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase">
              Áreas de experiencia
            </p>
            <div className="flex flex-wrap gap-2">
              {config.mentor.highlights.map((h, i) => (
                <motion.span
                  key={h}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + i * 0.07 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/[0.08] px-3.5 py-2 text-xs font-medium text-purple-200"
                >
                  <Sparkles className="h-3 w-3 text-fuchsia-400" aria-hidden />
                  {h}
                </motion.span>
              ))}
            </div>
          </StageSection>
        </div>
      </div>

      {/* ===== ALQEMIA — el ecosistema ===== */}
      <StageSection>
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-white/10"
        >
          {/* Borde con el degradado de la marca ALQEMIA */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl p-px"
            style={{
              background:
                "linear-gradient(120deg, rgba(59,130,246,0.55), rgba(139,92,246,0.55), rgba(217,70,239,0.55), rgba(249,115,22,0.55))",
              mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
            aria-hidden
          />
          <div className="relative bg-[#0b0716]/95 p-6 sm:p-8">
            <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-fuchsia-600/15 blur-3xl" aria-hidden />
            <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
              {/* Logo */}
              <div className="relative mx-auto w-36 shrink-0 sm:w-40">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 via-fuchsia-500/20 to-orange-500/20 blur-xl" aria-hidden />
                <Image
                  src={config.mentor.academyLogoUrl}
                  alt={`Logotipo de ${config.mentor.academyName}`}
                  width={320}
                  height={320}
                  className="relative w-full rounded-2xl border border-white/10"
                />
              </div>
              {/* Texto */}
              <div className="text-center sm:text-left">
                <p className="font-display text-2xl font-extrabold tracking-[0.08em] text-white sm:text-4xl">
                  {config.mentor.academyName}
                </p>
                <p className="mt-1.5 inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-fuchsia-300 uppercase">
                  <GraduationCap className="h-4 w-4" aria-hidden />
                  {config.mentor.academyTagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed font-light text-zinc-400 sm:text-[15px]">
                  {config.mentor.academyDescription}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-medium text-purple-200">
                  <Rocket className="h-3.5 w-3.5 text-fuchsia-400" aria-hidden />
                  {config.mentor.name}, fundador de este ecosistema digital
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </StageSection>

      <InfoNote className="mb-2">{config.mentor.extraNote}</InfoNote>
    </div>
  )
}
