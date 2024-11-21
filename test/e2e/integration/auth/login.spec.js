/// <reference types="Cypress" />

import LoginPage from '../../pages/LoginPage'
import LandingPage from '../../pages/LandingPage'

context('Login', () => {
  const loginPage = new LoginPage()

  it('logs user in', function() {
    cy.mockGraphQL(({ operationName, variables }) => {
      return {
        automock: [
          'Me',
          'Notifications',
          'ActiveUnitQuery',
          'UnitProfileViews',
          'TeamProfileSearchAppearances',
          'Deals',
          'UnitTopSocialMedia',
          'UnitInventoryStatus',
          'PageVisited',
          'MarketplaceMapQuery',
          'LandingPageMapQuery'
        ],
        mock: {
          Login: () => {
            if (variables.email === 'missing@sponsoronline.eu') {
              return 'Login404'
            } else if (variables.password === 'invalid') {
              return 'LoginInvalid'
            }

            return 'Login'
          }
        }
      }
    })

    const landingPage = new LandingPage()
    landingPage.visit()

    LandingPage.clickLogin().seeAllKeyElements()

    loginPage.getEmailInput().clear()
    loginPage.getPasswordInput().clear()
    loginPage.getPasswordInput().blur()

    // empty form submit
    loginPage
      .submitIsDisabled()
      .seeFormError('E-mail address is required')
      .seeFormError('Password is required')

    // empty & invalid form
    loginPage
      .typeEmail('foo')
      .seeFormError('E-mail address must be valid')
      .typeEmail('foo@example.com')
      .submitIsDisabled()

    // missing account
    loginPage
      .submit('missing@sponsoronline.eu')
      .seeError('An error occurred during authentication')

    // invalid password
    loginPage
      .submit('engineering@sponsoronline.eu', 'invalid')
      .seeError('An error occurred during authentication')

    // successful login
    loginPage.submit()

    cy.url().should('contain', 'unit/1/dashboard')

    // const dashboardPage = new DashboardPage()
    // dashboardPage.header.clickSponsorLogo().seeAllKeyElements()
    // LandingPage.clickGoToDashboard()
    //
    // cy.visit('/login')
    // dashboardPage.seeSuccess(
    //   'You are already authenticated. Redirecting you back.'
    // )
    //
    // loginPage = dashboardPage.header.clickLogout()
    // loginPage.seeAllKeyElements()
    // loginPage.seeSuccess('You have been logged out')
  })
})
