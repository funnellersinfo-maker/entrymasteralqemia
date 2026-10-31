"use client"

import { motion, useReducedMotion } from "framer-motion"

/** Fondo cinematográfico: rejilla tecnológica + orbes de neón */
export function BackgroundFX() {
  const reduced = useReducedMotion()
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Base oscura */}
      <div className="absolute inset-0 bg-[#07040f]" />
      {/* Rejilla */}
      <div className="absolute inset-0 bg-tech-grid" />
      {/* Orbes de neón */}
      <motion.div
        className="absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-purple-700/25 blur-[130px]"
        animate={reduced ? undefined : { x: [0, 60, 0], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -left-40 h-[26rem] w-[26rem] rounded-full bg-fuchsia-700/20 blur-[120px]"
        animate={reduced ? undefined : { y: [0, 70, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-violet-800/25 blur-[130px]"
        animate={reduced ? undefined : { x: [0, -50, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(4,2,10,0.85)_100%)]" />
    </div>
  )
}
