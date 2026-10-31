"use client"

import { AnimatePresence, motion } from "framer-motion"
import { BadgeIcon } from "./shared"

export interface ToastBadge {
  id: string
  icon: string
  title: string
  description: string
}

export function BadgeToast({ badge }: { badge: ToastBadge | null }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-24 z-50 flex justify-center px-4"
      aria-live="polite"
    >
      <AnimatePresence>
        {badge && (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: -28, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-fuchsia-500/40 bg-gradient-to-r from-purple-950/95 via-[#170b2c]/95 to-fuchsia-950/90 px-5 py-4 shadow-[0_0_50px_-10px_rgba(217,70,239,0.6)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-y-0 w-1/3 animate-scan bg-gradient-to-r from-transparent via-fuchsia-500/15 to-transparent" />
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 neon-glow">
              <BadgeIcon icon={badge.icon} className="h-6 w-6 text-white" />
            </div>
            <div className="relative">
              <p className="font-display text-[10px] font-bold tracking-[0.22em] text-fuchsia-300 uppercase">
                Insignia desbloqueada
              </p>
              <p className="font-display text-base font-bold text-white">{badge.title}</p>
              <p className="text-xs text-zinc-400">{badge.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
