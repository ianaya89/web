/// <reference types="Cypress" />

import LoginPage from '../../pages/LoginPage'

context('Profile Settings', () => {
  it('settings update', function() {
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
          'UnitHeader',
          'League',
          'UserPasswordUpdateMutation',
          'UserNotificationsUpdateMutation',
          'SocialAccounts'
        ],
        mock: {
          UserUpdateMutation: () => {
            if (
              variables.input.firstName !== 'asdsad' ||
              variables.input.lastName !== 'sadsad' ||
              variables.input.email !== 'asdsd@asdasd.sd' ||
              variables.input.phoneNumber !== '213123123123' ||
              variables.input.jobTitle !== 'asdasda' ||
              variables.input.timezone !== 'Europe/Bratislava'
            ) {
              return 'UserUpdateMutationError'
            }

            return 'UserUpdateMutation'
          }
        }
      }
    })

    const loginPage = new LoginPage()
    const dashboardPage = loginPage.login()
    const settingsProfilePage = dashboardPage.sidebar.clickOnSettings()

    settingsProfilePage.matchSnapshot()

    cy.fixture('pairwiseData/profile.json').then(profileJson => {
      profileJson.forEach(input => {
        settingsProfilePage.fillInputs(
          input.firstName,
          input.lastName,
          input.email,
          input.job,
          input.timezone,
          input.phone
        )

        settingsProfilePage.submit()
        if (input.result === 'success') {
          settingsProfilePage.seeSuccess('Resource updated successfully')
        } else {
          settingsProfilePage.seeSomeFormError()
        }
      })
    })

    const settingsPasswordPage = settingsProfilePage.parentPage.settingsTabs.clickOnPassword()

    settingsPasswordPage.matchSnapshot()

    settingsPasswordPage.submit().seeSomeFormError()

    settingsPasswordPage
      .fillInputs('somePass', '', '')
      .submit()
      .seeSomeFormError()
    settingsPasswordPage
      .fillInputs('', 'somePass', '')
      .submit()
      .seeSomeFormError()
    settingsPasswordPage
      .fillInputs('', 'somePass', 'somePass')
      .submit()
      .seeSomeFormError()
    settingsPasswordPage
      .fillInputs('asdsad', 'somePass', 'asdasdas')
      .submit()
      .seeSomeFormError()
    settingsPasswordPage
      .fillInputs('', '', '')
      .submit()
      .seeSomeFormError()
    settingsPasswordPage
      .fillInputs('secret', 'somePass', 'somePass')
      .submit()
      .seeSuccess('Resource updated successfully')

    const settingsNotificationsPage = settingsPasswordPage.parentPage.settingsTabs.clickOnNotifications()

    settingsNotificationsPage.matchSnapshot({ scroll: false, wait: 1000 })

    settingsNotificationsPage
      .fillInputs(true, true, true, true)
      .seeSuccess('Settings of notifications successfully updated.')
    settingsNotificationsPage
      .fillInputs(false, false, false, false)
      .seeSuccess('Settings of notifications successfully updated.')
    settingsNotificationsPage
      .fillInputs(false, false, false, false)
      .seeSuccess('Settings of notifications successfully updated.')

    const settingsSubscriptionsPage = settingsPasswordPage.parentPage.settingsTabs.clickOnSubscriptions()

    settingsSubscriptionsPage.matchSnapshot({ scroll: false, wait: 1000 })

    const settingsSocialPage = settingsSubscriptionsPage.parentPage.settingsTabs.clickOnSocial()

    settingsSocialPage.matchSnapshot({ scroll: false, wait: 1000 })
  })
})
