import { expect, test } from '@playwright/test'
import { profile } from '../../src/content/profile.ts'

const EMAIL = 'hmianh2504@gmail.com'

test('hero shows name, one-liner and current role', async ({ page }) => {
  await page.goto('')
  const hero = page.locator('#top')
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText('Hoang Minh Anh')
  await expect(hero).toContainText('Marketing graduate, Swinburne University, 2026.')
  const now = hero.getByLabel('Current role')
  await expect(now).toContainText('Now')
  await expect(now).toContainText(profile.current.role)
  await expect(now).toContainText('DIGIWORLD Corporation')
  await expect(now).toContainText('Promoted from Trainee · Oct 2026')
  for (const brand of profile.brands) {
    await expect(hero).toContainText(brand)
  }
})

test('email link and no CV link while cvUrl is null', async ({ page }) => {
  await page.goto('')
  await expect(page.locator('#top').getByRole('link', { name: new RegExp(EMAIL) })).toHaveAttribute(
    'href',
    `mailto:${EMAIL}`,
  )
  await expect(page.getByText('Download CV')).toHaveCount(0)
})

test('copy writes email', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('')
  await page
    .getByRole('article', { name: 'Hoang Minh Anh' })
    .getByRole('button', { name: 'Copy email address' })
    .click()
  await expect(page.locator('[aria-live="polite"]')).toHaveText('Email copied')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(EMAIL)
  await expect(
    page.getByRole('article', { name: 'Hoang Minh Anh' }).getByText('Copied', { exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('article', { name: 'Hoang Minh Anh' }).getByText('Copied', { exact: true }),
  ).toBeHidden({ timeout: 4000 })
})

test('copy failure is honest', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error('denied')) },
    })
    document.execCommand = () => false
  })
  await page.goto('')
  await page
    .getByRole('article', { name: 'Hoang Minh Anh' })
    .getByRole('button', { name: 'Copy email address' })
    .click()
  await expect(page.locator('[aria-live="polite"]')).toHaveText(
    `Copy failed. The email is ${EMAIL}`,
  )
  await expect(
    page.getByRole('article', { name: 'Hoang Minh Anh' }).getByText('Copy failed', { exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('article', { name: 'Hoang Minh Anh' }).getByText('Copied', { exact: true }),
  ).toHaveCount(0)
})

test('fallback copy keeps focus on the copy button', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error('denied')) },
    })
    document.execCommand = () => false
  })
  await page.goto('')
  const button = page
    .getByRole('article', { name: 'Hoang Minh Anh' })
    .getByRole('button', { name: 'Copy email address' })
  await button.click()
  await expect(page.locator('[aria-live="polite"]')).toHaveText(
    `Copy failed. The email is ${EMAIL}`,
  )
  await expect(button).toBeFocused()
})
