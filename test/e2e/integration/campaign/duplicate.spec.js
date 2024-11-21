/// <reference types="Cypress" />

import LoginPage from '../../pages/LoginPage'

context('Duplicate Campaign', () => {
  it('duplicate campaign', function() {
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
          'Contacts',
          'SubmitContact',
          'Campaigns',
          'Login',
          'CreateCampaign'
        ]
      }
    })

    const loginPage = new LoginPage()
    const dashboardPage = loginPage.login()
    const inventoryPage = dashboardPage.sidebar.clickOnInventory()
    const campaignsPage = inventoryPage.inventoryTabs.clickOnCampaigns()

    campaignsPage.clickOnDuplicate().then(result => {
      const createCampaignsPage = result.instance
      const duplicateCampaignData = result.campaign

      createCampaignsPage.toggleExpandAllInventory()
      createCampaignsPage.checkSelectedInventoriesCount(
        duplicateCampaignData.items
      )
      createCampaignsPage.checkSelectedContactsCount(
        duplicateCampaignData.recipients.split(',').length
      )

      createCampaignsPage.submit()
      createCampaignsPage.seeSomeFormError()
      createCampaignsPage.fillDateTime('2020-12-20', '20:30')
      createCampaignsPage.submit()
      campaignsPage.seeSuccess('New campaign saved')
    })
  })
})
