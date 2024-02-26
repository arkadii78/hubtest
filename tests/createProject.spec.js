import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { SignIn } from "../pages/SignInPage";
import { DashboardsPage } from "../pages/DashboardsPage";

test.describe("Create project tests", () => {
    test("Create new project in organization", async ({ page }) => {
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

        const projectName = `test_project_${Date.now()}`;
        await dashboardsPage.projectManagementTab.click();
        await dashboardsPage.addProject.click();
        await dashboardsPage.projectNames.type(projectName);
        await dashboardsPage.save.click();
        await expect(dashboardsPage.successNotice).toBeVisible();
        await expect(dashboardsPage.row.filter({ hasText: projectName })).toBeVisible();
    });
});
