"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
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
import { cn } from "@/lib/utils"

const EXPERIENCE_OPTIONS = [
  "Nunca he vendido en línea",
  "He vendido de forma ocasional",
  "Tengo una tienda activa",
  "Conozco el dropshipping pero no he empezado",
]

const GOAL_OPTIONS = [
  "Generar ingresos extra",
  "Emprender en serio con mi tienda",
  "Escalar un negocio que ya tengo",
  "Aprender el modelo antes de invertir",
]

type FormState = {
  name: string
  whatsapp: string
  email: string
  experience: string
  goal: string
  hasMasterShopAccount: string
}

const INITIAL_FORM: FormState = {
  name: "",
  whatsapp: "",
  email: "",
  experience: "",
  goal: "",
  hasMasterShopAccount: "",
}

export function StageCTA({
  config,
  stageIndex,
  markLeadSent,
  leadSent,
}: StageProps) {
  const { kicker } = getStageText(stageIndex, config)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

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
    if (!/^[+\d][\d\s().-]{6,19}$/.test(form.whatsapp.trim())) e.whatsapp = "Escribe un WhatsApp válido"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Escribe un correo válido"
    if (!form.experience) e.experience = "Selecciona una opción"
    if (!form.goal) e.goal = "Selecciona tu objetivo"
    if (!form.hasMasterShopAccount) e.hasMasterShopAccount = "Selecciona una opción"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setServerError(null)
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          whatsapp: form.whatsapp.trim(),
          email: form.email.trim(),
          experience: form.experience,
          goal: form.goal,
          hasMasterShopAccount: form.hasMasterShopAccount === "si",
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "Error al enviar")
      markLeadSent()
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "No se pudo enviar la solicitud")
    } finally {
      setSubmitting(false)
    }
  }

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
          {config.contact.whatsappUrl ? (
            <a
              href={config.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-display text-sm font-bold text-white transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="h-4.5 w-4.5" aria-hidden />
              {config.contact.whatsappLabel}
            </a>
          ) : (
            <p className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-light text-zinc-500">
              Te contactaremos por los datos que dejaste.
            </p>
          )}
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
                    Respóndete en menos de 2 minutos. Sin registro previo.
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
                  <Field label="WhatsApp" error={errors.whatsapp} required>
                    <Input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      placeholder="+57 300 000 0000"
                      className="min-h-11 border-white/15 bg-white/[0.04] placeholder:text-zinc-600"
                      aria-invalid={Boolean(errors.whatsapp)}
                    />
                  </Field>
                  <Field label="Correo electrónico" error={errors.email} required>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="tu@correo.com"
                      className="min-h-11 border-white/15 bg-white/[0.04] placeholder:text-zinc-600"
                      aria-invalid={Boolean(errors.email)}
                    />
                  </Field>
                  <Field label="¿Ya tienes cuenta en MasterShop?" error={errors.hasMasterShopAccount} required>
                    <RadioGroup
                      value={form.hasMasterShopAccount}
                      onValueChange={(v) => setForm({ ...form, hasMasterShopAccount: v })}
                      className="flex h-11 items-center gap-6"
                    >
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
                        <RadioGroupItem value="si" id="ms-si" />
                        Sí
                      </label>
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
                        <RadioGroupItem value="no" id="ms-no" />
                        No
                      </label>
                    </RadioGroup>
                  </Field>
                  <Field label="Tu experiencia en e-commerce" error={errors.experience} required>
                    <Select
                      value={form.experience}
                      onValueChange={(v) => setForm({ ...form, experience: v })}
                    >
                      <SelectTrigger
                        aria-invalid={Boolean(errors.experience)}
                        className="min-h-11 w-full border-white/15 bg-white/[0.04]"
                      >
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent className="border-purple-500/30 bg-[#140d26]">
                        {EXPERIENCE_OPTIONS.map((o) => (
                          <SelectItem key={o} value={o} className="focus:bg-purple-500/25">
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Tu objetivo principal" error={errors.goal} required>
                    <Select value={form.goal} onValueChange={(v) => setForm({ ...form, goal: v })}>
                      <SelectTrigger
                        aria-invalid={Boolean(errors.goal)}
                        className="min-h-11 w-full border-white/15 bg-white/[0.04]"
                      >
                        <SelectValue placeholder="Selecciona tu objetivo" />
                      </SelectTrigger>
                      <SelectContent className="border-purple-500/30 bg-[#140d26]">
                        {GOAL_OPTIONS.map((o) => (
                          <SelectItem key={o} value={o} className="focus:bg-purple-500/25">
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  {serverError && (
                    <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-300 sm:col-span-2">
                      {serverError}
                    </p>
                  )}

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
    <div className="space-y-1.5">
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
