import gql from 'graphql-tag'

export const ContinentsQuery = {
  mock: [],
  query: gql`
    query Continents {
      continents {
        id
        name
      }
    }
  `,
  result: data => {
    data.data.continents.sort((a, b) => (a.name > b.name ? 1 : -1))
    return data
  }
}

export const ContinentById = {
  mock: [],
  query: gql`
    query Continents($id: ID!) {
      continentById(id: $id) {
        id
        name
        countries {
          id
          name
        }
      }
    }
  `
}
