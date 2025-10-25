import { expect, test } from "@playwright/test";
import { FakeInfoPage } from "../models_for_arturo/FakeInfoPage";
import { DetailsOfPerson } from "../models/DetailsOfPerson";
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
    });

    //partial generations:
    test('CPR', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new DetailsOfPerson(page);
        await fakeInfoPage.selectPartialOption('cpr');
        await personDetails.testCpr();
        await personDetails.ShouldBeEmpty([personDetails.firstName, personDetails.lastName, personDetails.gender, personDetails.dob, personDetails.phone, personDetails.street, personDetails.town]);
    });
    test('name, gender', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new DetailsOfPerson(page);
        await fakeInfoPage.selectPartialOption('name-gender');
        await personDetails.testNameGender();
        await personDetails.ShouldBeEmpty([personDetails.cpr, personDetails.dob, personDetails.phone, personDetails.street, personDetails.town]);


    });
    test('name, gender, dob', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new DetailsOfPerson(page);
        await fakeInfoPage.selectPartialOption('name-gender-dob');
        await personDetails.testNameGender();
        await personDetails.testDob();
        await personDetails.ShouldBeEmpty([personDetails.cpr, personDetails.phone, personDetails.street, personDetails.town]);
    });

    test('CPR, name, gender', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new DetailsOfPerson(page);
        await fakeInfoPage.selectPartialOption('cpr-name-gender');
        await personDetails.testNameGender();
        await personDetails.testCpr();
        await personDetails.ShouldBeEmpty([personDetails.dob, personDetails.phone, personDetails.street, personDetails.town]);
    });
    test('CPR, name, gender, dob', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new DetailsOfPerson(page);
        await fakeInfoPage.selectPartialOption('cpr-name-gender-dob');
        await personDetails.testNameGender();
        await personDetails.testCpr();
        await personDetails.ShouldBeEmpty([personDetails.phone, personDetails.street, personDetails.town]);
    });
    test('Phone', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new DetailsOfPerson(page);
        await fakeInfoPage.selectPartialOption('phone');
        await personDetails.testPhone();
        await personDetails.ShouldBeEmpty([personDetails.cpr, personDetails.firstName, personDetails.lastName, personDetails.gender, personDetails.dob, personDetails.street, personDetails.town]);
    });
    test('Address', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new DetailsOfPerson(page);
        await fakeInfoPage.selectPartialOption('address');
        await personDetails.testAddress();
        await personDetails.ShouldBeEmpty([personDetails.cpr, personDetails.firstName, personDetails.lastName, personDetails.gender, personDetails.dob, personDetails.phone]);
    });
    test('generate 3 persons', async ({ page }) => {
        const fakeInfoPage = new FakeInfoPage(page);
        const personDetails = new DetailsOfPerson(page);
        const input = 3;
        await fakeInfoPage.generatePersons(input);
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

});


