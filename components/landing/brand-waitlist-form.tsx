"use client"

import { useActionState } from "react"
import Link from "next/link"
import { joinBrandWaitlist, type WaitlistState } from "@/app/waitlist-actions"

const initial: WaitlistState = { ok: false, error: null }

const inputClass =
  "w-full px-4 py-3 rounded-2xl bg-[var(--lilac)]/10 border border-[var(--lavender)]/30 text-sm placeholder:text-[var(--lavender)] focus:outline-none focus:border-[var(--lilac)]"

export function BrandWaitlistForm() {
  const [state, action, pending] = useActionState(joinBrandWaitlist, initial)

  if (state.ok) {
    return (
      <div className="rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 p-6 text-center">
        <p className="font-bold text-lg">¡Listo, estás en la lista!</p>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Te escribimos apenas abramos el acceso para marcas.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-3">
      <input name="email" type="email" required placeholder="Email de trabajo" autoComplete="email" className={inputClass} />
      <input name="company" required maxLength={120} placeholder="Empresa" autoComplete="organization" className={inputClass} />
      <select name="role" required defaultValue="" className={inputClass}>
        <option value="" disabled>¿Qué tipo de empresa sos?</option>
        <option value="marca">Marca</option>
        <option value="agencia">Agencia / MCN</option>
        <option value="org">Equipo / liga / organizador</option>
        <option value="otro">Otro</option>
      </select>
      {state.error && <p className="text-red-400 text-sm">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full py-4 bg-[var(--yellow)] text-[var(--ink)] font-extrabold rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? "Enviando..." : "Quiero acceso anticipado"}
      </button>
      <p className="text-xs text-[var(--muted-foreground)]">
        Al anotarte aceptás la <Link href="/privacidad" className="underline">Política de privacidad</Link>.
      </p>
    </form>
  )
}
