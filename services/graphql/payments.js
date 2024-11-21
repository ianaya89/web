import gql from 'graphql-tag'
import faker from 'faker'
import { mockArray, mockObjects } from './_mocks'

export const PaymentsQuery = {
  mock: mockArray(5),
  query: gql`
    query PaymentsHistory($teamId: ID!) {
      team(id: $teamId) {
        id
        name
        billings {
          id
          name
          address
          city
          tax_id
          vat_id
          iban
        }
        payments {
          id
          name
          created_at
          invoice {
            id
            sum
          }
        }
      }
    }
  `,
  fetchPolicy: 'cache-only',
  update(data) {
    return mockObjects(1, k => {
      const payments = mockObjects(4, l => {
        return {
          id: l,
          name: faker.name.findName(),
          created_at: faker.date.past(),
          invoice: {
            id: l,
            sum: faker.random.number(),
            proforma: faker.random.number() % 2 === 0
          }
        }
      })

      return {
        id: k,
        name: faker.name.findName(),
        payments: payments,
        billings: {
          id: k,
          name: faker.finance.accountName(),
          address: faker.address.streetAddress(true),
          city: faker.address.city(),
          tax_id: String(faker.random.number()),
          vat_id: String(faker.random.number()),
          iban: faker.finance.iban()
        }
      }
    })[0]
  }
}
