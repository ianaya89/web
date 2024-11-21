import Page from './Page'

const emailSelector = '[data-cy=email]'
const firstNameSelector = '[data-cy=firstname]'
const lastNameSelector = '[data-cy=lastname]'
const registerBtnSelector = '[data-cy=register]'
const countrySelector = '[data-cy=country]'
const agreeSelector = '[data-cy=agree]'
const organizationSelector = '[data-cy=organization]'

export default class RegisterPage extends Page {
  constructor() {
    super()
    this.baseUrl = '/register'
  }

  submit(
    firstName = 'First',
    last = 'Last',
    organization = 'Some organization'
  ) {
    this.typeFirstName(firstName)
    this.typeLastName(last)
    this.typeOrganization(organization)

    return this.clickSubmit()
  }

  typeEmail(email) {
    this.fillInput(emailSelector, email)

    return this
  }

  typeFirstName(firstName) {
    this.fillInput(firstNameSelector, firstName)

    return this
  }

  typeLastName(lastName) {
    this.fillInput(lastNameSelector, lastName)

    return this
  }

  typeOrganization(organization) {
    this.fillInput(organizationSelector, organization)

    return this
  }

  checkTerms() {
    this.checkCheckbox(agreeSelector)

    return this
  }

  clickSubmit() {
    this.getElement(registerBtnSelector).click({
      force: true
    })

    return this
  }

  seeAllKeyElements() {
    this.seeElement(emailSelector)
    this.seeElement(registerBtnSelector)
    this.seeElement(firstNameSelector)
    this.seeElement(lastNameSelector)
    this.seeElement(countrySelector)
    this.seeElement(organizationSelector)
    this.seeElement(agreeSelector)
    this.seeElement('[href="/terms"]')
    this.seeElement('[href="/privacy"]')
    this.seeElement('[href="/login"]')

    return this
  }
}
