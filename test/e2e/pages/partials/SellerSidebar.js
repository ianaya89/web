import InventoryPage from '../InventoryPage'
import SettingsProfilePage from '../SettingsProfilePage'
import Partial from './Partial'

export default class SellerSidebar extends Partial {
  constructor() {
    super()
    this.mainSelector = '[data-cy="sidebar"]'
    this.seeAllKeyElements()
  }

  clickOnInventory() {
    this.getElement('[href$="/inventory/"]').click()

    cy.url().should('contain', '/inventory/')
    return new InventoryPage()
  }

  clickOnSettings() {
    this.getElement('[href$="/settings/profile"]').click()

    cy.url().should('contain', '/settings/profile')
    return new SettingsProfilePage()
  }

  seeAllKeyElements() {
    this.seeElement('[href$="/dashboard"]')
    this.seeElement('[href$="/deals"]')
    this.seeElement('[href$="/settings/profile"]')
    this.seeElement('[href$="/profile/fans"]')
    this.seeElement('[href$="/inventory/"]')
    this.seeElement('[href$="/contact"]')
    this.seeElement('[href="/terms"]')
    this.seeElement('[href="/privacy"]')
    return this
  }
}
