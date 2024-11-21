import Page from './Page'
import SettingsPage from './SettingsPage'

const oldPassSelector = '[data-cy="old-pass"]'
const newPassSelector = '[data-cy="new-pass"]'
const newPassConfSelector = '[data-cy="new-pass-conf"]'
const saveBtnSelector = '[data-cy="save-btn"]'

export default class SettingsPasswordPage extends Page {
  constructor() {
    super()
    this.parentPage = new SettingsPage()
    this.mainSelector = '[data-cy="settings-password-page"]'
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  fillInputs(oldPass, newPass, newPassConf) {
    this.fillInput(oldPassSelector, oldPass)
    this.fillInput(newPassSelector, newPass)
    this.fillInput(newPassConfSelector, newPassConf)
    return this
  }

  submit() {
    this.getElement(saveBtnSelector).click()

    return this
  }

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.parentPage.seeAllKeyElements()
    }

    this.seeElement(oldPassSelector)
    this.seeElement(newPassSelector)
    this.seeElement(newPassConfSelector)
    this.seeElement(saveBtnSelector)
    this.seeElement('[data-cy="pass-strength"]')
    return this
  }
}
