"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { MoveHorizontal, TrendingUp } from "lucide-react"
import type { SiteConfig } from "@/lib/content"
import { cn } from "@/lib/utils"

/**
 * Captura REAL del panel de MasterShop (rotada a horizontal).
 * En móvil: se inicia mostrando la zona de los montos (derecha de la
 * captura) y se puede deslizar para explorar todo el panel.
 */
export function MasterShopPanel({ config }: { config: SiteConfig }) {
  const scroller = useRef<HTMLDivElement>(null)

  // En móvil, al montar, posiciona el scroll al extremo derecho
  // (la zona de los montos altos: Ventas y Utilidades).
  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const showAmounts = () => {
      if (el.scrollWidth > el.clientWidth) el.scrollLeft = el.scrollWidth
    }
    showAmounts()
    // Reintenta tras la carga de la imagen
    const t = setTimeout(showAmounts, 400)
    return () => clearTimeout(t)
  }, [])

  const scrollToAmounts = () => {
    const el = scroller.current
    if (el) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="absolute -inset-8 rounded-[2rem] bg-emerald-500/10 blur-3xl" aria-hidden />

      {/* Marco del navegador */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-[#06090c]/95 shadow-[0_20px_70px_-20px_rgba(16,185,129,0.35)]">
        {/* Barra del navegador */}
        <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          <div className="ml-3 flex flex-1 items-center gap-2 overflow-hidden rounded-md bg-white/[0.05] px-3 py-1">
            <Image
              src={config.mastershop.logoUrl}
              alt=""
              width={12}
              height={12}
              className="h-3 w-3 rounded-sm"
            />
            <span className="truncate font-mono text-[10px] text-zinc-500">
              panel.mastershop.co · {config.mastershop.panelCaption.toLowerCase()}
            </span>
          </div>
          <span className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-300 uppercase sm:inline">
            Vista real
          </span>
        </div>

        {/* Captura real (horizontal) — deslizable en móvil */}
        <div
          ref={scroller}
          className="mastershop-panel-scroller custom-scrollbar overflow-x-auto overscroll-x-contain"
          role="region"
          aria-label="Captura del panel de MasterShop, deslizable horizontalmente"
        >
          <div className="relative min-w-full sm:w-full">
            <Image
              src={config.mastershop.panelImageUrl}
              alt="Panel de administración de MasterShop con ventas y utilidades registradas"
              width={1600}
              height={800}
              priority
              className="block h-auto w-full min-w-[760px] select-none sm:min-w-0"
              draggable={false}
            />
            {/* Destello de escaneo decorativo */}
            <div
              className="pointer-events-none absolute inset-y-0 w-1/4 animate-scan bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent"
              aria-hidden
            />
          </div>
        </div>

        {/* Barra inferior: pista de deslizamiento en móvil */}
        <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] bg-white/[0.02] px-3 py-2 sm:justify-center">
          <p className="flex items-center gap-1.5 text-[10px] font-light text-zinc-500 sm:hidden">
            <MoveHorizontal className="h-3.5 w-3.5 text-emerald-400/70" aria-hidden />
            Desliza para explorar el panel
          </p>
          <button
            onClick={scrollToAmounts}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-300 transition-colors hover:bg-emerald-500/20 sm:hidden"
          >
            <TrendingUp className="h-3 w-3" aria-hidden />
            Ver montos
          </button>
          <p className="hidden text-[10px] font-light text-zinc-500 sm:block">
            {config.mastershop.panelCaption} — vista de la operación desde un solo lugar.
          </p>
        </div>
      </div>

      {/* Montos destacados — siempre legibles en cualquier pantalla */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {config.mastershop.panelStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.12 }}
            className={cn(
              "relative overflow-hidden rounded-2xl border p-4 sm:p-5",
              i === 0
                ? "border-emerald-500/30 bg-gradient-to-br from-emerald-950/50 via-[#08110d] to-[#0a0614]"
                : "border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-[#100a1e] to-[#0a0614]"
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full blur-3xl",
                i === 0 ? "bg-emerald-500/15" : "bg-purple-600/20"
              )}
              aria-hidden
            />
            <p className="text-[10px] font-semibold tracking-[0.14em] text-zinc-500 uppercase">
              {stat.label}
            </p>
            <p
              className={cn(
                "mt-1.5 font-display text-lg font-extrabold tracking-tight tabular-nums break-words sm:text-2xl",
                i === 0 ? "text-emerald-300" : "text-purple-200"
              )}
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      <p className="mt-3 text-center text-[10px] leading-relaxed font-light text-zinc-600">
        {config.mastershop.panelNote}
      </p>
    </motion.div>
  )
}
