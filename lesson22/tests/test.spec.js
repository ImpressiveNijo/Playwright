import { test, expect } from '@playwright/test';

test.describe('Lesson23', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('', {
    });
  });

    test('All fields are empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('[id="signupName"]').fill('');
    await page.locator('[id="signupLastName"]').fill('');
    await expect(page.getByText('Name required')).toHaveText('Name required');
    await expect(page.getByText('Name required')).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.getByText('Name required')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    
    await page.locator('[id="signupEmail"]').fill('');
    await expect(page.getByText('Last name required')).toHaveText('Last name required');
    await expect(page.getByText('Last name required')).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.getByText('Last name required')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await page.locator('[id="signupPassword"]').fill('');
    await expect(page.getByText('Email required')).toHaveText('Email required');
    await expect(page.getByText('Email required')).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.getByText('Email required')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await page.locator('[id="signupRepeatPassword"]').fill('');
    await expect(page.getByText('Password required')).toHaveText('Password required');
    await expect(page.getByText('Password required')).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.getByText('Password required')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await page.locator('[id="signupPassword"]').click();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    await expect(page.getByText('Re-enter password required')).toHaveText('Re-enter password required');
    await expect(page.getByText('Re-enter password required')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Invalid characters in the “Name” and “Last name” fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('[id="signupName"]').fill('@testuser');
    await page.locator('[id="signupLastName"]').fill('LastName123');
    await expect(page.getByText('Name is invalid')).toHaveText('Name is invalid');
    await expect(page.getByText('Name is invalid')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await page.locator('[id="signupEmail"]').fill('usertest@gmail.com');
    await expect(page.getByText('Last name is invalid')).toHaveText('Last name is invalid');
    await expect(page.getByText('Last name is invalid')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await page.locator('[id="signupPassword"]').fill('Usertest123');
    await page.locator('[id="signupRepeatPassword"]').fill('Usertest123');

    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('Invalid length of “Name” and “Last name”', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('[id="signupName"]').fill('A');
    await page.locator('[id="signupLastName"]').fill('B');

    await expect(page.getByText('Name has to be from 2 to 20')).toHaveText('Name has to be from 2 to 20 characters long');
    await expect(page.locator('[id="signupName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await page.locator('[id="signupEmail"]').fill('usertest@gmail.com');
    await expect(page.getByText('Last name has to be from 2 to')).toHaveText('Last name has to be from 2 to 20 characters long');
    await expect(page.getByText('Last name has to be from 2 to')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await page.locator('[id="signupPassword"]').fill('Usertest123');
    await page.locator('[id="signupRepeatPassword"]').fill('Usertest123');

    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('“Name” or “Last name” is too long', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('[id="signupName"]').fill('SuperLongNameThatIsTooBig');
    await page.locator('[id="signupLastName"]').fill('VeryVeryLongLastNameThatIsTooBig');

    await expect(page.getByText('Name has to be from 2 to 20')).toHaveText('Name has to be from 2 to 20 characters long');
    await expect(page.getByText('Name has to be from 2 to 20')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
 
    await page.locator('[id="signupEmail"]').fill('usertest@gmail.com');
    await expect(page.getByText('Last name has to be from 2 to')).toHaveText('Last name has to be from 2 to 20 characters long');
    await expect(page.getByText('Last name has to be from 2 to')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await page.locator('[id="signupPassword"]').fill('Usertest123');
    await page.locator('[id="signupRepeatPassword"]').fill('Usertest123');

    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('Incorrect email format', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('[id="signupName"]').fill('testuser');
    await page.locator('[id="signupLastName"]').fill('testlastname');
    await page.locator('[id="signupEmail"]').fill('usertest@gmailcom');

    await page.locator('[id="signupPassword"]').fill('Password123');
    await expect(page.getByText('Email is incorrect')).toHaveText('Email is incorrect');
    await expect(page.getByText('Email is incorrect')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await page.locator('[id="signupRepeatPassword"]').fill('Password123');
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('Password is too short', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('[id="signupName"]').fill('testuser');
    await page.locator('[id="signupLastName"]').fill('testlastname');
    await page.locator('[id="signupEmail"]').fill('usertest@gmail.com');

    await page.locator('[id="signupPassword"]').fill('Abc1!');
    await page.locator('[id="signupRepeatPassword"]').fill('Abc1!');

    await expect(page.getByText('Password has to be from 8 to')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(page.locator('[id="signupPassword"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await page.locator('[id="signupPassword"]').click();
    await expect(page.locator('form div').filter({ hasText: 'Re-enter passwordPassword has' }).getByRole('paragraph')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(page.locator('form div').filter({ hasText: 'Re-enter passwordPassword has' }).getByRole('paragraph')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('Passwords do not match', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('[id="signupName"]').fill('testuser');
    await page.locator('[id="signupLastName"]').fill('testlastname');
    await page.locator('[id="signupEmail"]').fill('usertest@gmail.com');

    await page.locator('[id="signupPassword"]').fill('Password123');
    await page.locator('[id="signupRepeatPassword"]').fill('Password321');

    await page.locator('[id="signupPassword"]').click();
    await expect(page.getByText('Passwords do not match')).toHaveText('Passwords do not match');
    await expect(page.getByText('Passwords do not match')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('Password without a capital letter', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('[id="signupName"]').fill('testuser');
    await page.locator('[id="signupLastName"]').fill('testlastname');
    await page.locator('[id="signupEmail"]').fill('usertest@gmail.com');

    await page.locator('[id="signupPassword"]').fill('password123');
    await page.locator('[id="signupRepeatPassword"]').fill('password123');

    await expect(page.getByText('Password has to be from 8 to')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await page.locator('[id="signupPassword"]').click();
    await expect(page.locator(':nth-child(5) .invalid-feedback > p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('Password without a number', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('[id="signupName"]').fill('testuser');
    await page.locator('[id="signupLastName"]').fill('testlastname');
    await page.locator('[id="signupEmail"]').fill('usertest@gmail.com');

    await page.locator('[id="signupPassword"]').fill('PasswordOnly');
    await page.locator('[id="signupRepeatPassword"]').fill('PasswordOnly');

    await expect(page.getByText('Password has to be from 8 to')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await page.locator('[id="signupPassword"]').click();
    await expect(page.locator(':nth-child(5) .invalid-feedback > p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('Password is too long', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('[id="signupName"]').fill('testuser');
    await page.locator('[id="signupLastName"]').fill('testlastname');
    await page.locator('[id="signupEmail"]').fill('usertest@gmail.com');

    await page.locator('[id="signupPassword"]').fill('SuperSecurePassword123');
    await page.locator('[id="signupRepeatPassword"]').fill('SuperSecurePassword123');

    await expect(page.getByText('Password has to be from 8 to')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await page.locator('[id="signupPassword"]').click();
    await expect(page.locator(':nth-child(5) .invalid-feedback > p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

    test('Successful registration', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('[id="signupName"]').fill('Stanislav');
    await page.locator('[id="signupLastName"]').fill('Voidenko');
    await page.locator('[id="signupEmail"]').fill('stasvoidenko++qauto@gmail.com');
    await page.locator('[id="signupPassword"]').fill('Password1234');
    await page.locator('[id="signupRepeatPassword"]').fill('Password1234');

    await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled();
    await page.getByRole('button', { name: 'Register' }).click();
  });

  test('Login with secure password', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.fill('[id="signinEmail"]', 'stasvoidenko++qauto@gmail.com');
    await page.fill('[id="signinPassword"]', 'Password1234');
    await page.getByRole('button', { name: 'Login' }).click();
  });

});
