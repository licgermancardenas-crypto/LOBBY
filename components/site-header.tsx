import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="w-full border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="text-xl font-black tracking-tight">
          LOB<span className="text-[var(--accent)]">BY</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4 text-sm">
          <Link
            href="/buscar"
            className="hidden sm:inline text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            Explorar
          </Link>
          <Link
            href="/login"
            className="px-3 py-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro"
            className="bg-[var(--accent)] text-[var(--accent-foreground)] font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Crear perfil
          </Link>
        </nav>
      </div>
    </header>
  )
}
