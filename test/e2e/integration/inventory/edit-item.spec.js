/// <reference types="Cypress" />

import LoginPage from '../../pages/LoginPage'

context('Edit Inventory Item', () => {
  it('edit item', function() {
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
          'InventoryItemUpdateMutation'
        ],
        mock: {}
      }
    })

    const loginPage = new LoginPage()
    const dashboardPage = loginPage.login()
    const inventoryPage = dashboardPage.sidebar.clickOnInventory()
    const editInventoryItemPage = inventoryPage.editFirstItem()

    editInventoryItemPage.matchSnapshot()

    editInventoryItemPage.seeNoFormErrors().submit()

    inventoryPage
      .seeSuccess('Inventory item successfully updated.')
      .seeAllKeyElements()
      .editFirstItem()

    editInventoryItemPage
      .seeNoFormErrors()
      .fillInputs()
      .seeNoFormErrors()
      .submit()

    inventoryPage
      .seeSuccess('Inventory item successfully updated.')
      .seeAllKeyElements()
  })
})
