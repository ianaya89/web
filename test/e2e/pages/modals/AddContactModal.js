import Modal from './Modal'

const nameSelector = '[data-cy="name"]'
const emailSelector = '[data-cy="email"]'
const companySelector = '[data-cy="company"]'
const saveSelector = '[data-cy="save"]'

export default class AddContactModal extends Modal {
  constructor() {
    super()
    this.mainSelector = '[data-cy="add-contact-modal"]'
    this.seeElement('')
    this.seeAllKeyElements()
  }

  async executePairwise(onlySuccess = false) {
    await cy.fixture('pairwiseData/contact.json').then(contactJson => {
      contactJson.forEach(input => {
        if (!onlySuccess || (onlySuccess && input.result === 'success')) {
          this.fillInput(nameSelector, input.name)
          this.fillInput(emailSelector, input.email)
          this.fillInput(companySelector, input.company)
          this.submit()

          if (input.result === 'error') {
            this.seeSomeFormError()
          } else if (input.result === 'success') {
            this.seeSuccess('New contact saved')
          }
        }
      })
    })
  }

  submit() {
    this.getElement(saveSelector).click()
  }

  seeAllKeyElements() {
    this.seeElement('[data-cy="close"]')
    this.seeElement(nameSelector)
    this.seeElement(companySelector)
    this.seeElement(emailSelector)
    this.seeElement('[data-cy="add-another"]')
    this.seeElement('[data-cy="cancel"]')
    this.seeElement(saveSelector)
  }
}
