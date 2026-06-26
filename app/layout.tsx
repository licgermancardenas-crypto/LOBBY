import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LOBBY — La capa profesional del gaming",
  description:
    "Red profesional para gamers, esports, creadores y streamers de LATAM. Tu identidad gamer es tu identidad profesional.",
  openGraph: {
    title: "LOBBY",
    description: "La capa profesional de la economía del entretenimiento.",
    siteName: "LOBBY",
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
