import Page from './Page'
import SettingsPage from './SettingsPage'

export default class SettingsSubscriptionPage extends Page {
  constructor() {
    super()
    this.parentPage = new SettingsPage()
    this.mainSelector = '[data-cy="settings-subscription-page"]'
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.parentPage.seeAllKeyElements()
    }

    this.seeContent('', 'Get started')
    this.seeContent('', 'Your plan')
    this.seeElement('[data-cy="pay-switcher"]')
    return this
  }
}
