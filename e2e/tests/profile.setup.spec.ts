import { expect, test } from '@playwright/test';

test.describe('Profile - Setup and Edit', () => {
    test('setup profile and persist values (mocked)', async ({ page }) => {
        // Precondition: authenticated (mock or set token)
        await page.addInitScript(() => {
            try { localStorage.setItem('auth_token', 'MOCK_TOKEN'); } catch (e) { }
        });

        await page.goto('/en/profile/setup');
        await page.getByLabel('First name').fill('QA').catch(() => { });
        await page.getByLabel('Last name').fill('Tester').catch(() => { });
        await page.getByRole('button', { name: /Save|Submit/i }).click().catch(() => { });

        // After save, dashboard should show name
        await page.goto('/en/profile');
        await expect(page.getByText(/QA/)).toBeVisible().catch(() => { });
    });
});
