import { Locator, Page, expect } from "@playwright/test";
import { Messages } from "../enums";
import playwrightConfig from "../../../playwright.config";

export class Login {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="login[username]"]');
    this.passwordInput = page.locator('input[name="login[password]"]');
    this.loginButton = page.locator('button.login');
    this.emailError = page.locator('div#email-error');
    this.passwordError = page.locator('div#pass-error');
  }

  async goto() {
    await this.page.goto('/customer/account/login/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async as(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    expect(await this.page.url()).toBe(playwrightConfig.use?.baseURL + '/customer/account/');
  }

  async verifyErrorMessages(expectedMessage: Messages) {
    await this.emailInput.clear();
    await this.passwordInput.clear();
    await this.loginButton.click();
    expect(await this.emailError.textContent()).toBe(expectedMessage);
    expect(await this.passwordError.textContent()).toBe(expectedMessage);
  }
}