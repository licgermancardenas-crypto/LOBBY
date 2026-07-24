import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

// Instancia el cliente Supabase (que necesita env vars en runtime), así que
// no la prerenderizamos en el build.
export const dynamic = "force-dynamic"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-black">
            LOB<span className="text-[var(--accent)]">BY</span>
          </h1>
          <p className="text-[var(--muted-foreground)]">Ingresá a tu cuenta</p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-[var(--muted-foreground)]">
          ¿No tenés cuenta?{" "}
          <Link href="/registro" className="text-[var(--accent)] hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </main>
  )
}
