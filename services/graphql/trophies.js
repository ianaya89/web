import gql from 'graphql-tag'

export const TrophyTypesQuery = {
  mock: [],
  query: gql`
    query TrophyTypes {
      trophyTypes {
        id
        name
      }
    }
  `,
  result: data => {
    data.data.trophyTypes.sort((a, b) => (a.name > b.name ? 1 : -1))
    return data
  }
}

export const TrophyStagesQuery = {
  mock: [],
  query: gql`
    query TrophyStages {
      trophyStages {
        id
        name
      }
    }
  `,
  result: data => {
    data.data.trophyStages.sort((a, b) => (a.name > b.name ? 1 : -1))
    return data
  }
}
