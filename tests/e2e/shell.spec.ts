import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('')
})

test('skip link is first focusable and targets #main', async ({ page }) => {
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to content' })
  await expect(skip).toBeFocused()
  await expect(skip).toHaveAttribute('href', '#main')
  await expect(page.locator('main#main')).toHaveCount(1)
})

test('header shows brand and primary nav', async ({ page }) => {
  const header = page.getByRole('banner')
  const brand = header.getByRole('link', { name: 'Mia, back to top' })
  await expect(brand).toHaveText('Mia')
  await expect(brand).toHaveCSS('text-transform', 'uppercase')
  expect(await brand.evaluate((el) => (el as HTMLElement).innerText)).toBe('MIA')
  const nav = header.getByRole('navigation', { name: 'Primary' })
  const links: Array<[string, string]> = [
    ['About', '#about'],
    ['Work', '#experience'],
    ['Selected work', '#selected-work'],
    ['Contact', '#contact'],
  ]
  for (const [name, href] of links) {
    await expect(nav.getByRole('link', { name, exact: true })).toHaveAttribute('href', href)
  }
})

test('landmarks exist', async ({ page }) => {
  await expect(page.locator('header')).toHaveCount(1)
  await expect(page.locator('nav')).toHaveCount(1)
  await expect(page.locator('main')).toHaveCount(1)
  await expect(page.locator('footer#contact')).toHaveCount(1)
  await expect(page.locator('main footer')).toHaveCount(0)
})

test('sections appear in order inside main', async ({ page }) => {
  const ids = await page.locator('main > section').evaluateAll((els) => els.map((e) => e.id))
  expect(ids).toEqual([
    'top',
    'objective',
    'about',
    'experience',
    'selected-work',
    'specifications',
  ])
})

test('each section is labelled by its heading', async ({ page }) => {
  const expected: Record<string, string> = {
    top: 'Hoang Minh Anh',
    objective: 'Career objective',
    about: 'About me',
    experience: 'Experience',
    'selected-work': 'Selected work',
    specifications: 'Specifications',
  }
  for (const [id, name] of Object.entries(expected)) {
    await expect(page.locator(`section#${id}`)).toHaveAccessibleName(name)
  }
  await expect(page.locator('footer#contact')).toHaveAccessibleName('Ask staff about this item.')
  await expect(page.locator('h1')).toHaveCount(1)
})

test('one polite live region exists', async ({ page }) => {
  await expect(page.locator('p[aria-live="polite"]')).toHaveCount(1)
})

test('archivo font loads from a hashed asset', async ({ page }) => {
  const fonts: string[] = []
  page.on('response', (r) => {
    if (r.url().endsWith('.woff2')) fonts.push(r.url())
  })
  await page.reload()
  await page.evaluate(() => document.fonts.ready)
  expect(fonts).toHaveLength(1)
  expect(fonts[0]).toMatch(/archivo-latin-wdth-normal-[\w-]+\.woff2$/)
})
