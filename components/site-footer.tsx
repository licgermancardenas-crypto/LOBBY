import Link from "next/link"
import { LEGAL } from "@/lib/legal"

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-[var(--border)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--muted-foreground)]">
        <p>
          © {new Date().getFullYear()} LOB<span className="text-[var(--accent)]">BY</span> · LATAM
        </p>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/terminos" className="hover:text-[var(--foreground)] transition-colors">
            Términos de uso
          </Link>
          <Link href="/privacidad" className="hover:text-[var(--foreground)] transition-colors">
            Política de privacidad
          </Link>
          <a href={`mailto:${LEGAL.email}`} className="hover:text-[var(--foreground)] transition-colors">
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  )
}
