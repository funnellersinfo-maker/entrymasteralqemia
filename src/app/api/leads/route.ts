import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

const leadSchema = z.object({
  name: z.string().min(2, "Nombre requerido").max(120),
  whatsapp: z.string().min(7, "WhatsApp requerido").max(40),
  email: z.string().email("Correo inválido").max(160),
  experience: z.string().min(1).max(120),
  goal: z.string().min(1).max(200),
  hasMasterShopAccount: z.boolean(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = leadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos incompletos o inválidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }
    const { name, whatsapp, email, experience, goal, hasMasterShopAccount } = parsed.data
    const lead = await db.lead.create({
      data: { name, whatsapp, email, experience, goal, hasMasterShopAccount },
    })
    return NextResponse.json({ ok: true, id: lead.id })
  } catch (error) {
    console.error("POST /api/leads error:", error)
    return NextResponse.json({ error: "No se pudo registrar la solicitud" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    })
    return NextResponse.json({ leads })
  } catch (error) {
    console.error("GET /api/leads error:", error)
    return NextResponse.json({ error: "No se pudieron cargar los registros" }, { status: 500 })
  }
}
