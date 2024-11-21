import gql from 'graphql-tag'

export const ResetMutation = {
  mutation: gql`
    mutation ResetMutation(
      $email: String!
      $token: String!
      $password: String!
    ) {
      resetPassword(email: $email, password: $password, token: $token)
    }
  `
}
