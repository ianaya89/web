/// <reference types="Cypress" />

// import LoginPage from '../../pages/LoginPage'

context('Create Inventory Item', () => {
  it('create item', function() {
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
          'InventoryItemMutation'
        ],
        mock: {}
      }
    })

    // const loginPage = new LoginPage()
    // const dashboardPage = loginPage.login()
    // const inventoryPage = dashboardPage.sidebar.clickOnInventory()
    //
    // inventoryPage.matchSnapshot()
    //
    // const createInventoryItemPage = inventoryPage.clickAddNewItem()
    //
    // createInventoryItemPage.matchSnapshot()
    //
    // createInventoryItemPage
    //   .checkCategoryModalIsVisible()
    //   .seeCategories()
    //   .closeCategoriesModal()
    //
    // inventoryPage.seeAllKeyElements()
    // inventoryPage.clickAddNewItem()
    //
    // createInventoryItemPage.checkCategoryModalIsVisible().selectFirstCategory()
    // createInventoryItemPage.seeAllKeyElements().submit()
    // createInventoryItemPage.seeSomeFormError()
    //
    // createInventoryItemPage
    //   .fillInputs()
    //   .seeNoFormErrors()
    //   .submit()
    //
    // inventoryPage
    //   .seeSuccess('Inventory item successfully added to your profile')
    //   .seeAllKeyElements()
  })
})
