import { BasePage } from './BasePage';
import { Page, Locator, expect } from '@playwright/test';

export class HomePage extends BasePage {
    readonly signupLoginButton: Locator;
    readonly deleteAccountButton: Locator;
    readonly loggedInText: Locator;

    constructor(page: Page) {
        super(page);
        this.signupLoginButton = page.getByRole('link', { name: 'Signup / Login' });
        this.deleteAccountButton = page.getByRole('link', { name: 'Delete Account' });
        this.loggedInText = page.locator('text=Logged in as');
    }

    async clickSignupLogin() {
        await this.signupLoginButton.click();
    }

    async clickDeleteAccount() {
        await this.deleteAccountButton.click();
    }

    async verifyLoggedInAs(username: string) {
        await expect(this.loggedInText).toContainText(username);
    }
}