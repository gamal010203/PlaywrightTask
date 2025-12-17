import { test, expect } from '../fixtures/base';
import userData from '../test-data/users.json';
import { UserData } from '../types/UserData';

test('Register User flow with POM and Fixtures', async ({ page, homePage, loginPage, signupPage }) => {
    const timeStamp = Date.now();
    const dynamicEmail = `testuser_${timeStamp}@automationexercise.com`;
    const dynamicName = `User_${timeStamp}`;

    await homePage.navigateTo();

    await homePage.clickSignupLogin();

    await loginPage.signup(dynamicName, dynamicEmail);

    await signupPage.fillAccountInformation(userData as UserData);

    await signupPage.submitForm();

    await expect(signupPage.accountCreatedText).toBeVisible();

    await signupPage.clickContinue();

    await homePage.verifyLoggedInAs(dynamicName);

    await homePage.clickDeleteAccount();
    await expect(page.getByText('Account Deleted!')).toBeVisible();
});