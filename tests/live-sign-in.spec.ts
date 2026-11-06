import { expect, test } from '@playwright/test';
import { LiveSignInPage } from '../pages/live-sign-in.page';

const TEST_EMAIL = 'test_epam_course@test.com';
const TEST_PASSWORD = 'wrong_password';
const EXPECTED_ERROR = 'Your email or password is incorrect!';

// TC-1
test('a shopper signs in with a wrong password and sees an error message', async ({ page }) => {
    const liveSignIn = new LiveSignInPage(page);
    await liveSignIn.open();
    await liveSignIn.signIn(TEST_EMAIL, TEST_PASSWORD);
    await expect(liveSignIn.error).toHaveText(EXPECTED_ERROR);
});

