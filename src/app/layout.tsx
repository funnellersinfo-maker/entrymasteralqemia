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
  title: "MasterShop E-Commerce — Tienda Llave en Mano | Mentoría con Alejo",
  description:
    "Experiencia interactiva y gamificada: descubre el modelo de dropshipping, conoce MasterShop y solicita tu tienda llave en mano. Mentoría presentada por Alejo.",
  keywords: [
    "MasterShop",
    "e-commerce",
    "dropshipping",
    "tienda online",
    "tienda llave en mano",
    "mentoría e-commerce",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0a0614",
  width: "device-width",
  initialScale: 1,
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
