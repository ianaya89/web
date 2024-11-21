import gql from 'graphql-tag'
import faker from 'faker'
import { mockArray, mockObjects } from './_mocks'

export const SubscriptionQuery = {
  mock: mockArray(5),
  query: gql`
    query Subscription($teamId: ID!) {
      team(id: $teamId) {
        id
        name
        subscription {
          id
          name
        }
      }
    }
  `,
  fetchPolicy: 'cache-only',
  update(data) {
    return mockObjects(1, k => {
      return {
        id: k,
        name: faker.name.findName(),
        subscription: {
          id: k
        }
      }
    })[0]
  }
}
