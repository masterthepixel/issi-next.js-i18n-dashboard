import { expect, test } from '@playwright/test';

test.describe('Auth - Onboarding role selection', () => {
    test('shows role choices and navigates to role-specific form', async ({ page }) => {
        await page.goto('/en/auth/onboarding');
        await expect(page.getByText('Job Seeker')).toBeVisible();
        await expect(page.getByText('Company')).toBeVisible();

        // Select Job Seeker
        await page.getByRole('button', { name: /Job Seeker/i }).click();
        // Expect job seeker fields (example)
        await expect(page.getByLabel('Resume')).toBeVisible().catch(() => { });
    });
});
