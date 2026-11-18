import { expect, test } from '@playwright/test'
import { profile } from '../../src/content/profile.ts'

test.beforeEach(async ({ page }) => {
  await page.goto('')
})

test('about shows heading, placeholder and facts', async ({ page }) => {
  const about = page.locator('#about')
  await expect(about.getByRole('heading', { level: 2, name: 'About me' })).toBeVisible()
  await expect(about.getByText('3–4 sentences about me — to be added')).toBeVisible()
  for (const fact of ['Ho Chi Minh City, Vietnam', 'Marketing graduate, Swinburne, 2026', 'English & Vietnamese']) {
    await expect(about.getByText(fact, { exact: true })).toBeVisible()
  }
})

test('experience shows heading, lede and four roles in order', async ({ page }) => {
  const exp = page.locator('#experience')
  await expect(exp.getByRole('heading', { level: 2, name: 'Experience' })).toBeVisible()
  await expect(exp.getByText(profile.ledes.experience, { exact: true })).toBeVisible()
  const articles = exp.getByRole('article')
  await expect(articles).toHaveCount(4)
  await expect(articles.getByRole('heading', { level: 3 })).toHaveText([
    'Key Account Manager',
    'CRM Intern',
    'E-commerce Intern',
    'English Teaching Assistant',
  ])
})

test('first role has price, NOW flag and trainee sub-line', async ({ page }) => {
  const first = page.locator('#experience article').first()
  await expect(first.getByText('10.26', { exact: false }).first()).toBeVisible()
  await expect(first.getByText('Now', { exact: true })).toBeVisible()
  await expect(first.getByText('Key Account Management Trainee · 06.26 – 10.26')).toBeVisible()
})

test('each role has at most three duties and spoken dates', async ({ page }) => {
  const articles = page.locator('#experience article')
  for (let i = 0; i < 4; i++) {
    const a = articles.nth(i)
    expect(await a.locator('li').count()).toBeLessThanOrEqual(3)
    await expect(a.locator('.vh')).toHaveText(profile.experience[i].datesSpoken)
    await expect(a.locator('[aria-hidden="true"]', { hasText: profile.experience[i].priceStart })).toHaveCount(1)
  }
})

test('mobile shows per-tag hang rails, desktop shows shelf rails only', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  const hang = page.locator('#experience article [data-hang-rail]')
  await expect(hang).toHaveCount(4)
  await expect(hang.first()).toBeVisible()
  await page.setViewportSize({ width: 1440, height: 900 })
  await expect(hang.first()).toBeHidden()
})
