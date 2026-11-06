import { type Locator, type Page } from '@playwright/test';

export class SignInPage {
    readonly email: Locator;
    readonly password: Locator;
    readonly submit: Locator;
    readonly error: Locator;
    readonly lockout: Locator;
    readonly accountMenu: Locator;

    constructor(private readonly page: Page) {
        this.email = page.locator('[data-qa="login-email"]');
        this.password = page.locator('[data-qa="login-password"]');
        this.submit = page.locator('[data-qa="login-submit"]');
        this.error = page.locator('[data-qa="login-error"]');
        this.lockout = page.locator('[data-qa="login-lockout"]');
        this.accountMenu = page.locator('[data-qa="account-menu"]');
    }

    async open(): Promise<void> {
        await this.page.goto('/login');
    }

    async signIn(email: string, password: string): Promise<void> {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.submit.click();
    }
}