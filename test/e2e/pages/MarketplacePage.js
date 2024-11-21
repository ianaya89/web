import Page from './Page'
import UnitHeader from './partials/UnitHeader'
import BuyerSidebar from './partials/BuyerSidebar'

export default class MarketplacePage extends Page {
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

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.header.seeAllKeyElements()
      this.sidebar.seeAllKeyElements()
    }

    this.seeElement('[data-cy="countries-filter"]')
    this.seeElement('[data-cy="categories-filter"]')
    this.seeElement('[data-cy="budget-filter"]')
    this.seeElement('[data-cy="fans-filter"]')
    this.seeElement('[data-cy="reach-filter"]')
    this.seeElement('[data-cy="search-submit"]')

    this.seeElement('[data-cy="search-results"]')

    return this
  }
}
