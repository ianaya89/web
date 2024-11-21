import gql from 'graphql-tag'
import { mockObjects } from './_mocks'
// import { mockArray } from './_mocks'

export const SocialAccountsQuery = {
  query: gql`
    query SocialAccounts($id: ID!) {
      unit(id: $id) {
        id
        entity {
          id
          socialAccounts {
            id
            name
            type
            url
            isAuthorized
            profilePicture {
              url
            }
          }
        }
      }
    }
  `
}

export const SocialPostTaggedOrganizationsQuery = {
  query: gql`
    query SocialPostTaggedOrganizationsQuery($id: ID!) {
      taggedUnitsInSocialPosts(id: $id) {
        id
        logoCoordinates {
          values {
            x
            y
          }
        }
        reachValuation
        engagementValuation
        organizationUnit {
          id
          entity {
            id
            name
            logo {
              url
            }
          }
        }
      }
    }
  `
}

export const SocialAccountsPrecalcs = {
  query: gql`
    query SocialAccountsPrecalcs($ids: [ID!]!, $season: String!) {
      socialAccounts(ids: $ids) {
        id
        type
        precalcs(season: $season, periodicity: MONTHLY) {
          date
          data {
            totalEngagement
            followersCount
          }
        }
      }
    }
  `
}

// TODO: Endpoint required
export const SocialQuery = {
  mock: [],
  query: gql`
    query SocialSources {
      sources {
        id
        name
      }
    }
  `,
  fetchPolicy: 'cache-only',
  update(data) {
    const sourcesConstats = [
      'Facebook',
      'Instagram',
      'Twitter',
      'Web-page',
      'Youtube'
    ]

    return mockObjects(5, k => {
      return {
        id: k,
        name: sourcesConstats[k]
      }
    })
  }
}
