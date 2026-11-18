// Regenerates public/og-image.png (1200x630) and public/apple-touch-icon.png. Run: npm run og
import { chromium } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.goto(pathToFileURL(`${root}scripts/og-image.html`).href)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: `${root}public/og-image.png` })

  const svg = readFileSync(`${root}public/favicon.svg`, 'utf8')
  const icon = await browser.newPage({ viewport: { width: 180, height: 180 } })
  await icon.setContent(
    `<body style="margin:0;background:#E8E9E5"><div style="width:180px;height:180px;padding:14px;box-sizing:border-box">${svg.replace('<svg ', '<svg width="152" height="152" ')}</div></body>`,
  )
  await icon.screenshot({ path: `${root}public/apple-touch-icon.png` })
} finally {
  await browser.close()
}
