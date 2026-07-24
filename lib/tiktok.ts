import { siteUrl } from "@/lib/site"

// Cliente mínimo de TikTok (Login Kit + Display API) para verificar audiencia.
// follower_count requiere el scope user.info.stats (la app debe estar aprobada
// para ese scope; hay sandbox para testear con la propia cuenta).

const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY
const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET
const REDIRECT_URI = `${siteUrl}/api/tiktok/callback`
const SCOPES = ["user.info.basic", "user.info.profile", "user.info.stats"]

export type OAuthTokens = {
  accessToken: string
  refreshToken: string | null
  expiresInSec: number
  scopes: string[]
}

export function isTikTokConfigured(): boolean {
  return Boolean(CLIENT_KEY && CLIENT_SECRET)
}

export function getAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_key: CLIENT_KEY ?? "",
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPES.join(","),
    state,
  })
  return `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`
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
    scopes: json.scope ? json.scope.split(",") : [],
  }
}

async function tokenRequest(body: Record<string, string>): Promise<OAuthTokens> {
  const res = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: CLIENT_KEY ?? "",
      client_secret: CLIENT_SECRET ?? "",
      ...body,
    }),
  })
  if (!res.ok) throw new Error(`TikTok token request failed: ${res.status}`)
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

export type TikTokUser = {
  openId: string
  handle: string | null
  followers: number
}

export async function getUser(token: string): Promise<TikTokUser> {
  const fields = "open_id,username,display_name,follower_count"
  const res = await fetch(
    `https://open.tiktokapis.com/v2/user/info/?fields=${fields}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (!res.ok) throw new Error(`TikTok user info failed: ${res.status}`)
  const json = (await res.json()) as {
    data?: {
      user?: {
        open_id?: string
        username?: string
        display_name?: string
        follower_count?: number
      }
    }
  }
  const u = json.data?.user
  if (!u?.open_id) throw new Error("TikTok user not found")
  return {
    openId: u.open_id,
    handle: u.username ?? u.display_name ?? null,
    followers: u.follower_count ?? 0,
  }
}
