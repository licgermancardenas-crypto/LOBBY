"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback?next=/onboarding` },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    setSuccess(true)
    setLoading(false)
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback?next=/onboarding` },
    })
  }

  async function handleDiscord() {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: { redirectTo: `${location.origin}/auth/callback?next=/onboarding` },
    })
  }

  if (success) {
    return (
      <div className="text-center space-y-2 p-6 bg-[var(--muted)] rounded-xl">
        <p className="font-semibold">Revisá tu email</p>
        <p className="text-sm text-[var(--muted-foreground)]">
          Te mandamos un link de confirmación a <strong>{email}</strong>
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent)]"
        />
        <input
          type="password"
          placeholder="Contraseña (mín. 8 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full px-4 py-3 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent)]"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[var(--accent)] text-[var(--accent-foreground)] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-xs text-[var(--muted-foreground)]">o</span>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>

      <div className="space-y-2">
        <button
          onClick={handleGoogle}
          className="w-full py-3 border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-[var(--muted)] transition-colors"
        >
          Registrarse con Google
        </button>
        <button
          onClick={handleDiscord}
          className="w-full py-3 border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-[var(--muted)] transition-colors"
        >
          Registrarse con Discord
        </button>
      </div>
    </div>
  )
}
