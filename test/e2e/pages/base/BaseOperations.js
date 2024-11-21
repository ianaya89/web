import moment from 'moment'
import { currencyFormatter } from '../../../../plugins/filters'

export default class BaseOperations {
  constructor() {
    this.mainSelector = 'body'
  }

  fillInput(selector, value, hasNumberFormatter, filledNumberType = false) {
    if (value !== '') {
      const chainInput = this.getElement(selector + ' input')
        .clear()
        .type(value)
        .should('be.visible')
      if (hasNumberFormatter) {
        chainInput.should(
          'have.value',
          currencyFormatter(value, false, false, 0)
        )
      } else if (filledNumberType) {
        // input with type number has 0 after clear of non empty state
        chainInput.should('have.value', value + '0')
      } else {
        chainInput.should('have.value', value)
      }
    } else {
      this.getElement(selector + ' input')
        .clear()
        .should('have.value', value)
        .should('be.visible')
    }
    return this
  }

  clearInput(selector) {
    this.getElement(selector + ' input').clear()

    return this
  }

  fillSelect(selector, value) {
    this.getElement(selector + ' .fa-chevron-down')
      .click()
      .then(() => {
        this.getElement(
          '.v-list__tile__title:visible:contains("' + value + '")',
          false
        ).click()
      })

    return this
  }

  fillTextarea(selector, value) {
    if (value !== '') {
      this.getElement(selector + ' textarea')
        .clear()
        .type(value)
        .should('have.value', value)
        .should('be.visible')
    } else {
      this.getElement(selector + ' textarea')
        .clear()
        .should('have.value', value)
        .should('be.visible')
    }
    return this
  }

  fillDatepicker(selector, value) {
    if (value !== '') {
      const splitDate = value.split('-')
      this.getElement(selector + ' .fa-calendar-alt').click({ force: true })
      this.getElement(selector + ' .v-menu__content').should('be.visible')

      this.getElement(
        selector + ' .v-picker__title__btn.v-date-picker-title__year'
      ).click({ force: true })

      this.getElement(
        selector + ' .v-date-picker-years li:contains("' + splitDate[0] + '")'
      ).click({ force: true })

      this.getElement(
        selector +
          ' table td button:contains("' +
          moment()
            .month(splitDate[1] - 1)
            .format('MMM') +
          '")'
      ).click({ force: true })

      this.getElement(
        selector + ' table td button:contains("' + splitDate[2] + '")'
      ).click({ force: true })

      this.seeElement(
        selector + ' .v-select__selections span:contains("' + value + '")'
      )

      this.getElement(selector + ' .v-menu__content').should('not.be.visible')
    } else {
      // need to clear input
      // this.getElement(selector + ' input').clear({ force: true })
      // need to close picke
    }
    return this
  }

  // support only followed minutes [25, 30, 35, ..., 55]
  fillTimepicker(selector, value) {
    // todo getboundingclient error need to fix !!!!
    if (value !== '') {
      const splitTime = value.split(':')
      this.getElement(selector + ' .fa-clock').click()
      this.getElement(selector + ' .v-menu__content').should('be.visible')

      this.getElement(
        selector + ' .v-picker__title .v-picker__title__btn:first:visible'
      ).click()

      this.getElement(
        selector +
          ' .v-time-picker-clock__container .v-time-picker-clock__inner .v-time-picker-clock__item span:contains("' +
          splitTime[0] +
          '"):visible'
      )
        .first()
        .click({ force: true })

      this.getElement(
        selector +
          ' .v-time-picker-clock__container .v-time-picker-clock__inner .v-time-picker-clock__item span:contains("' +
          splitTime[1] +
          '"):visible'
      )
        .first()
        .click({ force: true })

      this.seeElement(
        selector + ' .v-select__selections span:contains("' + value + '")'
      )

      this.getElement(selector + ' .v-menu__content').should('not.be.visible')
    } else {
      // need to clear input
      // this.getElement(selector + ' input').clear({ force: true })
      // need to close picke
    }
    return this
  }

  checkCheckbox(selector) {
    this.getElement(selector + ' input')
      .check({ force: true })
      // .should('be.visible')
      .should('be.checked')
    return this
  }

  uncheckCheckbox(selector) {
    this.getElement(selector + ' input')
      .uncheck({ force: true })
      // .should('be.visible')
      .should('not.be.checked')
    return this
  }

  getElement(elementSelector, afterMainSelector = true) {
    if (afterMainSelector) {
      return cy.get(this.mainSelector + ' ' + elementSelector)
    } else {
      return cy.get(elementSelector)
    }
  }

  seeElement(elementSelector, alsoVisible = true, afterMainSelector = true) {
    if (alsoVisible) {
      this.getElement(elementSelector, afterMainSelector)
        .should('exist')
        .should('be.visible')
    } else {
      this.getElement(elementSelector, afterMainSelector).should('exist')
    }
    return this
  }

  seeContent(elementSelector, content) {
    this.getElement(elementSelector)
      .should('be.visible')
      .should('contain', content)
    return this
  }

  seeError(message) {
    return this.seeNotification(message, 'error')
  }

  seeSuccess(message) {
    return this.seeNotification(message, 'success')
  }

  seeNotification(message, type = 'error') {
    cy.get('.toasted-container > .toasted')
      .should('contain', message)
      .should('be.visible')
      .should('have.class', type)

    return this
  }

  seeFormError(message) {
    this.getElement('.v-messages__message')
      .should('contain', message)
      .should('be.visible')

    return this
  }

  seeSomeFormError() {
    this.getElement('.v-messages__message')
      .should('exist')
      .should('be.visible')

    return this
  }

  seeNoFormErrors() {
    this.getElement('.v-messages__message').should('not.exist')

    return this
  }

  seeAllKeyElements() {
    throw new Error(this.constructor.name + ': override seeAllKeyElements')
  }

  matchSnapshot(options = {}) {
    // const name = options.name ? options.name : this.constructor.name
    // const scrollable = options.scroll !== undefined ? options.scroll : true
    // const wait = options.wait !== undefined ? options.wait : 10000
    //
    // return cy.window().then(window => {
    //   if (scrollable) {
    //     cy.scrollTo('bottom', { easing: 'linear', duration: 4000 })
    //       .wait(1000)
    //       .scrollTo('top', { easing: 'linear', duration: 4000 })
    //       .wait(1000)
    //   } else if (wait) {
    //     cy.wait(wait)
    //   }
    //
    //   cy.get(this.mainSelector).matchImageSnapshot(name)
    // })
  }
}
