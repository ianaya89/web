import gql from 'graphql-tag'

export const SportsQuery = {
  mock: [],
  query: gql`
    query Sports {
      sports {
        id
        name
      }
    }
  `,
  result: data => {
    data.data.sports.sort((a, b) => (a.name > b.name ? 1 : -1))
    return data
  }
}
