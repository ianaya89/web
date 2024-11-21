import gql from 'graphql-tag'

export const Register = {
  mutation: gql`
    mutation Register($input: RegisterUnitInput) {
      registerUnit(input: $input)
    }
  `
}

export const RegisterConfirmation = {
  mutation: gql`
    mutation RegisterConfirmation($input: RegisterUnitConfirmationInput) {
      registerUnitConfirmation(input: $input)
    }
  `
}
