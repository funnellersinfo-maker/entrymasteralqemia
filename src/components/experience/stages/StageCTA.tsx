"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Globe,
  Loader2,
  MessageCircle,
  Rocket,
  Sparkles,
  Store,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { StageProps } from "../ExperienceApp"
import { getStageText, StageHeader } from "../shared"
import { DEFAULT_CONFIG } from "@/lib/content"
import { COUNTRY_OPTIONS, detectCountry } from "@/lib/geo"
import { BUDGET_RANGES, saveLead, type LeadRecord } from "@/lib/store"
import { cn } from "@/lib/utils"

// Formulario exprés para tráfico frío: solo lo esencial que el mentor
// necesita para calificar (nombre + presupuesto + país auto-detectado).
// El WhatsApp del visitante llega naturalmente: el mensaje se envía desde
// su propio WhatsApp, así que su número queda visible para el mentor.

type FormState = {
  name: string
  country: string
  budget: string
}

const INITIAL_FORM: FormState = {
  name: "",
  country: "",
  budget: "",
}

/**
 * Mensaje que le llega al WhatsApp del mentor cuando el visitante envía el
 * formulario: solo lo esencial (nombre, presupuesto y país), con emojis y
 * encoding UTF-8 correcto — sin caracteres raros.
 *
 * Nota: los emojis van como escapes Unicode (\u{…}) a propósito. Así el
 * archivo fuente es ASCII puro y ningún paso del build puede dañarlos
 * (los caracteres de 4 bytes se corrompían en el pipeline → �).
 */
function buildLeadMessage(lead: Pick<LeadRecord, "name" | "budget" | "country">): string {
  return [
    "\u{1F6D2} *NUEVO LEAD \u2014 TIENDA MASTERSHOP*",
    "",
    `\u{1F464} *Nombre:* ${lead.name}`,
    `\u{1F4B0} *Presupuesto:* ${lead.budget || "Sin definir"}`,
    `\u{1F30E} *Pa\u00eds:* ${lead.country || "\u2014"}`,
  ].join("\n")
}

function withTextParam(url: string, text: string): string {
  const sep = url.includes("?") ? "&" : "?"
  return `${url}${sep}text=${encodeURIComponent(text)}`
}

