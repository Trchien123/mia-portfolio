import { expect, test } from '@playwright/test'
import { profile } from '../../src/content/profile.ts'
import { resolveSiteUrl } from '../../site-url.ts'

const CANONICAL = resolveSiteUrl()
const OG_IMAGE = `${CANONICAL}og-image.png`

test('title, description, canonical', async ({ page }) => {
  await page.goto('')
  const title = await page.title()
  expect(title).toContain(profile.name)
  expect(title).toContain(profile.current.role)
  const desc = await page.locator('meta[name="description"]').getAttribute('content')
  expect(desc).toBeTruthy()
  expect(desc!.length).toBeLessThanOrEqual(160)
  expect(desc).toContain(profile.current.company.split(' ')[0])
  expect(desc).toContain(profile.city.split(',')[0])
  expect(await page.locator('meta[property="og:description"]').getAttribute('content')).toBe(desc)
  expect(await page.locator('meta[name="twitter:description"]').getAttribute('content')).toBe(desc)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', CANONICAL)
})

test('open graph and twitter tags', async ({ page }) => {
  await page.goto('')
  const meta = (p: string) => page.locator(`meta[property="${p}"]`).getAttribute('content')
  expect(await meta('og:title')).toBeTruthy()
  expect(await meta('og:description')).toBeTruthy()
  expect(await meta('og:image')).toBe(OG_IMAGE)
  expect(await meta('og:url')).toBe(CANONICAL)
  expect(await meta('og:type')).toBe('website')
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  )
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', OG_IMAGE)
})

test('JSON-LD Person matches profile (static, no JS needed)', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false })
  const page = await ctx.newPage()
  await page.goto('')
  const raw = await page.locator('script[type="application/ld+json"]').textContent()
  const ld = JSON.parse(raw!)
  expect(ld['@type']).toBe('Person')
  expect(ld.name).toBe(profile.name)
  expect(ld.jobTitle).toBe(profile.current.role)
  expect(ld.worksFor).toMatchObject({ '@type': 'Organization', name: profile.current.company })
  expect(ld.alumniOf).toMatchObject({
    '@type': 'CollegeOrUniversity',
    name: 'Swinburne University of Technology',
  })
  expect(ld.address).toMatchObject({ addressLocality: 'Ho Chi Minh City', addressCountry: 'VN' })
  expect(profile.city).toContain('Ho Chi Minh City')
  expect(profile.specs[0].value).toContain('Swinburne University of Technology')
  expect(ld.email).toBe(`mailto:${profile.email}`)
  expect(ld.sameAs).toEqual([profile.linkedinUrl])
  expect(ld.url).toBe(CANONICAL)
  await ctx.close()
})

test('favicon link, assets and robots resolve', async ({ page, request }) => {
  await page.goto('')
  const href = await page.locator('link[rel="icon"]').getAttribute('href')
  expect(href).toBeTruthy()
  expect((await request.get(new URL(href!, page.url()).href)).status()).toBe(200)
  const og = await request.get(new URL('og-image.png', page.url()).href)
  expect(og.status()).toBe(200)
  expect(og.headers()['content-type']).toContain('image/png')
  expect((await request.get(new URL('robots.txt', page.url()).href)).status()).toBe(200)
})
