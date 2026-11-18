import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

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

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), preloadFont()],
})
