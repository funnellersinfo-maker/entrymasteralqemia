import type { Metadata, Viewport } from "next";
import { Geist_Mono, Space_Grotesk, Unbounded } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://entrymasteralqemia.pages.dev"),
  title: "MasterShop E-Commerce — Tienda Llave en Mano | Mentoría con Alejo",
  description:
    "Descubre el dropshipping con MasterShop, aprende a operar tu tienda llave en mano y da el primer paso con la mentoría de Alejo. Experiencia interactiva.",
  keywords: [
    "MasterShop",
    "e-commerce",
    "dropshipping",
    "tienda online",
    "tienda llave en mano",
    "mentoría e-commerce",
    "ALQEMIA",
  ],
  openGraph: {
    title: "MasterShop E-Commerce — Tienda Llave en Mano",
    description:
      "Experiencia interactiva: del dropshipping a tu tienda online operando. Mentoría presentada por Alejo de ALQEMIA.",
    url: "https://entrymasteralqemia.pages.dev",
    siteName: "MasterShop E-Commerce · ALQEMIA",
    type: "website",
    locale: "es_CO",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "MasterShop E-Commerce — Tienda Llave en Mano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MasterShop E-Commerce — Tienda Llave en Mano",
    description:
      "Experiencia interactiva: del dropshipping a tu tienda online operando. Mentoría con Alejo.",
    images: ["/images/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0614",
  width: "device-width",
  initialScale: 1,
  // Página estática: sin zoom manual para evitar el corrimiento lateral
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${unbounded.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
