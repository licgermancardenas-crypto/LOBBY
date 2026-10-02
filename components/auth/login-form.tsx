"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Divider, EmailField, PasswordField, PrimaryButton, SocialButtons } from "@/components/auth/auth-ui"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      const code = error.code ?? ""
      const msg = error.message.toLowerCase()
      if (code === "email_not_confirmed" || msg.includes("not confirmed")) {
        setError("Tenés que confirmar tu email. Revisá tu casilla (y spam).")
      } else if (code === "invalid_credentials" || msg.includes("invalid login")) {
        setError("Email o contraseña incorrectos")
      } else {
        setError(error.message)
      }
      setLoading(false)
      return
    }
    router.push("/panel")
    router.refresh()
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  async function handleDiscord() {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-3.5">
        <EmailField value={email} onChange={(e) => setEmail(e.target.value)} required />
        <PasswordField
          placeholder="Contraseña"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-[var(--pink)] text-sm">{error}</p>}
        <PrimaryButton disabled={loading}>{loading ? "Ingresando..." : "Ingresar"}</PrimaryButton>
      </form>

      <Divider />
      <SocialButtons onGoogle={handleGoogle} onDiscord={handleDiscord} />
    </div>
  )
}
