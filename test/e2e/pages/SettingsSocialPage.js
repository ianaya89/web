import Page from './Page'
import SettingsPage from './SettingsPage'

export default class SettingsSocialPage extends Page {
  constructor() {
    super()
    this.parentPage = new SettingsPage()
    this.mainSelector = '[data-cy="settings-social-page"]'
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.parentPage.seeAllKeyElements()
    }

    this.seeContent('', 'Enable connections to social networks')
    return this
  }
}