export function StageCTA({
  config,
  stageIndex,
  markLeadSent,
  leadSent,
}: StageProps) {
  const { kicker } = getStageText(stageIndex, config)
  // El WhatsApp del mentor nunca queda vacío (aunque exista una configuración
  // guardada antigua sin URL): la entrega de leads es el corazón del embudo.
  const mentorWhatsAppUrl = config.contact.whatsappUrl || DEFAULT_CONFIG.contact.whatsappUrl
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [countryDetecting, setCountryDetecting] = useState(true)
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null)
  const manualCountryRef = useRef(false)

  // Auto-detección de país por IP (una sola vez; nunca pisa la selección manual)
  useEffect(() => {
    let cancelled = false
    detectCountry()
      .catch(() => null)
      .then((country) => {
        if (cancelled) return
        setCountryDetecting(false)
        if (!country) return
        setDetectedCountry(country)
        if (!manualCountryRef.current) {
          setForm((f) => (f.country ? f : { ...f, country }))
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Si el país detectado no está en la lista, se agrega dinámicamente
  const countryOptions = useMemo(() => {
    if (detectedCountry && detectedCountry !== "Otro" && !COUNTRY_OPTIONS.includes(detectedCountry)) {
      return [detectedCountry, ...COUNTRY_OPTIONS]
    }
    return COUNTRY_OPTIONS
  }, [detectedCountry])

  const openForm = (presetGoal?: string) => {
    setFormOpen(true)
    if (presetGoal) setForm((f) => ({ ...f, goal: presetGoal }))
    setTimeout(() => {
      document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 150)
  }

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (form.name.trim().length < 2) e.name = "Escribe tu nombre"
    if (!form.country.trim()) e.country = "Selecciona tu país"
    // La inversión inicial es opcional: no cohibe a nadie.
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const lead: LeadRecord = {
        id: typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `l-${Date.now()}`,
        name: form.name.trim(),
        whatsapp: "",
        country: form.country.trim(),
        email: "",
        experience: "",
        goal: "",
        budget: form.budget || "No especificado",
        hasMasterShopAccount: false,
        source: "experiencia-web",
        createdAt: new Date().toISOString(),
      }
      // 1) Registro local (visible en el panel de administración)
      saveLead(lead)
      // 2) Notificación al WhatsApp del mentor: se abre el chat listo
      //    para enviar — el mensaje llega desde el número del visitante.
      const message = buildLeadMessage(lead)
      if (mentorWhatsAppUrl) {
        try {
          window.open(withTextParam(mentorWhatsAppUrl, message), "_blank", "noopener,noreferrer")
        } catch {
          /* el navegador lo bloqueó — quedan los botones de la pantalla de éxito */
        }
      }
      markLeadSent()
    } finally {
      setSubmitting(false)
    }
  }

  const leadWaMessage = () =>
    buildLeadMessage({
      name: form.name.trim() || "—",
      budget: form.budget || "Sin definir",
      country: form.country.trim() || "—",
    })

  return (
    <div>
      <StageHeader kicker={kicker} title={config.cta.title} subtitle={config.cta.text} />

      {/* Éxito */}
      {leadSent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="glass-card relative mx-auto max-w-lg overflow-hidden p-8 text-center"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-purple-500 to-fuchsia-500" aria-hidden />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 16 }}
            className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_0_50px_-8px_rgba(16,185,129,0.7)]"
          >
            <CheckCircle2 className="h-10 w-10 text-white" aria-hidden />
          </motion.div>
          <h2 className="font-display text-xl font-extrabold text-white sm:text-2xl">
            {config.cta.successTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed font-light text-zinc-400">
            {config.cta.successText}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            {mentorWhatsAppUrl ? (
              <a
                href={withTextParam(mentorWhatsAppUrl, leadWaMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-display text-sm font-bold text-white transition-transform hover:scale-[1.03]"
              >
                <MessageCircle className="h-4.5 w-4.5" aria-hidden />
                {config.contact.whatsappLabel}
              </a>
            ) : null}
            {!mentorWhatsAppUrl ? (
              <p className="mt-1 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-light text-zinc-500">
                Te contactaremos por los datos que dejaste.
              </p>
            ) : null}
          </div>
        </motion.div>
      ) : (
        <>
          {/* Botones principales */}
          <div className="grid gap-3.5 sm:grid-cols-2">
            <motion.button
              onClick={() => openForm()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-5 text-left sm:p-6 animate-pulse-glow"
            >
              <div className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" aria-hidden />
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                  <Store className="h-6 w-6 text-white" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-sm font-extrabold tracking-wide text-white sm:text-base">
                    {config.cta.primaryLabel}
                  </p>
                  <p className="mt-0.5 text-xs font-light text-purple-100/90">
                    Completa el formulario y da el primer paso.
                  </p>
                </div>
              </div>
            </motion.button>

            {config.contact.calendarUrl ? (
              <motion.a
                href={config.contact.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card glass-card-hover flex items-center gap-4 p-5 sm:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-600 to-pink-600">
                  <CalendarCheck className="h-6 w-6 text-white" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-sm font-extrabold tracking-wide text-white sm:text-base">
                    {config.cta.secondaryLabel}
                  </p>
                  <p className="mt-0.5 text-xs font-light text-zinc-400">
                    Agenda una sesión a tu medida.
                  </p>
                </div>
              </motion.a>
            ) : (
              <motion.button
                onClick={() => openForm("Asesoría personalizada")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card glass-card-hover flex items-center gap-4 p-5 text-left sm:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-600 to-pink-600">
                  <CalendarCheck className="h-6 w-6 text-white" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-sm font-extrabold tracking-wide text-white sm:text-base">
                    {config.cta.secondaryLabel}
                  </p>
                  <p className="mt-0.5 text-xs font-light text-zinc-400">
                    Cuéntanos tu caso y coordinamos una sesión.
                  </p>
                </div>
              </motion.button>
            )}
          </div>

          {/* Formulario */}
          <AnimatePresence>
            {formOpen && (
              <motion.form
                id="lead-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={submit}
                noValidate
                className="glass-card mt-6 overflow-hidden p-0"
              >
                <div className="border-b border-white/[0.07] bg-gradient-to-r from-purple-950/60 to-transparent px-5 py-4 sm:px-6">
                  <p className="flex items-center gap-2 font-display text-sm font-bold text-white">
                    <Rocket className="h-4 w-4 text-fuchsia-400" aria-hidden />
                    Solicita tu tienda MasterShop
                  </p>
                  <p className="mt-0.5 text-xs font-light text-zinc-500">
                    Toma menos de 30 segundos. Sin registro previo.
                  </p>
                </div>

                <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
                  <Field label="Nombre" error={errors.name} required>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="min-h-11 border-white/15 bg-white/[0.04] placeholder:text-zinc-600"
                      aria-invalid={Boolean(errors.name)}
                    />
                  </Field>
                  <Field label="País" error={errors.country} required>
                    <Select
                      value={form.country}
                      onValueChange={(v) => {
                        manualCountryRef.current = true
                        setForm({ ...form, country: v })
                      }}
                    >
                      <SelectTrigger
                        aria-invalid={Boolean(errors.country)}
                        className="min-h-11 w-full min-w-0 border-white/15 bg-white/[0.04]"
                      >
                        <SelectValue
                          placeholder={countryDetecting ? "Detectando tu país…" : "Selecciona tu país"}
                        />
                      </SelectTrigger>
                      <SelectContent className="max-w-[calc(100vw-2.5rem)] border-purple-500/30 bg-[#140d26]">
                        {countryOptions.map((c) => (
                          <SelectItem
                            key={c}
                            value={c}
                            className="whitespace-normal break-words focus:bg-purple-500/25"
                          >
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="flex items-center gap-1.5 text-[10px] leading-relaxed font-light text-zinc-600">
                      {countryDetecting ? (
                        <>
                          <Loader2 className="h-3 w-3 shrink-0 animate-spin" aria-hidden />
                          Detectando tu ubicación automáticamente…
                        </>
                      ) : detectedCountry && detectedCountry === form.country ? (
                        <>
                          <Globe className="h-3 w-3 shrink-0" aria-hidden />
                          Detectado automáticamente — puedes cambiarlo si prefieres.
                        </>
                      ) : null}
                    </p>
                  </Field>

                  {/* Inversión inicial disponible */}
                  <div className="sm:col-span-2">
                    <Field label="¿Cuánto podrías invertir en tu negocio al inicio?">
                      <RadioGroup
                        value={form.budget}
                        onValueChange={(v) => setForm({ ...form, budget: v })}
                        className="grid gap-2 sm:grid-cols-2"
                      >
                        {BUDGET_RANGES.map((range) => {
                          const selected = form.budget === range
                          return (
                            <label
                              key={range}
                              className={cn(
                                "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[13px] font-light transition-colors",
                                selected
                                  ? "border-purple-500/60 bg-purple-500/10 text-white"
                                  : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-purple-500/30"
                              )}
                            >
                              <RadioGroupItem value={range} id={`budget-${range}`} />
                              {range}
                            </label>
                          )
                        })}
                      </RadioGroup>
                      <p className="mt-2 text-[10px] leading-relaxed font-light text-zinc-600">
                        Pregunta orientativa — no te compromete a nada. La inversión de referencia
                        para comenzar es de $150 USD, y tu respuesta nos ayuda a orientarte según tu
                        punto de partida.
                      </p>
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={submitting ? undefined : { scale: 1.01 }}
                      whileTap={submitting ? undefined : { scale: 0.98 }}
                      className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 font-display text-sm font-bold tracking-wide text-white shadow-[0_0_35px_-8px_rgba(168,85,247,0.7)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden />
                          Enviando…
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4.5 w-4.5" aria-hidden />
                          ENVIAR SOLICITUD
                          <ChevronDown className="h-4 w-4 rotate-[-90deg]" aria-hidden />
                        </>
                      )}
                    </motion.button>
                    <p className="mt-3 text-center text-[10px] leading-relaxed font-light text-zinc-600">
                      Tus datos se usan únicamente para contactarte sobre la mentoría. Nada de spam.
                    </p>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Nota final */}
          <p className="mt-6 text-center text-[11px] leading-relaxed font-light text-zinc-600">
            Completar la experiencia no genera ninguna obligación. La mentoría, su alcance y sus
            condiciones se definen al momento de la contratación.
          </p>
        </>
      )}
    </div>
  )
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="min-w-0 space-y-1.5">
      <Label className="text-xs font-medium text-zinc-400">
        {label}
        {required ? <span className="ml-1 text-fuchsia-400">*</span> : null}
      </Label>
      {children}
      {error ? (
        <p className="text-[11px] font-medium text-rose-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
