import { expect, test } from '@playwright/test'
import { profile } from '../../src/content/profile.ts'

test('career objective shows heading and the profile text', async ({ page }) => {
  await page.goto('')
  const section = page.locator('#objective')
  await expect(section.getByRole('heading', { level: 2, name: 'Career objective' })).toBeVisible()
  await expect(section.locator('p').first()).toHaveText(profile.objective)
})

test('wobbler is a labelled button on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('')
  const wob = page.locator('#objective').getByRole('button', { name: 'Flick the shelf wobbler' })
  await expect(wob).toBeVisible()
  await expect(wob.locator('svg')).toHaveAttribute('aria-hidden', 'true')
})

test('wobbler is hidden on phones', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  await page.goto('')
  await expect(page.locator('#objective button')).toBeHidden()
})
