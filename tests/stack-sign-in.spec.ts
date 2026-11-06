import { expect, test } from '@playwright/test';
import { StackSignInPage } from '../pages/stack-sign-in.page';

const TEST_EMAIL = 'test_epam_course@test.com';
const TEST_PASSWORD = 'wrong_password';
const EXPECTED_ERROR = 'Your email or password is incorrect!';

// TC-1
test('a shopper signs in with a wrong password and sees an error message', async ({ page }) => {
    const stackSignIn = new StackSignInPage(page);
    await stackSignIn.open();
    await stackSignIn.signIn(TEST_EMAIL, TEST_PASSWORD);
    await expect(stackSignIn.error).toHaveText(EXPECTED_ERROR);
});

