import Link from "next/link"
import { SkyArt, SKY_CARD_OFFSET } from "@/components/brand/sky-art"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BrandWaitlistForm } from "@/components/landing/brand-waitlist-form"

const PLATFORMS = ["Twitch", "YouTube", "TikTok", "Instagram"]

const STATS = [
  { value: "37,2%", label: "de los seguidores de influencers son falsos o sospechosos" },
  { value: "US$4,6B", label: "por año gastan las marcas en audiencia que no existe" },
  { value: "372M", label: "de jugadores en LATAM, sin una capa profesional" },
]

const CREATOR_STEPS = [
  {
    title: "Creá tu perfil",
    body: "Gratis, en dos minutos. Tus juegos, tu país, tu experiencia y tus links en un solo lugar.",
  },
  {
    title: "Conectá tus canales",
    body: "Twitch, YouTube, TikTok e Instagram. Leemos tus números directo de la plataforma: sin capturas, sin inflar.",
  },
  {
    title: "Compartí tu media kit",
    body: "Un link con tu audiencia verificada que se actualiza solo. Mandáselo a cualquier marca.",
  },
]

const BRAND_POINTS = [
  "Buscá creadores LATAM por juego, país, plataforma y tamaño de audiencia.",
  "Cada número viene verificado por la plataforma, no auto-reportado.",
  "Lo que hoy te lleva semanas y una agencia, en minutos.",
]

export default function LandingPage() {
  return (
    <>
      <SiteHeader />

      <main className="w-full">
        {/* Hero — mismo lenguaje que la pantalla de bienvenida: cielo + mascota + tarjeta tinta */}
        <section className="lobby-sky relative overflow-hidden px-4 pb-16">
          <SkyArt />
          <div className={`relative z-10 mx-auto ${SKY_CARD_OFFSET} max-w-3xl rounded-[28px] border border-[var(--lavender)]/20 bg-[var(--ink)]/95 px-5 py-10 sm:px-12 text-center shadow-[0_30px_80px_rgba(26,16,35,.42),0_0_50px_rgba(139,110,242,.14)] backdrop-blur-xl`}>
            <p className="text-[var(--lilac)] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase">
              Gaming · Esports · Creadores · LATAM
            </p>
            <h1 className="mt-4 text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-white">
              Tu audiencia,{" "}
              <span className="bg-gradient-to-r from-[var(--lavender)] to-[var(--lilac)] bg-clip-text text-transparent">
                verificada.
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[var(--lavender)] max-w-2xl mx-auto">
              El perfil profesional para creadores y streamers de gaming. Conectá tus canales,
              mostrá números reales y hacé que las marcas te encuentren.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/registro"
                className="bg-[var(--yellow)] text-[var(--ink)] font-extrabold px-8 py-4 rounded-2xl shadow-[0_12px_30px_rgba(255,212,90,.20)] hover:brightness-105 transition"
              >
                Crear perfil gratis
              </Link>
              <a
                href="#marcas"
                className="border border-[var(--lavender)]/40 font-medium px-8 py-4 rounded-2xl hover:bg-[var(--lilac)]/10 hover:border-[var(--lilac)] transition-colors"
              >
                Soy una marca
              </a>
            </div>
            <p className="mt-8 text-sm text-[var(--lavender)]">
              Verificamos tu audiencia en{" "}
              {PLATFORMS.map((p, i) => (
                <span key={p}>
                  <span className="text-white font-semibold">{p}</span>
                  {i < PLATFORMS.length - 2 ? ", " : i === PLATFORMS.length - 2 ? " e " : ""}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* El problema, en números */}
        <section className="border-y border-[var(--border)] bg-[var(--card)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-8 sm:grid-cols-3 text-center">
            {STATS.map((s) => (
              <div key={s.value}>
                <p className="font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--peach)]">{s.value}</p>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="pb-6 text-center text-xs text-[var(--muted-foreground)]/70">
            Fuentes: HypeAuditor; Newzoo, Global Games Market 2025.
          </p>
        </section>

        {/* Para creadores */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <p className="text-[var(--lilac)] text-sm font-semibold tracking-[0.25em] uppercase">Para creadores</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
            Tu identidad gamer es tu identidad profesional.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {CREATOR_STEPS.map((step, i) => (
              <div key={step.title} className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
                <p className="text-sm font-bold text-[var(--lilac)]">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[var(--muted-foreground)]">
            Gratis para creadores. Siempre.{" "}
            <Link href="/registro" className="text-[var(--accent)] hover:underline">
              Crear mi perfil →
            </Link>
          </p>
        </section>

        {/* Para marcas */}
        <section id="marcas" className="scroll-mt-20 border-t border-[var(--border)] bg-[var(--card)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-[var(--lilac)] text-sm font-semibold tracking-[0.25em] uppercase">Para marcas y agencias</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
                ¿Audiencia real o inflada? Dejá de adivinar.
              </h2>
              <ul className="mt-6 space-y-3">
                {BRAND_POINTS.map((point) => (
                  <li key={point} className="flex gap-3 text-[var(--muted-foreground)]">
                    <span className="text-[var(--lilac)] font-bold" aria-hidden>✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-[var(--muted-foreground)]">
                Estamos sumando creadores verificados. Anotate para tener acceso anticipado
                al directorio.
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--ink)] p-6 sm:p-8">
              <BrandWaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
