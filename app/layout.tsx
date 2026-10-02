import type { Metadata } from "next"
import { Fredoka, Inter } from "next/font/google"
import { siteUrl } from "@/lib/site"
import "./globals.css"

// Manual de marca: display redondeada (Fredoka) para títulos, humanista
// limpia (Inter) para cuerpo y UI.
const heading = Fredoka({ subsets: ["latin"], variable: "--font-heading" })
const body = Inter({ subsets: ["latin"], variable: "--font-body" })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lobby — La casa de la industria gamer",
    template: "%s — Lobby",
  },
  description:
    "Red profesional para gamers, esports, creadores y streamers de LATAM. Tu identidad gamer es tu identidad profesional.",
  openGraph: {
    title: "Lobby",
    description: "Play. Connect. Create. Together.",
    siteName: "Lobby",
    type: "website",
    locale: "es_LA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lobby",
    description: "Play. Connect. Create. Together.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${heading.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] antialiased">
        {children}
      </body>
    </html>
  )
}
