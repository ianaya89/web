import Page from './Page'
import CreatePackagePage from './CreatePackagePage'
import EditPackagePage from './EditPackagePage'
import UnitHeader from './partials/UnitHeader'
import SellerSidebar from './partials/SellerSidebar'
import InventoryTabs from './partials/InventoryTabs'

export default class PackagesPage extends Page {
  constructor() {
    super()
    this.header = new UnitHeader()
    this.sidebar = new SellerSidebar()
    this.inventoryTabs = new InventoryTabs()
    this.mainSelector = '[data-cy="packages-page"]'
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  setUpPackage() {
    this.getElement('[data-cy="set-up-package"]')
      .first()
      .click()
    cy.url().should('contain', 'packages/create')

    return new CreatePackagePage()
  }

  editPackage() {
    this.getElement('[data-cy="package-menu-activator"]')
      .first()
      .click()
      .then(() => {
        this.getElement('[data-cy="edit-package"]')
          .first()
          .click()
        cy.url().should('contain', 'packages')
      })

    return new EditPackagePage()
  }

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.header.seeAllKeyElements()
      this.sidebar.seeAllKeyElements()
      this.inventoryTabs.seeAllKeyElements()
    }

    this.seeContent('', 'Active packages')
    this.seeContent('', 'Predefined packages')
    this.seeElement('[data-cy="set-up-package"]')
    this.seeContent(
      '',
      'Packages are one of the most popular features of SPONSOR.ONLINE. They help teams to cover big sets of advertising inventory and makes easier for sponsors to fill their campaign needs.'
    )

    return this
  }
}
