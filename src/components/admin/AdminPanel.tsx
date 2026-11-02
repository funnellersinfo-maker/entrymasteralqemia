"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Download,
  KeyRound,
  Lock,
  LogOut,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  Undo2,
  Users,
} from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { DEFAULT_CONFIG, type SiteConfig } from "@/lib/content"
import { STAGES } from "@/lib/stages"
import {
  BUDGET_RANGES,
  changeAdminPassword,
  clearLeads,
  clearSavedConfig,
  getLeads,
  leadsToCsv,
  saveSiteConfig,
  verifyAdminPassword,
  type LeadRecord,
} from "@/lib/store"
import { cn } from "@/lib/utils"

export function AdminPanel({
  open,
  onOpenChange,
  config,
  onSaved,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  config: SiteConfig
  onSaved: (config: SiteConfig) => void
}) {
  const { toast } = useToast()
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState("")
  const [passError, setPassError] = useState<string | null>(null)
  const [checking, setChecking] = useState(false)
  const [draft, setDraft] = useState<SiteConfig>(config)
  const [saving, setSaving] = useState(false)
  const [leads, setLeads] = useState<LeadRecord[] | null>(null)
  const [selectedStage, setSelectedStage] = useState<string>(STAGES[0].id)

  // Cambio de clave
  const [currentPass, setCurrentPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [newPass2, setNewPass2] = useState("")

  useEffect(() => {
    if (open) setDraft(config)
  }, [open, config])

  const set = useCallback(
    <K extends keyof SiteConfig>(section: K, patch: Partial<SiteConfig[K]>) => {
      setDraft((d) => ({ ...d, [section]: { ...(d[section] as object), ...patch } } as SiteConfig))
    },
    []
  )

  const login = async () => {
    if (!pass) return
    setChecking(true)
    setPassError(null)
    const ok = await verifyAdminPassword(pass)
    if (ok) {
      setAuthed(true)
      setPass("")
    } else {
      setPassError("Contraseña incorrecta")
    }
    setChecking(false)
  }

  const save = () => {
    setSaving(true)
    try {
      saveSiteConfig(draft)
      onSaved(draft)
      toast({
        title: "Configuración guardada",
        description: "Los cambios ya están visibles en la experiencia (en este navegador).",
      })
    } catch {
      toast({ title: "No se pudo guardar", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const reset = () => {
    clearSavedConfig()
    onSaved(DEFAULT_CONFIG)
    setDraft(DEFAULT_CONFIG)
    toast({ title: "Configuración restablecida", description: "Se volvieron a los valores por defecto." })
  }

  const loadLeads = useCallback(() => {
    setLeads(getLeads())
  }, [])

  useEffect(() => {
    if (open && authed && leads === null) loadLeads()
  }, [open, authed, leads, loadLeads])

  const exportCsv = () => {
    const current = leads ?? getLeads()
    if (current.length === 0) {
      toast({ title: "No hay datos para exportar" })
      return
    }
    const csv = leadsToCsv(current)
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `mastershop-leads-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const removeAllLeads = () => {
    if (!window.confirm("¿Eliminar TODOS los leads registrados en este navegador?")) return
    clearLeads()
    setLeads([])
    toast({ title: "Leads eliminados" })
  }

  const changePass = async () => {
    if (!currentPass || !newPass) {
      toast({ title: "Completa todos los campos de clave", variant: "destructive" })
      return
    }
    if (newPass.length < 4) {
      toast({ title: "La nueva clave debe tener al menos 4 caracteres", variant: "destructive" })
      return
    }
    if (newPass !== newPass2) {
      toast({ title: "Las claves nuevas no coinciden", variant: "destructive" })
      return
    }
    const ok = await changeAdminPassword(currentPass, newPass)
    if (ok) {
      setCurrentPass("")
      setNewPass("")
      setNewPass2("")
      toast({ title: "Clave actualizada", description: "Usa la nueva clave la próxima vez." })
    } else {
      toast({ title: "La clave actual no es correcta", variant: "destructive" })
    }
  }

  const budgetCounts = useMemo(() => {
    const current = leads ?? []
    const counts = new Map<string, number>()
    for (const l of current) {
      counts.set(l.budget, (counts.get(l.budget) ?? 0) + 1)
    }
    return counts
  }, [leads])

  const stage = STAGES.find((s) => s.id === selectedStage) ?? STAGES[0]
  const stageOverride = draft.stages[selectedStage] ?? {}

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto border-purple-500/30 bg-[#0c0718] p-0 sm:max-w-2xl custom-scrollbar">
        <SheetHeader className="border-b border-white/[0.07] bg-gradient-to-r from-purple-950/60 to-transparent px-5 py-4">
          <SheetTitle className="flex items-center gap-2 font-display text-base font-bold text-white">
            <ShieldCheck className="h-4.5 w-4.5 text-purple-400" aria-hidden />
            Panel de administración
          </SheetTitle>
          <SheetDescription className="text-xs font-light text-zinc-500">
            {authed
              ? "Modifica textos, enlaces e información, y consulta los leads registrados."
              : "Acceso restringido con clave."}
          </SheetDescription>
        </SheetHeader>

        {!authed ? (
          /* ============ LOGIN ============ */
          <div className="flex flex-col items-center justify-center gap-5 px-6 py-14">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10">
              <Lock className="h-7 w-7 text-purple-300" aria-hidden />
            </div>
            <div className="w-full max-w-xs text-center">
              <p className="font-display text-sm font-bold text-white">Acceso al panel</p>
              <p className="mt-1 text-[11px] font-light text-zinc-500">
                Introduce la clave de administrador para continuar.
              </p>
            </div>
            <form
              className="w-full max-w-xs space-y-3"
              onSubmit={(e) => {
                e.preventDefault()
                login()
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="admin-pass" className="text-xs font-medium text-zinc-400">
                  Clave
                </Label>
                <Input
                  id="admin-pass"
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  autoFocus
                  className="min-h-11 border-white/15 bg-white/[0.04]"
                  aria-invalid={Boolean(passError)}
                />
                {passError ? (
                  <p className="text-[11px] font-medium text-rose-400" role="alert">
                    {passError}
                  </p>
                ) : null}
              </div>
              <Button
                type="submit"
                disabled={checking || !pass}
                className="min-h-11 w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 font-bold text-white hover:from-purple-500 hover:to-fuchsia-500"
              >
                <KeyRound className="h-4 w-4" aria-hidden />
                {checking ? "Verificando…" : "Entrar"}
              </Button>
            </form>
          </div>
        ) : (
          <>
            <Tabs defaultValue="leads" className="px-5 py-4">
              <TabsList className="mb-4 h-auto w-full flex-wrap justify-start gap-1 bg-white/[0.04]">
                {[
                  ["leads", "Leads"],
                  ["general", "General"],
                  ["contacto", "Contacto"],
                  ["mentor", "Mentor"],
                  ["mentoria", "Mentoría"],
                  ["mastershop", "MasterShop"],
                  ["cta", "CTA"],
                  ["etapas", "Etapas"],
                  ["seguridad", "Seguridad"],
                ].map(([value, label]) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* LEADS */}
              <TabsContent value="leads" className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                    <Users className="h-4 w-4 text-purple-400" aria-hidden />
                    {leads ? `${leads.length} solicitud(es) registradas` : "Cargando…"}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={loadLeads}
                      className="border-white/10 bg-transparent text-zinc-400"
                    >
                      <Undo2 className="h-3.5 w-3.5" aria-hidden /> Actualizar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportCsv}
                      className="border-emerald-500/30 bg-transparent text-emerald-300 hover:bg-emerald-500/10"
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden /> CSV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={removeAllLeads}
                      className="border-rose-500/30 bg-transparent text-rose-300 hover:bg-rose-500/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    </Button>
                  </div>
                </div>

                {/* Conteo por rango de inversión */}
                {leads && leads.length > 0 ? (
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
                    <p className="mb-2 font-display text-[10px] font-bold tracking-[0.18em] text-zinc-500 uppercase">
                      Inversión inicial — quién marcó qué
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {BUDGET_RANGES.map((r) => {
                        const n = budgetCounts.get(r) ?? 0
                        return (
                          <div
                            key={r}
                            className={cn(
                              "flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-[11px]",
                              n > 0
                                ? "border-purple-500/30 bg-purple-500/[0.08] text-purple-200"
                                : "border-white/[0.06] text-zinc-600"
                            )}
                          >
                            <span className="truncate">{r}</span>
                            <span className="font-display font-bold tabular-nums">{n}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : null}

                <ScrollArea className="h-80 rounded-xl border border-white/10">
                  {leads && leads.length === 0 ? (
                    <p className="p-4 text-center text-xs font-light text-zinc-600">
                      Aún no hay solicitudes en este navegador. Cuando alguien complete el formulario
                      final, aparecerá aquí (y llegará por WhatsApp si está configurado).
                    </p>
                  ) : (
                    <div className="divide-y divide-white/[0.06]">
                      {leads?.map((lead) => (
                        <div key={lead.id} className="p-3.5 text-xs">
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <p className="font-display text-sm font-bold text-white">{lead.name}</p>
                            <span className="shrink-0 text-[10px] text-zinc-600">
                              {new Date(lead.createdAt).toLocaleString("es-CO")}
                            </span>
                          </div>
                          {(lead.whatsapp || lead.email) ? (
                            <p className="break-all text-purple-300">
                              {[lead.whatsapp, lead.email].filter(Boolean).join(" · ")}
                            </p>
                          ) : null}
                          {(lead.experience || lead.goal) ? (
                            <p className="mt-1 font-light text-zinc-500">
                              Experiencia: {lead.experience || "—"} · Objetivo: {lead.goal || "—"}
                            </p>
                          ) : null}
                          <p className="mt-0.5 text-zinc-500">
                            País: <span className="font-semibold text-purple-300">{lead.country || "—"}</span> · Inversión inicial:{" "}
                            <span className="font-semibold text-purple-300">{lead.budget}</span>
                          </p>
                          {(lead.experience || lead.goal || lead.whatsapp) ? (
                            <p className="mt-0.5 text-zinc-600">
                              Cuenta MasterShop: {lead.hasMasterShopAccount ? "Sí" : "No"}
                            </p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              {/* GENERAL */}
              <TabsContent value="general" className="space-y-4">
                <Group title="Marca">
                  <FieldRow label="Nombre de marca">
                    <Input value={draft.brand.name} onChange={(e) => set("brand", { name: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Programa">
                    <Input value={draft.brand.program} onChange={(e) => set("brand", { program: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Presentado por">
                    <Input value={draft.brand.presenter} onChange={(e) => set("brand", { presenter: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                </Group>
                <Group title="Pantalla de bienvenida">
                  <FieldRow label="Insignia / etiqueta">
                    <Input value={draft.hero.badge} onChange={(e) => set("hero", { badge: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Título (parte 1)">
                    <Input value={draft.hero.title} onChange={(e) => set("hero", { title: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Título destacado (degradado)">
                    <Input value={draft.hero.titleHighlight} onChange={(e) => set("hero", { titleHighlight: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Subtítulo">
                    <Textarea rows={2} value={draft.hero.subtitle} onChange={(e) => set("hero", { subtitle: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Texto del botón">
                    <Input value={draft.hero.ctaLabel} onChange={(e) => set("hero", { ctaLabel: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="URL de imagen del héroe">
                    <Input value={draft.hero.imageUrl} onChange={(e) => set("hero", { imageUrl: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                </Group>
              </TabsContent>

              {/* CONTACTO */}
              <TabsContent value="contacto" className="space-y-4">
                <Group title="Enlaces (deja vacío para ocultar)">
                  <FieldRow label="URL de WhatsApp (api.whatsapp.com/send?phone=…)">
                    <Input value={draft.contact.whatsappUrl} onChange={(e) => set("contact", { whatsappUrl: e.target.value })} placeholder="https://api.whatsapp.com/send?phone=57…" className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Etiqueta del botón de WhatsApp">
                    <Input value={draft.contact.whatsappLabel} onChange={(e) => set("contact", { whatsappLabel: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="URL de agenda (asesorías)">
                    <Input value={draft.contact.calendarUrl} onChange={(e) => set("contact", { calendarUrl: e.target.value })} placeholder="https://calendly.com/…" className="bg-white/[0.04]" />
                  </FieldRow>
                </Group>
                <p className="text-[10px] leading-relaxed font-light text-zinc-600">
                  Con el WhatsApp configurado, cada solicitud del formulario final abre un mensaje
                  listo para enviar a tu número, con el nombre, el rango de inversión y el país del
                  interesado. Los datos completos quedan además en la pestaña Leads.
                </p>
              </TabsContent>

              {/* MENTOR */}
              <TabsContent value="mentor" className="space-y-4">
                <Group title="Información del mentor">
                  <FieldRow label="Nombre">
                    <Input value={draft.mentor.name} onChange={(e) => set("mentor", { name: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Rol / título">
                    <Input value={draft.mentor.role} onChange={(e) => set("mentor", { role: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Título de fundador">
                    <Input value={draft.mentor.founderTitle} onChange={(e) => set("mentor", { founderTitle: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Años de trayectoria (número)">
                    <Input value={draft.mentor.years} onChange={(e) => set("mentor", { years: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Biografía">
                    <Textarea rows={5} value={draft.mentor.bio} onChange={(e) => set("mentor", { bio: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="URL de la fotografía">
                    <Input value={draft.mentor.photoUrl} onChange={(e) => set("mentor", { photoUrl: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Áreas de experiencia (separadas por coma)">
                    <Input
                      value={draft.mentor.highlights.join(", ")}
                      onChange={(e) =>
                        set("mentor", {
                          highlights: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="bg-white/[0.04]"
                    />
                  </FieldRow>
                  <FieldRow label="Nota adicional (trayectoria / casos)">
                    <Textarea rows={2} value={draft.mentor.extraNote} onChange={(e) => set("mentor", { extraNote: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                </Group>
                <Group title="ALQEMIA — el ecosistema">
                  <FieldRow label="Nombre de la academia">
                    <Input value={draft.mentor.academyName} onChange={(e) => set("mentor", { academyName: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="URL del logotipo">
                    <Input value={draft.mentor.academyLogoUrl} onChange={(e) => set("mentor", { academyLogoUrl: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Eslogan / etiqueta">
                    <Input value={draft.mentor.academyTagline} onChange={(e) => set("mentor", { academyTagline: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Descripción">
                    <Textarea rows={3} value={draft.mentor.academyDescription} onChange={(e) => set("mentor", { academyDescription: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                </Group>
              </TabsContent>

              {/* MENTORÍA */}
              <TabsContent value="mentoria" className="space-y-4">
                <Group title="Encabezados">
                  <FieldRow label="Título">
                    <Input value={draft.mentorship.title} onChange={(e) => set("mentorship", { title: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Subtítulo">
                    <Textarea rows={2} value={draft.mentorship.subtitle} onChange={(e) => set("mentorship", { subtitle: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Nota de alcance">
                    <Textarea rows={2} value={draft.mentorship.scopeNote} onChange={(e) => set("mentorship", { scopeNote: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                </Group>
                <Group title={`Elementos (${draft.mentorship.items.length})`}>
                  {draft.mentorship.items.map((item, i) => (
                    <div key={item.id} className="mb-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] text-zinc-600">#{i + 1}</span>
                        <button
                          onClick={() =>
                            set("mentorship", { items: draft.mentorship.items.filter((x) => x.id !== item.id) })
                          }
                          className="rounded-md p-1.5 text-rose-400/70 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                          aria-label={`Eliminar ${item.title}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      </div>
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const items = [...draft.mentorship.items]
                          items[i] = { ...item, title: e.target.value }
                          set("mentorship", { items })
                        }}
                        placeholder="Título"
                        className="mb-2 bg-white/[0.04]"
                      />
                      <Textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const items = [...draft.mentorship.items]
                          items[i] = { ...item, description: e.target.value }
                          set("mentorship", { items })
                        }}
                        placeholder="Descripción"
                        className="mb-2 bg-white/[0.04]"
                      />
                      <Select
                        value={item.type}
                        onValueChange={(v) => {
                          const items = [...draft.mentorship.items]
                          items[i] = { ...item, type: v as typeof item.type }
                          set("mentorship", { items })
                        }}
                      >
                        <SelectTrigger className="h-9 w-full bg-white/[0.04] text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#140d26]">
                          <SelectItem value="implemented">Se implementa contigo</SelectItem>
                          <SelectItem value="taught">Se enseña</SelectItem>
                          <SelectItem value="executed">Lo ejecuta el participante</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      set("mentorship", {
                        items: [
                          ...draft.mentorship.items,
                          { id: `m${Date.now()}`, title: "", description: "", type: "taught" },
                        ],
                      })
                    }
                    className="w-full border-dashed border-purple-500/40 bg-transparent text-purple-300 hover:bg-purple-500/10"
                  >
                    <Plus className="h-4 w-4" aria-hidden /> Añadir elemento
                  </Button>
                </Group>
              </TabsContent>

              {/* MASTERSHOP */}
              <TabsContent value="mastershop" className="space-y-4">
                <Group title="Panel real">
                  <FieldRow label="URL del logotipo">
                    <Input value={draft.mastershop.logoUrl} onChange={(e) => set("mastershop", { logoUrl: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="URL de la captura del panel">
                    <Input value={draft.mastershop.panelImageUrl} onChange={(e) => set("mastershop", { panelImageUrl: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Título de la captura">
                    <Input value={draft.mastershop.panelCaption} onChange={(e) => set("mastershop", { panelCaption: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Monto 1 — etiqueta">
                    <Input
                      value={draft.mastershop.panelStats[0]?.label ?? ""}
                      onChange={(e) => {
                        const stats = [...draft.mastershop.panelStats]
                        stats[0] = { ...(stats[0] ?? { value: "" }), label: e.target.value }
                        set("mastershop", { panelStats: stats })
                      }}
                      className="bg-white/[0.04]"
                    />
                  </FieldRow>
                  <FieldRow label="Monto 1 — valor">
                    <Input
                      value={draft.mastershop.panelStats[0]?.value ?? ""}
                      onChange={(e) => {
                        const stats = [...draft.mastershop.panelStats]
                        stats[0] = { ...(stats[0] ?? { label: "" }), value: e.target.value }
                        set("mastershop", { panelStats: stats })
                      }}
                      className="bg-white/[0.04]"
                    />
                  </FieldRow>
                  <FieldRow label="Monto 2 — etiqueta">
                    <Input
                      value={draft.mastershop.panelStats[1]?.label ?? ""}
                      onChange={(e) => {
                        const stats = [...draft.mastershop.panelStats]
                        stats[1] = { ...(stats[1] ?? { value: "" }), label: e.target.value }
                        set("mastershop", { panelStats: stats })
                      }}
                      className="bg-white/[0.04]"
                    />
                  </FieldRow>
                  <FieldRow label="Monto 2 — valor">
                    <Input
                      value={draft.mastershop.panelStats[1]?.value ?? ""}
                      onChange={(e) => {
                        const stats = [...draft.mastershop.panelStats]
                        stats[1] = { ...(stats[1] ?? { label: "" }), value: e.target.value }
                        set("mastershop", { panelStats: stats })
                      }}
                      className="bg-white/[0.04]"
                    />
                  </FieldRow>
                  <FieldRow label="Nota sobre los montos">
                    <Textarea rows={2} value={draft.mastershop.panelNote} onChange={(e) => set("mastershop", { panelNote: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                </Group>
                <Group title="Funciones destacadas">
                  {draft.mastershop.features.map((f, i) => (
                    <div key={i} className="mb-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] text-zinc-600">#{i + 1}</span>
                        <button
                          onClick={() =>
                            set("mastershop", {
                              features: draft.mastershop.features.filter((_, x) => x !== i),
                            })
                          }
                          className="rounded-md p-1.5 text-rose-400/70 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                          aria-label={`Eliminar ${f.title}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      </div>
                      <Input
                        value={f.title}
                        onChange={(e) => {
                          const features = [...draft.mastershop.features]
                          features[i] = { ...f, title: e.target.value }
                          set("mastershop", { features })
                        }}
                        placeholder="Título"
                        className="mb-2 bg-white/[0.04]"
                      />
                      <Textarea
                        rows={2}
                        value={f.description}
                        onChange={(e) => {
                          const features = [...draft.mastershop.features]
                          features[i] = { ...f, description: e.target.value }
                          set("mastershop", { features })
                        }}
                        placeholder="Descripción"
                        className="bg-white/[0.04]"
                      />
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      set("mastershop", {
                        features: [...draft.mastershop.features, { title: "", description: "" }],
                      })
                    }
                    className="w-full border-dashed border-purple-500/40 bg-transparent text-purple-300 hover:bg-purple-500/10"
                  >
                    <Plus className="h-4 w-4" aria-hidden /> Añadir función
                  </Button>
                </Group>
                <Group title="Descargo">
                  <FieldRow label="Nota de descargo">
                    <Textarea rows={3} value={draft.mastershop.disclaimer} onChange={(e) => set("mastershop", { disclaimer: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                </Group>
              </TabsContent>

              {/* CTA */}
              <TabsContent value="cta" className="space-y-4">
                <Group title="Pantalla final">
                  <FieldRow label="Título">
                    <Input value={draft.cta.title} onChange={(e) => set("cta", { title: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Texto">
                    <Textarea rows={3} value={draft.cta.text} onChange={(e) => set("cta", { text: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Botón principal">
                    <Input value={draft.cta.primaryLabel} onChange={(e) => set("cta", { primaryLabel: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Botón secundario">
                    <Input value={draft.cta.secondaryLabel} onChange={(e) => set("cta", { secondaryLabel: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Título de confirmación">
                    <Input value={draft.cta.successTitle} onChange={(e) => set("cta", { successTitle: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                  <FieldRow label="Texto de confirmación">
                    <Textarea rows={3} value={draft.cta.successText} onChange={(e) => set("cta", { successText: e.target.value })} className="bg-white/[0.04]" />
                  </FieldRow>
                </Group>
              </TabsContent>

              {/* ETAPAS */}
              <TabsContent value="etapas" className="space-y-4">
                <Group title="Textos por etapa">
                  <FieldRow label="Etapa">
                    <Select value={selectedStage} onValueChange={setSelectedStage}>
                      <SelectTrigger className="w-full bg-white/[0.04]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-64 bg-[#140d26]">
                        {STAGES.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.etape ? `Etapa ${s.etape}` : "Sección"} · {s.navTitle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldRow>
                  <FieldRow label={`Título (por defecto: “${stage.title}” )`}>
                    <Input
                      value={stageOverride.title ?? ""}
                      onChange={(e) =>
                        setDraft((d) => ({
                          ...d,
                          stages: { ...d.stages, [selectedStage]: { ...stageOverride, title: e.target.value } },
                        }))
                      }
                      placeholder={stage.title}
                      className="bg-white/[0.04]"
                    />
                  </FieldRow>
                  <FieldRow label={`Subtítulo (por defecto: “${stage.subtitle}” )`}>
                    <Textarea
                      rows={3}
                      value={stageOverride.subtitle ?? ""}
                      onChange={(e) =>
                        setDraft((d) => ({
                          ...d,
                          stages: { ...d.stages, [selectedStage]: { ...stageOverride, subtitle: e.target.value } },
                        }))
                      }
                      placeholder={stage.subtitle}
                      className="bg-white/[0.04]"
                    />
                  </FieldRow>
                  <p className="text-[10px] leading-relaxed font-light text-zinc-600">
                    Deja vacío para usar el texto por defecto. Los contenidos internos de cada etapa
                    (diagramas, calculadora, ejemplos) son parte de la experiencia.
                  </p>
                </Group>
              </TabsContent>

              {/* SEGURIDAD */}
              <TabsContent value="seguridad" className="space-y-4">
                <Group title="Cambiar clave del panel">
                  <FieldRow label="Clave actual">
                    <Input
                      type="password"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      className="bg-white/[0.04]"
                    />
                  </FieldRow>
                  <FieldRow label="Nueva clave (mín. 4 caracteres)">
                    <Input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="bg-white/[0.04]"
                    />
                  </FieldRow>
                  <FieldRow label="Repetir nueva clave">
                    <Input
                      type="password"
                      value={newPass2}
                      onChange={(e) => setNewPass2(e.target.value)}
                      className="bg-white/[0.04]"
                    />
                  </FieldRow>
                  <Button
                    onClick={changePass}
                    className="min-h-10 w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 font-bold text-white hover:from-purple-500 hover:to-fuchsia-500"
                  >
                    <KeyRound className="h-4 w-4" aria-hidden />
                    Actualizar clave
                  </Button>
                </Group>
                <Group title="Sesión">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAuthed(false)
                      onOpenChange(false)
                    }}
                    className="min-h-10 w-full border-white/10 bg-transparent text-zinc-400 hover:bg-white/[0.04]"
                  >
                    <LogOut className="h-4 w-4" aria-hidden />
                    Cerrar sesión del panel
                  </Button>
                </Group>
                <p className="text-[10px] leading-relaxed font-light text-zinc-600">
                  La clave se guarda cifrada (hash) en este navegador. Si la olvidas, borra el dato
                  “mastershop_admin_pass_v1” del almacenamiento local para volver a la clave por
                  defecto.
                </p>
              </TabsContent>
            </Tabs>

            {/* Acciones */}
            <div className="sticky bottom-0 flex gap-3 border-t border-white/[0.07] bg-[#0c0718]/95 px-5 py-4 backdrop-blur-xl">
              <Button
                onClick={save}
                disabled={saving}
                className="min-h-11 flex-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 font-bold text-white hover:from-purple-500 hover:to-fuchsia-500"
              >
                <Save className="h-4 w-4" aria-hidden />
                Guardar cambios
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                className="min-h-11 border-white/10 bg-transparent text-zinc-400 hover:bg-white/[0.04]"
              >
                <Undo2 className="h-4 w-4" aria-hidden />
                Restablecer
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
      <p className="mb-3 font-display text-xs font-bold tracking-[0.18em] text-purple-300 uppercase">
        {title}
      </p>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-zinc-400">{label}</Label>
      {children}
    </div>
  )
}
