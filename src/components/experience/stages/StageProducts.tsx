"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import {
  Baby,
  BarChart3,
  CheckCircle2,
  Cpu,
  DollarSign,
  Dumbbell,
  Eye,
  HeartPulse,
  Lamp,
  Layers,
  MousePointerClick,
  PawPrint,
  Percent,
  Shirt,
  Sparkles,
  Target,
  Users2,
} from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { getStageText, InfoNote, StageHeader, StageSection } from "../shared"
import { formatCOP } from "@/lib/format"
import { cn } from "@/lib/utils"

const CRITERIA = [
  { icon: BarChart3, label: "Demanda potencial" },
  { icon: DollarSign, label: "Precio de venta" },
  { icon: Layers, label: "Costos" },
  { icon: Percent, label: "Margen" },
  { icon: Eye, label: "Competencia" },
  { icon: Sparkles, label: "Presentación visual" },
  { icon: Target, label: "Público objetivo" },
  { icon: CheckCircle2, label: "Disponibilidad del proveedor" },
] as const

interface ProductExample {
  name: string
  price: number
  cost: number
}

interface Category {
  id: string
  label: string
  icon: typeof HeartPulse
  image: string
  products: ProductExample[]
}

const CATEGORIES: Category[] = [
  {
    id: "salud",
    label: "Salud",
    icon: HeartPulse,
    image: "/images/cat-salud.png",
    products: [
      { name: "Colágeno en polvo", price: 89900, cost: 52000 },
      { name: "Multivitamínico diario", price: 64900, cost: 36000 },
      { name: "Infusión nocturna", price: 45900, cost: 24000 },
    ],
  },
  {
    id: "belleza",
    label: "Belleza",
    icon: Sparkles,
    image: "/images/cat-belleza.png",
    products: [
      { name: "Sérum facial", price: 79900, cost: 41000 },
      { name: "Kit de skincare", price: 149900, cost: 88000 },
      { name: "Máscara capilar", price: 59900, cost: 31000 },
    ],
  },
  {
    id: "hogar",
    label: "Hogar",
    icon: Lamp,
    image: "/images/cat-hogar.png",
    products: [
      { name: "Lámpara LED ambiental", price: 99900, cost: 58000 },
      { name: "Difusor aromático", price: 84900, cost: 47000 },
      { name: "Organizador modular", price: 69900, cost: 38000 },
    ],
  },
  {
    id: "tecnologia",
    label: "Tecnología",
    icon: Cpu,
    image: "/images/cat-tecnologia.png",
    products: [
      { name: "Audífonos inalámbricos", price: 129900, cost: 74000 },
      { name: "Smartwatch básico", price: 159900, cost: 95000 },
      { name: "Teclado compacto", price: 119900, cost: 68000 },
    ],
  },
  {
    id: "moda",
    label: "Moda",
    icon: Shirt,
    image: "/images/cat-moda.png",
    products: [
      { name: "Sneakers unisex", price: 189900, cost: 118000 },
      { name: "Reloj minimalista", price: 139900, cost: 78000 },
      { name: "Gafas polarizadas", price: 99900, cost: 52000 },
    ],
  },
  {
    id: "mascotas",
    label: "Mascotas",
    icon: PawPrint,
    image: "/images/cat-mascotas.png",
    products: [
      { name: "Cama ortopédica", price: 119900, cost: 66000 },
      { name: "Juguete interactivo", price: 69900, cost: 36000 },
      { name: "Correa retráctil", price: 54900, cost: 27000 },
    ],
  },
  {
    id: "bebes",
    label: "Bebés",
    icon: Baby,
    image: "/images/cat-bebes.png",
    products: [
      { name: "Mamadera anticólico", price: 74900, cost: 41000 },
      { name: "Set de mordederas", price: 59900, cost: 31000 },
      { name: "Almohada de apoyo", price: 89900, cost: 49000 },
    ],
  },
  {
    id: "deportes",
    label: "Deportes",
    icon: Dumbbell,
    image: "/images/cat-deportes.png",
    products: [
      { name: "Kit de bandas elásticas", price: 84900, cost: 44000 },
      { name: "Shaker pro", price: 49900, cost: 24000 },
      { name: "Rodillo de masaje", price: 79900, cost: 42000 },
    ],
  },
]

