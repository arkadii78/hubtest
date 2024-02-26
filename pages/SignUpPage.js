export class SignUp {
  constructor(page) {
    this.page = page;
    this.signUp = page.locator('[data-name="Free 14-day trial"]');
    this.name = page.locator('input[name="user[name]"]');
    this.email = page.locator('input[name="user[email]"]');
    this.password = page.locator('input[name="user[password]"]');
    this.termsCheckbox = page.locator('.hsds-form__checkbox-icon');
    this.createAccount = page.locator('button', { hasText: 'Create my account' });
    this.letsGetStartedLabel = page.locator('h1.wizard-title');
    this.bussinesOwner = page.locator('[href="/organizations/wizard/start"]');
    this.teamMember = page.locator('[href="/welcome/request_join"]');
    this.verifyEmail = page.locator('.signup-title');
  }
};