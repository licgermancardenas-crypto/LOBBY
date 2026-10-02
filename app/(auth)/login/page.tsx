import Link from "next/link"
import { LobbyAccent, WelcomeShell } from "@/components/auth/auth-ui"
import { LoginForm } from "@/components/auth/login-form"

// Instancia el cliente Supabase (que necesita env vars en runtime), así que
// no la prerenderizamos en el build.
export const dynamic = "force-dynamic"

export default function LoginPage() {
  return (
    <WelcomeShell
      title={<>Welcome back to <LobbyAccent /></>}
      footer={
        <>
          ¿No tenés cuenta?{" "}
          <Link href="/registro" className="font-extrabold text-[var(--yellow)] hover:underline">
            Registrate
          </Link>
        </>
      }
    >
      <LoginForm />
    </WelcomeShell>
  )
}
