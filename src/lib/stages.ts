// ============================================================
// Definición de etapas, insignias y preguntas de comprobación
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
  /** Número de etapa visible (1-12) o null para secciones complementarias */
  etape: number | null
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
    navTitle: "Modelo de negocio",
    title: "¿Cómo funciona vender por internet?",
    subtitle:
      "Una tienda online es un sistema: productos, proveedores, clientes y logística conectados. Descúbrelo pieza por pieza.",
    badge: {
      id: "b-model",
      icon: "brain",
      title: "Modelo Mental",
      description: "Comprendiste el flujo del comercio electrónico.",
    },
    quiz: {
      question: "En una venta online, ¿quién entrega físicamente el producto al cliente?",
      options: [
        "La tienda online (la web)",
        "El proveedor o el servicio logístico",
        "El banco que procesa el pago",
      ],
      correctIndex: 1,
      explanation:
        "Correcto. La tienda recibe el pedido, pero la entrega física depende del proveedor y del servicio logístico según sus condiciones.",
    },
  },
  {
    id: "dropshipping",
    etape: 3,
    kicker: "ETAPA 03 · DROPSHIPPING",
    navTitle: "Dropshipping",
    title: "Vender sin inventario propio",
    subtitle:
      "Con dropshipping vendes sin almacenar productos: el pedido se coordina con el proveedor, quien lo despacha por ti.",
    badge: {
      id: "b-margin",
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
    etape: 4,
    kicker: "ETAPA 04 · LA PLATAFORMA",
    navTitle: "MasterShop",
    title: "MasterShop: la plataforma que facilita tu operación",
    subtitle:
      "MasterShop es una plataforma colombiana que reúne las piezas del dropshipping para que las gestiones desde un solo lugar.",
  },
  {
    id: "products",
    etape: 5,
    kicker: "ETAPA 05 · PRODUCTOS",
    navTitle: "Selección de productos",
    title: "Elige productos con criterio",
    subtitle:
      "No se trata de vender “lo que te guste”, sino de analizar demanda, márgenes, competencia y presentación. Explora las categorías.",
  },
  {
    id: "store",
    etape: 6,
    kicker: "ETAPA 06 · TU TIENDA",
    navTitle: "Construcción de tienda",
    title: "Construye tu tienda online",
    subtitle:
      "De la configuración inicial a una tienda lista para recibir pedidos. Con acompañamiento para dejarla operando.",
    badge: {
      id: "b-store",
      icon: "store",
      title: "Arquitecto de Tiendas",
      description: "Conoces los pasos para montar una tienda llave en mano.",
    },
  },
  {
    id: "orders",
    etape: 7,
    kicker: "ETAPA 07 · OPERACIÓN",
    navTitle: "Pedidos y entregas",
    title: "El viaje de un pedido",
    subtitle:
      "Desde que el cliente compra hasta que recibe su producto. Sigue el recorrido operativo paso a paso.",
    badge: {
      id: "b-orders",
      icon: "truck",
      title: "Operador Logístico",
      description: "Dominaste el flujo operativo de pedidos y entregas.",
    },
    quiz: {
      question: "¿Cuál es el primer paso cuando llega un pedido a tu tienda?",
      options: [
        "Publicar más contenido en redes",
        "Recibir y revisar la información del pedido",
        "Pedir otro producto al proveedor",
      ],
      correctIndex: 1,
      explanation:
        "Correcto. Todo comienza por recibir bien la información del pedido para gestionarlo correctamente con el proveedor.",
    },
  },
  {
    id: "content",
    etape: 8,
    kicker: "ETAPA 08 · CONTENIDO",
    navTitle: "Creación de contenido",
    title: "Crea contenido que atraiga clientes",
    subtitle:
      "El contenido es el escaparate de tu tienda. Videos cortos, demostraciones y ganchos que detienen el scroll.",
  },
  {
    id: "traffic",
    etape: 9,
    kicker: "ETAPA 09 · CLIENTES",
    navTitle: "Adquisición de clientes",
    title: "Aprende a conseguir clientes",
    subtitle:
      "Hay dos grandes caminos: el orgánico (contenido que atrae) y el pago (publicidad que impulsa). Conoce ambos.",
    quiz: {
      question: "Además de inversión, ¿qué requiere la publicidad paga para funcionar?",
      options: ["Suerte y timing", "Solo elegir el mejor horario", "Pruebas, medición y optimización"],
      correctIndex: 2,
      explanation:
        "Correcto. La publicidad exige presupuesto, pruebas constantes y optimización. Ningún resultado está garantizado.",
    },
  },
  {
    id: "service",
    etape: 10,
    kicker: "ETAPA 10 · ATENCIÓN",
    navTitle: "Atención y conversión",
    title: "Atiende, convierte y automatiza",
    subtitle:
      "Responder bien y a tiempo convierte preguntas en ventas. Con procesos e IA de apoyo, la atención escala.",
  },
  {
    id: "numbers",
    etape: 11,
    kicker: "ETAPA 11 · NÚMEROS",
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
    id: "route",
    etape: 12,
    kicker: "ETAPA 12 · TU RUTA",
    navTitle: "Ruta de 0 a 100",
    title: "Tu ruta de cero a 100",
    subtitle:
      "Diez niveles que resumen todo el camino: del modelo al escalamiento. Este es el mapa que recorrerás en la mentoría.",
    badge: {
      id: "b-route",
      icon: "map",
      title: "Explorador de la Ruta",
      description: "Completaste el mapa de aprendizaje de 0 a 100.",
    },
  },
  {
    id: "includes",
    etape: null,
    kicker: "SECCIÓN · LA MENTORÍA",
    navTitle: "Qué incluye",
    title: "¿Qué incluye la mentoría?",
    subtitle:
      "Un acompañamiento estructurado para pasar de cero a una tienda operando. Esto es lo que contempla, según el alcance que se confirme.",
  },
  {
    id: "mentor",
    etape: null,
    kicker: "SECCIÓN · TU MENTOR",
    navTitle: "El mentor",
    title: "Conoce a tu mentor",
    subtitle: "Alguien que ya camina este camino y te acompaña paso a paso.",
  },
  {
    id: "cta",
    etape: null,
    kicker: "SECCIÓN FINAL",
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
