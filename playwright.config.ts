import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  forbidOnly: !!process.env.CI,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: `http://localhost:4173${process.env.VITE_BASE ?? '/'}`,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: `http://localhost:4173${process.env.VITE_BASE ?? '/'}`,
    reuseExistingServer: false,
    timeout: 180_000,
  },
})
