import Partial from './Partial'

export default class CreateInventoryItemHeader extends Partial {
  constructor(checkElements = true) {
    super()
    this.mainSelector = '[data-cy="inventory-item-header"]'
    if (checkElements) {
      this.seeAllKeyElements()
    }
  }

  getCreateElement() {
    return this.getElement('[data-cy="create-button"]')
  }

  seeAllKeyElements() {
    this.seeElement('[data-cy="back-button"]')
    this.seeElement('[data-cy="create-button"]')
    this.seeContent('', 'Add inventory item')

    return this
  }
}
