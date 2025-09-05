import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e/tests',
    timeout: 30_000,
    expect: { timeout: 5_000 },
    fullyParallel: false,
    retries: 0,
    workers: 1,
    reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
    use: {
        baseURL: 'http://localhost:3000',
        headless: true,
        trace: 'on-first-retry',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ],
});
