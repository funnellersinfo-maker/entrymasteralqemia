"use client"

import { motion } from "framer-motion"
import { CheckCircle2, GraduationCap, Hammer, UserCheck } from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { getStageText, InfoNote, StageHeader, StageSection } from "../shared"
import { cn } from "@/lib/utils"
import type { MentorshipItem } from "@/lib/content"

const GROUPS: {
  type: MentorshipItem["type"]
  icon: typeof Hammer
  title: string
  subtitle: string
  accent: string
  cardAccent: string
}[] = [
  {
    type: "implemented",
    icon: Hammer,
    title: "Se implementa contigo",
    subtitle: "Trabajo directo sobre tu proyecto",
    accent: "from-purple-600 to-fuchsia-600",
    cardAccent: "border-purple-500/40 bg-purple-500/[0.07]",
  },
  {
    type: "taught",
    icon: GraduationCap,
    title: "Se te enseña",
    subtitle: "Conocimiento y criterio para decidir",
    accent: "from-fuchsia-600 to-pink-600",
    cardAccent: "border-fuchsia-500/40 bg-fuchsia-500/[0.07]",
  },
  {
    type: "executed",
    icon: UserCheck,
    title: "Lo ejecutas tú",
    subtitle: "Tu negocio, tus decisiones",
    accent: "from-violet-600 to-purple-700",
    cardAccent: "border-violet-500/40 bg-violet-500/[0.07]",
  },
]

export function StageIncludes({ config, stageIndex }: StageProps) {
  const { kicker, title, subtitle } = getStageText(stageIndex, config)

  return (
    <div>
      <StageHeader kicker={kicker} title={title} subtitle={subtitle} />

      <div className="grid gap-5 lg:grid-cols-3">
        {GROUPS.map((group, gi) => {
          const items = config.mentorship.items.filter((item) => item.type === group.type)
          return (
            <motion.section
              key={group.type}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + gi * 0.12 }}
              className="glass-card relative overflow-hidden p-5"
              aria-label={group.title}
            >
              <div className={cn("absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r", group.accent)} aria-hidden />
              <div className="mb-4 flex items-center gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br", group.accent)}>
                  <group.icon className="h-5 w-5 text-white" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white">{group.title}</h3>
                  <p className="text-[11px] font-light text-zinc-500">{group.subtitle}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + gi * 0.12 + i * 0.06 }}
                    className={cn("rounded-xl border p-3.5", group.cardAccent)}
                  >
                    <p className="flex items-center gap-2 font-display text-[13px] font-bold text-white">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-purple-300" aria-hidden />
                      {item.title}
                    </p>
                    <p className="mt-1 pl-5.5 text-xs leading-relaxed font-light text-zinc-400">
                      {item.description}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          )
        })}
      </div>

      <InfoNote className="mt-6">{config.mentorship.scopeNote}</InfoNote>
    </div>
  )
}
