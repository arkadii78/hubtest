export class HomePage {
  constructor(page) {
    this.page = page;
    this.signUp = page.locator('[data-name="Free 14-day trial"]');
    this.signIn = page.locator('[data-name="Sign in"]');
  }

  async navigateToHomePage() {
    await this.page.goto('https://hubstaff.com/');
  }
};