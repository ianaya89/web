/// <reference types="Cypress" />

import LoginPage from '../../pages/LoginPage'

context('Duplicate Inventory Item', () => {
  it('duplicate item', function() {
    cy.mockGraphQL(({ operationName, variables }) => {
      return {
        automock: [
          'Me',
          'Notifications',
          'ActiveUnitQuery',
          'UnitProfileViews',
          'UnitInventory',
          'TeamProfileSearchAppearances',
          'Deals',
          'UnitTopSocialMedia',
          'UnitInventoryStatus',
          'PageVisited',
          'Login',
          'IndustriesQuery',
          'MarketplaceCategories',
          'MarketplaceItem',
          'MarketplaceItemDuplicate'
        ],
        mock: {}
      }
    })

    const loginPage = new LoginPage()
    const dashboardPage = loginPage.login()
    const inventoryPage = dashboardPage.sidebar.clickOnInventory()
    inventoryPage
      .duplicateFirstItem()
      .seeSuccess('Inventory item successfully duplicated')
  })
})
