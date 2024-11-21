import Partial from './Partial'

export default class CreatePackageHeader extends Partial {
  constructor() {
    super()
    this.mainSelector = '[data-cy="create-package-header"]'
    this.seeAllKeyElements()
  }

  clickOnSave() {
    this.getElement('[data-cy="create-button"]').click()
  }

  seeAllKeyElements() {
    this.seeElement('[data-cy="back-button"]')
    this.seeElement('[data-cy="create-button"]')
    this.seeContent('', 'Add package')

    return this
  }
}
