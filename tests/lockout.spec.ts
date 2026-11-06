import { expect, test } from '@playwright/test';
import { SignInPage } from '../pages/sign-in.page';

const PASSWORD = 'test_course';
const WRONG = 'wrong_password';

const SIGN_IN_USER = 'lockout-a@test.example';
const WRONG_PASSWORD_USER = 'lockout-b@test.example';
const LOCKOUT_USER = 'lockout-c@test.example';
const LOCKED_USER = 'lockout-d@test.example';

// TC-1
test('valid credentials sign the shopper in', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.open();
    await signIn.signIn(SIGN_IN_USER, PASSWORD);
    await expect(signIn.accountMenu).toBeVisible();
});

// TC-2
test('a wrong password is rejected', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.open();
    await signIn.signIn(WRONG_PASSWORD_USER, WRONG);
    await expect(signIn.error).toHaveText('Your email or password is incorrect!');
});

// TC-3
test('five consecutive wrong passwords lock the account', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.open();
    for (let attempt = 0; attempt < 5; attempt++) {
        await signIn.signIn(LOCKOUT_USER, WRONG);
    }
    await expect(signIn.lockout).toHaveText('Account locked. Try again in 15 minutes.');
});

// TC-4
test('a locked account refuses the correct password', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.open();
    for (let attempt = 0; attempt < 5; attempt++) {
        await signIn.signIn(LOCKED_USER, WRONG);
    }
    await expect(signIn.lockout).toBeVisible();
    await signIn.signIn(LOCKED_USER, PASSWORD);
    await expect(signIn.lockout).toHaveText('Account locked. Try again in 15 minutes.');
    await expect(signIn.accountMenu).toBeHidden();
});