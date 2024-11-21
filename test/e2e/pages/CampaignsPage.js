import Page from './Page'
import CreateCampaignsPage from './CreateCampaignsPage'
import UnitHeader from './partials/UnitHeader'
import SellerSidebar from './partials/SellerSidebar'
import InventoryTabs from './partials/InventoryTabs'

export default class CampaignsPage extends Page {
  constructor() {
    super()
    this.header = new UnitHeader()
    this.sidebar = new SellerSidebar()
    this.inventoryTabs = new InventoryTabs()
    this.mainSelector = '[data-cy="campaigns-page"]'
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  clickCreateNew() {
    this.getElement('[data-cy="createNew"]').click()
    cy.url().should('contain', 'campaigns/create')

    return new CreateCampaignsPage()
  }

  clickOnDuplicate() {
    return new Cypress.Promise((resolve, reject) => {
      const duplicateData = { campaign: {}, instance: null }
      this.getElement('[data-cy="campaign-row-0"]')
        .find('td')
        .then(tds => {
          tds.each((index, td) => {
            if (td.getAttribute('data-cy') != null) {
              // eslint-disable-next-line standard/computed-property-even-spacing
              duplicateData.campaign[
                td.getAttribute('data-cy').replace('campaign-row-', '')
              ] = td.innerText
            }
          })

          this.getElement(
            '[data-cy="campaign-row-0"] [data-cy="campaign-row-duplicate"] button'
          ).click()

          duplicateData.instance = new CreateCampaignsPage()
          resolve(duplicateData)
        })
    })
  }

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.header.seeAllKeyElements()
      this.sidebar.seeAllKeyElements()
      this.inventoryTabs.seeAllKeyElements()
    }

    this.seeElement('[data-cy="createNew"]')

    return this
  }
}
