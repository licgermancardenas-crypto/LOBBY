import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { EditProfileForm } from "@/components/perfil/edit-profile-form"
import type { Profile, Link as ProfileLink, ChannelStat } from "@/types/database"

// Página autenticada que monta un form con el cliente Supabase: no prerenderizar.
export const dynamic = "force-dynamic"

type Props = { searchParams: Promise<{ twitch?: string }> }

const TWITCH_BANNERS: Record<string, { text: string; ok: boolean }> = {
  ok: { text: "✓ Twitch conectado. Tus seguidores quedaron verificados.", ok: true },
  error: { text: "No pudimos conectar Twitch. Probá de nuevo.", ok: false },
  config: { text: "La conexión con Twitch todavía no está configurada.", ok: false },
}

export default async function EditarPerfilPage({ searchParams }: Props) {
  const { twitch } = await searchParams
  const banner = twitch ? TWITCH_BANNERS[twitch] : null
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

  const twitchStat = (stats as ChannelStat[] | null)?.find((s) => s.platform === "twitch")

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

      {banner && (
        <div
          className={`px-4 py-3 rounded-lg text-sm border ${
            banner.ok
              ? "bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)]"
              : "bg-[var(--muted)] border-[var(--border)] text-[var(--muted-foreground)]"
          }`}
        >
          {banner.text}
        </div>
      )}

      {/* Verificar audiencia */}
      <section className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl flex items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold text-sm">Verificar audiencia — Twitch</h2>
          <p className="text-[var(--muted-foreground)] text-xs mt-1">
            {twitchStat?.verified
              ? `Conectado como ${twitchStat.handle ?? "tu canal"} · ${twitchStat.followers?.toLocaleString("es") ?? 0} seguidores verificados`
              : "Conectá tu canal para mostrar seguidores verificados en tu perfil."}
          </p>
        </div>
        <a
          href="/api/twitch/connect"
          className="shrink-0 px-4 py-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          {twitchStat?.verified ? "Actualizar" : "Conectar Twitch"}
        </a>
      </section>

      <EditProfileForm
        profile={profile}
        initialLinks={(links ?? []) as ProfileLink[]}
        initialStats={(stats ?? []) as ChannelStat[]}
      />
    </main>
  )
}
