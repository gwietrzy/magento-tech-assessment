import { Locator, Page } from "@playwright/test";

export class Product {
  readonly page: Page;
  readonly productItem: Locator;
  readonly productTitle: Locator;
  readonly addToWishlistButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productItem = page.locator('li.product-item');
    this.productTitle = page.locator('[class="product-item-name"]');
    this.addToWishlistButton = page.locator('a[data-action="add-to-wishlist"]');
  }
}