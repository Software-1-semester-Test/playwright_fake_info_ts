import { expect, type Locator, type Page } from '@playwright/test';


export class DetailsOfPerson {
    readonly page: Page;
    readonly cpr: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly gender: Locator;
    readonly phone: Locator;
    readonly dob: Locator;
    readonly address: Locator;
    readonly street: Locator;
    readonly town: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cpr = page.locator('.cprValue.rightColumn');
        this.firstName = page.locator('.firstNameValue.rightColumn');
        this.lastName = page.locator('.lastNameValue.rightColumn');
        this.gender = page.locator('.genderValue.rightColumn');
        this.dob = page.locator('.dobValue.rightColumn');
        this.phone = page.locator('.phoneNumberValue.rightColumn');
        this.address = page.locator('.address');
        this.street = page.locator('.streetValue.rightColumn');
        this.town = page.locator('.townValue.rightColumn');
    }

    public async testCpr() {
        var cprText = await this.cpr.textContent();
        await expect(cprText).not.toBe('');
        await expect(cprText).not.toBeNull();
        expect(cprText?.trim().length).toBe(10);
        expect(cprText?.trim()).toMatch(/^\d{10}$/);
    }
    public async testNameGender() {
        await expect(this.firstName).not.toBeEmpty();
        await expect(this.lastName).not.toBeEmpty();
        await expect(this.gender).not.toBeEmpty();
        await expect(this.gender).toHaveText(/male|female/);
    }
    public async testDob() {
        await expect(this.dob).not.toBeEmpty();
        await expect(this.dob).toHaveText(/^\d{4}-\d{2}-\d{2}$/);
    }
    public async testPhone() {
        var phoneText = await this.phone.textContent();
        await expect(phoneText).not.toBe('');
        await expect(phoneText).not.toBeNull();
        expect(phoneText?.trim().length).toBe(8);
        expect(phoneText?.trim()).toMatch(/^\d{8}$/);
    }
    public async testAddress() {
        await expect(this.street).not.toBeEmpty();
        await expect(this.town).not.toBeEmpty();
        await expect(this.town).toHaveText(/^\d{4}\s.+$/);
    }
    public async ShouldBeEmpty(empty: Locator[]) {
        for (const item of empty) {
            const text = await item.textContent();
            expect(text?.trim()).toBe('');
        }
    }
} 