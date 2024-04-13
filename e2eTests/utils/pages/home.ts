import { Locator, Page } from "@playwright/test";
import { CustomerMenuOptions } from "../enums";

export class Home {
  readonly page: Page;
  readonly cookiesDialog: Locator;
  readonly cookiesConsentButton: Locator;
  readonly searchInput: Locator;
  readonly miniCart: Locator;
  readonly storeMenu: Locator;
  readonly signInLink: Locator;
  readonly createAccountLink: Locator;
  readonly customerMenuButton: Locator;
  readonly customerMenuOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookiesDialog = page.locator('div.fc-choice-dialog');
    this.cookiesConsentButton = page.locator('button.fc-cta-consent');
    this.searchInput = page.locator('input#search');
    this.miniCart = page.locator('a.showcart');
    this.storeMenu = page.locator('div#store.menu');
    this.signInLink = page.locator('a[href="/customer/account/login/**"] ');
    this.createAccountLink = page.locator('a[href="/customer/account/create/"]');
    this.customerMenuButton = page.locator('button[data-action="customer-menu-toggle"]').nth(1);
    this.customerMenuOption = page.locator('div.customer-menu li');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async acceptCookies() {
    if (await this.cookiesDialog.isVisible()) {
      await this.cookiesConsentButton.click();
    }
    await this.cookiesDialog.isHidden();
  }

  async verifyPageElements() {
    await this.searchInput.isVisible();
    await this.miniCart.isVisible();
    await this.storeMenu.isVisible();
    await this.signInLink.isVisible();
    await this.createAccountLink.isVisible();
  }

  async openCustomerMenuAndSelectOption(option: CustomerMenuOptions) {
    await this.customerMenuButton.click();
    await this.customerMenuOption.getByText(option).click();
  }
}