"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { track } from "@/lib/analytics"
import { Divider, EmailField, PasswordField, PrimaryButton, SocialButtons } from "@/components/auth/auth-ui"

export function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback?next=/onboarding` },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    await track("signup_completed", { properties: { method: "email" } })

    // Si la confirmación de email está desactivada, signUp ya devuelve sesión:
    // entramos directo. Si no, mostramos el aviso de "revisá tu email".
    if (data.session) {
      router.push("/onboarding")
      router.refresh()
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
      <div className="text-center space-y-2 p-6 rounded-2xl border border-[var(--lilac)]/40 bg-[var(--lilac)]/10">
        <p className="font-semibold text-white">Revisá tu email</p>
        <p className="text-sm text-[var(--lavender)]">
          Te mandamos un link de confirmación a <strong className="text-white">{email}</strong>
        </p>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-3.5">
        <EmailField value={email} onChange={(e) => setEmail(e.target.value)} required />
        <PasswordField
          placeholder="Contraseña (mín. 8 caracteres)"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        {error && <p className="text-[var(--pink)] text-sm">{error}</p>}
        <PrimaryButton disabled={loading}>{loading ? "Creando cuenta..." : "Crear cuenta"}</PrimaryButton>
      </form>

      <Divider />
      <SocialButtons onGoogle={handleGoogle} onDiscord={handleDiscord} />
    </div>
  )
}
