import { expect, test, type Locator, type Page } from '@playwright/test'

const WOBBLER = 'Flick the shelf wobbler'

async function computed(locator: Locator) {
  return locator.evaluateAll((els) =>
    els.map((el) => {
      const cs = getComputedStyle(el)
      return {
        opacity: cs.opacity,
        clipPath: cs.clipPath,
        text: (el.textContent ?? '').slice(0, 30),
      }
    }),
  )
}

/** The swinging wobbler SVG's current rotation in degrees (0 when untransformed). */
function swingAngle(page: Page) {
  return page.locator('#objective button svg').evaluate((el) => {
    const t = getComputedStyle(el).transform
    if (t === 'none') return 0
    const m = new DOMMatrix(t)
    return (Math.atan2(m.b, m.a) * 180) / Math.PI
  })
}

function swingTransform(page: Page) {
  return page.locator('#objective button svg').evaluate((el) => getComputedStyle(el).transform)
}

test('reduced motion shows everything', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('')
  await expect(page.locator('html')).not.toHaveClass(/\bjs\b/)
  const targets = [
    page.locator('h1, h2'),
    page.locator('[data-face]'),
    page.locator('#top article > div:not([data-clip])'),
    page.getByText('Now', { exact: true }),
    page.locator('#top [role="group"] p'),
  ]
  for (const target of targets) {
    expect(await target.count()).toBeGreaterThan(0)
    for (const style of await computed(target)) {
      expect(style, style.text).toMatchObject({ opacity: '1', clipPath: 'none' })
    }
  }
  const rails = await page
    .locator('div[aria-hidden="true"]')
    .evaluateAll((els) =>
      els.map((el) => getComputedStyle(el).transform).filter((t) => t !== 'none'),
    )
  expect(rails).toEqual([])
  const wob = page.locator('#objective button')
  await expect(wob).toHaveAttribute('tabindex', '-1')
  await expect(wob).toHaveAttribute('aria-hidden', 'true')
  await expect(wob).toHaveCSS('cursor', 'default')
})

test('motion is gated on html.js when motion is allowed', async ({ page }) => {
  await page.goto('')
  await expect(page.locator('html')).toHaveClass(/\bjs\b/)
  const wob = page.locator('#objective button')
  await expect(wob).not.toHaveAttribute('tabindex', '-1')
  await expect(wob).not.toHaveAttribute('aria-hidden', 'true')
})

test('sections clip on and print once scrolled into view', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('')
  const firstFace = page.locator('#experience [data-tag="experience"] > [data-face]').first()
  await expect(firstFace).toHaveCSS('opacity', '0')
  await expect(page.locator('#about-title')).toHaveCSS('clip-path', /inset\(.*100%/)
  for (const id of ['#about', '#experience', '#selected-work', '#specifications', '#contact']) {
    await page.locator(id).scrollIntoViewIfNeeded()
    await page.mouse.wheel(0, 400)
  }
  await expect
    .poll(
      async () => (await computed(page.locator('[data-face]'))).every((s) => s.opacity === '1'),
      { timeout: 6000 },
    )
    .toBe(true)
  for (const style of await computed(page.locator('[data-face]'))) {
    expect(style.opacity, style.text).toBe('1')
  }
  await expect
    .poll(async () => (await computed(page.locator('h2'))).map((s) => s.clipPath).join(' '), {
      timeout: 6000,
    })
    .not.toMatch(/100%/)
})

test('hero rail draws, tag drops and the NOW flag flips in on load', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('')
  const names = await page.evaluate(() =>
    document.getAnimations().map((a) => (a as CSSAnimation).animationName ?? ''),
  )
  expect(names.join(' ')).toMatch(/rail-draw/)
  expect(names.join(' ')).toMatch(/hang/)
  const flag = page.locator('#top').getByText('Now', { exact: true })
  await expect(flag).toHaveCSS('opacity', '1', { timeout: 3000 })
  const role = page.locator('#top [role="group"] p').nth(1)
  await expect(role).not.toHaveCSS('clip-path', /100%/, { timeout: 3000 })
})

test('wobbler flick moves', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('')
  await page.locator('#objective').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1800)
  await page.getByRole('button', { name: WOBBLER }).click()
  await page.waitForTimeout(150)
  expect(await swingTransform(page)).not.toBe('none')
  expect(Math.abs(await swingAngle(page))).toBeGreaterThan(0.5)
  // Exact prototype physics (w 10, zeta .22): the swing is visually settled by ~2.5s
  // and the loop stops (transform cleared) once under the .004 deg / .02 deg/s epsilon (~3.6s).
  await page.waitForTimeout(2350)
  expect(Math.abs(await swingAngle(page))).toBeLessThan(0.5)
  await expect.poll(() => swingTransform(page), { timeout: 3000 }).toBe('none')
})

test('wobbler is keyboard reachable at 1440 and Enter flicks it', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('')
  const wob = page.getByRole('button', { name: WOBBLER })
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Tab')
    if (await wob.evaluate((el) => el === document.activeElement)) break
  }
  await expect(wob).toBeFocused()
  await expect.poll(() => swingTransform(page), { timeout: 6000 }).toBe('none')
  await page.keyboard.press('Enter')
  await page.waitForTimeout(150)
  expect(Math.abs(await swingAngle(page))).toBeGreaterThan(0.5)
})

test('wobbler exists but is hidden at 375', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  await page.goto('')
  await expect(page.locator('#objective button')).toHaveCount(1)
  await expect(page.locator('#objective button')).toBeHidden()
})

test('hero brush sway follows a fine pointer within 1.2deg and settles', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('')
  const face = page.locator('#top article > div:not([data-clip])')
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const hang = document
            .getAnimations()
            .filter(
              (a) =>
                /hang/.test((a as CSSAnimation).animationName) &&
                document.querySelector('#top')?.contains((a.effect as KeyframeEffect).target),
            )
          return hang.length > 0 && hang.every((a) => a.playState === 'finished')
        }),
      { timeout: 5000 },
    )
    .toBe(true)
  const box = await face.boundingBox()
  if (!box) throw new Error('no hero face')
  const y = box.y + box.height / 2
  await page.mouse.move(box.x + 100, y)
  let peak = 0
  for (let i = 0; i < 12; i++) {
    await page.mouse.move(box.x + 150 + i * 60, y, { steps: 2 })
    const deg = await face.evaluate((el) => {
      const t = getComputedStyle(el).transform
      if (t === 'none') return 0
      const m = new DOMMatrix(t)
      return (Math.atan2(m.b, m.a) * 180) / Math.PI
    })
    peak = Math.max(peak, Math.abs(deg))
  }
  expect(peak).toBeGreaterThan(0.1)
  expect(peak).toBeLessThanOrEqual(1.2001)
  await page.mouse.move(box.x + box.width / 2, box.y - 200)
  await expect
    .poll(() => face.evaluate((el) => getComputedStyle(el).transform), { timeout: 6000 })
    .toBe('none')
})

test('no console errors across a full scroll', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  page.on('pageerror', (e) => errors.push(e.message))
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('')
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 300) {
    await page.mouse.wheel(0, 300)
    await page.waitForTimeout(80)
  }
  await page.getByRole('button', { name: WOBBLER }).click()
  await page.getByRole('contentinfo').getByRole('button', { name: 'Copy email address' }).click()
  await page.waitForTimeout(500)
  expect(errors).toEqual([])
})
