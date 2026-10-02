"use client"

import { useState } from "react"
import { Check, Copy, Download } from "lucide-react"
import { track } from "@/lib/analytics"

type Props = {
  url: string
  profileId: string
  /** Muestra "Descargar PDF" (imprimir la página). Solo en el media kit. */
  printable?: boolean
}

/** Botones para compartir el media kit: copiar link y guardar como PDF. */
export function ShareActions({ url, profileId, printable = false }: Props) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Navegadores sin permiso de portapapeles: que lo copien a mano.
      window.prompt("Copiá tu link:", url)
      return
    }
    setCopied(true)
    track("media_kit_link_copied", { profileId })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 print:hidden">
      <button
        type="button"
        onClick={copy}
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[var(--yellow)] text-[var(--ink)] font-extrabold hover:brightness-105 transition"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "¡Link copiado!" : "Copiar link"}
      </button>
      {printable && (
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-[var(--lavender)]/40 font-medium hover:bg-[var(--lilac)]/10 hover:border-[var(--lilac)] transition-colors"
        >
          <Download className="size-4" /> Descargar PDF
        </button>
      )}
    </div>
  )
}
