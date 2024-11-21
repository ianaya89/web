/// <reference types="Cypress" />

import LoginPage from '../../pages/LoginPage'

context('Edit Package Item', () => {
  it('edit package', function() {
    cy.mockGraphQL(({ operationName, variables }) => {
      return {
        automock: [
          'Me',
          'Notifications',
          'ActiveUnitQuery',
          'UnitProfileViews',
          'UnitInventory',
          'UnitPackages',
          'TeamProfileSearchAppearances',
          'Deals',
          'UnitTopSocialMedia',
          'UnitInventoryStatus',
          'PageVisited',
          'Login',
          'IndustriesQuery',
          'MarketplaceCategories',
          'InventoryPackageUpdateMutation'
        ],
        mock: {
          MarketplaceItem: () => {
            return 'MarketplaceItemPackage'
          }
        }
      }
    })

    const loginPage = new LoginPage()
    const dashboardPage = loginPage.login()
    const inventoryPage = dashboardPage.sidebar.clickOnInventory()
    const packagesPage = inventoryPage.inventoryTabs.clickOnPackages()
    const editPackagePage = packagesPage.editPackage()

    editPackagePage.matchSnapshot()

    editPackagePage
      .seeNoFormErrors()
      .seeSelectedInventories()
      .fillInputs()
      .removeSelectedInventories()
      .clickOnAddFirstItem()
      .selectInventory()
      .seeNoFormErrors()
      .submit()

    inventoryPage.seeSuccess('Inventory package successfully updated')
  })
})
