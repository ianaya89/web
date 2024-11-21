import Page from './Page'
import UnitHeader from './partials/UnitHeader'
import SellerSidebar from './partials/SellerSidebar'
import InventoryTabs from './partials/InventoryTabs'
import CreateInventoryItemPage from './CreateInventoryItemPage'
import EditInventoryItemPage from './EditInventoryItemPage'

const addItemSelector = '[data-cy="addItem"]'

export default class InventoryPage extends Page {
  constructor() {
    super()
    this.header = new UnitHeader()
    this.sidebar = new SellerSidebar()
    this.inventoryTabs = new InventoryTabs()
    this.mainSelector = '[data-cy="inventory-page"]'
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  clickAddNewItem() {
    this.getElement(addItemSelector).click()

    return new CreateInventoryItemPage()
  }

  duplicateFirstItem() {
    this.getElement('[data-cy="item-menu-activator"]')
      .first()
      .click()
      .then(() => {
        this.getElement('[data-cy="item-duplicate"]').click()
      })
    return this
  }

  editFirstItem() {
    this.getElement('[data-cy="edit"]')
      .first()
      .click()
    cy.wait(2000)

    return new EditInventoryItemPage()
  }

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.header.seeAllKeyElements()
      this.sidebar.seeAllKeyElements()
      this.inventoryTabs.seeAllKeyElements()
    }

    this.seeElement('[data-cy="tipsCard"]')
    this.seeElement(addItemSelector)
    this.seeElement('[data-cy="addPackage"]')

    return this
  }
}
