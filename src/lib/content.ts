// ============================================================
// MASTERSHOP E-COMMERCE — Contenido editable de la experiencia
// Este archivo define los valores por defecto. El panel de
// administración puede sobrescribirlos (se guardan en la DB).
// ============================================================

export interface MentorshipItem {
  id: string
  title: string
  description: string
  /** implemented = se implementa contigo · taught = se enseña · executed = lo ejecuta el participante */
  type: "implemented" | "taught" | "executed"
}

export interface StageText {
  title: string
  subtitle: string
}

export interface SiteConfig {
  brand: {
    name: string
    program: string
    presenter: string
  }
  hero: {
    badge: string
    title: string
    titleHighlight: string
    subtitle: string
    ctaLabel: string
    imageUrl: string
  }
  contact: {
    /** Número del mentor: los leads del formulario llegan aquí por WhatsApp */
    whatsappUrl: string
    whatsappLabel: string
    calendarUrl: string
    externalFormUrl: string
  }
  mentor: {
    name: string
    role: string
    founderTitle: string
    years: string
    yearsLabel: string
    bio: string
    photoUrl: string
    photoNote: string
    highlights: string[]
    extraNote: string
    academyName: string
    academyLogoUrl: string
    academyTagline: string
    academyDescription: string
  }
  mentorship: {
    title: string
    subtitle: string
    scopeNote: string
    items: MentorshipItem[]
  }
  mastershop: {
    logoUrl: string
    panelImageUrl: string
    panelCaption: string
    panelStats: { label: string; value: string }[]
    panelNote: string
    features: { title: string; description: string }[]
    disclaimer: string
  }
  cta: {
    title: string
    text: string
    primaryLabel: string
    secondaryLabel: string
    successTitle: string
    successText: string
  }
  /** Sobrescritura de títulos/subtítulos por etapa (id de etapa) */
  stages: Record<string, Partial<StageText>>
}

