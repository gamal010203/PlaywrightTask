import { APIRequestContext, expect } from '@playwright/test';

export class APIClient {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createUser(data: any) {
        const response = await this.request.post('/api/createAccount', {
            form: data
        });
        return response;
    }

    async verifyLogin(email: string, password: string) {
        const response = await this.request.post('/api/verifyLogin', {
            form: { email, password }
        });
        return response;
    }

    async deleteAccount(email: string, password: string) {
        const response = await this.request.delete('/api/deleteAccount', {
            form: { email, password }
        });
        return response;
    }
}