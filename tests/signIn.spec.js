import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { SignIn } from "../pages/SignInPage";
import { DashboardsPage } from "../pages/DashboardsPage";

test.describe("Sign In tests", () => {
    test("Sign In from the Marketing page navigation bar", async ({ page }) => {
        const homePage = new HomePage(page);
        const signInPage = new SignIn(page);
        const dashboardsPage = new DashboardsPage(page);
        const credentials = {
            email: process.env.USER_EMAIL,
            password: process.env.USER_PASSWORD
        }
        await homePage.navigateToHomePage();
        await signInPage.signInAs(credentials);
        await expect(dashboardsPage.dashboardTab).toBeVisible();
    });
});
