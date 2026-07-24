import { siteUrl } from "@/lib/site"

// Cliente mínimo de YouTube Data API v3 para verificar audiencia.
// OAuth de Google: access_type=offline + prompt=consent para recibir un
// refresh_token. Ojo: el refresh de Google NO devuelve refresh_token nuevo.

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET
const REDIRECT_URI = `${siteUrl}/api/youtube/callback`
const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"]

export type OAuthTokens = {
  accessToken: string
  refreshToken: string | null
  expiresInSec: number
  scopes: string[]
}

export function isYouTubeConfigured(): boolean {
  return Boolean(CLIENT_ID && CLIENT_SECRET)
}

export function getAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: CLIENT_ID ?? "",
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPES.join(" "),
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: "true",
    state,
  })
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

function parseTokens(json: {
  access_token: string
  refresh_token?: string
  expires_in?: number
  scope?: string
}): OAuthTokens {
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token ?? null,
    expiresInSec: json.expires_in ?? 0,
    scopes: json.scope ? json.scope.split(" ") : [],
  }
}

async function tokenRequest(body: Record<string, string>): Promise<OAuthTokens> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID ?? "",
      client_secret: CLIENT_SECRET ?? "",
      ...body,
    }),
  })
  if (!res.ok) throw new Error(`YouTube token request failed: ${res.status}`)
  return parseTokens(await res.json())
}

export function exchangeCode(code: string): Promise<OAuthTokens> {
  return tokenRequest({
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI,
  })
}

export function refreshTokens(refreshToken: string): Promise<OAuthTokens> {
  return tokenRequest({ refresh_token: refreshToken, grant_type: "refresh_token" })
}

export type YouTubeChannel = {
  id: string
  title: string
  handle: string | null
  subscribers: number
}

export async function getChannel(token: string): Promise<YouTubeChannel> {
  const res = await fetch(
    "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (!res.ok) throw new Error(`YouTube channels failed: ${res.status}`)
  const json = (await res.json()) as {
    items?: {
      id: string
      snippet?: { title?: string; customUrl?: string }
      statistics?: { subscriberCount?: string; hiddenSubscriberCount?: boolean }
    }[]
  }
  const ch = json.items?.[0]
  if (!ch) throw new Error("YouTube channel not found")
  const subs = ch.statistics?.hiddenSubscriberCount
    ? 0
    : Number.parseInt(ch.statistics?.subscriberCount ?? "0", 10)
  return {
    id: ch.id,
    title: ch.snippet?.title ?? "",
    handle: ch.snippet?.customUrl?.replace(/^@/, "") ?? null,
    subscribers: Number.isFinite(subs) ? subs : 0,
  }
}
