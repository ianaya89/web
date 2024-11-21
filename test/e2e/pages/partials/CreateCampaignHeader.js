import Partial from './Partial'

export default class CreateCampaignHeader extends Partial {
  constructor() {
    super()
    this.mainSelector = '[data-cy="create-campaign-header"]'
    this.seeAllKeyElements()
  }

  seeAllKeyElements() {
    this.seeElement('[data-cy="back-button"]')
    this.seeElement('[data-cy="create-button"]')
    this.seeContent('', 'Create campaign')

    return this
  }
}
