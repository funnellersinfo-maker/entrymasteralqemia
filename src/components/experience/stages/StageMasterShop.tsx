"use client"

import { motion } from "framer-motion"
import { Globe2 } from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { getStageText, InfoNote, StageHeader, StageSection } from "../shared"
import { MasterShopPanel } from "../mockups/MasterShopPanel"

export function StageMasterShop({ config, stageIndex }: StageProps) {
  const { kicker, title, subtitle } = getStageText(stageIndex, config)

  return (
    <div>
      <StageHeader kicker={kicker} title={title} subtitle={subtitle} />

      {/* Qué es MasterShop */}
      <StageSection>
        <div className="glass-card relative overflow-hidden p-5 sm:p-6">
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-purple-600/20 blur-3xl" />
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 neon-glow">
              <Globe2 className="h-6 w-6 text-white" aria-hidden />
            </div>
            <div>
              <p className="font-display text-base font-bold text-white sm:text-lg">
                Una plataforma <span className="text-gradient">colombiana</span> para operar dropshipping
              </p>
              <p className="mt-2 text-sm leading-relaxed font-light text-zinc-400">
                MasterShop reúne en un solo lugar las piezas del modelo: catálogo de productos,
                proveedores, pedidos y despachos, para que gestiones tu negocio digital sin saltar
                entre diez herramientas distintas.
              </p>
            </div>
          </div>
        </div>
      </StageSection>

      {/* Mockup del panel */}
      <StageSection>
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-purple-500/60" />
          <p className="font-display text-[10px] font-bold tracking-[0.28em] text-zinc-500 uppercase">
            Así se ve operar desde un panel
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-purple-500/60" />
        </div>
        <MasterShopPanel />
      </StageSection>

      {/* Funciones */}
      <StageSection>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {config.mastershop.features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.06 }}
              className="glass-card glass-card-hover p-4"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/15 font-mono text-[10px] font-bold text-purple-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[13px] font-bold text-white">{f.title}</h3>
              </div>
              <p className="text-xs leading-relaxed font-light text-zinc-400">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </StageSection>

      <InfoNote className="mb-2">{config.mastershop.disclaimer}</InfoNote>
    </div>
  )
}
