import Page from './Page'
import SettingsPage from './SettingsPage'

const firstNameSelector = '[data-cy="first-name"]'
const lastNameSelector = '[data-cy="last-name"]'
const emailSelector = '[data-cy="email"]'
const jobTitleSelector = '[data-cy="job-title"]'
const phoneSelector = '[data-cy="phone-number"]'
const timezoneSelector = '[data-cy="timezone"]'
const saveBtnSelector = '[data-cy="save-btn"]'

export default class SettingsProfilePage extends Page {
  constructor(isSeller = true) {
    super()
    this.isSeller = isSeller
    this.parentPage = new SettingsPage()
    this.mainSelector = '[data-cy="settings-profile-page"]'
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  fillInputs(firstName, lastName, email, jobTitle, timezone, phone) {
    this.fillInput(firstNameSelector, firstName)
    this.fillInput(lastNameSelector, lastName)
    this.fillInput(emailSelector, email)
    if (this.isSeller) {
      this.fillInput(jobTitleSelector, jobTitle)
      this.fillInput(timezoneSelector, timezone)
      this.fillInput(phoneSelector, phone)
    }

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

    this.seeElement('[data-cy="go-to-profile"]')
    this.seeElement('[data-cy="change-picture-btn"]')
    this.seeElement(firstNameSelector)
    this.seeElement(lastNameSelector)
    this.seeElement(emailSelector)
    if (this.isSeller) {
      this.seeElement(jobTitleSelector)
      this.seeElement(timezoneSelector)
      this.seeElement(phoneSelector)
    }
    this.seeElement(saveBtnSelector)
    return this
  }
}
