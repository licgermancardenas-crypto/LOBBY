import { siteUrl } from "@/lib/site"

// Cliente mínimo de "Instagram API with Instagram Login".
// followers_count solo existe para cuentas Profesionales (Business/Creator).
// Modelo de token: no hay refresh_token; se usa un token de larga duración
// (60 días) que se refresca con grant_type=ig_refresh_token.

const CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID
const CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET
const REDIRECT_URI = `${siteUrl}/api/instagram/callback`
const SCOPES = ["instagram_business_basic"]

export type OAuthTokens = {
  accessToken: string
  refreshToken: string | null
  expiresInSec: number
  scopes: string[]
}

export function isInstagramConfigured(): boolean {
  return Boolean(CLIENT_ID && CLIENT_SECRET)
}

export function getAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: CLIENT_ID ?? "",
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPES.join(","),
    state,
  })
  return `https://www.instagram.com/oauth/authorize?${params.toString()}`
}

// Intercambia el code por un token de corta duración y lo canjea por uno
// de larga duración (60 días), que es el que persistimos.
export async function exchangeCode(code: string): Promise<OAuthTokens> {
  const shortRes = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID ?? "",
      client_secret: CLIENT_SECRET ?? "",
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URI,
      code,
    }),
  })
  if (!shortRes.ok) throw new Error(`Instagram token exchange failed: ${shortRes.status}`)
  const shortJson = (await shortRes.json()) as {
    access_token?: string
    data?: { access_token?: string }[]
  }
  const shortToken = shortJson.access_token ?? shortJson.data?.[0]?.access_token
  if (!shortToken) throw new Error("Instagram short-lived token missing")

  const longUrl = new URL("https://graph.instagram.com/access_token")
  longUrl.searchParams.set("grant_type", "ig_exchange_token")
  longUrl.searchParams.set("client_secret", CLIENT_SECRET ?? "")
  longUrl.searchParams.set("access_token", shortToken)
  const longRes = await fetch(longUrl)
  if (!longRes.ok) throw new Error(`Instagram long-lived exchange failed: ${longRes.status}`)
  const longJson = (await longRes.json()) as { access_token: string; expires_in?: number }

  return {
    accessToken: longJson.access_token,
    refreshToken: null,
    expiresInSec: longJson.expires_in ?? 0,
    scopes: SCOPES,
  }
}

// Refresca el token de larga duración (extiende 60 días).
export async function refreshTokens(longToken: string): Promise<OAuthTokens> {
  const url = new URL("https://graph.instagram.com/refresh_access_token")
  url.searchParams.set("grant_type", "ig_refresh_token")
  url.searchParams.set("access_token", longToken)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Instagram token refresh failed: ${res.status}`)
  const json = (await res.json()) as { access_token: string; expires_in?: number }
  return {
    accessToken: json.access_token,
    refreshToken: null,
    expiresInSec: json.expires_in ?? 0,
    scopes: SCOPES,
  }
}

export type InstagramProfile = {
  id: string
  handle: string | null
  followers: number
}

export async function getProfile(token: string): Promise<InstagramProfile> {
  const url = new URL("https://graph.instagram.com/me")
  url.searchParams.set("fields", "user_id,username,followers_count")
  url.searchParams.set("access_token", token)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Instagram profile failed: ${res.status}`)
  const json = (await res.json()) as {
    user_id?: string
    id?: string
    username?: string
    followers_count?: number
  }
  const id = json.user_id ?? json.id
  if (!id) throw new Error("Instagram profile not found")
  return {
    id,
    handle: json.username ?? null,
    followers: json.followers_count ?? 0,
  }
}
