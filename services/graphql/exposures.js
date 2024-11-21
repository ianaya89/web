import gql from 'graphql-tag'
import faker from 'faker'
import { mockObjects } from './_mocks'
// import { mockArray } from './_mocks'

// TODO: Endpoint required
export const ExposuresQuery = {
  mock: [],
  query: gql`
    query Exposures($teamId: ID!) {
      prints {
        id
        name
        logo
        description
      }
      tvStations {
        id
        name
        logo
        description
      }
    }
  `,
  fetchPolicy: 'cache-only',
  update(data) {
    return mockObjects(1, l => {
      const tvStations = mockObjects(20, k => {
        return {
          id: k,
          name: faker.name.findName(),
          logo: faker.image.avatar(),
          description: faker.name.findName()
        }
      })

      const prints = mockObjects(20, k => {
        return {
          id: k,
          name: faker.name.findName(),
          logo: faker.image.image(),
          description: faker.name.findName()
        }
      })
      return {
        tvStations: tvStations,
        prints: prints
      }
    })[0]
  }
}
