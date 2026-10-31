"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  Facebook,
  GraduationCap,
  Heart,
  Instagram,
  Laugh,
  MessageCircle,
  Music2,
  Play,
  Send,
  Share2,
  Sparkles,
  Target,
  Video,
  Zap,
} from "lucide-react"
import type { StageProps } from "../ExperienceApp"
import { getStageText, StageHeader, StageSection } from "../shared"
import { cn } from "@/lib/utils"

const CONTENT_TYPES = [
  { icon: Video, label: "Videos cortos", color: "text-fuchsia-300" },
  { icon: Play, label: "Demostraciones", color: "text-purple-300" },
  { icon: Sparkles, label: "Beneficios y características", color: "text-violet-300" },
  { icon: Zap, label: "Ganchos de atención", color: "text-pink-300" },
  { icon: GraduationCap, label: "Contenido educativo", color: "text-amber-300" },
  { icon: Laugh, label: "Entretenimiento", color: "text-emerald-300" },
  { icon: Target, label: "Llamados a la acción", color: "text-rose-300" },
] as const

const POSTS = [
  {
    network: "Instagram",
    icon: Instagram,
    username: "@tutienda.co",
    image: "/images/cat-belleza.png",
    caption: "Tu piel también merece un momento de calma ✦ Sérum facial disponible ahora.",
    cta: "Link en la bio",
    likes: "2.4k",
    comments: "186",
  },
  {
    network: "TikTok",
    icon: Music2,
    username: "@tutienda.co",
    image: "/images/cat-tecnologia.png",
    caption: "POV: encuentras los audífonos que necesitabas a mitad de precio",
    cta: "Comenta TIENDA y te envío el link",
    likes: "12.8k",
    comments: "940",
  },
  {
    network: "Facebook",
    icon: Facebook,
    username: "Tu Tienda CO",
    image: "/images/cat-hogar.png",
    caption: "Ilumina tus noches: lámpara LED ambiental con envío a todo el país.",
    cta: "Escríbenos por WhatsApp",
    likes: "890",
    comments: "124",
  },
] as const

export function StageContent({ config, stageIndex }: StageProps) {
  const { kicker, title, subtitle } = getStageText(stageIndex, config)

  return (
    <div>
      <StageHeader kicker={kicker} title={title} subtitle={subtitle} />

      {/* Tipos de contenido */}
      <StageSection>
        <div className="flex flex-wrap gap-2">
          {CONTENT_TYPES.map((t, i) => (
            <motion.span
              key={t.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-purple-500/40 hover:text-white"
            >
              <t.icon className={cn("h-3.5 w-3.5", t.color)} aria-hidden />
              {t.label}
            </motion.span>
          ))}
        </div>
      </StageSection>

      {/* Publicaciones de ejemplo */}
      <StageSection>
        <p className="mb-4 font-display text-xs font-bold tracking-[0.28em] text-zinc-500 uppercase">
          Ejemplos de publicaciones
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.network}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12 }}
              whileHover={{ y: -5 }}
              className="glass-card glass-card-hover overflow-hidden p-0"
            >
              {/* Encabezado */}
              <div className="flex items-center gap-2.5 px-3.5 py-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 font-display text-[9px] font-bold text-white">
                  TT
                </span>
                <div className="flex-1 leading-tight">
                  <p className="text-xs font-bold text-white">{post.username}</p>
                  <p className="flex items-center gap-1 text-[10px] text-zinc-500">
                    <post.icon className="h-3 w-3" aria-hidden />
                    {post.network} · hace 2h
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] font-semibold text-zinc-500 uppercase">
                  Ejemplo
                </span>
              </div>
              {/* Imagen */}
              <div className="relative aspect-square">
                <Image
                  src={post.image}
                  alt={`Ejemplo de publicación de ${post.network} mostrando un producto`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  loading="eager"
                  className="object-cover"
                />
                {post.network === "TikTok" && (
                  <>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm">
                        <Play className="h-5 w-5 fill-white text-white" aria-hidden />
                      </span>
                    </span>
                    <span className="absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[9px] font-semibold text-white backdrop-blur-sm">
                      <Music2 className="h-3 w-3" aria-hidden /> audio trending
                    </span>
                  </>
                )}
              </div>
              {/* Interacción */}
              <div className="px-3.5 py-3">
                <div className="mb-2 flex items-center gap-3 text-zinc-400">
                  <span className="flex items-center gap-1 text-[11px] font-semibold">
                    <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" aria-hidden />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold">
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                    {post.comments}
                  </span>
                  <Share2 className="ml-auto h-3.5 w-3.5" aria-hidden />
                  <Send className="h-3.5 w-3.5" aria-hidden />
                </div>
                <p className="text-xs leading-relaxed font-light text-zinc-300">
                  <span className="font-bold text-white">{post.username}</span> {post.caption}
                </p>
                <p className="mt-2 inline-flex rounded-md bg-gradient-to-r from-purple-600/80 to-fuchsia-600/80 px-2.5 py-1 text-[10px] font-bold text-white">
                  {post.cta}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </StageSection>

      {/* IA como apoyo */}
      <StageSection>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl border border-violet-500/40 bg-gradient-to-br from-violet-950/60 via-[#150c2c] to-purple-950/40 p-5 sm:p-6"
        >
          <div className="pointer-events-none absolute -top-12 -left-12 h-36 w-36 rounded-full bg-violet-600/25 blur-3xl" aria-hidden />
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 neon-glow">
              <Sparkles className="h-6 w-6 text-white" aria-hidden />
            </div>
            <div>
              <p className="font-display text-base font-bold text-white sm:text-lg">
                La IA como <span className="text-gradient-soft">copiloto creativo</span>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed font-light text-zinc-300">
                En la mentoría aprenderás a usar inteligencia artificial como apoyo para:
              </p>
              <ul className="mt-3 grid gap-2 text-[13px] font-light text-zinc-300 sm:grid-cols-2">
                {[
                  "Generar ideas de contenido",
                  "Escribir guiones para videos",
                  "Crear imágenes de producto",
                  "Producir contenido audiovisual",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
                La IA acelera la producción; la estrategia y la publicación siguen siendo tuyas.
              </p>
            </div>
          </div>
        </motion.div>
      </StageSection>
    </div>
  )
}
