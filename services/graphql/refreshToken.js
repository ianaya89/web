import gql from 'graphql-tag'

export const REFRESH_TOKEN_MUTATION = {
  mutation: gql`
    mutation RefreshToken($token: String!) {
      refreshToken(token: $token) {
        tokenType
        expiresIn
        accessToken
        refreshToken
      }
    }
  `
}
