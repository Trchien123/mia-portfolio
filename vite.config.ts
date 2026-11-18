import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { resolveSiteUrl } from './site-url.ts'

// Preload the single variable font so it is not discovered late via CSS.
function preloadFont(): Plugin {
  let base = '/'
  return {
    name: 'preload-font',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const font = Object.keys(ctx.bundle ?? {}).find((f) => f.endsWith('.woff2'))
        if (!font) return []
        return [
          {
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'font',
              type: 'font/woff2',
              crossorigin: '',
              href: `${base}${font}`,
            },
            injectTo: 'head',
          },
        ]
      },
    },
  }
}

// Replace __SITE_URL__ in index.html with the absolute site URL (canonical, OG, JSON-LD).
function siteUrl(): Plugin {
  const url = resolveSiteUrl()
  return {
    name: 'site-url',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('__SITE_URL__', url),
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), siteUrl(), preloadFont()],
})
