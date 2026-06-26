import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { OnboardingForm } from "@/components/perfil/onboarding-form"

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single()

  if (profile) redirect("/panel")

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">Armá tu perfil</h1>
          <p className="text-[var(--muted-foreground)]">
            Esta info va a aparecer en tu página pública
          </p>
        </div>
        <OnboardingForm userId={user.id} />
      </div>
    </main>
  )
}
