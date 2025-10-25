import { type Locator, type Page } from '@playwright/test';

export class PersonDetails {
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
        this.cpr = page.locator('.cprValue');
        this.firstName = page.locator('.firstNameValue');
        this.lastName = page.locator('.lastNameValue');
        this.gender = page.locator('.genderValue');
        this.dob = page.locator('.dobValue');
        this.phone = page.locator('.phoneNumberValue');
        this.address = page.locator('.address');
        this.street = page.locator('.streetValue');
        this.town = page.locator('.townValue');
    }
} 