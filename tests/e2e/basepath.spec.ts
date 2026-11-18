import { existsSync, readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

const BASE = '/mia-portfolio/'
test.skip(process.env.VITE_BASE !== BASE, 'runs only with VITE_BASE=/mia-portfolio/')

test('page loads under the base path', async ({ page }) => {
  await page.goto('')
  await expect(page).toHaveURL(new RegExp(`${BASE}$`))
  await expect(page.locator('h1')).toBeVisible()
})

test('woff2 font is requested under the base path and returns 200', async ({ page }) => {
  const fontResponse = page.waitForResponse((r) => r.url().endsWith('.woff2'))
  await page.goto('')
  const res = await fontResponse
  expect(new URL(res.url()).pathname.startsWith(BASE)).toBe(true)
  expect(res.status()).toBe(200)
})

test('font is preloaded in built HTML under the base path', () => {
  const html = readFileSync('dist/index.html', 'utf8')
  expect(html).toMatch(
    /<link[^>]+rel="preload"[^>]+as="font"[^>]+href="\/mia-portfolio\/assets\/[^"]+\.woff2"/,
  )
})

test('#experience anchor works', async ({ page }) => {
  await page.goto('')
  await page.locator('a[href="#experience"]').first().click()
  await expect(page).toHaveURL(/#experience$/)
  await expect(page.locator('#experience')).toBeInViewport()
})

test('404.html is a copy of index.html', () => {
  expect(existsSync('dist/404.html')).toBe(true)
  expect(readFileSync('dist/404.html').equals(readFileSync('dist/index.html'))).toBe(true)
})

test('opening #experience directly scrolls to it', async ({ page }) => {
  await page.goto('#experience')
  await expect
    .poll(() =>
      page.locator('#experience').evaluate((e) => Math.abs(e.getBoundingClientRect().top)),
    )
    .toBeLessThan(80)
})
