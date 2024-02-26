import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { SignUp } from "../pages/SignUpPage";
import { MailSlurpService } from "../external_services/mailslurp.service";


test.describe("Sign Up tests", () => {
    test("Sign up for the 14th day trial", async ({ page }) => {
        const homePage = new HomePage(page);
        const signUpPage = new SignUp(page);
        const mailSlurpService = new MailSlurpService(process.env.MAILSLURP_API_KEY);
        const name = process.env.NAME;
        const password = process.env.NEW_PASSWORD;
        const inbox = await mailSlurpService.createEmailInbox();
        const { id, emailAddress } = inbox;
        await mailSlurpService.clearInbox(id);

        await homePage.navigateToHomePage();
        await signUpPage.signUp.click();
        await signUpPage.name.type(name);
        await signUpPage.email.type(emailAddress);
        await signUpPage.password.type(password);
        await signUpPage.termsCheckbox.click();
        await page.waitForTimeout(3000);
        await signUpPage.createAccount.click();
        await page.waitForTimeout(5000);
        await expect(signUpPage.verifyEmail).toBeVisible();

        const email = await mailSlurpService.waitFirstEmailBySubject(id, 'Confirm your Hubstaff account');
        const link = (await mailSlurpService.getLinkFromEmail(email.body));
        await page.goto(link);
        await expect(signUpPage.letsGetStartedLabel).toHaveText(`Let’s get started`);
        await expect(signUpPage.teamMember).toBeVisible();
        await expect(signUpPage.bussinesOwner).toBeVisible();
        await mailSlurpService.deleteInbox(id);
    });
});
