import { expect, test } from "@playwright/test";
const apiUrl = 'HTTP://localhost:8000/php_fake_info';


test('GET /person', async ({ request }) => {
    const requestUrl = apiUrl + '/person';
    const response = await request.get(requestUrl);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    const responseBody = await response.json();
    generalTest(response);
    console.log(responseBody);
    testCpr(responseBody)
    expect(responseBody).toHaveProperty('CPR');
    expect(responseBody).toHaveProperty('firstName');
    expect(responseBody).toHaveProperty('lastName');
    expect(responseBody).toHaveProperty('gender');
    expect(responseBody).toHaveProperty('birthDate');
    expect(responseBody).toHaveProperty('phoneNumber');
    expect(responseBody).toHaveProperty('address');
    expect(responseBody.address).toHaveProperty('street');
    expect(responseBody.address).toHaveProperty('town_name');
    expect(responseBody.address).toHaveProperty('number');
    expect(responseBody.address).toHaveProperty('floor');
    expect(responseBody.address).toHaveProperty('door');
    expect(responseBody.address).toHaveProperty('postal_code');
    testCprWithDob(responseBody.CPR, responseBody.birthDate);


});
test('GET /person?n=3', async ({ request }) => {
    const requestUrl = apiUrl + '/person';
    const params = new URLSearchParams({ n: '3' });
    const response = await request.get(requestUrl);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    const responseBody = await response.json();
    testCpr(responseBody)
    expect(responseBody).toHaveProperty('CPR');
    expect(responseBody).toHaveProperty('firstName');
    expect(responseBody).toHaveProperty('lastName');
    expect(responseBody).toHaveProperty('gender');
    expect(responseBody).toHaveProperty('birthDate');
    expect(responseBody).toHaveProperty('phoneNumber');
    expect(responseBody).toHaveProperty('address');
    expect(responseBody.address).toHaveProperty('street');
    expect(responseBody.address).toHaveProperty('town_name');
    expect(responseBody.address).toHaveProperty('number');
    expect(responseBody.address).toHaveProperty('floor');
    expect(responseBody.address).toHaveProperty('door');
    expect(responseBody.address).toHaveProperty('postal_code');
});

function formatDate(dob: string): string {
    const [year, month, day] = dob.split('-');
    const yearLastTwo = year.slice(-2);

    return `${day}${month}${yearLastTwo}`;
}
function testCprWithDob(cpr: string, dob: string) {
    const formattedDob = formatDate(dob);
    const cprDob = cpr.slice(0, 8);
    expect(cpr).toMatch(cprDob)
    expect(cprDob).toContain(formattedDob);
}
function testCpr(responseBody: any) {

    expect(responseBody).toHaveProperty('CPR');
    const cpr = responseBody.CPR;
    expect(cpr).toHaveLength(10);

}
function generalTest(response: any) {
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
}