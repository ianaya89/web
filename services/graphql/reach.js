import gql from 'graphql-tag'
import faker from 'faker'
import { mockObjects } from './_mocks'
// import { mockArray } from './_mocks'

// TODO: Endpoint required
export const ReachLastSeasonQuery = {
  mock: [],
  query: gql`
    query ReachLastSeason {
      reach {
        attendanceSum
        emailsSentCount
        uniqueWebsiteVisitsCount
        socialMediaCount
        broadcastingCount
        printOutdoorCount
      }
    }
  `,
  fetchPolicy: 'cache-only',
  update(data) {
    return mockObjects(1, l => {
      return {
        reach: {
          attendanceSum: faker.random.number(),
          emailsSentCount: faker.random.number(),
          uniqueWebsiteVisitsCount: faker.random.number(),
          socialMediaCount: faker.random.number(),
          broadcastingCount: faker.random.number(),
          printOutdoorCount: faker.random.number()
        }
      }
    })[0]
  }
}
