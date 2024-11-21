import gql from 'graphql-tag'

export const INDUSTRIES_QUERY = gql`
  query IndustriesQuery {
    industries {
      id
      name
    }
  }
`

export const IndustriesQuery = {
  mock: [],
  query: INDUSTRIES_QUERY,
  result: data => {
    data.data.industries.sort((a, b) => (a.name > b.name ? 1 : -1))
    return data
  }
}
