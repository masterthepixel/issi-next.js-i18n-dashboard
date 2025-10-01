import { test } from '@playwright/test';

test('screenshot about', async ({ page }) => {
    const url = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000/en/about';
    await page.goto(url, { waitUntil: 'networkidle' });
    // wait for the scroll stack or hero to be visible
    await page.waitForSelector('.scroll-stack-card, [id="about-hero-heading"]', { timeout: 15000 });
    await page.screenshot({ path: 'e2e/screenshots/about.png', fullPage: true });
});
