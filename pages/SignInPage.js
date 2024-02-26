export class SignIn {
  constructor(page) {
    this.page = page;
    this.signIn = page.locator('[data-name="Sign in"]');
    this.email = page.locator('input[name="user[email]"]');
    this.password = page.locator('input[name="user[password]"]');
    this.logIn = page.locator('button', { hasText: 'Log in' });
  }

  async signInAs(credentials) {
    await this.signIn.click();
    await this.email.type(credentials.email);
    await this.password.type(credentials.password);
    await this.logIn.click();
  }
};