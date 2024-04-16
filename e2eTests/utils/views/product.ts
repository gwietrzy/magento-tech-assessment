import { Locator, Page } from "@playwright/test";
import { Common } from "./common";

export class Product extends Common {
  readonly productItem: Locator;
  readonly productTitle: Locator;
  readonly addToWishlistButton: Locator;
  readonly addToCartButton: Locator;
  readonly productPrice: Locator;
  readonly productInfo: Locator;

  constructor(page: Page) {
    super(page);
    this.productItem = page.locator('li.product-item');
    this.productTitle = page.locator('a.product-item-link');
    this.addToWishlistButton = page.locator('a[data-action="add-to-wishlist"]');
    this.addToCartButton = page.locator('button.action.tocart');
    this.productPrice = page.locator('span[data-price-amount]');
    this.productInfo = page.locator('div.product-info-main');
  }

  async waitForAddToCartResponse() {
    return await this.page.waitForResponse('https://magento.softwaretestingboard.com/checkout/cart/add/**');
  }
}