// Formateo compartido de números de audiencia y nombres de plataforma
// (perfil público, media kit, buscador).

export const PLATFORM_LABELS: Record<string, string> = {
  twitch: "Twitch",
  youtube: "YouTube",
  tiktok: "TikTok",
  kick: "Kick",
  instagram: "Instagram",
  x: "X",
}

export function formatCount(n: number | null): string {
  if (n === null) return "—"
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`
  return n.toString()
}

/** "lobby.vercel.app/german" — el link tal como se muestra (sin https:// ni mailto:). */
export function displayUrl(url: string): string {
  return url.replace(/^(https?:\/\/|mailto:)/, "").replace(/\/$/, "")
}
