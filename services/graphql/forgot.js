import gql from 'graphql-tag'

export const ForgotMutation = {
  mutation: gql`
    mutation ForgotMutation($email: String!) {
      forgotPassword(email: $email)
    }
  `
}
