import gql from 'graphql-tag'

export const StripeCardMutation = {
  mutation: gql`
    mutation StripeCardMutation($token: String!) {
      stripe(token: $token) {
        id
      }
    }
  `
}
