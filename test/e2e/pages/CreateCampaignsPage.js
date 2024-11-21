import Page from './Page'
import CreateCampaignHeader from './partials/CreateCampaignHeader'
import AddContactModal from './modals/AddContactModal'

const createSendBtnSelector = '[data-cy="create-send"]'
const expandAllSelector = '[data-cy="expand-all-btn"]'
const selectAllInventoriesSelector = '[data-cy="select-all-btn"]'
const selectAllContactsSelector = '[data-cy="select-all-contacts-btn"]'
const addContact = '[data-cy="add-contact"]'

export default class CreateCampaignsPage extends Page {
  constructor() {
    super()
    this.header = new CreateCampaignHeader()
    this.toggledExpandInventories = false
    this.toggledSelectInventories = false
    this.toggledSelectContacts = false
    this.mainSelector = '[data-cy="create-campaign-page"]'
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  fillInputs(message, name, date, time) {
    this.fillTextarea('[data-cy="message"]', message)
    this.fillInput('[data-cy="name"]', name)
    this.fillDatepicker('[data-cy="date"]', date)
    this.fillTimepicker('[data-cy="time"]', time)

    return this
  }

  fillDateTime(date, time) {
    this.fillDatepicker('[data-cy="date"]', date)
    this.fillTimepicker('[data-cy="time"]', time)

    return this
  }

  submit() {
    this.getElement(createSendBtnSelector).click()
  }

  toggleExpandAllInventory() {
    this.getElement(expandAllSelector).click()
    this.toggledExpandInventories = !this.toggledExpandInventories
    this.getElement(expandAllSelector).should(
      'contain',
      this.toggledExpandInventories ? 'Collapse all' : 'Expand all'
    )
    return this
  }

  getAllSelectableInventories() {
    return this.getElement('[data-cy="inventory-item"]')
  }

  getAllSelectableContacts() {
    return this.getElement('[data-cy="contact-item"]')
  }

  async toggleSelectAllInventory() {
    this.getElement(selectAllInventoriesSelector).click()
    await this.getAllSelectableInventories().then(allEls => {
      this.toggledSelectInventories = !this.toggledSelectInventories

      this.checkSelectedInventoriesCount(
        this.toggledSelectInventories ? allEls.length : '0',
        allEls
      )

      this.getElement(selectAllInventoriesSelector).should(
        'contain',
        this.toggledSelectInventories ? 'Unselect all' : 'Select all'
      )
    })

    return this
  }

  async checkSelectedInventoriesCount(count, allEls) {
    if (allEls == null) {
      await this.getAllSelectableInventories().then(allEls => {
        this.getElement('[data-cy="selected-inventories-count"]').should(
          'contain',
          count + '/' + allEls.length
        )
      })
    } else {
      this.getElement('[data-cy="selected-inventories-count"]').should(
        'contain',
        count + '/' + allEls.length
      )
    }
  }

  async toggleSelectAllContacts() {
    this.getElement(selectAllContactsSelector).click()
    await this.getAllSelectableContacts().then(allEls => {
      this.toggledSelectContacts = !this.toggledSelectContacts

      this.checkSelectedContactsCount(
        this.toggledSelectContacts ? allEls.length : '0',
        allEls
      )

      this.getElement(selectAllContactsSelector).should(
        'contain',
        this.toggledSelectContacts ? 'Unselect all' : 'Select all'
      )
    })

    return this
  }

  async checkSelectedContactsCount(count, allEls) {
    if (allEls == null) {
      await this.getAllSelectableContacts().then(allEls => {
        this.getElement('[data-cy="selected-contacts-count"]').should(
          'contain',
          count + '/' + allEls.length
        )
      })
    } else {
      this.getElement('[data-cy="selected-contacts-count"]').should(
        'contain',
        count + '/' + allEls.length
      )
    }
  }

  addContact() {
    this.getElement(addContact).click()
    return new AddContactModal()
  }

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.header.seeAllKeyElements()
    }

    this.seeElement(createSendBtnSelector)

    return this
  }
}
