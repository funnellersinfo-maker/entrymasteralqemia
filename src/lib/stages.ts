// ============================================================
// Definición de etapas, insignias y preguntas de comprobación
//
// Versión de alta conversión para tráfico frío: 8 etapas.
// · 01 Bienvenida        (gancho)
// · 02 El modelo         (cómo funciona vender sin inventario + margen)
// · 03 La plataforma     (MasterShop + panel real — momento de prueba)
// · 04 Tu tienda         (llave en mano: criterios, construcción, pedidos)
// · 05 Tus números       (calculadora de rentabilidad)
// · 06 La mentoría       (qué incluye)
// · 07 Tu mentor         (confianza)
// · 08 Da el paso        (formulario exprés → WhatsApp)
// ============================================================

export interface BadgeDef {
  id: string
  icon: string
  title: string
  description: string
}

export interface QuizDef {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface StageDef {
  id: string
  /** Número de etapa visible (1-8) */
  etape: number
  kicker: string
  navTitle: string
  /** Texto por defecto (editable vía config.stages) */
  title: string
  subtitle: string
  badge?: BadgeDef
  quiz?: QuizDef
}

export const STAGES: StageDef[] = [
  {
    id: "welcome",
    etape: 1,
    kicker: "ETAPA 01 · BIENVENIDA",
    navTitle: "Bienvenida",
    title: "Tu negocio digital puede comenzar aquí",
    subtitle:
      "Descubre cómo construir tu propia tienda online con MasterShop, incluso si hoy empiezas desde cero.",
  },
  {
    id: "model",
    etape: 2,
    kicker: "ETAPA 02 · EL MODELO",
    navTitle: "El modelo",
    title: "Vender por internet, sin inventario propio",
    subtitle:
      "El cliente paga en tu tienda, el proveedor despacha el producto y tú administras el margen. Descubre el flujo completo.",
    badge: {
      id: "b-model",
      icon: "trending",
      title: "Margen Decodificado",
      description: "Entendiste cómo se calcula el margen de una venta.",
    },
    quiz: {
      question: "Vendes a $100.000 COP y el producto cuesta $65.000 COP. ¿Cuál es el margen bruto?",
      options: ["$65.000 COP", "$35.000 COP", "$100.000 COP"],
      correctIndex: 1,
      explanation:
        "Correcto: $100.000 − $65.000 = $35.000 de margen bruto, antes de otros costos del negocio.",
    },
  },
  {
    id: "mastershop",
    etape: 3,
    kicker: "ETAPA 03 · LA PLATAFORMA",
    navTitle: "MasterShop",
    title: "MasterShop: la plataforma que facilita tu operación",
    subtitle:
      "MasterShop es una plataforma colombiana que reúne las piezas del dropshipping para que las gestiones desde un solo lugar.",
  },
  {
    id: "tienda",
    etape: 4,
    kicker: "ETAPA 04 · TU TIENDA",
    navTitle: "Tienda llave en mano",
    title: "Tu tienda llave en mano",
    subtitle:
      "De la selección de productos con criterio a una tienda construida con acompañamiento y lista para recibir pedidos.",
    badge: {
      id: "b-store",
      icon: "store",
      title: "Arquitecto de Tiendas",
      description: "Conoces los pasos para montar una tienda llave en mano.",
    },
  },
  {
    id: "numbers",
    etape: 5,
    kicker: "ETAPA 05 · TUS NÚMEROS",
    navTitle: "Rentabilidad",
    title: "Números, rentabilidad y crecimiento",
    subtitle:
      "Facturación no es ganancia. Aprende a leer los números y calcula tu propio escenario con la calculadora.",
    badge: {
      id: "b-numbers",
      icon: "calculator",
      title: "Analista de Rentabilidad",
      description: "Comprendiste la diferencia entre facturar y ganar.",
    },
    quiz: {
      question: "¿Qué es la utilidad estimada de un periodo?",
      options: [
        "Todo el dinero que entra por ventas",
        "El margen bruto menos otros costos y la inversión publicitaria",
        "El presupuesto total invertido en publicidad",
      ],
      correctIndex: 1,
      explanation:
        "Correcto. La utilidad estima lo que queda para ti después de costos de productos, otros costos e inversión publicitaria.",
    },
  },
  {
    id: "includes",
    etape: 6,
    kicker: "ETAPA 06 · LA MENTORÍA",
    navTitle: "Qué incluye",
    title: "¿Qué incluye la mentoría?",
    subtitle:
      "Un acompañamiento estructurado para pasar de cero a una tienda operando. Esto es lo que contempla, según el alcance que se confirme.",
  },
  {
    id: "mentor",
    etape: 7,
    kicker: "ETAPA 07 · TU MENTOR",
    navTitle: "El mentor",
    title: "Conoce a tu mentor",
    subtitle: "Alguien que ya camina este camino y te acompaña paso a paso.",
  },
  {
    id: "cta",
    etape: 8,
    kicker: "ETAPA 08 · DA EL PASO",
    navTitle: "Da el siguiente paso",
    title: "Tu tienda online puede comenzar hoy.",
    subtitle:
      "No necesitas dominar todo desde el primer día. Necesitas una ruta clara, una estructura bien construida y aprender a gestionar cada parte del negocio.",
    badge: {
      id: "b-complete",
      icon: "trophy",
      title: "Ruta Completa",
      description: "Completaste toda la experiencia MasterShop.",
    },
  },
]

export const TOTAL_STAGES = STAGES.length

export function getStage(index: number): StageDef {
  return STAGES[Math.max(0, Math.min(index, STAGES.length - 1))]
}
