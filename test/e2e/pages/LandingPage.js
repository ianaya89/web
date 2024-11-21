import Page from './Page'
import DashboardPage from './DashboardPage'
import LoginPage from './LoginPage'

export default class LandingPage extends Page {
  static clickGoToDashboard() {
    cy.get('a[href$="/dashboard"]')
      .first()
      .click({ force: true })

    cy.url().should('contain', 'unit')

    return new DashboardPage()
  }

  static clickLogin() {
    cy.get('a[href="/login"]')
      .first()
      .click()

    cy.url().should('contain', 'login')

    return new LoginPage()
  }

  seeAllKeyElements() {
    this.seeElement('[href="/"]')
    this.seeElement('[href="/brand"]')
    this.seeElement('[href="/news"]')
    this.seeElement('[href="/pricing-brand"]', false)
    this.seeElement('[href="/pricing-team"]', false)
    this.seeElement('[href="/terms"]')
    this.seeElement('[href="/privacy"]')
    this.seeElement('[href="https://www.linkedin.com/company/sponsor-online/"]')
    this.seeElement(
      '[href="https://www.facebook.com/SponsorOnline-279923382517995/"]'
    )
    this.seeElement(
      '[href="https://www.youtube.com/channel/UCWhrAaCSGj1Si0q8X8KXlsw"]'
    )
    this.seeElement('[href="https://twitter.com/SponsorOnline"]')

    return this
  }
}
