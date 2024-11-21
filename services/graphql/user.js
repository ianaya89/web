import gql from 'graphql-tag'

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      settings {
        key
        value
        isEnabled
      }
      profile {
        id
        firstName
        lastName
        phoneNumber
        photo {
          url
        }
        jobTitle
        timezone
      }
      units {
        id
        organization {
          id
          name
        }
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

export const MeQuery = {
  query: ME_QUERY,

  mock: {
    id: null,
    email: '-',
    settings: [],
    profile: {
      firstName: '-',
      lastName: '-',
      phoneNumber: '-',
      photo: {
        url: null
      },
      timezone: 'Europe/UTC'
    },
    units: []
  }
}

export const UserUpdateMutation = {
  mutation: gql`
    mutation UserUpdateMutation($id: ID!, $input: UpdateUserInput!) {
      updateUser(id: $id, input: $input) {
        id
        email
        profile {
          id
          firstName
          lastName
          phoneNumber
          photo {
            url
          }
          jobTitle
          timezone
        }
      }
    }
  `
}

export const UserNotificationsUpdateMutation = {
  mutation: gql`
    mutation UserNotificationsUpdateMutation(
      $id: ID!
      $input: UpdateUserNotificationsInput!
    ) {
      updateUserNotifications(id: $id, input: $input) {
        id
      }
    }
  `
}

export const UserPasswordUpdateMutation = {
  mutation: gql`
    mutation UserPasswordUpdateMutation($id: ID!, $password: String!) {
      updateUserPassword(id: $id, password: $password) {
        id
      }
    }
  `
}
