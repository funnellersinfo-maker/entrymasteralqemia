"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, Search, ShoppingCart, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const STORE_PRODUCTS = [
  { name: "Sérum facial", price: "$79.900", image: "/images/cat-belleza.png" },
  { name: "Audífonos wireless", price: "$129.900", image: "/images/cat-tecnologia.png" },
  { name: "Sneakers unisex", price: "$189.900", image: "/images/cat-moda.png" },
  { name: "Colágeno en polvo", price: "$89.900", image: "/images/cat-salud.png" },
] as const

/** Teléfono mostrando la tienda online */
export function PhoneStoreMockup({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative mx-auto w-56 sm:w-64", className)}
    >
      <div className="absolute -inset-5 rounded-[3rem] bg-purple-600/25 blur-2xl" aria-hidden />
      {/* Marco del teléfono */}
      <div className="relative rounded-[2.2rem] border border-purple-500/40 bg-[#0b0716] p-2.5 shadow-[0_25px_80px_-20px_rgba(126,34,206,0.55)]">
        <div className="overflow-hidden rounded-[1.7rem] bg-[#0e0920]">
          {/* Notch */}
          <div className="flex justify-center bg-black/60 pt-1.5 pb-1">
            <span className="h-1.5 w-16 rounded-full bg-zinc-800" />
          </div>
          {/* Barra superior de la tienda */}
          <div className="flex items-center justify-between bg-gradient-to-r from-purple-900/60 to-fuchsia-900/40 px-3 py-2.5">
            <span className="font-display text-[10px] font-bold tracking-wide text-white">TUTIENDA.CO</span>
            <div className="flex items-center gap-2">
              <Search className="h-3 w-3 text-purple-300" aria-hidden />
              <ShoppingCart className="h-3 w-3 text-purple-300" aria-hidden />
            </div>
          </div>
          {/* Categorías */}
          <div className="flex gap-1.5 overflow-hidden border-b border-white/5 px-3 py-2">
            {["Todo", "Belleza", "Tecno", "Moda"].map((c, i) => (
              <span
                key={c}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[8px] font-semibold",
                  i === 0
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
                    : "bg-white/[0.06] text-zinc-500"
                )}
              >
                {c}
              </span>
            ))}
          </div>
          {/* Productos */}
          <div className="grid grid-cols-2 gap-2 p-2.5">
            {STORE_PRODUCTS.map((p) => (
              <div key={p.name} className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03]">
                <div className="relative aspect-square">
                  <Image src={p.image} alt={p.name} fill sizes="120px" loading="eager" className="object-cover" />
                  <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                    <Heart className="h-2.5 w-2.5 text-white" aria-hidden />
                  </span>
                </div>
                <div className="p-1.5">
                  <p className="truncate text-[8.5px] font-semibold text-zinc-200">{p.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-display text-[9px] font-bold text-fuchsia-300">{p.price}</p>
                    <Star className="h-2 w-2 fill-amber-400 text-amber-400" aria-hidden />
                  </div>
                  <div className="mt-1.5 rounded-md bg-gradient-to-r from-purple-600 to-fuchsia-600 py-1 text-center text-[8px] font-bold text-white">
                    Comprar
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/** Escritorio mostrando la tienda online */
export function DesktopStoreMockup({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative", className)}
    >
      <div className="absolute -inset-6 rounded-3xl bg-fuchsia-700/15 blur-3xl" aria-hidden />
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0d0819]/95 shadow-[0_25px_80px_-25px_rgba(126,34,206,0.4)]">
        {/* Barra del navegador */}
        <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-rose-500/70" />
          <span className="h-2 w-2 rounded-full bg-amber-500/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
          <span className="ml-3 rounded-md bg-white/[0.05] px-3 py-0.5 font-mono text-[9px] text-zinc-500">
            tutienda.co
          </span>
        </div>
        {/* Banner de la tienda */}
        <div className="relative flex items-center overflow-hidden bg-gradient-to-r from-purple-900/50 via-[#1a0f33] to-fuchsia-900/40 px-4 py-3">
          <div className="z-10">
            <p className="font-display text-[9px] font-bold tracking-[0.2em] text-fuchsia-300 uppercase">
              Nueva colección
            </p>
            <p className="font-display text-sm font-extrabold text-white">ENVÍOS A TODO EL PAÍS</p>
          </div>
          <div className="absolute -right-6 -bottom-8 h-24 w-24 rounded-full bg-fuchsia-600/25 blur-2xl" aria-hidden />
        </div>
        {/* Grilla de productos */}
        <div className="grid grid-cols-4 gap-2 p-3">
          {STORE_PRODUCTS.map((p) => (
            <div key={p.name} className="overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.02]">
              <div className="relative aspect-[4/3]">
                <Image src={p.image} alt={p.name} fill sizes="150px" loading="eager" className="object-cover opacity-90" />
              </div>
              <div className="p-1.5">
                <p className="truncate text-[8px] font-semibold text-zinc-300">{p.name}</p>
                <p className="font-display text-[9px] font-bold text-fuchsia-300">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
