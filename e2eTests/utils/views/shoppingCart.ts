import { Locator, Page, expect } from "@playwright/test";
import { Common } from "./common";
import { CustomerSideBarOptions, Messages } from "../enums";
import { CustomerMenu } from "./customerMenu/customerMenu";

export class ShoppingCart { 
  readonly page: Page;
  readonly miniCartDialog: Locator;
  readonly checkoutButton: Locator;
  readonly deleteButton: Locator;
  readonly closeCartButton: Locator;
  readonly emptyMiniCartText: Locator;
  readonly common: Common;
  readonly emptyCartText: Locator;
  readonly viewCartButton: Locator;
  readonly customerMenu: CustomerMenu;
  readonly cartTable: Locator;
  readonly continueButton: Locator;
  readonly placeOrderButton: Locator;
  readonly shippingPrice: Locator;
  readonly totalOrderAmount: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.miniCartDialog = page.locator('div[id="minicart-content-wrapper"]');
    this.checkoutButton = page.locator('button.checkout');
    this.deleteButton = page.locator('a.action-delete');
    this.common = new Common(page);
    this.emptyCartText = page.locator('div.cart-empty');
    this.viewCartButton = page.locator('a.action.showcart');
    this.customerMenu = new CustomerMenu(page);
    this.cartTable = page.locator('table[id="shopping-cart-table"]');
    this.continueButton = page.locator('button.action.continue');
    this.placeOrderButton = page.getByTitle('Place Order');
    this.shippingPrice = page.locator('span[data-th="Shipping"]');
    this.totalOrderAmount = page.locator('td[data-th="Order Total"]');
    this.emptyMiniCartText = page.locator('strong.subtitle.empty');
  }

  async goto() {
    await this.page.goto('/checkout/cart/');
  }

  async removeAllItemsFromCart() {
    await this.customerMenu.verifyPageTitleHeader(CustomerSideBarOptions.SHOPPING_CART);
    if(await this.cartTable.isVisible()) {
      await this.deleteButton.first().click(); 
      await this.removeAllItemsFromCart();
    }
    await expect(this.emptyCartText).toContainText(Messages.EMPTY_CART);
  }
}