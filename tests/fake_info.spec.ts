// import { expect, test } from "@playwright/test";
// import { FakeInfoPage } from "../models_for_arturo/FakeInfoPage";
// import { PersonDetails } from "../models_for_arturo/PersonDetails";
// //https://github.com/Software-1-semester-Test

// test.describe('fake info', () => {
//     test.beforeEach(async ({ page }) => {
//         //runs before each test in this describe block
//         await page.goto('http://127.0.0.1:5502/index.html');
//     });
//     test('go to page', async ({ page }) => {
//         const fakeInfoPage = new FakeInfoPage(page);
//         await expect(fakeInfoPage.heading).toBeVisible();
//         await expect(fakeInfoPage.output).toBeHidden();
//     });
//     test('generate 3 persons', async ({ page }) => {
//         const fakeInfoPage = new FakeInfoPage(page);
//         const personDetails = new PersonDetails(page);
//         const input = 3;
//         await fakeInfoPage.generatePersons(input);
//         await expect(fakeInfoPage.output).toBeVisible();
//         await expect(fakeInfoPage.outputItem).toHaveCount(input);
//         await expect(personDetails.cpr).toHaveCount(input);
//         await expect(personDetails.firstName).toHaveCount(input);
//         await expect(personDetails.lastName).toHaveCount(input);
//         await expect(personDetails.gender).toHaveCount(input);
//         await expect(personDetails.dob).toHaveCount(input);
//         await expect(personDetails.phone).toHaveCount(input);
//         await expect(personDetails.address).toHaveCount(input);
//         await expect(personDetails.street).toHaveCount(input);
//         await expect(personDetails.town).toHaveCount(input);
//     });
//     //partial generations:
//     test('CPR', async ({ page }) => {
//         const fakeInfoPage = new FakeInfoPage(page);
//         const personDetails = new PersonDetails(page);
//         const visible = [personDetails.cpr];
//         const hidden = [personDetails.firstName, personDetails.lastName, personDetails.gender, personDetails.dob, personDetails.phone, personDetails.address, personDetails.street, personDetails.town];
//         await fakeInfoPage.checkPartialGeneration(visible, hidden, 'cpr')
//     });
//     test('name, gender', async ({ page }) => {
//         const fakeInfoPage = new FakeInfoPage(page);
//         const personDetails = new PersonDetails(page);
//         const visible = [personDetails.firstName, personDetails.lastName, personDetails.gender];
//         const hidden = [personDetails.cpr, personDetails.dob, personDetails.phone, personDetails.address, personDetails.street, personDetails.town];
//         await fakeInfoPage.checkPartialGeneration(visible, hidden, 'name-gender')

//     });
//     test('name, gender, dob', async ({ page }) => {
//         const fakeInfoPage = new FakeInfoPage(page);
//         const personDetails = new PersonDetails(page);
//         const visible = [personDetails.firstName, personDetails.lastName, personDetails.gender, personDetails.dob];
//         const hidden = [personDetails.cpr, personDetails.phone, personDetails.address, personDetails.street, personDetails.town];
//         await fakeInfoPage.checkPartialGeneration(visible, hidden, 'name-gender-dob')
//     });

//     test('CPR, name, gender', async ({ page }) => {
//         const fakeInfoPage = new FakeInfoPage(page);
//         const personDetails = new PersonDetails(page);
//         const visible = [personDetails.cpr, personDetails.firstName, personDetails.lastName, personDetails.gender];
//         const hidden = [personDetails.dob, personDetails.phone, personDetails.address, personDetails.street, personDetails.town];
//         await fakeInfoPage.checkPartialGeneration(visible, hidden, 'cpr-name-gender')
//     });
//     test('CPR, name, gender, dob', async ({ page }) => {
//         const fakeInfoPage = new FakeInfoPage(page);
//         const personDetails = new PersonDetails(page);
//         const visible = [personDetails.cpr, personDetails.firstName, personDetails.lastName, personDetails.dob, personDetails.gender];
//         const hidden = [personDetails.phone, personDetails.address, personDetails.street, personDetails.town];
//         await fakeInfoPage.checkPartialGeneration(visible, hidden, 'cpr-name-gender-dob')
//     });
//     test('Phone', async ({ page }) => {
//         const fakeInfoPage = new FakeInfoPage(page);
//         const personDetails = new PersonDetails(page);
//         const visible = [personDetails.phone];
//         const hidden = [personDetails.cpr, personDetails.firstName, personDetails.lastName, personDetails.gender, personDetails.dob, personDetails.address, personDetails.street, personDetails.town];
//         await fakeInfoPage.checkPartialGeneration(visible, hidden, 'phone')

//     });
//     test('Address', async ({ page }) => {
//         const fakeInfoPage = new FakeInfoPage(page);
//         const personDetails = new PersonDetails(page);
//         const visible = [personDetails.address, personDetails.street, personDetails.town];
//         const hidden = [personDetails.gender, personDetails.phone, personDetails.cpr, personDetails.firstName, personDetails.lastName, personDetails.dob];
//         await fakeInfoPage.checkPartialGeneration(visible, hidden, 'address')
//     });

// });
