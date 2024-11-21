/// <reference types="Cypress" />

import LoginPage from '../../pages/LoginPage'

context('Marketplace', () => {
  it('search marketplace items without filters', function() {
    cy.mockGraphQL(({ operationName, variables }) => {
      return {
        automock: [
          'MeBrand',
          'Notifications',
          'ActiveUnitQuery',
          'UnitProfileViews',
          'UnitInventory',
          'PageVisited',
          'LoginBrand',
          'SearchAppearanceMutation',
          'SearchAppearanceBrand',
          'Deals',
          'SeasonsBrand',
          'Countries',
          'Leagues',
          'Teams',
          'MarketplaceCategoriesBrand',
          'MarketplaceItemsBrand',
          'MarketplaceSearchRangesBrand',
          'MarketplaceMapQueryBrand',
          'MarketplacePackagesCategoriesQueryBrand',
          'FeaturedBrand',
          'NearbyBrand',
          'NewestBrand',
          'MarketplaceSearchBrand'
        ],
        mock: {}
      }
    })

    const loginPage = new LoginPage()
    const dashboardPage = loginPage.login(
      'brand@sponsoronline.eu',
      'secret',
      'buyer'
    )

    const marketplaceIndexPage = dashboardPage.sidebar.clickOnMarketplace()

    marketplaceIndexPage.seeAllKeyElements()

    marketplaceIndexPage.matchSnapshot()

    const marketplaceSearchPage = marketplaceIndexPage.submitSearch()

    marketplaceSearchPage.seeAllKeyElements()

    marketplaceSearchPage.matchSnapshot()
  })
})
