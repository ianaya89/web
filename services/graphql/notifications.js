import gql from 'graphql-tag'

export const NOTIFICATIONS_QUERY = gql`
  query Notifications {
    notifications {
      unreadCount
      latest {
        id
        type
        meta {
          dealId
        }
        industry
        isSeen
        createdAt
        unit {
          id
          entity {
            id
            name
            logo {
              url
            }
            # ... on Brand {
            #   industries {
            #     id
            #     name
            #   }
            # }
          }
        }
      }
    }
  }
`

export const UPDATE_NOTIFICATION_MUTATION = gql`
  mutation UpdateNotification($id: ID!, $input: UpdateNotificationInput!) {
    updateNotification(id: $id, input: $input) {
      id
      isSeen
    }
  }
`

export const NotificationsQuery = {
  query: NOTIFICATIONS_QUERY
}

export const UpdateNotificationMutation = {
  mutation: UPDATE_NOTIFICATION_MUTATION,
  update: store => {
    const data = store.readQuery({
      query: NOTIFICATIONS_QUERY
    })

    data.notifications.unreadCount--

    store.writeQuery({
      query: NOTIFICATIONS_QUERY,
      data
    })
  }
}

export const PageVisitedMutation = {
  mutation: gql`
    mutation PageVisited($input: PageVisitInput!) {
      pageVisited(input: $input)
    }
  `
}
