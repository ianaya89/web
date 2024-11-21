import Page from './Page'
import EditInventoryItemHeader from './partials/EditInventoryItemHeader'

const addCategoryItemSelector = '[data-cy="add-category-btn"]'
const categoryModalSelector = '[data-cy="category-modal"]'

export default class EditInventoryItemPage extends Page {
  constructor() {
    super()
    this.header = new EditInventoryItemHeader()
    this.mainSelector = '[data-cy="edit-inventory-item-page"]'
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  checkCategoryModalIsVisible() {
    this.seeElement(categoryModalSelector, true, false)

    return this
  }

  seeCategories() {
    this.seeElement(
      categoryModalSelector + ' ' + addCategoryItemSelector,
      true,
      false
    )

    return this
  }

  closeCategoriesModal() {
    this.getElement(
      categoryModalSelector + ' [data-cy="close-modal"]',
      false
    ).click()
  }

  selectFirstCategory() {
    this.getElement(
      categoryModalSelector + ' ' + addCategoryItemSelector,
      false
    )
      .first()
      .click()

    return this
  }

  fillInputs() {
    this.fillDatepicker('[data-cy="visible-from"]', '2020-12-20')
    this.fillInput('[data-cy="dimensions"]', '1000')
    this.fillTextarea('[data-cy="description"]', 'Some basic description')
    this.checkCheckbox('[data-cy="sold-separately"]')
    this.fillInput('[data-cy="slot-quantity"]', '10', false, true)
    this.fillDatepicker('[data-cy="slot-slot"]', '2020-12-20')
    this.clearInput('[data-cy="price"]')
    this.fillInput('[data-cy="price"]', '1000', true)

    return this
  }

  submit() {
    this.header.getCreateElement().click()
  }

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.header.seeAllKeyElements()
    }

    this.seeElement('[data-cy="name-override"]')
    // this.seeElement('[data-cy="slot-type"]')
    this.seeElement('[data-cy="slot-quantity"]')
    this.seeElement('[data-cy="slot-slot"]')
    this.seeElement('[data-cy="add-next-slot"]')
    this.seeElement('[data-cy="image-upload-1"]')
    this.seeElement('[data-cy="image-upload-2"]')
    this.seeElement('[data-cy="description"]')
    this.seeElement('[data-cy="price"]')
    this.seeElement('[data-cy="dimensions"]')
    this.seeElement('[data-cy="excluded-industries"]')
    this.seeElement('[data-cy="visible-from"]')
    this.seeElement('[data-cy="sold-separately"]')

    return this
  }
}
