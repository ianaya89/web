import gql from 'graphql-tag'
// import { mockArray } from './_mocks'

export const SeasonsQuery = {
  query: gql`
    query Seasons {
      seasons {
        id
        name
        fromDate
        toDate
      }
    }
  `
}

export const AllSeasonsQuery = {
  query: gql`
    query AllSeasonsQuery {
      allSeasons {
        id
        name
        fromDate
        toDate
      }
    }
  `
}
