import gql from 'graphql-tag'

export const CampaignsQuery = {
  mock: null,
  query: gql`
    query Campaigns($id: ID!) {
      unit(id: $id) {
        id
        entity {
          id
          ... on Team {
            campaigns {
              id
              name
              message
              openRate
              sendAt
              processedAt
              inventoryItems {
                id
              }
              packageItems {
                id
              }
              recipients {
                id
                company
              }
            }
          }
          ... on League {
            campaigns {
              id
              name
              message
              openRate
              sendAt
              processedAt
              inventoryItems {
                id
              }
              packageItems {
                id
              }
              recipients {
                id
                company
              }
            }
          }
        }
      }
    }
  `
}

export const CampaignsPaginatedQuery = {
  mock: null,
  query: gql`
    query Campaigns($id: ID!, $page: Int = 1, $size: Int!) {
      unit(id: $id) {
        id
        entity {
          id
          ... on Team {
            campaignsPaginator(count: $size, page: $page) {
              data {
                id
                name
                message
                openRate
                sendAt
                processedAt
                inventoryItems {
                  id
                }
                packageItems {
                  id
                }
                recipients {
                  id
                  company
                }
              }
              paginatorInfo {
                lastPage
                total
              }
            }
          }
          ... on League {
            campaignsPaginator(count: $size, page: $page) {
              data {
                id
                name
                message
                openRate
                sendAt
                processedAt
                inventoryItems {
                  id
                }
                packageItems {
                  id
                }
                recipients {
                  id
                  company
                }
              }
              paginatorInfo {
                lastPage
                total
              }
            }
          }
        }
      }
    }
  `
}

export const CreateCampaignMutation = {
  mutation: gql`
    mutation CreateCampaign($input: CreateCampaignInput!) {
      createCampaign(input: $input) {
        id
        name
      }
    }
  `
}
