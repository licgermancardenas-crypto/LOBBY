import Link from "next/link"
import { LobbyAccent, WelcomeShell } from "@/components/auth/auth-ui"
import { RegisterForm } from "@/components/auth/register-form"

// Instancia el cliente Supabase (que necesita env vars en runtime), así que
// no la prerenderizamos en el build.
export const dynamic = "force-dynamic"

export default function RegistroPage() {
  return (
    <WelcomeShell
      title={<>Welcome to <LobbyAccent /></>}
      footer={
        <>
          ¿Ya tenés una cuenta?{" "}
          <Link href="/login" className="font-extrabold text-[var(--yellow)] hover:underline">
            Ingresá
          </Link>
        </>
      }
    >
      <RegisterForm />
    </WelcomeShell>
  )
}
