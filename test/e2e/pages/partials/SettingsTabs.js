import SettingsPasswordPage from '../SettingsPasswordPage'
import SettingsNotificationsPage from '../SettingsNotificationsPage'
import SettingsSubscriptionPage from '../SettingsSubscriptionPage'
import SettingsSocialPage from '../SettingsSocialPage'
import SettingsProfilePage from '../SettingsProfilePage'
import Partial from './Partial'

const profileLinkURL = 'settings/profile'
const passwordLinkURL = 'settings/password'
const socialLinkURL = 'settings/social-profiles'
const notificationsLinkURL = 'settings/notifications'
const subscriptionsLinkURL = 'settings/subscriptions'

export default class SettingsTabs extends Partial {
  constructor() {
    super()
    this.mainSelector = '[data-cy="settings-tabs"]'
    this.seeAllKeyElements()
  }

  clickOnProfile() {
    this.clickOnLink(profileLinkURL)
    return new SettingsProfilePage()
  }

  clickOnPassword() {
    this.clickOnLink(passwordLinkURL)
    return new SettingsPasswordPage()
  }

  clickOnSocial() {
    this.clickOnLink(socialLinkURL)
    return new SettingsSocialPage()
  }

  clickOnNotifications() {
    this.clickOnLink(notificationsLinkURL)
    return new SettingsNotificationsPage()
  }

  clickOnSubscriptions() {
    this.clickOnLink(subscriptionsLinkURL)
    return new SettingsSubscriptionPage()
  }

  seeAllKeyElements() {
    this.seeElement('[href$="' + profileLinkURL + '"]')
    this.seeElement('[href$="' + passwordLinkURL + '"]')
    this.seeElement('[href$="' + socialLinkURL + '"]')
    this.seeElement('[href$="' + notificationsLinkURL + '"]')
    this.seeElement('[href$="' + subscriptionsLinkURL + '"]')
    return this
  }
}
