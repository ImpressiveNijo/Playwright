import { test, expect } from '@playwright/test';

test.describe('Lesson25', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/', {
    });
  });  

  test('Login', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.fill('[id="signinEmail"]', 'stasvoidenko++qauto@gmail.com');
    await page.fill('[id="signinPassword"]', 'Password1234');
    await page.getByRole('button', { name: 'Login' }).click();
  });

});