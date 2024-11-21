import Page from './Page'
import SettingsPage from './SettingsPage'

const newOffersSelector = '[data-cy="new-offers"]'
const weeklyReviewSelector = '[data-cy="weekly-review"]'
const monthlyNewsletterSelector = '[data-cy="monthly-newsletter"]'
const weeklySuggestionsSelector = '[data-cy="weekly-suggestions"]'

export default class SettingsNotificationsPage extends Page {
  constructor() {
    super()
    this.parentPage = new SettingsPage()
    this.mainSelector = '[data-cy="settings-notifications-page"]'
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  fillInputs(newOffers, weeklyReview, monthlyNews, weeklySuggestions) {
    this.enableDisableNotification(newOffers, newOffersSelector)
    this.enableDisableNotification(weeklyReview, weeklyReviewSelector)
    this.enableDisableNotification(monthlyNews, monthlyNewsletterSelector)
    this.enableDisableNotification(weeklySuggestions, weeklySuggestionsSelector)

    return this
  }

  enableDisableNotification(variable, selector) {
    if (variable) {
      this.checkCheckbox(selector)
    } else {
      this.uncheckCheckbox(selector)
    }
  }

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.parentPage.seeAllKeyElements()
    }

    this.seeElement(newOffersSelector)
    this.seeElement(weeklyReviewSelector)
    this.seeElement(weeklySuggestionsSelector)
    this.seeElement(monthlyNewsletterSelector)
    return this
  }
}
