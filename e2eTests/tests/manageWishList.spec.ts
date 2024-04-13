import test, { expect } from "@playwright/test";
import { WishList } from "../utils/pages/customerMenu/wishList";
import { Home } from "../utils/pages/home";
import { Login } from "../utils/pages/login";
import users from "../fixtures/users.json";
import { CustomerMenu } from "../utils/pages/customerMenu/customerMenu";
import { CustomerSideBarOptions, Messages } from "../utils/enums";
import { Product } from "../utils/pages/product";

test.describe('Manage wish list', () => {
  let wishList: WishList;
  let home: Home;
  let login: Login;
  let customerMenu: CustomerMenu;
  let product: Product;

  test.beforeEach(async ({ page }) => {
    wishList = new WishList(page);
    home = new Home(page);
    login = new Login(page);
    customerMenu = new CustomerMenu(page);
    product = new Product(page);

    await login.goto();
    await home.acceptCookies();
    await login.as(users.testUser.email, users.testUser.password);
    await customerMenu.verifyPageTitleHeader(CustomerSideBarOptions.MY_ACCOUNT);
  });

  test('remove all items if added to have empty wish list', async ({ page }) => {
    await customerMenu.selectItem(CustomerSideBarOptions.MY_WISHLIST);
    await customerMenu.verifyPageTitleHeader(CustomerSideBarOptions.MY_WISHLIST);
    await wishList.removeAllItemsFromWishList();
    await wishList.verifyEmptyWishListMessage();
  });

  test('add item to wish list and verify if added', async ({ page }) => {
    await home.goto();
    const productName = await product.productTitle.first().innerText();
    await product.productItem.first().hover();
    await product.addToWishlistButton.first().click();
    await customerMenu.verifyPageTitleHeader(CustomerSideBarOptions.MY_WISHLIST);
    await expect(wishList.messageInfoSuccess).toContainText(productName + Messages.SUCCESS_WISHLIST_ADD);
    await expect(wishList.productsList).toContainText(productName);
  });
});