const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../Poms/SignupPage');

test.describe('Lesson24', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('', {
    });
  });

test('All fields are empty', async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.openSignupForm();
  await registration.fillRegistrationForm({ 
    name: '', 
    lastName: '', 
    email: '', 
    password: '', 
    repeatPassword: '' 
    });

  await expect(registration.getErrorMessage('Name required').nth(0)).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.getErrorMessage('Last name required')).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.getErrorMessage('Email required')).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.getErrorMessage('Password required').nth(0)).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.getErrorMessage('Re-enter password required')).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.registerButton).toBeDisabled();

});

test('Invalid characters in the “Name” and “Last name” fields', async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.openSignupForm();
  await registration.fillRegistrationForm({
    name: '@testuser',
    lastName: 'LastName123',
    email: 'usertest@gmail.com',
    password: 'Usertest123',
    repeatPassword: 'Usertest123',
  });

  await expect(registration.getErrorMessage('Name is invalid').nth(0)).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.getErrorMessage('Last name is invalid')).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.registerButton).toBeDisabled();
});

test('Invalid length of “Name” and “Last name”', async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.openSignupForm();
  await registration.fillRegistrationForm({
    name: 'A',
    lastName: 'B',
    email: 'usertest@gmail.com',
    password: 'Usertest123',
    repeatPassword: 'Usertest123',
  });

  await expect(registration.getErrorMessage('Name has to be from 2 to 20 characters long').nth(0)).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.getErrorMessage('Last name has to be from 2 to 20 characters long')).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.registerButton).toBeDisabled();
});

test('“Name” or “Last name” is too long', async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.openSignupForm();
  await registration.fillRegistrationForm({
    name: 'SuperLongNameThatIsTooBig',
    lastName: 'VeryVeryLongLastNameThatIsTooBig',
    email: 'usertest@gmail.com',
    password: 'Usertest123',
    repeatPassword: 'Usertest123',
  });

  await expect(registration.getErrorMessage('Name has to be from 2 to 20 characters long').nth(0)).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.getErrorMessage('Last name has to be from 2 to 20 characters long')).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.registerButton).toBeDisabled();
});

test('Incorrect email format', async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.openSignupForm();
  await registration.fillRegistrationForm({
    name: 'testuser',
    lastName: 'testlastname',
    email: 'usertest@gmailcom',
    password: 'Password123',
    repeatPassword: 'Password123',
  });

  await expect(registration.getErrorMessage('Email is incorrect')).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.registerButton).toBeDisabled();
});

test('Password is too short', async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.openSignupForm();
  await registration.fillRegistrationForm({
    name: 'testuser',
    lastName: 'testlastname',
    email: 'usertest@gmail.com',
    password: 'Abc1!',
    repeatPassword: 'Abc1!',
  });

  await expect(registration.getErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').nth(0)).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.getErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').nth(1)).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.registerButton).toBeDisabled();
});

test('Passwords do not match', async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.openSignupForm();
  await registration.fillRegistrationForm({
    name: 'testuser',
    lastName: 'testlastname',
    email: 'usertest@gmail.com',
    password: 'Password123',
    repeatPassword: 'Password321',
  });
  await expect(registration.getErrorMessage('Passwords do not match')).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.registerButton).toBeDisabled();
});

test('Password without a capital letter', async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.openSignupForm();
  await registration.fillRegistrationForm({
    name: 'testuser',
    lastName: 'testlastname',
    email: 'usertest@gmail.com',
    password: 'password123',
    repeatPassword: 'password123',
  });

  await expect(registration.getErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').nth(0)).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.getErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').nth(1)).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.registerButton).toBeDisabled();
});

test('Password without a number', async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.openSignupForm();
  await registration.fillRegistrationForm({
    name: 'testuser',
    lastName: 'testlastname',
    email: 'usertest@gmail.com',
    password: 'PasswordOnly',
    repeatPassword: 'PasswordOnly',
  });

  await expect(registration.getErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').nth(0)).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.getErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').nth(1)).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.registerButton).toBeDisabled();
});

test('Password is too long', async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.openSignupForm();
  await registration.fillRegistrationForm({
    name: 'testuser',
    lastName: 'testlastname',
    email: 'usertest@gmail.com',
    password: 'SuperSecurePassword123',
    repeatPassword: 'SuperSecurePassword123',
  });

  await expect(registration.getErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').nth(0)).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.getErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').nth(1)).toHaveCSS('color', 'rgb(220, 53, 69)');
  await expect(registration.registerButton).toBeDisabled();
});

test('Successful registration', async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.openSignupForm();
  await registration.fillRegistrationForm({
    name: 'Stanislav',
    lastName: 'Voidenko',
    email: 'stasvoidenko++qauto@gmail.com',
    password: 'Password1234',
    repeatPassword: 'Password1234',
  });

  await expect(registration.registerButton).toBeEnabled();
  await registration.submitForm();
});
});