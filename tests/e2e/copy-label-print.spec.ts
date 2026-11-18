import { expect, test, type Page } from '@playwright/test'

const WIDTHS = [320, 375, 430]

async function expectLabelOnScreen(page: Page, scope: 'article' | 'contentinfo', text: string) {
  const root = page.getByRole(scope)
  const button = root.getByRole('button', { name: 'Copy email address' })
  await button.scrollIntoViewIfNeeded()
  await button.click()
  const label = root.getByText(text, { exact: true })
  await expect(label).toBeVisible()
  // Wait for the shoot-out slide to settle before measuring.
  await page.waitForTimeout(400)
  const box = await label.boundingBox()
  const width = await page.evaluate(() => window.innerWidth)
  expect(box, `${scope} ${text}`).not.toBeNull()
  expect(box!.x, `${scope} ${text} left`).toBeGreaterThanOrEqual(0)
  expect(box!.x + box!.width, `${scope} ${text} right`).toBeLessThanOrEqual(width)
}

for (const width of WIDTHS) {
  test(`copied label stays on screen at ${width}`, async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.setViewportSize({ width, height: 800 })
    await page.goto('')
    await expectLabelOnScreen(page, 'article', 'Copied')
    await expectLabelOnScreen(page, 'contentinfo', 'Copied')
  })

  test(`copy failed label stays on screen at ${width}`, async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: () => Promise.reject(new Error('denied')) },
      })
      document.execCommand = () => false
    })
    await page.setViewportSize({ width, height: 800 })
    await page.goto('')
    await expectLabelOnScreen(page, 'article', 'Copy failed')
    await expectLabelOnScreen(page, 'contentinfo', 'Copy failed')
  })
}

test('print shows every tag and heading', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  await page.goto('')
  await page.emulateMedia({ media: 'print' })
  const faces = await page
    .locator('[data-face]')
    .evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity))
  expect(faces.length).toBeGreaterThan(0)
  expect(faces.every((o) => o === '1')).toBe(true)
  const clips = await page
    .locator('section h2')
    .evaluateAll((els) => els.map((el) => getComputedStyle(el).clipPath))
  expect(clips.length).toBeGreaterThan(0)
  expect(clips.every((c) => c === 'none')).toBe(true)
})
