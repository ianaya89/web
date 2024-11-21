import gql from 'graphql-tag'

export const LeaguesQuery = {
  mock: [],
  query: gql`
    query Leagues {
      leagues {
        id
        name
        country {
          id
          name
        }
      }
    }
  `,
  result: data => {
    data.data.leagues.sort((a, b) => (a.name > b.name ? 1 : -1))
    return data
  }
}
