/// <reference types="Cypress" />

import LoginPage from '../../pages/LoginPage'

context('Create Package Item', () => {
  it('create package', function() {
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
          'InventoryPackageMutation'
        ],
        mock: {}
      }
    })

    const loginPage = new LoginPage()
    const dashboardPage = loginPage.login()
    const inventoryPage = dashboardPage.sidebar.clickOnInventory()
    const packagesPage = inventoryPage.inventoryTabs.clickOnPackages()

    packagesPage.matchSnapshot()

    const createPackagePage = packagesPage.setUpPackage()

    createPackagePage.matchSnapshot()

    createPackagePage.submit()
    createPackagePage.seeSomeFormError()

    // submit without items
    createPackagePage.fillInputs()
    createPackagePage.submit()
    createPackagePage.seeError('Please select some inventories')

    // success
    createPackagePage
      .clickOnAddFirstItem()
      .seeInventories()
      .selectInventory()
      .submit()

    inventoryPage.seeSuccess(
      'Inventory package successfully added to your profile'
    )
  })
})
