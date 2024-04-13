import { Locator, Page, expect } from "@playwright/test";
import { Messages } from "../../enums";
import { Product } from "../product";

export class WishList {
  readonly page: Page;
  readonly product: Product;
  readonly messageInfoEmpty: Locator;
  readonly messageInfoSuccess: Locator;
  readonly productsList: Locator;
  readonly productListItem: Locator;
  readonly updateButton: Locator;
  readonly removeProductButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.product = new Product(page);
    this.messageInfoEmpty = page.locator('div[class="message info empty"]');
    this.messageInfoSuccess = page.locator('div.message-success');
    this.productsList = page.locator('div[class="products-grid wishlist"]');
    this.productListItem = page.locator('div[class="products-grid wishlist"] li.product-item');
    this.removeProductButton = page.locator('a[title="Remove This Item"]');
    this.updateButton = page.locator('button[class="action update"]');
  }

  async verifyEmptyWishListMessage() {
    await this.messageInfoEmpty.isVisible();
    await expect(this.messageInfoEmpty).toContainText(Messages.EMPTY_WISHLIST);
  }

  async removeAllItemsFromWishList() {
    if (!await this.messageInfoEmpty.isVisible()) {
      await this.updateButton.click();
      await this.removeProductButton.first().click();
      await expect(this.messageInfoSuccess).toContainText(Messages.SUCCESS_WISHLIST_REMOVE);
      await this.removeAllItemsFromWishList();
    }
  }
}