import LandingPage from '../LandingPage'
import LoginPage from '../LoginPage'
import Partial from './Partial'

export default class UnitHeader extends Partial {
  constructor() {
    super()
    this.mainSelector = '[data-cy="header"]'
    this.seeAllKeyElements()
  }

  clickSponsorLogo() {
    this.getElement('a[href="/"][data-cy="logo-link"]')
      .first()
      .click({ force: true })

    return new LandingPage()
  }

  clickLogout() {
    this.getElement('li.user--actions').click()
    this.getElement('[data-cy="logout"]').click()
    cy.url().should('contain', 'login')

    return new LoginPage()
  }

  seeAllKeyElements() {
    this.seeElement('[href$="/faq"]')
    this.seeElement('[href="/news"]')
    return this
  }
}
