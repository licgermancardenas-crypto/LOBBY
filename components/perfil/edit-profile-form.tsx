"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { Profile, Link, ChannelStat } from "@/types/database"
import {
  AudienceEditor,
  LinksEditor,
  inputClass,
  toInt,
  type LinkRow,
  type StatRow,
} from "@/components/perfil/media-inputs"

type Props = {
  profile: Profile
  initialLinks: Link[]
  initialStats: ChannelStat[]
}

export function EditProfileForm({ profile, initialLinks, initialStats }: Props) {
  const supabase = createClient()
  const router = useRouter()

  const [displayName, setDisplayName] = useState(profile.display_name)
  const [country, setCountry] = useState(profile.country ?? "")
  const [bio, setBio] = useState(profile.bio ?? "")
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? "")

  const [links, setLinks] = useState<LinkRow[]>(
    initialLinks.map((l) => ({ platform: l.platform, url: l.url }))
  )
  const [stats, setStats] = useState<StatRow[]>(
    initialStats.map((s) => ({
      platform: s.platform,
      handle: s.handle ?? "",
      followers: s.followers?.toString() ?? "",
      avg_views: s.avg_views?.toString() ?? "",
    }))
  )

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSaved(false)

    // 1. Perfil base
    const { error: pErr } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        country: country || null,
        bio: bio || null,
        avatar_url: avatarUrl || null,
      })
      .eq("id", profile.id)

    if (pErr) {
      setError(pErr.message)
      setSaving(false)
      return
    }

    // 2. Links — reemplazo completo (borrar + insertar el set actual)
    await supabase.from("links").delete().eq("profile_id", profile.id)
    const cleanLinks = links
      .filter((l) => l.platform.trim() && l.url.trim())
      .map((l) => ({ profile_id: profile.id, platform: l.platform.trim(), url: l.url.trim() }))
    if (cleanLinks.length) {
      const { error: lErr } = await supabase.from("links").insert(cleanLinks)
      if (lErr) {
        setError(lErr.message)
        setSaving(false)
        return
      }
    }

    // 3. Stats de audiencia — reemplazo completo
    await supabase.from("channel_stats").delete().eq("profile_id", profile.id)
    const cleanStats = stats
      .filter((s) => s.platform)
      .map((s) => ({
        profile_id: profile.id,
        platform: s.platform,
        handle: s.handle.trim() || null,
        followers: toInt(s.followers),
        avg_views: toInt(s.avg_views),
      }))
    if (cleanStats.length) {
      const { error: sErr } = await supabase.from("channel_stats").insert(cleanStats)
      if (sErr) {
        setError(sErr.message)
        setSaving(false)
        return
      }
    }

    setSaved(true)
    setSaving(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ---- Perfil base ---- */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          Perfil
        </h2>

        <div className="space-y-1">
          <label className="text-sm font-medium">Nombre</label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">País</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Argentina, México, Colombia..."
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            maxLength={300}
            className={`${inputClass} resize-none`}
          />
          <p className="text-xs text-[var(--muted-foreground)] text-right">{bio.length}/300</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Avatar (URL)</label>
          <input
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </section>

      <AudienceEditor stats={stats} onChange={setStats} />

      <LinksEditor links={links} onChange={setLinks} />

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {saved && <p className="text-[var(--accent)] text-sm">Guardado ✓</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="py-3 px-6 bg-[var(--accent)] text-[var(--accent-foreground)] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  )
}
