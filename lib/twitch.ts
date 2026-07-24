import { siteUrl } from "@/lib/site"

// Cliente mínimo de la API de Twitch para verificar audiencia.
// Flujo Authorization Code: el creador autoriza y leemos su total de
// followers con su propio token. Scope mínimo para pedir menos permisos.

const CLIENT_ID = process.env.TWITCH_CLIENT_ID
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET
const REDIRECT_URI = `${siteUrl}/api/twitch/callback`
const SCOPES = ["moderator:read:followers"]

export function isTwitchConfigured(): boolean {
  return Boolean(CLIENT_ID && CLIENT_SECRET)
}

export function getAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: CLIENT_ID ?? "",
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPES.join(" "),
    state,
  })
  return `https://id.twitch.tv/oauth2/authorize?${params.toString()}`
}

export type TwitchTokens = {
  accessToken: string
  refreshToken: string | null
  expiresInSec: number
  scopes: string[]
}

function parseTokens(json: {
  access_token: string
  refresh_token?: string
  expires_in?: number
  scope?: string[]
}): TwitchTokens {
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token ?? null,
    expiresInSec: json.expires_in ?? 0,
    scopes: json.scope ?? [],
  }
}

export async function exchangeCode(code: string): Promise<TwitchTokens> {
  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID ?? "",
      client_secret: CLIENT_SECRET ?? "",
      code,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URI,
    }),
  })
  if (!res.ok) throw new Error(`Twitch token exchange failed: ${res.status}`)
  return parseTokens(await res.json())
}

export async function refreshTokens(refreshToken: string): Promise<TwitchTokens> {
  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID ?? "",
      client_secret: CLIENT_SECRET ?? "",
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  })
  if (!res.ok) throw new Error(`Twitch token refresh failed: ${res.status}`)
  return parseTokens(await res.json())
}

function helixHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}`, "Client-Id": CLIENT_ID ?? "" }
}

export type TwitchUser = { id: string; login: string; displayName: string }

export async function getUser(token: string): Promise<TwitchUser> {
  const res = await fetch("https://api.twitch.tv/helix/users", {
    headers: helixHeaders(token),
  })
  if (!res.ok) throw new Error(`Twitch users failed: ${res.status}`)
  const json = (await res.json()) as {
    data?: { id: string; login: string; display_name: string }[]
  }
  const u = json.data?.[0]
  if (!u) throw new Error("Twitch user not found")
  return { id: u.id, login: u.login, displayName: u.display_name }
}

export async function getFollowerCount(token: string, broadcasterId: string): Promise<number> {
  const res = await fetch(
    `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${broadcasterId}&first=1`,
    { headers: helixHeaders(token) }
  )
  if (!res.ok) throw new Error(`Twitch followers failed: ${res.status}`)
  const json = (await res.json()) as { total?: number }
  return json.total ?? 0
}
