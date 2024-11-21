import Partial from './Partial'

export default class EditPackageHeader extends Partial {
  constructor() {
    super()
    this.mainSelector = '[data-cy="edit-package-header"]'
    this.seeAllKeyElements()
  }

  clickOnSave() {
    this.getElement('[data-cy="create-button"]').click()
  }

  seeAllKeyElements() {
    this.seeElement('[data-cy="back-button"]')
    this.seeElement('[data-cy="create-button"]')
    this.seeContent('', 'Edit package')

    return this
  }
}
