/// <reference types="Cypress" />

import LoginPage from '../../pages/LoginPage'

context('Create Campaign', () => {
  it('pairwise campaign contact form', function() {
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
          'Login'
        ]
      }
    })

    const loginPage = new LoginPage()
    const dashboardPage = loginPage.login()
    const inventoryPage = dashboardPage.sidebar.clickOnInventory()

    inventoryPage.matchSnapshot()

    const campaignsPage = inventoryPage.inventoryTabs.clickOnCampaigns()

    campaignsPage.matchSnapshot()

    const createCampaignsPage = campaignsPage.clickCreateNew()

    createCampaignsPage.matchSnapshot({ scroll: false, wait: 1000 })

    const addContactModal = createCampaignsPage.addContact()

    addContactModal.matchSnapshot({ scroll: false, wait: 1000 })

    addContactModal.executePairwise()
  })

  it('pairwise campaign form', function() {
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
          'Campaigns',
          'Login'
        ]
      }
    })

    const loginPage = new LoginPage()
    const dashboardPage = loginPage.login()
    const inventoryPage = dashboardPage.sidebar.clickOnInventory()
    const campaignsPage = inventoryPage.inventoryTabs.clickOnCampaigns()

    const createCampaignsPage = campaignsPage.clickCreateNew()
    cy.fixture('pairwiseData/campaign.json').then(campaignJson => {
      campaignJson.forEach(input => {
        if (input.result === 'error') {
          createCampaignsPage
            .fillInputs(input.message, input.name, input.date, input.time)
            .submit()

          createCampaignsPage.seeSomeFormError()

          createCampaignsPage.seeError('Please select some recipients')
          createCampaignsPage.seeError('Please select some inventory')
          cy.reload()
        }
      })
    })
  })

  it('create campaign', function() {
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

    const createCampaignsPage = campaignsPage.clickCreateNew()
    createCampaignsPage.submit()
    createCampaignsPage
      .seeFormError('Campaign name is required')
      .seeFormError('Message is required')
      .seeFormError('Send date is required')
      .seeFormError('Send time is required')
    createCampaignsPage.seeError('Please select some recipients')
    createCampaignsPage.seeError('Please select some inventory')

    createCampaignsPage.toggleExpandAllInventory()
    createCampaignsPage.toggleSelectAllInventory()
    createCampaignsPage.toggleSelectAllInventory()
    createCampaignsPage.toggleExpandAllInventory()

    createCampaignsPage.toggleSelectAllContacts()
    createCampaignsPage.toggleSelectAllContacts()

    const addContactModal = createCampaignsPage.addContact()
    addContactModal.executePairwise(true)

    cy.fixture('pairwiseData/campaign.json').then(campaignJson => {
      campaignJson.forEach(input => {
        if (input.result === 'success') {
          createCampaignsPage.fillInputs(
            input.message,
            input.name,
            input.date,
            input.time
          )
        }
      })
    })

    createCampaignsPage.toggleExpandAllInventory()
    createCampaignsPage.toggleSelectAllInventory()
    createCampaignsPage.toggleSelectAllContacts()
    createCampaignsPage.submit()
    campaignsPage.seeSuccess('New campaign saved')
  })
})
