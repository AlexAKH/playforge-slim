import { assertTextEquals, assertVisible } from "../assertions";
import { test } from "../framework/fixtures/app.fixture";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

test.describe("Authentication", () => {
  test("user logs in, logs out, and sees error message upon invalid login @ui", async ({
    page
  }) => {
    // AUTH-001: Log in with valid credentials and log out
    const loginPage = await new LoginPage(page).open();
    await loginPage.login({
      email: "test_epam_course@test.com",
      password: "test_course"
    });

    const homePage = new HomePage(page);
    await homePage.isOpened();
    await assertVisible(homePage.header.loggedInAs("test_epam_course"));

    await homePage.header.logoutCurrentUser();
    await loginPage.isOpened();
    await assertVisible(loginPage.loginForm);

    // AUTH-002: Log in with invalid credentials and verify error message
    await loginPage.login({
      email: "test_epam_course@test.com",
      password: "wrong_password"
    });

    await assertVisible(loginPage.errorMessage);
    await assertTextEquals(
      loginPage.errorMessage,
      "Your email or password is incorrect!"
    );
  });
});

