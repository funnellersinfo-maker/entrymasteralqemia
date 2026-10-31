"use client"

import { motion } from "framer-motion"
import {
  Bell,
  CircleCheck,
  Home,
  LayoutGrid,
  Package,
  Search,
  Settings,
  Truck,
  Users,
  Warehouse,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { icon: Home, label: "Inicio" },
  { icon: LayoutGrid, label: "Catálogo" },
  { icon: Warehouse, label: "Proveedores" },
  { icon: Package, label: "Pedidos" },
  { icon: Truck, label: "Envíos" },
  { icon: Users, label: "Clientes" },
  { icon: Settings, label: "Ajustes" },
] as const

const STATS = [
  { label: "Ventas del mes", value: "—" },
  { label: "Pedidos activos", value: "—" },
  { label: "Entregas", value: "—" },
] as const

const PRODUCTS = [
  { name: "Producto A", price: "—", status: "Publicado", tone: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10" },
  { name: "Producto B", price: "—", status: "En revisión", tone: "text-amber-300 border-amber-500/30 bg-amber-500/10" },
  { name: "Producto C", price: "—", status: "Publicado", tone: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10" },
  { name: "Producto D", price: "—", status: "Agotado", tone: "text-rose-300 border-rose-500/30 bg-rose-500/10" },
] as const

/** Mockup ilustrativo del panel de administración de MasterShop */
export function MasterShopPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="absolute -inset-8 rounded-[2rem] bg-purple-600/20 blur-3xl" aria-hidden />
      {/* Marco del navegador */}
      <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-[#0d0819]/95 shadow-[0_20px_70px_-20px_rgba(126,34,206,0.45)]">
        {/* Barra del navegador */}
        <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-white/[0.05] px-3 py-1">
            <Search className="h-3 w-3 text-zinc-600" aria-hidden />
            <span className="font-mono text-[10px] text-zinc-500">panel.tutienda.co/admin</span>
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[9.5rem_1fr]">
          {/* Sidebar */}
          <nav className="border-r border-white/[0.07] p-2 sm:p-3" aria-label="Secciones del panel">
            <div className="mb-3 hidden items-center gap-2 px-2 pt-1 sm:flex">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-purple-600 to-fuchsia-600 font-display text-[8px] font-bold text-white">
                MS
              </span>
              <span className="font-display text-[10px] font-bold text-white">MasterShop</span>
            </div>
            {NAV.map((item, i) => (
              <div
                key={item.label}
                className={cn(
                  "mb-0.5 flex items-center gap-2 rounded-lg px-2 py-1.5 sm:px-2.5",
                  i === 1 && "bg-purple-500/20 text-purple-200",
                  i !== 1 && "text-zinc-500"
                )}
              >
                <item.icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="hidden text-[11px] font-medium sm:inline">{item.label}</span>
              </div>
            ))}
          </nav>

          {/* Contenido */}
          <div className="p-3 sm:p-4">
            {/* Encabezado */}
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="font-display text-xs font-bold text-white sm:text-sm">Catálogo de la tienda</p>
                <p className="text-[10px] text-zinc-600">Gestión de productos</p>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="h-3.5 w-3.5 text-zinc-500" aria-hidden />
                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600" />
              </div>
            </div>

            {/* Estadísticas ilustrativas */}
            <div className="mb-3 grid grid-cols-3 gap-2">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5 sm:p-3">
                  <p className="truncate text-[8px] leading-tight text-zinc-500 uppercase sm:text-[9px]">{s.label}</p>
                  <p className="mt-1 font-display text-sm font-bold text-zinc-600 sm:text-base">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Tabla de productos */}
            <div className="overflow-hidden rounded-lg border border-white/[0.07]">
              <div className="hidden grid-cols-[1fr_auto_auto] gap-2 bg-white/[0.03] px-3 py-2 text-[9px] font-semibold tracking-wider text-zinc-500 uppercase sm:grid">
                <span>Producto</span>
                <span>Precio</span>
                <span>Estado</span>
              </div>
              {PRODUCTS.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1fr_auto] items-center gap-2 border-t border-white/[0.05] px-3 py-2 sm:grid-cols-[1fr_auto_auto]"
                >
                  <span className="flex items-center gap-2 text-[11px] font-medium text-zinc-300">
                    <span className="h-6 w-6 shrink-0 rounded-md bg-gradient-to-br from-purple-800/60 to-fuchsia-800/40" />
                    {p.name}
                  </span>
                  <span className="hidden text-[11px] text-zinc-500 sm:block">{p.price}</span>
                  <span className={cn("rounded-full border px-2 py-0.5 text-[9px] font-semibold", p.tone)}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-[9px] text-zinc-600">
              <CircleCheck className="h-3 w-3 text-purple-500/50" aria-hidden />
              Mockup ilustrativo — la interfaz real corresponde a la plataforma MasterShop
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
