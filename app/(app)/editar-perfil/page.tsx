import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { EditProfileForm } from "@/components/perfil/edit-profile-form"
import type { Profile, Link as ProfileLink, ChannelStat } from "@/types/database"

// Página autenticada que monta un form con el cliente Supabase: no prerenderizar.
export const dynamic = "force-dynamic"

export default async function EditarPerfilPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const profile = profileData as Profile | null
  if (!profile) redirect("/onboarding")

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("profile_id", user.id)

  const { data: stats } = await supabase
    .from("channel_stats")
    .select("*")
    .eq("profile_id", user.id)

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Editar perfil</h1>
          <p className="text-[var(--muted-foreground)] text-sm">lobby.app/{profile.handle}</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link href={`/${profile.handle}`} className="text-[var(--accent)] hover:underline">
            Ver perfil →
          </Link>
          <Link
            href="/panel"
            className="px-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg font-medium hover:border-[var(--accent)] transition-colors"
          >
            Volver al panel
          </Link>
        </div>
      </div>

      <EditProfileForm
        profile={profile}
        initialLinks={(links ?? []) as ProfileLink[]}
        initialStats={(stats ?? []) as ChannelStat[]}
      />
    </main>
  )
}
