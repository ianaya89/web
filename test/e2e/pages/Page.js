import BaseOperations from './base/BaseOperations'

export default class Page extends BaseOperations {
  constructor() {
    super()
    this.mainSelector = 'body'
    this.baseUrl = '/'
  }

  visit() {
    cy.visit(this.baseUrl)
    this.seeAllKeyElements()
  }
}
