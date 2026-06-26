import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegistroPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-black">
            LOB<span className="text-[var(--accent)]">BY</span>
          </h1>
          <p className="text-[var(--muted-foreground)]">Creá tu perfil profesional</p>
        </div>

        <RegisterForm />

        <p className="text-center text-sm text-[var(--muted-foreground)]">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            Ingresá
          </Link>
        </p>
      </div>
    </main>
  )
}
