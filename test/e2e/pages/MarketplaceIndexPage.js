import Page from './Page'
import UnitHeader from './partials/UnitHeader'
import BuyerSidebar from './partials/BuyerSidebar'
import MarketplacePage from './MarketplacePage'

export default class MarketplaceIndexPage extends Page {
  constructor() {
    super()
    this.header = new UnitHeader()
    this.sidebar = new BuyerSidebar()
    this.mainSelector = '[data-cy="marketplace-page"]'
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  submitSearch() {
    this.getElement('[data-cy="search-submit"]')
      .first()
      .click({ force: true })

    return new MarketplacePage()
  }

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.header.seeAllKeyElements()
      this.sidebar.seeAllKeyElements()
    }

    this.seeElement('[data-cy="featured"]')
    this.seeElement('[data-cy="nearby"]')
    this.seeElement('[data-cy="newest"]')

    return this
  }
}
