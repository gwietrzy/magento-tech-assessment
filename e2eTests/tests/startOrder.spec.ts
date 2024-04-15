import test, { expect } from "@playwright/test";
import { Home } from "../utils/views/home";
import { Login } from "../utils/views/login";
import users from "../fixtures/users.json";
import { ShoppingCart } from "../utils/views/shoppingCart";
import { CustomerMenu } from "../utils/views/customerMenu/customerMenu";
import { CustomerSideBarOptions, Messages } from "../utils/enums";
import { Product } from "../utils/views/product";

test.describe('Start placing order', () => {
  let home: Home;
  let login: Login;
  let shoppingCart: ShoppingCart;
  let customerMenu: CustomerMenu;
  let product: Product;

  test.beforeEach(async ({ page }) => {
    home = new Home(page);
    login = new Login(page);
    shoppingCart = new ShoppingCart(page);
    customerMenu = new CustomerMenu(page);
    product = new Product(page);

    await test.step('Login using valid credentials', async () => {
      await login.goto();
      await home.acceptCookies();
      await login.as(users.testUser.email, users.testUser.password);
    });

    await test.step('Remove all items from cart if any', async () =>{
      await shoppingCart.goto();
      await customerMenu.verifyPageTitleHeader(CustomerSideBarOptions.SHOPPING_CART);
      await shoppingCart.removeAllItemsFromCart();
    });
    
  });

  test('try to add item without options selection', async () => {
    
    await test.step('Search for item and save its name', async () => {
      await home.searchItem('shirt');
      const productName = await product.productTitle.first().innerText();

        await test.step('Try to add item to cart and verify message notice', async () => {
          await product.productItem.first().scrollIntoViewIfNeeded();
          await product.productItem.first().hover();
          await product.addToCartButton.first().click();
          await expect(product.productInfo).toContainText(productName);
          await expect(product.messageNotice).toHaveText(Messages.CHOOSE_ITEM_OPTIONS);
          await home.miniCart.click();
          await shoppingCart.emptyMiniCartText.isVisible();
          await expect(shoppingCart.emptyMiniCartText).toHaveText(Messages.EMPTY_CART);
      });
  });
  });

  test('add item to cart, proceed to checkout and verify shipping costs are correct', async ({ page }) => {  
    
    await test.step('Search for item and save its name and price', async () => {
      await home.searchItem('bottle');
      const productName: string = await product.productTitle.first().innerText();
      const productPrice: string = await product.productPrice.first().innerText();
      const productPriceNumber: number = parseFloat(productPrice.replace('$', ''));

      await test.step('Add item to cart and verify message', async () => {
        await product.productItem.first().scrollIntoViewIfNeeded();
        await product.productItem.first().hover();
        const [response] = await Promise.all([
          product.waitForAddToCartResponse(),
          product.addToCartButton.first().click(),
        ]);
        expect(response.status()).toBe(200);
        await expect(product.messageInfoSuccess).toHaveText('You added ' + productName + ' to your shopping cart.');
        await expect(home.cartCounter).toHaveText('1');

        await test.step('Verify cart and proceed to checkout', async () => {
          await home.cartCounter.click();
          await expect(shoppingCart.miniCartDialog).toContainText(productName);
          await shoppingCart.checkoutButton.click();
          await expect(page.url()).toContain('/checkout/');
          await shoppingCart.continueButton.click();
          await expect(shoppingCart.placeOrderButton).toBeVisible();

          await test.step('Check shipping costs are included in total order price', async () => {
            const shippingCosts: number = 5;
            const totalOrderAmount: string = await shoppingCart.totalOrderAmount.innerText();
            const totalOrderAmountNumber: number = parseFloat(totalOrderAmount.replace('$', ''));
            expect(totalOrderAmountNumber).toBe(productPriceNumber + shippingCosts);
          });  
        });
      });
    }); 
  });
});