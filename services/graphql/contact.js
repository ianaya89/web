import gql from 'graphql-tag'

// TODO: Endpoint required
export const ContactsQuery = {
  mock: [],
  query: gql`
    query Contacts($id: ID!) {
      unit(id: $id) {
        id
        contacts {
          id
          name
          company
          email
        }
      }
    }
  `,
  update(data) {
    return data.unit.contacts
  }
}

export const SubmitContactMutation = {
  mutation: gql`
    mutation SubmitContact($input: CreateContactInput!) {
      createContact(input: $input) {
        id
        name
        company
        email
      }
    }
  `
}
