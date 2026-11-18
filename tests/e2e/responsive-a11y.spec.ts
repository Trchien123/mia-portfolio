import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { profile } from '../../src/content/profile.ts'

const FACE = '#top article > div:not([data-clip])'

for (const width of [320, 375, 768, 1280, 1920]) {
  test(`no horizontal overflow at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('')
    const m = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      iw: window.innerWidth,
    }))
    expect(m.sw).toBeLessThanOrEqual(m.iw)
  })
}

test('nav anchors land their section near the top', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('')
  const nav = page.getByRole('navigation', { name: 'Primary' })
  const targets: Array<[string, string]> = [
    ['About', 'about'],
    ['Work', 'experience'],
    ['Selected work', 'selected-work'],
    ['Contact', 'contact'],
  ]
  for (const [name, id] of targets) {
    await nav.getByRole('link', { name, exact: true }).click()
    // The footer is shorter than the viewport, so Contact lands as high as the page allows.
    await expect
      .poll(
        () =>
          page.locator(`#${id}`).evaluate((el) => {
            const top = Math.round(el.getBoundingClientRect().top)
            const atEnd =
              window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1
            return top <= 80 || atEnd
          }),
        { timeout: 4000 },
      )
      .toBe(true)
  }
})

test('content visible without javascript', async ({ request }) => {
  // The SPA renders nothing without JS (no prerender, by decision), so index.html carries a
  // <noscript> note with the essentials. Chromium under Playwright still parses <noscript> as
  // text when JS is disabled through CDP, so the served HTML is asserted rather than the DOM.
  const res = await request.get('')
  const html = await res.text()
  const note = html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1] ?? ''
  expect(note).toContain(profile.name)
  expect(note).toContain(profile.current.role)
  expect(note).toContain(`mailto:${profile.email}`)
  expect(note).toContain(profile.email)
  expect(note).toMatch(/<h1/)
})

test('axe finds no serious or critical violations', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  for (const reduced of [false, true]) {
    await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' })
    await page.goto('')
    // Scroll through so clip-on entrances finish before contrast is measured.
    const h = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < h; y += 500) await page.mouse.wheel(0, 500)
    await page.waitForTimeout(2200)
    const res = await new AxeBuilder({ page }).analyze()
    const bad = res.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(
      bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`),
      `reduced=${reduced}`,
    ).toEqual([])
  }
})

test('tab order: skip link, nav, hero, wobbler, footer LinkedIn', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('')
  const seen: string[] = []
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press('Tab')
    seen.push(
      await page.evaluate(() => {
        const el = document.activeElement as HTMLElement
        const label = el.getAttribute('aria-label') || el.textContent || ''
        const where = el.closest('#top') ? 'hero' : el.closest('footer') ? 'footer' : 'other'
        return `${where}|${label.trim().slice(0, 40)}|${el.getAttribute('href') ?? ''}`
      }),
    )
  }
  const at = (s: string) => seen.findIndex((t) => t.includes(s))
  const detail = JSON.stringify(seen)
  const skip = at('Skip to content')
  const contactNav = at('|Contact|#contact')
  const heroCopy = at('hero|')
  const wobbler = at('Flick the shelf')
  const linkedin = at('linkedin.com')
  expect(skip, detail).toBe(0)
  expect(contactNav, detail).toBeGreaterThan(skip)
  expect(heroCopy, detail).toBeGreaterThan(contactNav)
  expect(wobbler, detail).toBeGreaterThan(heroCopy)
  expect(linkedin, detail).toBeGreaterThan(wobbler)
  expect(seen[linkedin], detail).toMatch(/^footer\|/)
})

test('brush sway does not move the hero face before the entrance ends', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('')
  const face = page.locator(FACE)
  const box = await face.boundingBox()
  if (!box) throw new Error('no hero face')
  const y = box.y + box.height / 2
  await page.mouse.move(box.x + 100, y)
  for (let i = 0; i < 6; i++) {
    await page.mouse.move(box.x + 150 + i * 80, y, { steps: 2 })
    expect(await face.evaluate((el) => getComputedStyle(el).transform)).toBe('none')
  }
})

test.describe('coarse pointer', () => {
  test.use({ hasTouch: true, isMobile: true, viewport: { width: 820, height: 900 } })
  test('brush sway never moves the hero face', async ({ page }) => {
    await page.goto('')
    await page.waitForTimeout(2000)
    expect(
      await page.evaluate(() => matchMedia('(hover: hover) and (pointer: fine)').matches),
    ).toBe(false)
    const face = page.locator(FACE)
    const box = await face.boundingBox()
    if (!box) throw new Error('no hero face')
    const y = box.y + box.height / 2
    await page.mouse.move(box.x + 50, y)
    for (let i = 0; i < 8; i++) await page.mouse.move(box.x + 100 + i * 40, y, { steps: 2 })
    expect(await face.evaluate((el) => getComputedStyle(el).transform)).toBe('none')
  })
})

test('reduced motion: clicking the wobbler leaves it untransformed', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('')
  const wob = page.locator('#objective button')
  await wob.scrollIntoViewIfNeeded()
  const box = await wob.boundingBox()
  if (!box) throw new Error('no wobbler')
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
  await page.waitForTimeout(200)
  const t = await page
    .locator('#objective button svg')
    .evaluate((el) => getComputedStyle(el).transform)
  expect(t).toBe('none')
})

test('objective is one region, labelled once', async ({ page }) => {
  await page.goto('')
  await expect(page.locator('#objective article[aria-labelledby]')).toHaveCount(0)
  await expect(page.locator('#objective')).toHaveAttribute('aria-labelledby', 'objective-title')
})
