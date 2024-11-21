import gql from 'graphql-tag'
// import faker from 'faker'
// import { mockObjects } from './_mocks'
// import { mockArray } from './_mocks'

export const LanguagesQuery = {
  mock: [],
  query: gql`
    query Languages {
      languages {
        id
        name
      }
    }
  `,
  result: data => {
    data.data.languages.sort((a, b) => (a.name > b.name ? 1 : -1))
    return data
  }
}
