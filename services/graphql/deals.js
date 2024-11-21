import gql from 'graphql-tag'
// import moment from 'moment'

export const DealsQuery = {
  query: gql`
    query Deals($id: ID!) {
      unit(id: $id) {
        id
        entity {
          id
          deals {
            id
            createdAt
            status
            price
            priceTo
            items {
              id
              marketplaceItem {
                id
                category {
                  id
                  name
                  path
                }
              }
            }
            brand {
              id
              name
              logo {
                url
              }
            }
            rightholderUnit {
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
      }
    }
  `
}

export const DealQuery = {
  query: gql`
    query Deal($dealId: ID!) {
      deal(id: $dealId) {
        id
        price
        priceTo
        status
        createdAt
        brandRepresentative {
          id
          profile {
            id
            firstName
            lastName
            photo {
              url
            }
          }
        }
        rightholderUnit {
          id
          entity {
            id
            name
            logo {
              url
            }
          }
        }
        items {
          id
          marketplaceItem {
            id
            nameOverride
            description
            images {
              url
            }
            dimensions
            itemType
            slotType
            slots {
              id
              slot
              quantity
            }
            category {
              id
              name
              path
              parent {
                id
                name
                parent {
                  id
                  name
                }
              }
            }
            children {
              id
              images {
                url
              }
              nameOverride
              dimensions
              description
              category {
                id
                name
                path
              }
            }
          }
          price
          priceTo
          slots {
            slot
            quantity
          }
          resolution
          recordedAt
        }
        brand {
          id
          name
          logo {
            url
          }
        }
      }
    }
  `
}

export const MessagesQuery = {
  mock: [],
  query: gql`
    query Messages($dealId: ID!, $page: Int!) {
      messages(dealId: $dealId, page: $page, count: 10) {
        data {
          id
          body
          createdAt
          deal {
            id
          }
          hasAttachments
          attachments {
            url
            name
            extension
          }
          user {
            id
            profile {
              id
              firstName
              lastName
              photo {
                url
              }
            }
          }
        }
        paginatorInfo {
          currentPage
          lastPage
        }
      }
    }
  `
  // update(data) {
  //   // eslint-disable-next-line
  //   console.log(data)

  //   data.messages.data = data.messages.data.map(m => {
  //     m.createdAt = moment().utc(m.createdAt)
  //     return m
  //   })

  //   // eslint-disable-next-line
  //   console.log(data)

  //   return data
  // }
}

export const ProposeDealMutation = {
  mutation: gql`
    mutation ProposeDeal($unitId: ID!, $input: ProposeDealInput!) {
      proposeDeal(unitId: $unitId, input: $input) {
        id
      }
    }
  `
}

export const UpdateDealStatusMutation = {
  mutation: gql`
    mutation UpdateDealStatus($id: ID!, $input: UpdateDealStatusInput!) {
      updateDealStatus(id: $id, input: $input) {
        id
        price
        status
      }
    }
  `
}

export const UpdateDealItemStatusMutation = {
  mutation: gql`
    mutation UpdateDealItemStatus(
      $dealItemId: ID!
      $input: UpdateDealItemStatusInput!
    ) {
      updateDealItemStatus(id: $dealItemId, input: $input) {
        id
        resolution
        price
      }
    }
  `
}

export const AddDealItemMutation = {
  mutation: gql`
    mutation AddDealItemMutation($dealId: ID!, $input: DealProposalItemInput!) {
      addDealItem(id: $dealId, input: $input) {
        id
        price
        status
      }
    }
  `
}

export const UpdateDealItemMutation = {
  mutation: gql`
    mutation UpdateDealItemMutation(
      $dealItemId: ID!
      $input: DealProposalItemInput!
    ) {
      updateDealItem(id: $dealItemId, input: $input) {
        id
        resolution
      }
    }
  `
}

export const RemoveDealItemMutation = {
  mutation: gql`
    mutation RemoveDealItemMutation($dealItemId: ID!) {
      removeDealItem(id: $dealItemId) {
        id
        resolution
      }
    }
  `
}

export const SendMessageMutation = {
  mutation: gql`
    mutation SendMessage($dealId: ID!, $unitId: ID!, $body: String) {
      sendMessage(dealId: $dealId, unitId: $unitId, body: $body) {
        id
        body
        createdAt
        user {
          id
          profile {
            id
            firstName
            lastName
            photo {
              url
            }
          }
        }
      }
    }
  `
}

export const SendMessageAttachmentMutation = {
  mutation: gql`
    mutation SendMessageAttachment(
      $dealId: ID!
      $unitId: ID!
      $attachment: String
    ) {
      sendMessageAttachment(
        dealId: $dealId
        unitId: $unitId
        attachment: $attachment
      ) {
        id
        body
        hasAttachments
        attachments {
          url
          name
          extension
        }
        createdAt
        user {
          id
          profile {
            id
            firstName
            lastName
            photo {
              url
            }
          }
        }
      }
    }
  `
}
