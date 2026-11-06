import { type Locator, type Page } from '@playwright/test';

export class LiveSignInPage {
    readonly email: Locator;
    readonly password: Locator;
    readonly submit: Locator;
    readonly error: Locator;

    constructor(private readonly page: Page) {
        this.email = page.locator('[data-qa="login-email"]');
        this.password = page.locator('[data-qa="login-password"]');
        this.submit = page.locator('[data-qa="login-button"]');
        this.error = page.locator('.login-form p');
    }

    async open(): Promise<void> {
        await this.page.addLocatorHandler(
            this.page.getByRole('dialog', { name: /This site asks for consent/i }),
            async (dialog) => {
                await dialog.getByRole('button', { name: 'Consent' }).click();
            },
            { times: 1 }
        );
        await this.page.goto('/login');
    }

    async signIn(email: string, password: string): Promise<void> {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.submit.click();
    }
}

