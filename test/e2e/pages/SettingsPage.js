import Page from './Page'
import UnitHeader from './partials/UnitHeader'
import SellerSidebar from './partials/SellerSidebar'
import SettingsTabs from './partials/SettingsTabs'

export default class SettingsPage extends Page {
  constructor() {
    super()
    this.header = new UnitHeader()
    this.sidebar = new SellerSidebar()
    this.settingsTabs = new SettingsTabs()
    this.mainSelector = '[data-cy="settings-page"]'
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.header.seeAllKeyElements()
      this.sidebar.seeAllKeyElements()
      this.settingsTabs.seeAllKeyElements()
    }

    return this
  }
}
