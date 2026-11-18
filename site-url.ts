type Env = Record<string, string | undefined>

const FALLBACK = 'https://hoangminhanh.vercel.app'

/**
 * Absolute site URL used for canonical, Open Graph and JSON-LD.
 * Order: SITE_URL (manual override, e.g. a custom domain) →
 * VERCEL_PROJECT_PRODUCTION_URL (set by Vercel at build time) → fallback.
 * Always ends with a slash.
 */
export function resolveSiteUrl(env: Env = process.env): string {
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL
  const raw = env.SITE_URL || (vercel ? `https://${vercel}` : FALLBACK)
  return raw.endsWith('/') ? raw : `${raw}/`
}
