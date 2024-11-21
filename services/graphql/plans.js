import gql from 'graphql-tag'
import { mockArray } from './_mocks'

export const PlansQuery = {
  mock: mockArray(5),
  query: gql`
    query Plans {
      plans {
        id
        name
        description
        features {
          id
          name
        }
      }
    }
  `,
  fetchPolicy: 'cache-only',
  update(data) {
    return [
      {
        id: 0,
        name: 'Free',
        description: '1 user account with access to 30 sponsors',
        deal_commision: 6,
        special_commision: 3,
        accounts: 1,
        data_updates: 'quarterly',
        free: true,
        custom: false,
        price: {
          monthly: 0,
          annualy: 0
        },
        features: [
          {
            id: 1,
            name: 'Club dashboard'
          },
          {
            id: 2,
            name: 'Inventory'
          }
        ]
      },
      {
        id: 1,
        name: 'Basic',
        description: '3 user accounts with access to 100 sponsors',
        deal_commision: 4,
        special_commision: 2,
        accounts: 3,
        data_updates: 'monthly',
        free: false,
        custom: false,
        price: {
          monthly: 90,
          annualy: 900
        },
        features: [
          {
            id: 1,
            name: 'Players dashboard'
          },
          {
            id: 2,
            name: 'Fans demographics'
          }
        ]
      },
      {
        id: 2,
        name: 'Premium',
        description:
          '10 user accounts with access to an unlimited database of sponsors',
        deal_commision: 2,
        special_commision: 1,
        accounts: 10,
        data_updates: 'custom',
        free: false,
        custom: true,
        features: [
          {
            id: 1,
            name: 'League, stadium and media dashboard'
          },
          {
            id: 2,
            name: 'Monthly sponsor reports'
          },
          {
            id: 3,
            name: 'Massage from Rudolf'
            // todo:: remove
          }
        ]
      }
    ]
  }
}
