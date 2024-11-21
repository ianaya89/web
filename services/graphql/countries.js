import gql from 'graphql-tag'

export const CountriesQuery = {
  mock: [],
  query: gql`
    query Countries {
      countries {
        id
        continent_id
        name
      }
    }
  `,
  result: data => {
    data.data.countries.sort((a, b) => (a.name > b.name ? 1 : -1))
    return data
  }
}

export const CountryByName = {
  mock: [],
  query: gql`
    query Countries($name: String!) {
      countryByName(name: $name) {
        id
        name
        cities {
          id
          name
        }
      }
    }
  `
}

export const CountryById = {
  mock: [],
  query: gql`
    query Countries($id: ID!) {
      countryById(id: $id) {
        id
        name
        cities {
          id
          name
        }
      }
    }
  `
}
