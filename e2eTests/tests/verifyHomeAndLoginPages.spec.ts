import test, { expect } from "@playwright/test";
import { Home } from "../utils/views/home";
import playwrightConfig from '../../playwright.config';
import { Login } from "../utils/views/login";
import users from "../fixtures/users.json";
import { Messages } from "../utils/enums";

test.describe('Visit Luma home page', () => {
  let home: Home;
  let login: Login;

  test.beforeEach(async ({ page }) => {
  home = new Home(page);
  login = new Login(page);

  await home.goto();
  await home.acceptCookies();
  });

  test('verify correctness of page and its elements displaying', async ({ page }) => {
    expect(await page.title()).toBe('Home Page');
    expect(await page.url()).toBe(playwrightConfig.use?.baseURL + '/');
    await home.verifyPageElements();
  });

  test('try to login in without any login data provided', async ({ page }) => {
    await login.goto();
    await login.verifyErrorMessages(Messages.REQUIRED_FIELD);
    });
  
  test('login with correct credentials', async ({ page }) => {
    await login.goto();
    await login.as(users.testUser.email, users.testUser.password);
    expect(await page.url()).toBe(playwrightConfig.use?.baseURL + '/customer/account/');
  });
});