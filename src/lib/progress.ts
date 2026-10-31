"use client"

// ============================================================
// Progreso de la experiencia — persistido en localStorage
// ============================================================

import { useCallback, useEffect, useState } from "react"

export interface ProgressState {
  current: number
  completed: string[]
  badges: string[]
  xp: number
  quizDone: string[]
  leadSent: boolean
}

const STORAGE_KEY = "mastershop_progress_v1"

const INITIAL: ProgressState = {
  current: 0,
  completed: [],
  badges: [],
  xp: 0,
  quizDone: [],
  leadSent: false,
}

function loadProgress(): ProgressState {
  if (typeof window === "undefined") return INITIAL
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return INITIAL
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    return {
      current: typeof parsed.current === "number" ? parsed.current : 0,
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      quizDone: Array.isArray(parsed.quizDone) ? parsed.quizDone : [],
      leadSent: Boolean(parsed.leadSent),
    }
  } catch {
    return INITIAL
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(INITIAL)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Diferido a una microtarea para respetar el ciclo de hidratación de React
    const t = setTimeout(() => {
      setProgress(loadProgress())
      setHydrated(true)
    }, 0)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // almacenamiento no disponible — la experiencia sigue funcionando
    }
  }, [progress, hydrated])

  const goTo = useCallback((index: number) => {
    setProgress((p) => ({ ...p, current: index }))
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [])

  const markCompleted = useCallback((stageId: string) => {
    setProgress((p) =>
      p.completed.includes(stageId)
        ? p
        : { ...p, completed: [...p.completed, stageId], xp: p.xp + 10 }
    )
  }, [])

  const unlockBadge = useCallback((badgeId: string) => {
    setProgress((p) =>
      p.badges.includes(badgeId)
        ? p
        : { ...p, badges: [...p.badges, badgeId], xp: p.xp + 15 }
    )
  }, [])

  const markQuizDone = useCallback((stageId: string) => {
    setProgress((p) =>
      p.quizDone.includes(stageId)
        ? p
        : { ...p, quizDone: [...p.quizDone, stageId], xp: p.xp + 5 }
    )
  }, [])

  const setLeadSent = useCallback(() => {
    setProgress((p) => ({ ...p, leadSent: true }))
  }, [])

  const reset = useCallback(() => {
    setProgress(INITIAL)
  }, [])

  return {
    progress,
    hydrated,
    goTo,
    markCompleted,
    unlockBadge,
    markQuizDone,
    setLeadSent,
    reset,
  }
}
