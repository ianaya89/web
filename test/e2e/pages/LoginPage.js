import Page from './Page'
import DashboardPage from './DashboardPage'

const emailSelector = '[data-cy=email]'
const passwordSelector = '[data-cy=password]'

export default class LoginPage extends Page {
  constructor() {
    super()
    this.baseUrl = '/login'
  }

  getEmailInput() {
    return this.getElement(emailSelector + ' input')
  }

  getPasswordInput() {
    return this.getElement(passwordSelector + ' input')
  }

  login(
    email = 'engineering@sponsoronline.eu',
    password = 'secret',
    dashboardSidebarType = 'seller'
  ) {
    this.visit()

    this.submit(email, password)
    return new DashboardPage(dashboardSidebarType)
  }

  submit(email = 'engineering@sponsoronline.eu', password = 'secret') {
    this.typeEmail(email)
    this.typePassword(password)

    return this.clickSubmit()
  }

  typeEmail(email) {
    this.fillInput(emailSelector, email)

    return this
  }

  typePassword(password) {
    this.fillInput(passwordSelector, password)

    return this
  }

  submitIsDisabled() {
    this.getElement('[data-cy=submit]').should('be.disabled')

    return this
  }

  clickSubmit() {
    this.getElement('[data-cy=submit]').click({ force: true })

    return this
  }

  seeAllKeyElements() {
    this.seeElement(emailSelector)
    this.seeElement(passwordSelector)
    this.seeElement('[data-cy=submit]')
    this.seeElement('[href="/terms"]')
    this.seeElement('[href="/privacy"]')
    this.seeElement('[href="/register"]')
    this.seeElement('[href="/forgot"]')

    return this
  }
}
