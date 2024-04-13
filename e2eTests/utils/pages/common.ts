import { Locator, Page, expect } from "@playwright/test";
import { CustomerSideBarOptions } from "../enums";

export class Common {
  readonly page: Page;
  pageTitleHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleHeader = page.locator('h1.page-title');
  }

  async verifyPageTitleHeader(expectedTitle: CustomerSideBarOptions) {
    expect(await this.pageTitleHeader.textContent()).toBe(expectedTitle);
  }
}