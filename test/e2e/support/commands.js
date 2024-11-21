// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'
//
// addMatchImageSnapshotCommand({
//   timeout: '60000',
//   failureThreshold: 1,
//   failureThresholdType: 'percent',
//   customDiffConfig: { threshold: 0.2 }
// })

const resolveStub = (stubbable, operationName, responses) => {
  let stubName = 'MISSING-' + operationName

  if (
    stubbable.mock &&
    Object.prototype.hasOwnProperty.call(stubbable.mock, operationName)
  ) {
    stubName = stubbable.mock[operationName]()
  } else if (stubbable.automock && stubbable.automock.includes(operationName)) {
    stubName = operationName
  } else if (
    stubbable.automock &&
    stubbable.automock.includes(operationName + 'Brand')
  ) {
    stubName = operationName + 'Brand'
  }

  // require from the collection as we cannot do dynamic imports
  return responses[stubName]
}

const responseStub = stub => {
  return Promise.resolve({
    json() {
      return Promise.resolve(stub)
    },
    text() {
      return Promise.resolve(JSON.stringify(stub))
    },
    ok: true
  })
}

Cypress.Commands.add('mockGraphQL', handler => {
  const responses = Object.assign(
    {},
    require('../fixtures/responses/index'),
    require('../fixtures/responses-brand/index')
  )

  cy.on('window:before:load', win => {
    const originalFunction = win.fetch

    function fetch(path, { body, method }) {
      if (path.includes('/graphql') && method === 'POST') {
        const jsonBody = JSON.parse(body)
        const operationName = jsonBody.operationName
        const stub = responseStub(
          resolveStub(handler(jsonBody), operationName, responses)
        )

        // eslint-disable-next-line no-console
        console.log(stub, responses)

        stub.then(async s => {
          // eslint-disable-next-line
          console.log('STUB', { operationName, stub: await s.json() })
        })

        return stub
      }

      return originalFunction.apply(this, arguments)
    }

    cy.stub(win, 'fetch', fetch).as('graphqlStub')
  })
})
