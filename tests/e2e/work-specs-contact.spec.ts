import { expect, test } from '@playwright/test'
import { profile } from '../../src/content/profile.ts'

test.beforeEach(async ({ page }) => {
  await page.goto('')
})

test('selected work shows three case tags with brief, role and outcome', async ({ page }) => {
  const work = page.locator('#selected-work')
  await expect(work.getByRole('heading', { level: 2, name: 'Selected work' })).toBeVisible()
  await expect(work.getByText(profile.ledes.selectedWork, { exact: true })).toBeVisible()
  const cases = work.getByRole('article')
  await expect(cases).toHaveCount(3)
  await expect(cases.getByRole('heading', { level: 3 })).toHaveText([
    'HSBC Business Case Competition',
    'Consumer Behavior Research',
    'Greenovation Conference',
  ])
  for (const [i, c] of profile.cases.entries()) {
    const article = cases.nth(i)
    await expect(article.getByText(c.year, { exact: true }).last()).toBeVisible()
    await expect(article.getByText(c.award, { exact: true })).toBeVisible()
    const slots = article.locator('dl[aria-label="Case details"]')
    await expect(slots.locator('dt')).toHaveText(['Brief', 'My role', 'Outcome'])
    await expect(slots.locator('dd')).toHaveText([
      c.brief ?? 'To be added',
      c.role ?? 'To be added',
      c.outcome ?? 'To be added',
    ])
  }
})

test('specifications lists education, tools and languages', async ({ page }) => {
  const specs = page.locator('#specifications')
  await expect(specs.getByRole('heading', { level: 2, name: 'Specifications' })).toBeVisible()
  await expect(specs.locator('dt')).toHaveText(['Education', 'Tools', 'Languages'])
  await expect(specs.locator('dd')).toHaveText([
    'Marketing, Swinburne University of Technology · 2023 – 2026 · GPA 3.2/4.0',
    'Excel · Word · PowerPoint · Canva · SPSS (basic statistics)',
    'English and Vietnamese, both fluent',
  ])
})

test('contact footer offers email, phone, LinkedIn and copy', async ({ page }) => {
  const footer = page.getByRole('contentinfo')
  await expect(
    footer.getByRole('heading', { level: 2, name: 'Ask staff about this item.' }),
  ).toBeVisible()
  await expect(footer.getByRole('link', { name: profile.email })).toHaveAttribute(
    'href',
    `mailto:${profile.email}`,
  )
  await expect(footer.getByRole('link', { name: '+84 928 718 538' })).toHaveAttribute(
    'href',
    'tel:+84928718538',
  )
  const linkedin = footer.getByRole('link', { name: 'View profile' })
  await expect(linkedin).toHaveAttribute('href', profile.linkedinUrl)
  await expect(linkedin).toHaveAttribute('target', '_blank')
  await expect(linkedin).toHaveAttribute('rel', /noopener/)
  await expect(footer.getByRole('button', { name: 'Copy email address' })).toBeVisible()
  await expect(footer.getByText('Download CV (PDF)')).toHaveCount(0)
  await expect(footer.getByText('Hoang Minh Anh · Ho Chi Minh City, Vietnam')).toBeVisible()
})
