import BaseOperations from '../base/BaseOperations'

export default class Partial extends BaseOperations {
  constructor() {
    super()
    this.mainSelector = 'body'
  }

  clickOnLink(link) {
    this.getElement('[href$="' + link + '"]').click()
    cy.url().should('contain', link)
  }
}
