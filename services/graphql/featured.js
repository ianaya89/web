import gql from 'graphql-tag'

export const FeaturedQuery = {
  mock: [],
  query: gql`
    query Featured(
      $filter: TeamFilterInput
      $orderBy: OrderByInput
      $season: String
      $limit: Int
    ) {
      teams(filter: $filter, orderBy: $orderBy, limit: $limit) {
        id
        name
        logo {
          url
        }
        unit {
          id
        }
        precalcs(periodicity: SEASONAL, season: $season) {
          data {
            fans {
              total
            }
          }
        }
        inventoriesCount
        packagesCount
        country {
          id
          name
        }
        socialAccounts {
          name
          type
          followersCount
        }
      }
    }
  `
}
