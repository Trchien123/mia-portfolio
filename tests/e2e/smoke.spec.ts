import { expect, test } from '@playwright/test'

test('page loads with one h1 and lang en', async ({ page }) => {
  await page.goto('')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('h1')).toHaveCount(1)
})
