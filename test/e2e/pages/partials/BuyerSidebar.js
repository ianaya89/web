import MarketplaceIndexPage from '../MarketplaceIndexPage'
import Partial from './Partial'

export default class BuyerSidebar extends Partial {
  constructor() {
    super()
    this.mainSelector = '[data-cy="sidebar"]'
    this.seeAllKeyElements()
  }

  clickOnMarketplace() {
    this.getElement('[href$="/marketplace"]').click()

    cy.url().should('contain', '/marketplace')

    return new MarketplaceIndexPage()
  }

  seeAllKeyElements() {
    this.seeElement('[href$="/dashboard"]')
    this.seeElement('[href$="/profile/targeting"]')
    this.seeElement('[href$="/marketplace"]')
    this.seeElement('[href$="/deals"]')
    this.seeElement('[href$="/settings/profile"]')
    this.seeElement('[href$="/contact"]')
    this.seeElement('[href$="/about"]')
    this.seeElement('[href="/terms"]')
    this.seeElement('[href="/privacy"]')

    return this
  }
}
