import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { siteUrl } from "@/lib/site"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LOBBY — La capa profesional del gaming",
    template: "%s — LOBBY",
  },
  description:
    "Red profesional para gamers, esports, creadores y streamers de LATAM. Tu identidad gamer es tu identidad profesional.",
  openGraph: {
    title: "LOBBY",
    description: "La capa profesional de la economía del entretenimiento.",
    siteName: "LOBBY",
    type: "website",
    locale: "es_LA",
  },
  twitter: {
    card: "summary_large_image",
    title: "LOBBY",
    description: "La capa profesional de la economía del entretenimiento.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${geist.className} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] antialiased">
        {children}
      </body>
    </html>
  )
}
