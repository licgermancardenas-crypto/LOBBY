import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LEGAL } from "@/lib/legal"

// Layout compartido de /terminos y /privacidad: texto largo, legible, con
// estilos de prosa hechos a mano (no usamos @tailwindcss/typography).
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Última actualización: {LEGAL.updated}
        </p>
        <div
          className="mt-10 space-y-4 leading-relaxed text-[var(--foreground)]/90
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--foreground)] [&_h2]:mt-10 [&_h2]:mb-2
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2
            [&_a]:text-[var(--accent)] [&_a:hover]:underline
            [&_strong]:text-[var(--foreground)]"
        >
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
