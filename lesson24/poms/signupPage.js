const { test, expect } = require('@playwright/test');
exports.RegistrationPage = class RegistrationPage {
    constructor(page) {
      this.page = page;
      this.signupButton = page.getByRole('button', { name: 'Sign up' });
      this.registerButton = page.getByRole('button', { name: 'Register' });
      this.nameInput = page.locator('[id="signupName"]');
      this.lastNameInput = page.locator('[id="signupLastName"]');
      this.emailInput = page.locator('[id="signupEmail"]');
      this.passwordInput = page.locator('[id="signupPassword"]');
      this.repeatPasswordInput = page.locator('[id="signupRepeatPassword"]');
    }
  

    async openSignupForm() {
      await this.signupButton.click();
    }

  
    async fillRegistrationForm({ name, lastName, email, password, repeatPassword }) {
      await this.nameInput.fill(name);
      await this.lastNameInput.fill(lastName);
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.repeatPasswordInput.fill(repeatPassword);
      await this.passwordInput.click();
      
    }
  
    async submitForm() {
      await this.registerButton.click();
    }
  
    async isRegisterButtonDisabled() {
      return await this.registerButton.isDisabled();
    }
  
    async isRegisterButtonEnabled() {
      return await this.registerButton.isEnabled();
    }
  
    getErrorMessage(text) {
      return this.page.getByText(text);
    }
  };