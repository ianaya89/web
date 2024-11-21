import gql from 'graphql-tag'

export const RecaptchaMutation = {
  mutation: gql`
    mutation RecaptchaMutation($token: String!) {
      recaptcha(token: $token) {
        status
        errors
      }
    }
  `
}
