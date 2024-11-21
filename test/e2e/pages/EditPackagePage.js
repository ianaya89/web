import Page from './Page'
import EditPackageHeader from './partials/EditPackageHeader'

export default class EditPackagePage extends Page {
  constructor() {
    super()
    this.header = new EditPackageHeader()
    this.mainSelector = '[data-cy="edit-package-page"]'
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  fillInputs() {
    this.fillDatepicker('[data-cy="visible-from"]', '2020-12-20')
    this.fillTextarea('[data-cy="description"]', 'Some nice basic description')
    this.clearInput('[data-cy="slot-quantity"]')
    this.fillInput('[data-cy="slot-quantity"]', '110')
    this.fillDatepicker('[data-cy="slot-slot"]', '2020-11-12')
    this.clearInput('[data-cy="price"]')
    this.fillInput('[data-cy="price"]', '100', true)

    return this
  }

  submit() {
    this.header.clickOnSave()
  }

  seeInventories() {
    this.seeElement('[data-cy="inventory-item-add"]')

    return this
  }

  seeSelectedInventories() {
    this.seeElement('[data-cy="selected-inventory"]')

    return this
  }

  removeSelectedInventories() {
    this.getElement('[data-cy="inventory-item-remove"]').click({
      multiple: true
    })

    return this
  }

  clickOnAddFirstItem() {
    this.getElement('[data-cy="add-first-item"]').click()

    return this
  }

  selectInventory() {
    this.getElement('[data-cy="inventory-item-add"]')
      .first()
      .click({ force: true })

    return this
  }

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.header.seeAllKeyElements()
    }

    this.seeElement('[data-cy="name-override"]')
    this.seeElement('[data-cy="slot-quantity"]')
    this.seeElement('[data-cy="slot-slot"]')
    this.seeElement('[data-cy="slot-type"]')
    this.seeElement('[data-cy="add-next-slot"]')
    this.seeElement('[data-cy="description"]')
    this.seeElement('[data-cy="price"]')
    this.seeElement('[data-cy="excluded-industries"]')
    this.seeElement('[data-cy="visible-from"]')

    this.seeContent('', 'Add item/s')
    this.seeElement('[data-cy="available-inventory"]')

    return this
  }
}
