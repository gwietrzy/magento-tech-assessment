import { Locator, Page, expect } from "@playwright/test";
import { CustomerSideBarOptions } from "../../enums";

export class CustomerMenu {
  readonly page: Page;
  readonly pageTitleHeader: Locator;
  readonly sideBarItem: Locator;
  constructor(page: Page) {
    this.page = page;
    this.pageTitleHeader = page.locator('h1.page-title');
    this.sideBarItem = page.locator('ul li[class="nav item"]');
  }

  async verifyPageTitleHeader(expectedTitle: CustomerSideBarOptions) {
    await this.pageTitleHeader.isVisible();
    expect(this.pageTitleHeader).toContainText(expectedTitle);
  }  

async selectItem(item: CustomerSideBarOptions) {
    await this.sideBarItem.getByText(item).click();
  }
}