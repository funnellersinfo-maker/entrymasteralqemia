"use client"

// ============================================================
// Almacenamiento 100% local (localStorage) — funciona igual en
// desarrollo y en el deploy estático (Cloudflare Pages).
// · Leads del formulario final
// · Configuración editable del panel de administración
// · Clave de acceso del panel de administración
// ============================================================

import { mergeConfig, type SiteConfig } from "@/lib/content"

// ------------------------- LEADS -------------------------

export interface LeadRecord {
  id: string
  name: string
  whatsapp: string
  email: string
  experience: string
  goal: string
  /** Rango de inversión inicial seleccionado (ver BUDGET_RANGES) */
  budget: string
  hasMasterShopAccount: boolean
  source: string
  createdAt: string
}

/** Rangos de inversión inicial disponibles en el formulario */
export const BUDGET_RANGES = [
  "Menos de $150 USD",
  "Entre $150 y $300 USD",
  "Entre $301 y $500 USD",
  "Entre $501 y $1.000 USD",
  "Más de $1.000 USD",
  "Aún no lo tengo definido",
] as const

const LEADS_KEY = "mastershop_leads_v1"

export function getLeads(): LeadRecord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(LEADS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as LeadRecord[]) : []
  } catch {
    return []
  }
}

export function saveLead(lead: LeadRecord): void {
  if (typeof window === "undefined") return
  try {
    const leads = getLeads()
    window.localStorage.setItem(LEADS_KEY, JSON.stringify([lead, ...leads]))
  } catch {
    // almacenamiento no disponible — la experiencia sigue funcionando
  }
}

export function clearLeads(): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(LEADS_KEY)
  } catch {
    /* noop */
  }
}

function csvEscape(value: string): string {
  const v = value ?? ""
  if (/[",;\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`
  return v
}

export function leadsToCsv(leads: LeadRecord[]): string {
  const header = [
    "Fecha",
    "Nombre",
    "WhatsApp",
    "Correo",
    "Experiencia",
    "Objetivo",
    "Inversion inicial",
    "Cuenta MasterShop",
    "Origen",
  ]
  const rows = leads.map((l) =>
    [
      new Date(l.createdAt).toLocaleString("es-CO"),
      l.name,
      l.whatsapp,
      l.email,
      l.experience,
      l.goal,
      l.budget,
      l.hasMasterShopAccount ? "Sí" : "No",
      l.source,
    ]
      .map(csvEscape)
      .join(",")
  )
  return [header.join(","), ...rows].join("\n")
}

// ---------------------- CONFIGURACIÓN ----------------------

const CONFIG_KEY = "mastershop_config_v1"

/** Config guardada en este navegador (sin fusionar) o null */
export function loadSavedConfigRaw(): unknown | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(CONFIG_KEY)
    return raw ? (JSON.parse(raw) as unknown) : null
  } catch {
    return null
  }
}

/** Config guardada fusionada sobre los valores por defecto */
export function loadSiteConfig(): SiteConfig {
  const saved = loadSavedConfigRaw()
  return saved ? mergeConfig(saved) : mergeConfig(null)
}

export function saveSiteConfig(config: SiteConfig): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
  } catch {
    /* noop */
  }
}

export function clearSavedConfig(): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(CONFIG_KEY)
  } catch {
    /* noop */
  }
}

// ------------------- CLAVE DEL PANEL ADMIN -------------------

const PASS_KEY = "mastershop_admin_pass_v1"

/** Clave por defecto del panel (se puede cambiar dentro del panel) */
export const DEFAULT_ADMIN_PASSWORD = "alqemia2025"

async function sha256(text: string): Promise<string> {
  try {
    if (typeof crypto !== "undefined" && crypto.subtle) {
      const data = new TextEncoder().encode(text)
      const digest = await crypto.subtle.digest("SHA-256", data)
      return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    }
  } catch {
    /* contexto no seguro — usar respaldo */
  }
  // Respaldo simple (no criográfico) para contextos sin Web Crypto
  let h1 = 0x811c9dc5
  let h2 = 0x1000193
  for (let i = 0; i < text.length; i++) {
    h1 = (h1 ^ text.charCodeAt(i)) * 0x01000193
    h2 = (h2 + text.charCodeAt(i) * (i + 7)) >>> 0
  }
  return `fallback_${(h1 >>> 0).toString(16)}_${h2.toString(16)}`
}

async function storedHash(): Promise<string> {
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(PASS_KEY)
      if (stored) return stored
    } catch {
      /* noop */
    }
  }
  return sha256(DEFAULT_ADMIN_PASSWORD)
}

export async function verifyAdminPassword(input: string): Promise<boolean> {
  if (!input) return false
  const [a, b] = await Promise.all([sha256(input), storedHash()])
  return a === b
}

/** Cambia la clave del panel. Devuelve false si la clave actual no coincide. */
export async function changeAdminPassword(current: string, next: string): Promise<boolean> {
  const ok = await verifyAdminPassword(current)
  if (!ok || !next || next.length < 4) return false
  const hash = await sha256(next)
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(PASS_KEY, hash)
    } catch {
      return false
    }
  }
  return true
}

/** Restaura la clave por defecto */
export async function resetAdminPassword(): Promise<void> {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(PASS_KEY)
  } catch {
    /* noop */
  }
}
