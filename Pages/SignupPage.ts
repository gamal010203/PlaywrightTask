import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';
import { UserData } from '../types/UserData';

export class SignupPage extends BasePage {
    // Selectors
    readonly genderRadio: Locator;
    readonly passwordInput: Locator;
    readonly daySelect: Locator;
    readonly monthSelect: Locator;
    readonly yearSelect: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly address1Input: Locator;
    readonly address2Input: Locator;
    readonly countrySelect: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipInput: Locator;
    readonly mobileInput: Locator;
    readonly createAccountButton: Locator;
    readonly continueButton: Locator;
    readonly accountCreatedText: Locator;

    constructor(page: Page) {
        super(page);
        this.genderRadio = page.getByLabel('Mr.'); // أو Mrs.
        this.passwordInput = page.locator('[data-qa="password"]');
        this.daySelect = page.locator('[data-qa="days"]');
        this.monthSelect = page.locator('[data-qa="months"]');
        this.yearSelect = page.locator('[data-qa="years"]');
        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.companyInput = page.locator('[data-qa="company"]');
        this.address1Input = page.locator('[data-qa="address"]');
        this.address2Input = page.locator('[data-qa="address2"]');
        this.countrySelect = page.locator('[data-qa="country"]');
        this.stateInput = page.locator('[data-qa="state"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.zipInput = page.locator('[data-qa="zipcode"]');
        this.mobileInput = page.locator('[data-qa="mobile_number"]');
        this.createAccountButton = page.locator('[data-qa="create-account"]');
        this.accountCreatedText = page.locator('[data-qa="account-created"]');
        this.continueButton = page.locator('[data-qa="continue-button"]');
    }

    async fillAccountInformation(data: UserData) {
        await this.genderRadio.check();
        await this.passwordInput.fill(data.password);
        await this.daySelect.selectOption(data.days);
        await this.monthSelect.selectOption(data.months);
        await this.yearSelect.selectOption(data.years);

        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.companyInput.fill(data.company);
        await this.address1Input.fill(data.address1);
        await this.address2Input.fill(data.address2);
        await this.countrySelect.selectOption(data.country);
        await this.stateInput.fill(data.state);
        await this.cityInput.fill(data.city);
        await this.zipInput.fill(data.zipcode);
        await this.mobileInput.fill(data.mobileNumber);
    }

    async submitForm() {
        await this.createAccountButton.click();
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}