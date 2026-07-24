import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import type { Profile, Event } from "@/types/database"
import { summarizeEvents } from "@/lib/metrics"

// Página autenticada (lee la sesión del usuario): no prerenderizar.
export const dynamic = "force-dynamic"

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

  // Métricas del perfil. RLS deja leer solo los events con profile_id propio.
  const { data: eventRows } = await supabase
    .from("events")
    .select("name, session_id, properties, created_at")
    .eq("profile_id", user.id)
    .in("name", ["profile_viewed", "external_link_clicked"])
    .order("created_at", { ascending: false })
    .limit(5000)

  const metrics = summarizeEvents(
    (eventRows ?? []) as Pick<Event, "name" | "session_id" | "properties" | "created_at">[]
  )

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

      {/* Actividad — métricas del perfil */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tu actividad</h2>

        {!metrics.hasData ? (
          <div className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl text-center">
            <p className="text-[var(--muted-foreground)] text-sm">
              Todavía no hay datos. Compartí{" "}
              <Link href={`/${profile.handle}`} className="text-[var(--accent)] hover:underline">
                lobby.app/{profile.handle}
              </Link>{" "}
              para empezar a ver tus métricas.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard
                label="Vistas de perfil"
                value={metrics.views}
                sub={`+${metrics.viewsLast7d} en 7 días`}
              />
              <MetricCard
                label="Visitantes únicos"
                value={metrics.uniqueVisitors}
              />
              <MetricCard
                label="Clicks a tus links"
                value={metrics.clicks}
                sub={`+${metrics.clicksLast7d} en 7 días`}
              />
            </div>

            {metrics.clicksByPlatform.length > 0 && (
              <div className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl space-y-2">
                <p className="text-[var(--muted-foreground)] text-xs uppercase tracking-wider">
                  Clicks por plataforma
                </p>
                <ul className="space-y-1">
                  {metrics.clicksByPlatform.map(({ platform, count }) => (
                    <li key={platform} className="flex justify-between text-sm">
                      <span className="capitalize">{platform}</span>
                      <span className="font-semibold tabular-nums">{count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string
  value: number
  sub?: string
}) {
  return (
    <div className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl">
      <p className="text-[var(--muted-foreground)] text-xs uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold mt-1 tabular-nums">{value.toLocaleString("es")}</p>
      {sub && <p className="text-[var(--muted-foreground)] text-xs mt-1">{sub}</p>}
    </div>
  )
}
