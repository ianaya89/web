import CampaignsPage from '../CampaignsPage'
import PackagesPage from '../PackagesPage'
import Partial from './Partial'

export default class InventoryTabs extends Partial {
  constructor() {
    super()
    this.mainSelector = '[data-cy="inventory-tabs-bar"]'
    this.seeAllKeyElements()
  }

  clickOnCampaigns() {
    this.getElement('[data-cy="campaigns-link"]').click()
    cy.url().should('contain', 'inventory/campaigns')
    return new CampaignsPage()
  }

  clickOnPackages() {
    this.getElement('[data-cy="packages-link"]').click()
    cy.url().should('contain', 'inventory/packages')
    return new PackagesPage()
  }

  seeAllKeyElements() {
    this.seeElement('[data-cy="inventory-link"]')
    this.seeElement('[data-cy="packages-link"]')
    this.seeElement('[data-cy="campaigns-link"]')
    this.seeElement('[data-cy="uploaded-inventory"]')
    return this
  }
}
