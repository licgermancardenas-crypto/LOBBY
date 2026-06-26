import Link from "next/link"

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="max-w-3xl space-y-8">
        <div className="space-y-2">
          <p className="text-[var(--accent)] text-sm font-semibold tracking-widest uppercase">
            Gaming · Esports · Creadores · Entretenimiento
          </p>
          <h1 className="text-6xl font-black tracking-tight">
            LOB<span className="text-[var(--accent)]">BY</span>
          </h1>
          <p className="text-2xl font-semibold">
            La capa profesional de la economía del entretenimiento.
          </p>
        </div>

        <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
          LinkedIn + Upwork para el gaming y los esports. Tu identidad gamer
          es tu identidad profesional.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/registro"
            className="bg-[var(--accent)] text-[var(--accent-foreground)] font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Crear perfil gratis
          </Link>
          <Link
            href="/buscar"
            className="border border-[var(--border)] font-medium px-8 py-3 rounded-lg hover:bg-[var(--muted)] transition-colors"
          >
            Explorar perfiles
          </Link>
        </div>
      </div>
    </main>
  )
}
