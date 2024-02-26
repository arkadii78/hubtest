import { MailSlurp, MatchOptionFieldEnum, MatchOptionShouldEnum } from "mailslurp-client";
import { load } from "cheerio";

export class MailSlurpService {

    constructor (apiKey) {
        this.mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });
    }

    async createEmailInbox () {
        const inbox = await this.mailslurp.createInbox();
        return inbox;
    }

    async deleteInbox (inboxId) {
        return await this.mailslurp.deleteInbox(inboxId);
    }

    async clearInbox (inboxId) {
        const emails = await this.mailslurp.getEmails(inboxId);
        await emails.map(async (email) => {
            await this.mailslurp.deleteEmail(email.id);
        });
    }

    async waitFirstEmailBySubject (inboxId, value) {
        return await this.mailslurp.waitController.waitForMatchingFirstEmail({
            matchOptions: {
                matches: [{
                    field: MatchOptionFieldEnum.SUBJECT,
                    should: MatchOptionShouldEnum.EQUAL,
                    value: value
                }]
            },
            inboxId
        });
    }

    async getLinkFromEmail (emailBody) {
        const $ = load(emailBody);
        let href = $("body").find("a")[1].attribs["href"];
        return href;
    }
}
