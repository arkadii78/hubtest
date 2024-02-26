export class DashboardsPage {
    constructor(page) {
      this.page = page;
      this.dashboardTab = page.locator('[data-original-title="Dashboard"]');
      // project management tab
      this.projectManagementTab = page.locator('a[data-original-title="Project management"]');
      this.addProject = page.locator('[data-original-title="Add new project to the organization"]');
      this.projectNames = page.locator('#name [placeholder="Add project names separated by new lines"]');
      this.save = page.locator('button', { hasText: 'Save' });
      this.successNotice = page.locator('.jGrowl-message', { hasText: 'Project created' });
      this.row = page.locator('[data-label="Name"]');
      // financial tab
      this.financialsTab = page.locator('a[data-original-title="Financials"]');
      this.sendPaymentsPanel = page.locator('h2.page-heading', { hasText: 'Send payments'});
      this.oneTimeAmountSection = page.locator('.nav li', { hasText: 'One-time amount'});
      this.selectMembersInout = page.locator('#bonus [role="combobox"]');
      this.selectUser = (memeberName) => page.locator('ul li[role="treeitem"]', { hasText: memeberName});
      this.selectedUser = (memeberName) => page.locator(`ul li[title="${memeberName}"]`);
      this.paymentNote = page.locator('#team_payment_note');
      this.paymentAmount = page.locator('#team_payment_total_amount');
      this.createPayment = page.locator('a.btn', { hasText: 'Create payment'});
      this.createPaymentConfirm = page.locator('[value="Create payment"]');
      this.notNow = page.locator('#export_payment button[data-dismiss="modal"]', { hasText: 'Not now' });
      this.paymentRow = page.locator('tbody tr:not(.payment_total)');
    }
};