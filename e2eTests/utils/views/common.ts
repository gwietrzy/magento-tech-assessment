import { Locator, Page, expect } from "@playwright/test";
import { CustomerSideBarOptions } from "../enums";

export class Common {
  readonly page: Page;
  readonly pageTitleHeader: Locator;
  readonly modalDialog: Locator;
  readonly modalContent: Locator;
  readonly actionAcceptButton: Locator;
  readonly messageNotice: Locator;
  readonly messageInfoEmpty: Locator;
  readonly messageInfoSuccess: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleHeader = page.locator('h1.page-title');
    this.modalDialog = page.locator('div.modal-inner-wrap');
    this.modalContent = page.locator('div.modal-content');
    this.actionAcceptButton = page.locator('button.action-accept');
    this.messageNotice = page.locator('div.message-notice');
    this.messageInfoEmpty = page.locator('div[class="message info empty"]');
    this.messageInfoSuccess = page.locator('div.message-success');
  }

  async verifyPageTitleHeader(expectedTitle: CustomerSideBarOptions) {
    expect(await this.pageTitleHeader.textContent()).toBe(expectedTitle);
  }
}