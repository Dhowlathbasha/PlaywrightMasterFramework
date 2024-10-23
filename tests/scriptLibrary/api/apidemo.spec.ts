import { test, expect } from '@playwright/test';

test.describe.fixme('Hi fix me', () => {
  test('Api demo', async ({ request, page }) => {
    await page.goto('https://reqres.in/api/users?page=2');
    const response = await request.get('https://reqres.in/api/users?page=2');
    console.log(response.body);
  });

  test('Enter put call', async ({ request }) => {
    const response = await request.put('https://reqres.in/api/users/2', {
      data: {
        name: 'morpheus',
        job: 'zion resident',
      },
    });
    const responseBody = JSON.parse(await response.text());

    expect(responseBody.data.email).toBe('janet.weaver@reqres.in');
  });
});
