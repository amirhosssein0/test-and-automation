// e2e/playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', 
  timeout: 30000, 
  workers: 6,
  reporter: [
    ['json', { outputFile: 'playwright-report.json' }]
  ],
  webServer: {
    command: 'bash -lc "python ../manage.py migrate --noinput && python ../manage.py runserver 127.0.0.1:8000 --noreload --insecure"',
    url: 'http://127.0.0.1:8000/',
    timeout: 120000,
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://127.0.0.1:8000/',
    headless: true,
    screenshot: 'only-on-failure',
  },
});