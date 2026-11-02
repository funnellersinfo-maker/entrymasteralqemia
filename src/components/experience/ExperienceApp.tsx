"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Settings } from "lucide-react"
import { DEFAULT_CONFIG, type SiteConfig } from "@/lib/content"
import { loadSiteConfig } from "@/lib/store"
import { STAGES, TOTAL_STAGES } from "@/lib/stages"
import { useProgress } from "@/lib/progress"
import { BackgroundFX } from "./BackgroundFX"
import { TopBar } from "./TopBar"
import { BottomNav } from "./BottomNav"
import { BadgeToast, type ToastBadge } from "./BadgeToast"
import { AdminPanel } from "@/components/admin/AdminPanel"
import { StageWelcome } from "./stages/StageWelcome"
import { StageModel } from "./stages/StageModel"
import { StageMasterShop } from "./stages/StageMasterShop"
import { StageStore } from "./stages/StageStore"
import { StageNumbers } from "./stages/StageNumbers"
import { StageIncludes } from "./stages/StageIncludes"
import { StageMentor } from "./stages/StageMentor"
import { StageCTA } from "./stages/StageCTA"

export interface StageProps {
  config: SiteConfig
  stageIndex: number
  completed: boolean
  quizDone: boolean
  onQuizCorrect: () => void
  goNext: () => void
  markLeadSent: () => void
  leadSent: boolean
  completedStageIds: string[]
}

const STAGE_COMPONENTS: Record<string, React.ComponentType<StageProps>> = {
  welcome: StageWelcome,
  model: StageModel,
  mastershop: StageMasterShop,
  tienda: StageStore,
  numbers: StageNumbers,
  includes: StageIncludes,
  mentor: StageMentor,
  cta: StageCTA,
}

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 70 : -70, filter: "blur(6px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -70 : 70, filter: "blur(6px)" }),
}

export function ExperienceApp() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [direction, setDirection] = useState(1)
  const [adminOpen, setAdminOpen] = useState(false)
  const [toast, setToast] = useState<ToastBadge | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { progress, hydrated, goTo, markCompleted, unlockBadge, markQuizDone, setLeadSent, reset } =
    useProgress()

  // Cargar configuración (valores guardados en este navegador + valores por defecto)
  useEffect(() => {
    const t = setTimeout(() => setConfig(loadSiteConfig()), 0)
    return () => clearTimeout(t)
  }, [])

  // Muestra el toast de insignia desbloqueada
  const showBadgeToast = useCallback((def: { id: string; icon: string; title: string; description: string }) => {
    setToast({ id: def.id, icon: def.icon, title: def.title, description: def.description })
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 4000)
  }, [])

  const stageIndex = Math.min(progress.current, TOTAL_STAGES - 1)
  const stage = STAGES[stageIndex]
  const StageComponent = STAGE_COMPONENTS[stage.id] ?? StageWelcome

  const goNext = useCallback(() => {
    if (stageIndex >= TOTAL_STAGES - 1) return
    const s = STAGES[stageIndex]
    markCompleted(s.id)
    if (s.badge) {
      unlockBadge(s.badge.id)
      showBadgeToast(s.badge)
    }
    setDirection(1)
    goTo(stageIndex + 1)
  }, [stageIndex, markCompleted, unlockBadge, showBadgeToast, goTo])

  const goBack = useCallback(() => {
    if (stageIndex <= 0) return
    setDirection(-1)
    goTo(stageIndex - 1)
  }, [stageIndex, goTo])

  const handleQuizCorrect = useCallback(() => {
    markQuizDone(stage.id)
  }, [markQuizDone, stage.id])

  // Al enviar el formulario final: marca el lead y otorga la insignia de ruta completa
  const handleLeadSent = useCallback(() => {
    setLeadSent()
    markCompleted("cta")
    const def = STAGES.find((s) => s.id === "cta")?.badge
    if (def) {
      unlockBadge(def.id)
      showBadgeToast(def)
    }
  }, [setLeadSent, markCompleted, unlockBadge, showBadgeToast])

  const handleRestart = useCallback(() => {
    reset()
    setDirection(-1)
    goTo(0)
  }, [reset, goTo])

  const progressPercent = (stageIndex / (TOTAL_STAGES - 1)) * 100
  const etapeLabel = stage.etape ? `Etapa ${stage.etape}/${TOTAL_STAGES}` : "Sección"
  const stageLabel = `${stage.kicker} · ${stage.navTitle}`

  const stageProps: StageProps = {
    config: config ?? DEFAULT_CONFIG,
    stageIndex,
    completed: progress.completed.includes(stage.id),
    quizDone: progress.quizDone.includes(stage.id),
    onQuizCorrect: handleQuizCorrect,
    goNext,
    markLeadSent: handleLeadSent,
    leadSent: progress.leadSent,
    completedStageIds: progress.completed,
  }

  const handleConfigSaved = useCallback((newConfig: SiteConfig) => {
    setConfig(newConfig)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <BackgroundFX />

      <TopBar
        progressPercent={progressPercent}
        stageLabel={stageLabel}
        etapeLabel={etapeLabel}
        xp={progress.xp}
        badgeCount={progress.badges.length}
        config={config ?? DEFAULT_CONFIG}
      />

      <BadgeToast badge={toast} />

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 pt-28 pb-32 sm:px-6 sm:pt-36 sm:pb-32">
        {config === null || !hydrated ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-5" role="status" aria-label="Cargando experiencia">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 font-display text-sm font-bold text-white neon-glow animate-pulse-glow">
              MS
            </div>
            <p className="font-display text-xs font-semibold tracking-[0.3em] text-purple-300 uppercase">
              Cargando experiencia…
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={stage.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <StageComponent {...stageProps} />
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Pie de página — pegado abajo por el layout flex (respeta la barra fija inferior) */}
      <footer
        className={`relative z-10 mt-auto border-t border-white/[0.05] pt-4 ${
          stageIndex > 0 ? "pb-28 sm:pb-28" : "pb-[max(1rem,env(safe-area-inset-bottom))]"
        }`}
      >
        <p className="text-center text-[10px] leading-relaxed text-zinc-600">
          {config?.brand.name ?? "MASTERSHOP"} {config?.brand.program ?? "E-COMMERCE"} · Mentoría
          presentada por {config?.brand.presenter ?? "Alejo"} · Una experiencia de{" "}
          {config?.mentor.academyName ?? "ALQEMIA"}.
          <br className="hidden sm:block" /> Los ejemplos y cifras son ilustrativos y no garantizan
          resultados.
        </p>
        {/* Tuerca discreta — acceso al panel de administración (siempre al final del inicio) */}
        <div className="mt-3 flex justify-center">
          <button
            onClick={() => setAdminOpen(true)}
            aria-label="Abrir panel de administración"
            title="Panel de administración"
            className="rounded-md p-1.5 text-zinc-700 transition-colors hover:text-purple-300 focus-visible:outline-2 focus-visible:outline-purple-400"
          >
            <Settings className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </footer>

      {config !== null && stageIndex > 0 && (
        <BottomNav
          current={stageIndex}
          onBack={goBack}
          onNext={goNext}
          isLast={stageIndex === TOTAL_STAGES - 1}
          completedCount={Math.min(progress.completed.length, TOTAL_STAGES)}
          onRestart={handleRestart}
          nextLabel="Continuar"
        />
      )}

      {config !== null && (
        <AdminPanel
          open={adminOpen}
          onOpenChange={setAdminOpen}
          config={config}
          onSaved={handleConfigSaved}
        />
      )}
    </div>
  )
}
