import { test, expect } from '@playwright/test';
import { APIClient } from '../Pages/APIClient';
import apiData from '../test-data/api_data.json';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test.describe('API Automation Scenarios', () => {
    let apiClient: APIClient;
    const timestamp = Date.now();
    const dynamicEmail = `api_${timestamp}@test.com`;
    const dynamicName = `User_${timestamp}`;

    const registerPayload = {
        ...apiData.registerUser,
        email: dynamicEmail,
        name: dynamicName
    };

    test.beforeEach(async ({ request }) => {
        apiClient = new APIClient(request);
    });

    test('1. API: Register User (Success Flow & Schema Validation)', async () => {
        const response = await apiClient.createUser(registerPayload);

        // 1. Validate HTTP Status Code
        expect(response.status()).toBe(200);

        // 2. Validate JSON Payload Structure
        const responseBody = await response.json();
        console.log('Create User Response:', responseBody);

        expect(responseBody.responseCode).toBe(201);
        expect(responseBody.message).toBe("User created!");
    });

    test('2. API: Register User (Negative Flow - Existing Email)', async () => {
        const response = await apiClient.createUser(registerPayload);
        const responseBody = await response.json();

        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toBe("Email already exists!");
    });

    test('3. API: Verify Login (Success & Negative)', async () => {
        // Success Scenario
        const successResp = await apiClient.verifyLogin(dynamicEmail, apiData.loginUser.password);
        const successBody = await successResp.json();
        expect(successBody.responseCode).toBe(200);
        expect(successBody.message).toBe("User exists!");

        // Negative Scenario (Wrong Password)
        const failResp = await apiClient.verifyLogin(dynamicEmail, "wrongPass");
        const failBody = await failResp.json();
        expect(failBody.responseCode).toBe(400);
        expect(failBody.message).toBe("User not found!");
    });

    test('4. UI/API Cross-Verification: Login via UI with API-created user', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.navigateTo();
        await homePage.clickSignupLogin();

        await loginPage.login(dynamicEmail, apiData.loginUser.password);

        await homePage.verifyLoggedInAs(dynamicName);

        await homePage.clickDeleteAccount();
    });
});