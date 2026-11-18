import { copyFileSync, existsSync } from 'node:fs'

if (!existsSync('dist/index.html')) {
  console.error('copy-404: dist/index.html not found; run vite build first')
  process.exit(1)
}
copyFileSync('dist/index.html', 'dist/404.html')
