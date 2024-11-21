import gql from 'graphql-tag'
// import { mockArray } from './_mocks'

// TODO: Endpoint required
export const CupsQuery = {
  mock: [],
  query: gql`
    query Cups {
      history {
        id
        title
        body
      }
    }
  `,
  fetchPolicy: 'cache-only',
  update(data) {
    return [
      {
        id: 1,
        title: '2019',
        body: 'Cup'
      },
      {
        id: 2,
        title: '2018',
        body: 'Champions League, National Cup, Local Cup'
      },
      {
        id: 3,
        title: '2017',
        body: 'Cup'
      },
      {
        id: 4,
        title: '2016',
        body: 'Cup'
      }
    ]
  }
}
