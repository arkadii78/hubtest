import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { SignIn } from "../pages/SignInPage";
import { DashboardsPage } from "../pages/DashboardsPage";

test.describe("Bonus payment tests", () => {
    test("Create a team payment: one time amount of bonus payment", async ({ page }) => {
        const homePage = new HomePage(page);
        const signInPage = new SignIn(page);
        const dashboardsPage = new DashboardsPage(page);
        const memeberName = process.env.NAME;
        const credentials = {
            email: process.env.USER_EMAIL,
            password: process.env.USER_PASSWORD
        }
        await homePage.navigateToHomePage();
        await signInPage.signInAs(credentials);
        await expect(dashboardsPage.dashboardTab).toBeVisible();

        await dashboardsPage.financialsTab.click();
        await expect(dashboardsPage.sendPaymentsPanel).toBeVisible();
        await dashboardsPage.oneTimeAmountSection.click();
        await dashboardsPage.selectMembersInout.click();
        await dashboardsPage.selectUser(memeberName).click();
        await expect(dashboardsPage.selectedUser(memeberName)).toBeVisible();
        await dashboardsPage.paymentNote.click();
        await dashboardsPage.paymentNote.type('test_text_' + Date.now());
        await dashboardsPage.paymentAmount.type('0.005');
        await dashboardsPage.createPayment.click();
        await dashboardsPage.createPaymentConfirm.click();
        await dashboardsPage.notNow.click();
        await expect(dashboardsPage.paymentRow).toBeVisible();
        await expect(dashboardsPage.paymentRow.locator('[data-original-title="Payment system will use a one time amount to pay member"]'))
            .toHaveText('One time');
        await expect(dashboardsPage.paymentRow.locator('td').first()).toHaveText(memeberName);
        await expect(dashboardsPage.paymentRow.locator('[value="0:00:00"]')).toBeVisible();
        await expect(dashboardsPage.paymentRow.locator('span.label')).toHaveText('Pending');
    });
});