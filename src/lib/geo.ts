"use client"

// ============================================================
// Detección de país por IP — 100% en el cliente, sin API keys.
// Se usa para pre-seleccionar el país del visitante en el
// formulario final (editable por el usuario).
//
// Servicios gratuitos con CORS habilitado:
//   1) ipwho.is  (principal — sin límite práctico)
//   2) ipapi.co  (respaldo — ~1.000 consultas/día)
// Si ambos fallan, el visitante selecciona su país manualmente.
// ============================================================

/** Países frecuentes del público hispanohablante + "Otro" */
export const COUNTRY_OPTIONS: readonly string[] = [
  "Colombia",
  "México",
  "Perú",
  "Venezuela",
  "Ecuador",
  "Chile",
  "Argentina",
  "Bolivia",
  "Brasil",
  "Paraguay",
  "Uruguay",
  "Panamá",
  "Costa Rica",
  "Guatemala",
  "Honduras",
  "El Salvador",
  "Nicaragua",
  "República Dominicana",
  "Cuba",
  "Puerto Rico",
  "España",
  "Estados Unidos",
  "Canadá",
  "Otro",
]

/** Nombres en inglés (como los devuelven los servicios de geo-IP) → español */
const EN_TO_ES: Record<string, string> = {
  Mexico: "México",
  Peru: "Perú",
  Brazil: "Brasil",
  Panama: "Panamá",
  "United States": "Estados Unidos",
  "Dominican Republic": "República Dominicana",
  Spain: "España",
  Canada: "Canadá",
}

function normalizeCountry(raw: string): string {
  const trimmed = raw.trim()
  return EN_TO_ES[trimmed] ?? trimmed
}

async function fetchJson(url: string, timeoutMs: number): Promise<Record<string, unknown> | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      cache: "no-store",
    })
    if (!res.ok) return null
    return (await res.json()) as Record<string, unknown>
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Detecta el país del visitante a partir de su IP.
 * Devuelve el nombre del país (en español cuando aplica) o null si no
 * se pudo determinar. Nunca lanza: fallo silencioso → selección manual.
 */
export async function detectCountry(): Promise<string | null> {
  // 1) ipwho.is — sin API key, CORS abierto
  const primary = await fetchJson("https://ipwho.is/", 5000)
  if (primary) {
    const country = typeof primary.country === "string" ? primary.country : ""
    const success = primary.success
    if (success !== false && country) return normalizeCountry(country)
  }
  // 2) ipapi.co — respaldo
  const fallback = await fetchJson("https://ipapi.co/json/", 5000)
  if (fallback) {
    const country =
      typeof fallback.country_name === "string"
        ? fallback.country_name
        : typeof fallback.country === "string"
          ? fallback.country
          : ""
    if (country) return normalizeCountry(country)
  }
  return null
}
