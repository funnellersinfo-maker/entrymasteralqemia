"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { BadgeCheck, Quote, Sparkles } from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { getStageText, InfoNote, StageHeader, StageSection } from "../shared"

export function StageMentor({ config, stageIndex }: StageProps) {
  const { kicker } = getStageText(stageIndex, config)

  return (
    <div>
      <StageHeader
        kicker={kicker}
        title={`Conoce a ${config.mentor.name}`}
        subtitle="Alguien que camina este camino contigo: experiencia práctica aplicada a tu proyecto."
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
              alt={`${config.mentor.name}, ${config.mentor.role}`}
              width={864}
              height={1152}
              priority
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0614]/90 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="flex items-center gap-2 font-display text-lg font-extrabold text-white">
                <BadgeCheck className="h-5 w-5 text-fuchsia-400" aria-hidden />
                {config.mentor.name}
              </p>
              <p className="text-xs font-light text-purple-200/90">{config.mentor.role}</p>
            </div>
            {/* Marco holográfico */}
            <div className="pointer-events-none absolute inset-3 rounded-2xl border border-purple-400/20" aria-hidden />
          </div>
          <p className="mt-3 text-center text-[10px] font-light text-zinc-600">
            {config.mentor.photoNote}
          </p>
        </motion.div>

        {/* Bio */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card relative p-5 sm:p-6"
          >
            <Quote className="absolute top-4 right-5 h-8 w-8 text-purple-500/20" aria-hidden />
            <p className="text-[15px] leading-relaxed font-light text-zinc-200 sm:text-base">
              {config.mentor.bio}
            </p>
          </motion.div>

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

          <InfoNote className="mt-6">{config.mentor.extraNote}</InfoNote>
        </div>
      </div>
    </div>
  )
}
