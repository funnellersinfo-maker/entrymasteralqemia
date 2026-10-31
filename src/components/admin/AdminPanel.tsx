"use client"

import { useCallback, useEffect, useState } from "react"
import { Plus, Save, Trash2, Undo2, Users } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import type { SiteConfig } from "@/lib/content"
import { STAGES } from "@/lib/stages"
import { cn } from "@/lib/utils"

interface Lead {
  id: string
  name: string
  whatsapp: string
  email: string
  experience: string
  goal: string
  hasMasterShopAccount: boolean
  createdAt: string
}

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
  const [draft, setDraft] = useState<SiteConfig>(config)
  const [saving, setSaving] = useState(false)
  const [leads, setLeads] = useState<Lead[] | null>(null)
  const [selectedStage, setSelectedStage] = useState<string>(STAGES[0].id)

  useEffect(() => {
    if (open) setDraft(config)
  }, [open, config])

  const set = useCallback(
    <K extends keyof SiteConfig>(section: K, patch: Partial<SiteConfig[K]>) => {
      setDraft((d) => ({ ...d, [section]: { ...(d[section] as object), ...patch } } as SiteConfig))
    },
    []
  )

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "Error al guardar")
      onSaved(data.config as SiteConfig)
      toast({ title: "Configuración guardada", description: "Los cambios ya están visibles en la experiencia." })
    } catch (err) {
      toast({
        title: "No se pudo guardar",
        description: err instanceof Error ? err.message : "Intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const reset = async () => {
    try {
      const res = await fetch("/api/config", { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error("Error")
      onSaved(data.config as SiteConfig)
      setDraft(data.config as SiteConfig)
      toast({ title: "Configuración restablecida", description: "Se volvieron a los valores por defecto." })
    } catch {
      toast({ title: "No se pudo restablecer", variant: "destructive" })
    }
  }

  const loadLeads = async () => {
    try {
      const res = await fetch("/api/leads")
      const data = await res.json()
      if (res.ok) setLeads(data.leads as Lead[])
    } catch {
      setLeads([])
    }
  }

  useEffect(() => {
    if (open && leads === null) loadLeads()
  }, [open, leads])

  const stage = STAGES.find((s) => s.id === selectedStage) ?? STAGES[0]
  const stageOverride = draft.stages[selectedStage] ?? {}

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto border-purple-500/30 bg-[#0c0718] p-0 sm:max-w-2xl custom-scrollbar">
        <SheetHeader className="border-b border-white/[0.07] bg-gradient-to-r from-purple-950/60 to-transparent px-5 py-4">
          <SheetTitle className="font-display text-base font-bold text-white">
            Panel de configuración
          </SheetTitle>
          <SheetDescription className="text-xs font-light text-zinc-500">
            Modifica textos, enlaces e información. Los cambios se guardan en el servidor y aplican
            para todos los visitantes.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="general" className="px-5 py-4">
          <TabsList className="mb-4 h-auto w-full flex-wrap justify-start gap-1 bg-white/[0.04]">
            {[
              ["general", "General"],
              ["contacto", "Contacto"],
              ["mentor", "Mentor"],
              ["mentoria", "Mentoría"],
              ["mastershop", "MasterShop"],
              ["cta", "CTA"],
              ["etapas", "Etapas"],
              ["leads", "Leads"],
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
              <FieldRow label="URL de WhatsApp (wa.me/…)">
                <Input value={draft.contact.whatsappUrl} onChange={(e) => set("contact", { whatsappUrl: e.target.value })} placeholder="https://wa.me/57…" className="bg-white/[0.04]" />
              </FieldRow>
              <FieldRow label="Etiqueta del botón de WhatsApp">
                <Input value={draft.contact.whatsappLabel} onChange={(e) => set("contact", { whatsappLabel: e.target.value })} className="bg-white/[0.04]" />
              </FieldRow>
              <FieldRow label="URL de agenda (asesorías)">
                <Input value={draft.contact.calendarUrl} onChange={(e) => set("contact", { calendarUrl: e.target.value })} placeholder="https://calendly.com/…" className="bg-white/[0.04]" />
              </FieldRow>
              <FieldRow label="URL de formulario externo (opcional)">
                <Input value={draft.contact.externalFormUrl} onChange={(e) => set("contact", { externalFormUrl: e.target.value })} className="bg-white/[0.04]" />
              </FieldRow>
            </Group>
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
              <FieldRow label="Biografía">
                <Textarea rows={5} value={draft.mentor.bio} onChange={(e) => set("mentor", { bio: e.target.value })} className="bg-white/[0.04]" />
              </FieldRow>
              <FieldRow label="URL de la fotografía">
                <Input value={draft.mentor.photoUrl} onChange={(e) => set("mentor", { photoUrl: e.target.value })} className="bg-white/[0.04]" />
              </FieldRow>
              <FieldRow label="Nota sobre la fotografía">
                <Input value={draft.mentor.photoNote} onChange={(e) => set("mentor", { photoNote: e.target.value })} className="bg-white/[0.04]" />
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
          </TabsContent>

          {/* MENTORÍA */}
          <TabsContent value="mentoría" className="space-y-4">
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

          {/* LEADS */}
          <TabsContent value="leads" className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <Users className="h-4 w-4 text-purple-400" aria-hidden />
                {leads ? `${leads.length} solicitud(es) recibidas` : "Cargando…"}
              </p>
              <Button variant="outline" size="sm" onClick={loadLeads} className="border-white/10 bg-transparent text-zinc-400">
                <Undo2 className="h-3.5 w-3.5" aria-hidden /> Actualizar
              </Button>
            </div>
            <ScrollArea className="h-80 rounded-xl border border-white/10">
              {leads && leads.length === 0 ? (
                <p className="p-4 text-center text-xs font-light text-zinc-600">
                  Aún no hay solicitudes. Cuando alguien complete el formulario final, aparecerá aquí.
                </p>
              ) : (
                <div className="divide-y divide-white/[0.06]">
                  {leads?.map((lead) => (
                    <div key={lead.id} className="p-3.5 text-xs">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <p className="font-display text-sm font-bold text-white">{lead.name}</p>
                        <span className="text-[10px] text-zinc-600">
                          {new Date(lead.createdAt).toLocaleString("es-CO")}
                        </span>
                      </div>
                      <p className="text-purple-300">{lead.whatsapp} · {lead.email}</p>
                      <p className="mt-1 font-light text-zinc-500">
                        Experiencia: {lead.experience} · Objetivo: {lead.goal}
                      </p>
                      <p className="mt-0.5 text-zinc-600">
                        Cuenta MasterShop: {lead.hasMasterShopAccount ? "Sí" : "No"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
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
            {saving ? "Guardando…" : "Guardar cambios"}
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
