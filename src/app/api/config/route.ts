import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { DEFAULT_CONFIG, mergeConfig } from "@/lib/content"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const row = await db.siteConfig.findUnique({ where: { id: "main" } })
    if (!row) {
      return NextResponse.json({ config: DEFAULT_CONFIG })
    }
    const saved = JSON.parse(row.data)
    return NextResponse.json({ config: mergeConfig(saved) })
  } catch {
    return NextResponse.json({ config: DEFAULT_CONFIG })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 })
    }
    const merged = mergeConfig(body)
    const data = JSON.stringify(merged)
    await db.siteConfig.upsert({
      where: { id: "main" },
      update: { data },
      create: { id: "main", data },
    })
    return NextResponse.json({ config: merged })
  } catch (error) {
    console.error("PUT /api/config error:", error)
    return NextResponse.json({ error: "No se pudo guardar la configuración" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    await db.siteConfig.deleteMany({ where: { id: "main" } })
    return NextResponse.json({ config: DEFAULT_CONFIG })
  } catch {
    return NextResponse.json({ error: "No se pudo restablecer" }, { status: 500 })
  }
}