export function StageProducts({ config, stageIndex }: StageProps) {
  const { kicker, title, subtitle } = getStageText(stageIndex, config)
  const [selectedCat, setSelectedCat] = useState<string>("salud")
  const category = CATEGORIES.find((c) => c.id === selectedCat) ?? CATEGORIES[0]

  return (
    <div>
      <StageHeader kicker={kicker} title={title} subtitle={subtitle} />

      {/* Criterios */}
      <StageSection>
        <p className="mb-3 font-display text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase">
          Los 8 criterios de selección
        </p>
        <div className="flex flex-wrap gap-2">
          {CRITERIA.map((c, i) => (
            <motion.span
              key={c.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 + i * 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/[0.07] px-3.5 py-2 text-xs font-medium text-purple-200"
            >
              <c.icon className="h-3.5 w-3.5" aria-hidden />
              {c.label}
            </motion.span>
          ))}
        </div>
      </StageSection>

      {/* Categorías */}
      <StageSection>
        <p className="mb-3 flex items-center gap-2 font-display text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase">
          <MousePointerClick className="h-4 w-4 text-fuchsia-400" aria-hidden />
          Explora una categoría
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCat === cat.id
            return (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                whileTap={{ scale: 0.95 }}
                aria-pressed={isSelected}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border text-left transition-all duration-300",
                  isSelected
                    ? "border-fuchsia-500/60 shadow-[0_0_35px_-10px_rgba(217,70,239,0.6)]"
                    : "border-white/10 hover:border-purple-500/40"
                )}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#120b22]">
                  <Image
                    src={cat.image}
                    alt={`Categoría ${cat.label}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    loading="eager"
                    className={cn(
                      "object-cover transition-all duration-500",
                      isSelected ? "scale-105 opacity-90" : "opacity-60 group-hover:scale-105 group-hover:opacity-80"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0614] via-[#0a0614]/30 to-transparent" />
                  <cat.icon
                    className={cn(
                      "absolute top-3 left-3 h-5 w-5 transition-colors",
                      isSelected ? "text-fuchsia-300" : "text-zinc-400"
                    )}
                    aria-hidden
                  />
                </div>
                <p
                  className={cn(
                    "px-3 py-2.5 font-display text-xs font-bold tracking-wide",
                    isSelected ? "bg-fuchsia-500/15 text-white" : "bg-white/[0.03] text-zinc-300"
                  )}
                >
                  {cat.label}
                </p>
              </motion.button>
            )
          })}
        </div>
      </StageSection>

      {/* Productos de ejemplo */}
      <StageSection>
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid gap-3 sm:grid-cols-3"
          >
            {category.products.map((p, i) => {
              const margin = p.price - p.cost
              const marginPct = Math.round((margin / p.price) * 100)
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.08 }}
                  className="glass-card glass-card-hover p-4"
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h4 className="font-display text-sm leading-tight font-bold text-white">{p.name}</h4>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold text-zinc-500 uppercase">
                      Ilustrativo
                    </span>
                  </div>
                  <dl className="space-y-1.5 text-xs">
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <dt className="text-zinc-500">Precio de venta</dt>
                      <dd className="font-semibold text-white tabular-nums">{formatCOP(p.price)}</dd>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <dt className="text-zinc-500">Costo referencial</dt>
                      <dd className="font-semibold text-rose-300 tabular-nums">−{formatCOP(p.cost)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-zinc-400">Margen bruto</dt>
                      <dd className="font-bold text-emerald-300 tabular-nums">
                        +{formatCOP(margin)} · {marginPct}%
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${marginPct}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
        <InfoNote className="mt-4">
          Nombres, precios y costos son <strong>evidentemente ejemplos ilustrativos</strong> para
          practicar el análisis. Los valores reales dependen del catálogo, el proveedor y las
          condiciones vigentes de la plataforma.
        </InfoNote>
      </StageSection>
    </div>
  )
}
