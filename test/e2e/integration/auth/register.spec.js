/// <reference types="Cypress" />

import RegisterPage from '../../pages/RegisterPage'

context('Register', () => {
  const registerPage = new RegisterPage()

  it('register', function() {
    cy.mockGraphQL(({ operationName, variables }) => {
      return {
        automock: ['Countries', 'SubmitNewsletter', 'RecaptchaMutation']
      }
    })

    registerPage.visit()

    registerPage
      .clickSubmit()
      .seeFormError('E-mail address is required')
      .seeFormError(
        'You must agree with ours terms of use and legal & privacy terms'
      )

    registerPage.typeEmail('foo').seeFormError('E-mail address must be valid')

    registerPage
      .typeEmail('some@email.email')
      .checkTerms()
      .submit()
    registerPage.seeSuccess(
      'Thanks for the registration, our team member will get in touch shortly to verify your account. We take privacy & security really seriously at SPONSOR.ONLINE'
    )

    cy.url().should('contain', 'register')
  })
})
