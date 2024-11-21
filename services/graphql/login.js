import gql from 'graphql-tag'

export const LoginMutation = {
  mutation: gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        tokenType
        expiresIn
        accessToken
        refreshToken
      }
    }
  `
}
