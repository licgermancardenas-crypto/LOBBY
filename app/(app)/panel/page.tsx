import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import type { Profile } from "@/types/database"

export default async function PanelPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const profile = data as Profile | null

  if (!profile) redirect("/onboarding")

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hola, {profile.display_name}</h1>
          <p className="text-[var(--muted-foreground)]">lobby.app/{profile.handle}</p>
        </div>
        <Link
          href="/editar-perfil"
          className="px-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-sm font-medium hover:border-[var(--accent)] transition-colors"
        >
          Editar perfil
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl">
          <p className="text-[var(--muted-foreground)] text-xs uppercase tracking-wider">Tipo</p>
          <p className="text-lg font-semibold capitalize mt-1">{profile.profile_type}</p>
        </div>
        <div className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl">
          <p className="text-[var(--muted-foreground)] text-xs uppercase tracking-wider">País</p>
          <p className="text-lg font-semibold mt-1">{profile.country ?? "—"}</p>
        </div>
        <div className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl">
          <p className="text-[var(--muted-foreground)] text-xs uppercase tracking-wider">Perfil público</p>
          <Link
            href={`/${profile.handle}`}
            className="text-[var(--accent)] text-sm hover:underline mt-1 block"
          >
            Ver mi perfil →
          </Link>
        </div>
      </div>
    </main>
  )
}
