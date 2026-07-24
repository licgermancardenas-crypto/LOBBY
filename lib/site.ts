// URL base del sitio. Usada para metadataBase (OG/canonical) y URLs absolutas
// en el JSON-LD. En Vercel toma el dominio de producción automáticamente.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