export const DEFAULT_CONFIG: SiteConfig = {
  brand: {
    name: "MASTERSHOP",
    program: "E-COMMERCE",
    presenter: "Alejo",
  },
  hero: {
    badge: "MENTORÍA + TIENDA LLAVE EN MANO",
    title: "TU NEGOCIO DIGITAL",
    titleHighlight: "PUEDE COMENZAR AQUÍ",
    subtitle:
      "Descubre cómo construir tu propia tienda online con MasterShop, incluso si hoy empiezas desde cero.",
    ctaLabel: "COMENZAR EXPERIENCIA",
    imageUrl: "/images/hero-holo.png",
  },
  contact: {
    // ⚠️ Usamos api.whatsapp.com/send (NO wa.me): el redirect de wa.me
    // re-codifica el parámetro text y destruye los emojis (→ �).
    whatsappUrl: "https://api.whatsapp.com/send?phone=573112441018",
    whatsappLabel: "Enviar por WhatsApp",
    calendarUrl: "",
    externalFormUrl: "",
  },
  mentor: {
    name: "Alejo",
    role: "Mentor de E-Commerce & Marketing Digital",
    founderTitle: "Fundador de ALQEMIA",
    years: "9",
    yearsLabel: "años acompañando negocios y formando emprendedores desde cero",
    bio: "Llevo 9 años acompañando negocios y formando emprendedores desde cero. Mi experiencia práctica está en comercio electrónico, dropshipping, marketing digital, publicidad y automatización — y la pongo al servicio de tu proyecto, paso a paso, sin humo: con estructura clara, procesos y decisiones basadas en números.",
    photoUrl: "/images/alejo.jpg",
    photoNote: "",
    highlights: [
      "E-commerce",
      "Dropshipping",
      "Marketing digital",
      "Publicidad (Ads)",
      "Automatización",
      "Formación de emprendedores",
    ],
    extraNote:
      "Aquí no encontrarás testimonios inventados ni promesas de resultados. Mi compromiso es mostrarte el camino real, con la práctica de quien opera este negocio todos los días.",
    academyName: "ALQEMIA",
    academyLogoUrl: "/images/alqemia-logo.jpg",
    academyTagline: "Ecosistema de Negocios Digitales",
    academyDescription:
      "ALQEMIA es el ecosistema desde el cual impulsamos la formación, el emprendimiento y el crecimiento de negocios digitales: un espacio para aprender, montar y escalar con acompañamiento real.",
  },
  mentorship: {
    title: "¿Qué incluye la mentoría?",
    subtitle:
      "Un acompañamiento estructurado para pasar de cero a una tienda operando. Esto es lo que contempla, según el alcance que se confirme:",
    scopeNote:
      "El alcance exacto, la duración y los entregables se confirman al momento de la contratación. Aquí no se incluyen promesas de resultados ni bonos no definidos.",
    items: [
      {
        id: "m1",
        title: "Mentoría desde cero",
        description: "Entendimiento del modelo de negocio de e-commerce y dropshipping desde los fundamentos.",
        type: "taught",
      },
      {
        id: "m2",
        title: "Orientación paso a paso",
        description: "Ruta guiada por cada componente del negocio: tienda, productos, contenido, clientes y pedidos.",
        type: "taught",
      },
      {
        id: "m3",
        title: "Implementación inicial de la tienda",
        description: "La estructura inicial de tu tienda se construye con acompañamiento, según el alcance contratado.",
        type: "implemented",
      },
      {
        id: "m4",
        title: "Configuración y organización de productos",
        description: "Apoyo para dejar organizado el catálogo inicial de tu tienda dentro de la plataforma.",
        type: "implemented",
      },
      {
        id: "m5",
        title: "Formación sobre la operación",
        description: "Cómo funcionan los pedidos, los proveedores y los despachos dentro del modelo.",
        type: "taught",
      },
      {
        id: "m6",
        title: "Fundamentos de marketing y adquisición",
        description: "Bases de tráfico orgánico y pago para atraer clientes potenciales a tu tienda.",
        type: "taught",
      },
      {
        id: "m7",
        title: "Estrategias de contenido",
        description: "Cómo presentar productos en redes sociales con videos cortos, ganchos y llamados a la acción.",
        type: "taught",
      },
      {
        id: "m8",
        title: "Orientación sobre publicidad",
        description: "Comprensión de campañas, públicos, presupuestos y optimización en plataformas de anuncios.",
        type: "taught",
      },
      {
        id: "m9",
        title: "Métricas y rentabilidad",
        description: "Acompañamiento para leer los números del negocio y tomar decisiones informadas.",
        type: "taught",
      },
      {
        id: "m10",
        title: "Gestión diaria del negocio",
        description: "La operación cotidiana de tu tienda la lideras tú con lo aprendido.",
        type: "executed",
      },
      {
        id: "m11",
        title: "Inversión publicitaria",
        description: "Las decisiones de presupuesto y campañas las define y ejecuta el participante.",
        type: "executed",
      },
      {
        id: "m12",
        title: "Atención a tus clientes",
        description: "El servicio y seguimiento a tus compradores lo gestionas tú (con las herramientas aprendidas).",
        type: "executed",
      },
    ],
  },
  mastershop: {
    logoUrl: "/images/mastershop-logo.png",
    panelImageUrl: "/images/mastershop-panel.jpg",
    panelCaption: "Captura real del panel de MasterShop",
    panelStats: [
      { label: "Ventas registradas en el panel", value: "$ 307.771.012,94" },
      { label: "Utilidades registradas en el panel", value: "$ 214.838.216,94" },
    ],
    panelNote:
      "Cifras tomadas de una cuenta real de MasterShop (captura de pantalla). Se muestran como referencia de cómo se ve la operación desde el panel — no constituyen promesa ni garantía de resultados.",
    features: [
      {
        title: "Catálogo de productos",
        description: "Exploración y selección de productos para publicar en tu tienda.",
      },
      {
        title: "Exploración de proveedores",
        description: "Conocimiento de las opciones de proveedores disponibles en la plataforma.",
      },
      {
        title: "Gestión de pedidos",
        description: "Organización y administración de los pedidos de tu tienda desde un mismo lugar.",
      },
      {
        title: "Seguimiento de despachos",
        description: "Consulta del estado de los envíos realizados a tus clientes.",
      },
      {
        title: "Administración de la operación",
        description: "Un panel para gestionar las tareas del día a día del negocio.",
      },
      {
        title: "Herramientas para emprendedores",
        description: "Funcionalidades disponibles según el plan y las condiciones de la plataforma.",
      },
    ],
    disclaimer:
      "Captura real de la plataforma MasterShop. La disponibilidad específica de funciones, integraciones y proveedores depende de las condiciones actuales de MasterShop.",
  },
  cta: {
    title: "TU TIENDA ONLINE PUEDE COMENZAR HOY.",
    text:
      "No necesitas dominar todo desde el primer día. Necesitas una ruta clara, una estructura bien construida y aprender a gestionar cada parte del negocio.",
    primaryLabel: "QUIERO MI TIENDA MASTERSHOP",
    secondaryLabel: "QUIERO UNA ASESORÍA PERSONALIZADA",
    successTitle: "¡Solicitud recibida!",
    successText:
      "Tu solicitud quedó registrada. Revisa WhatsApp: el mensaje con tus datos ya está listo — solo presiona enviar y Alejo lo recibirá al instante.",
  },
  stages: {},
}

/** Fusión profunda de configuración guardada sobre los valores por defecto */
export function mergeConfig(saved: unknown): SiteConfig {
  if (!saved || typeof saved !== "object") return DEFAULT_CONFIG
  const s = saved as Record<string, unknown>
  const merge = <T extends Record<string, unknown>>(base: T, over: unknown): T => {
    if (!over || typeof over !== "object") return base
    const o = over as Record<string, unknown>
    const out: Record<string, unknown> = { ...base }
    for (const key of Object.keys(base)) {
      if (o[key] === undefined) continue
      if (
        typeof base[key] === "object" &&
        base[key] !== null &&
        !Array.isArray(base[key]) &&
        typeof o[key] === "object" &&
        o[key] !== null &&
        !Array.isArray(o[key])
      ) {
        out[key] = merge(base[key] as Record<string, unknown>, o[key])
      } else {
        out[key] = o[key]
      }
    }
    return out as T
  }
  const merged = merge(DEFAULT_CONFIG as unknown as Record<string, unknown>, s)
  return merged as SiteConfig
}
