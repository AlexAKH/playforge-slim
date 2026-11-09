import { test, expect } from '@playwright/test';

test('a wrong password is rejected with a message', async ({ page }) => {
    await page.addLocatorHandler(
        page.getByRole('dialog', { name: /This site asks for consent/i }),
        async (dialog) => {
            await dialog.getByRole('button', { name: 'Consent' }).click();
        },
        { times: 1 }
    );
    await page.goto('https://automationexercise.com/login');
    await page.locator('[data-qa="login-email"]').fill('test_epam_course@test.com');
    await page.locator('[data-qa="login-password"]').fill('wrong_password');
    await page.locator('[data-qa="login-button"]').click();
    await expect(page.locator('.login-form p')).toHaveText(
        'Your email or password is incorrect!'
    );
});