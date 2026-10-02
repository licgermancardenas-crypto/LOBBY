import Link from "next/link"
import { LEGAL } from "@/lib/legal"
import { Wordmark } from "@/components/brand/wordmark"

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-[var(--border)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--muted-foreground)]">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Wordmark className="h-6 w-auto text-[var(--cream)]" />
          <p>© {new Date().getFullYear()} Lobby · Play. Connect. Create. Together.</p>
        </div>
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
