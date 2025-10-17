import { expect, test } from "@playwright/test";
import { FakeInfoPage } from "../models/FakeInfoPage";
import { PersonDetails } from "../models/PersonDetails";
//https://github.com/Software-1-semester-Test

test.describe('fake info', () => {
    test.beforeEach(async ({ page }) => {
        //runs before each test in this describe block
        const fakeInfoPage = new FakeInfoPage(page);
        await fakeInfoPage.goto();

    });
    test('go to page', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        await expect(fakeInfoPage.heading).toBeVisible();
        await expect(fakeInfoPage.output).toBeHidden();
    });
    test('generate 2 persons', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new PersonDetails(page);
        const input = 3;
        await fakeInfoPage.generatePersons(input);
        await expect(fakeInfoPage.output).toBeVisible();
        await expect(fakeInfoPage.outputItem).toHaveCount(input);
        await expect(personDetails.cpr).toHaveCount(input);
        await expect(personDetails.firstName).toHaveCount(input);
        await expect(personDetails.lastName).toHaveCount(input);
        await expect(personDetails.gender).toHaveCount(input);
        await expect(personDetails.dob).toHaveCount(input);
        await expect(personDetails.phone).toHaveCount(input);
        await expect(personDetails.address).toHaveCount(input);
        await expect(personDetails.street).toHaveCount(input);
        await expect(personDetails.town).toHaveCount(input);
    });
    //partial generations:
    test('CPR', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new PersonDetails(page);
        await fakeInfoPage.partialRadio.check();
        await fakeInfoPage.selectPartialOption('cpr');
        await fakeInfoPage.generateButton.click();
        await expect(fakeInfoPage.output).toBeVisible();
        await expect(fakeInfoPage.outputItem).toHaveCount(1);
        await expect(personDetails.cpr).toBeVisible();
        await expect(personDetails.firstName).toBeHidden();
        await expect(personDetails.lastName).toBeHidden();
        await expect(personDetails.gender).toBeHidden();
        await expect(personDetails.dob).toBeHidden();
        await expect(personDetails.phone).toBeHidden();
        await expect(personDetails.address).toBeHidden();
        await expect(personDetails.street).toBeHidden();
        await expect(personDetails.town).toBeHidden();
    });
    test('name, gender', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new PersonDetails(page);
        await fakeInfoPage.partialRadio.check();
        await fakeInfoPage.selectPartialOption('name-gender');
        await fakeInfoPage.generateButton.click();
        await expect(fakeInfoPage.output).toBeVisible();
        await expect(fakeInfoPage.outputItem).toHaveCount(1);
        await expect(personDetails.cpr).toBeHidden();
        await expect(personDetails.firstName).toBeVisible();
        await expect(personDetails.lastName).toBeVisible();
        await expect(personDetails.gender).toBeVisible();
        await expect(personDetails.dob).toBeHidden();
        await expect(personDetails.phone).toBeHidden();
        await expect(personDetails.address).toBeHidden();
        await expect(personDetails.street).toBeHidden();
        await expect(personDetails.town).toBeHidden();
    });
    test('name, gender, dob', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new PersonDetails(page);
        await fakeInfoPage.partialRadio.check();
        await fakeInfoPage.selectPartialOption('name-gender-dob');
        await fakeInfoPage.generateButton.click();
        await expect(fakeInfoPage.output).toBeVisible();
        await expect(fakeInfoPage.outputItem).toHaveCount(1);
        await expect(personDetails.cpr).toBeHidden();
        await expect(personDetails.firstName).toBeVisible();
        await expect(personDetails.lastName).toBeVisible();
        await expect(personDetails.gender).toBeVisible();
        await expect(personDetails.dob).toBeVisible();
        await expect(personDetails.phone).toBeHidden();
        await expect(personDetails.address).toBeHidden();
        await expect(personDetails.street).toBeHidden();
        await expect(personDetails.town).toBeHidden();
    });

    test('CPR, name, gender', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new PersonDetails(page);
        const visible = [personDetails.cpr, personDetails.firstName, personDetails.lastName, personDetails.gender];
        const hidden = [personDetails.dob, personDetails.phone, personDetails.address, personDetails.street, personDetails.town];
        await fakeInfoPage.checkPartialGeneration(visible, hidden, 'cpr-name-gender')
    });
    test('CPR,name, gender, dob', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new PersonDetails(page);
        const visible = [personDetails.cpr, personDetails.firstName, personDetails.lastName, personDetails.dob, personDetails.gender];
        const hidden = [personDetails.phone, personDetails.address, personDetails.street, personDetails.town];
        await fakeInfoPage.checkPartialGeneration(visible, hidden, 'cpr-name-gender-dob')
    });
    test('Phone', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new PersonDetails(page);
        const visible = [personDetails.phone];
        const hidden = [personDetails.cpr, personDetails.firstName, personDetails.lastName, personDetails.gender, personDetails.dob, personDetails.address, personDetails.street, personDetails.town];
        await fakeInfoPage.checkPartialGeneration(visible, hidden, 'phone')

    });
    test('Address', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new PersonDetails(page);
        const visible = [personDetails.address, personDetails.street, personDetails.town];
        const hidden = [personDetails.gender, personDetails.phone, personDetails.cpr, personDetails.firstName, personDetails.lastName, personDetails.dob];
        await fakeInfoPage.checkPartialGeneration(visible, hidden, 'address')
    });

});

test.describe('fake info no models used(just to show how much DRY the code got', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');

    });
    test('go to page', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Fake Personal Data Generator' })).toBeVisible();
        await expect(page.locator('#output')).toBeHidden();

    });
    test('generate 2 persons', async ({ page }) => {
        await page.locator('#txtNumberPersons').fill('2');
        await page.getByRole('button', { name: 'Generate' }).click();
        await expect(page.locator('#output')).toBeVisible();
        const cpr = page.locator('.cprValue');
        await expect(cpr).toHaveCount(2);
    });
    //partial generations:
    test('CPR', async ({ page }) => {
        await page.getByRole('radio', { name: 'Partial generation:' }).check();
        await page.getByRole('button', { name: 'Generate' }).click();
        await expect(page.locator('#output')).toBeVisible();
        await expect(page.getByText('CPR:')).toBeVisible();
        await expect(page.getByText('First name:')).toBeHidden();//repeat for all hidden fields
        const cpr = page.locator('.cprValue');
        await expect(cpr).toBeVisible();
    });
    test('name, gender', async ({ page }) => {

    });
    test('name, gender, dob', async ({ page }) => {

    });

    test('CPR, name, gender', async ({ page }) => {

    });
    test('CPR,name, gender, dob', async ({ page }) => {

    });
    test('Phone', async ({ page }) => {

    });
    test('Address', async ({ page }) => {

    });

});