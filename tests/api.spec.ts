import { expect, test } from "@playwright/test";
const apiUrl = 'https://localhost:7023/api';


test.describe('API Tests', () => {
    test('GET /person', async ({ request }) => {
        const requestUrl = apiUrl + '/person';
        const response = await request.get(requestUrl);
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
        const responseBody = await response.json();
        generalTest(response);
        testPerson(responseBody);
    });

    test('GET person/bulk?count=3', async ({ request }) => {
        const input = 3;
        const requestUrl = apiUrl + '/person/bulk?count=' + input;
        const response = await request.get(requestUrl);
        generalTest(response);
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody).toHaveLength(input);
        for (const person of responseBody) {
            testPerson(person);
        }
    });
    test('GET /cpr', async ({ request }) => {
        const requestUrl = apiUrl + '/cpr/random';
        const response = await request.get(requestUrl);
        generalTest(response)
        const responseBody = await response.json();
        generalTest(response);
        hasPropertyAndValue(responseBody, 'cprnummer');
        const cpr = responseBody.cprnummer;
        expect(cpr).toHaveLength(10);
    });
    test('GET /name-gender', async ({ request }) => {
        const requestUrl = apiUrl + '/name/random';
        const response = await request.get(requestUrl);
        generalTest(response);
        const responseBody = await response.json();
        generalTest(response);
        testNameGender(responseBody);
    });
    test('GET /name-gender-dob', async ({ request }) => {
        const requestUrl = apiUrl + '/name/random?includeDob=true';
        const response = await request.get(requestUrl);
        generalTest(response);

        const responseBody = await response.json();
        generalTest(response);
        testNameGender(responseBody);
        testDob(responseBody);
    });
    test('GET /cpr-name-gender', async ({ request }) => {
        const requestUrl = apiUrl + '/cpr/random/with-name-gender';
        const response = await request.get(requestUrl);
        generalTest(response);
        const responseBody = await response.json();
        generalTest(response);
        hasPropertyAndValue(responseBody, 'cprnummer');
        const cpr = responseBody.cprnummer;
        expect(cpr).toHaveLength(10);
        testNameGender(responseBody.name);
    });
    test('GET /cpr-name-gender-dob', async ({ request }) => {
        const requestUrl = apiUrl + '/cpr/random/with-name-gender-dob';
        const response = await request.get(requestUrl);
        generalTest(response);
        const responseBody = await response.json();
        generalTest(response);
        testCpr(responseBody)
        testNameGender(responseBody.name);
        testDob(responseBody);
        testCprWithDob(responseBody.cpr.number, responseBody.cpr.dateOfBirth);
    });
    test('GET /phone', async ({ request }) => {
        const requestUrl = apiUrl + '/phonenumber/random';
        const response = await request.get(requestUrl);
        generalTest(response);
        const responseBody = await response.json();
        generalTest(response);
        testPhone(responseBody);
    });
    test('GET /address', async ({ request }) => {
        const requestUrl = apiUrl + '/address/random';
        const response = await request.get(requestUrl);
        generalTest(response);
        const responseBody = await response.json();
        generalTest(response);
        testAddress(responseBody, true);
    });
});

function formatDate(dob: string): string {
    const [year, month, day] = dob.split('-');
    const dayNotime = day.slice(0, 2);
    const yearLastTwo = year.slice(-2);
    return `${dayNotime}${month}${yearLastTwo}`;
}
function testCprWithDob(cpr: string, dob: string) {
    const formattedDob = formatDate(dob);
    const cprDob = cpr.slice(0, 8);
    console.log(cprDob);
    expect(cpr).toMatch(cprDob)
    expect(cprDob).toContain(formattedDob);
}
function hasPropertyAndValue(responseBody: any, property: string) {
    expect(responseBody).toHaveProperty(property);
    expect(responseBody[property]).toBeTruthy();
}
function testNameGender(responseBody: any) {
    hasPropertyAndValue(responseBody, 'name');
    hasPropertyAndValue(responseBody, 'surname');
    hasPropertyAndValue(responseBody, 'gender');
}
function testDob(responseBody: any) {
    hasPropertyAndValue(responseBody, 'dateOfBirth');
}
function testCpr(responseBody: any) {
    const cpr = responseBody.cpr.number;
    expect(cpr).toHaveLength(10);
}
function testPhone(responseBody: any) {
    const phoneNum = responseBody.number;
    expect(phoneNum).toHaveLength(8);
}
function testAddress(responseBody: any, isDoorNumber: boolean) {
    hasPropertyAndValue(responseBody, 'street')
    hasPropertyAndValue(responseBody, 'door')
    hasPropertyAndValue(responseBody, 'floor')
    hasPropertyAndValue(responseBody, 'postalCode')
    hasPropertyAndValue(responseBody, 'town')
    if (isDoorNumber) {
        hasPropertyAndValue(responseBody, 'doornumber')
    }
    else {
        hasPropertyAndValue(responseBody, 'number')
    }
}
function testPerson(responseBody: any) {
    hasPropertyAndValue(responseBody, 'cpr');

    testNameGender(responseBody.name);
    testDob(responseBody.cpr);
    testCprWithDob(responseBody.cpr.number, responseBody.cpr.dateOfBirth);
    testPhone(responseBody.mobile);
    testAddress(responseBody.address, false);
}
function generalTest(response: any) {
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
}