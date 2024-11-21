import gql from 'graphql-tag'
// import { mockArray } from './_mocks'

// TODO: Endpoint required
export const HistoryQuery = {
  mock: [],
  query: gql`
    query History {
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
        body:
          'It is a long established fact that a dable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution'
      },
      {
        id: 2,
        title: '2018',
        body:
          'It is a long established fact that a reader The point of using Lorem Ipsum is that it has a more-or-less normal distribution'
      },
      {
        id: 3,
        title: '2017',
        body:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution'
      },
      {
        id: 4,
        title: '2016',
        body:
          'It is a long estracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution'
      },
      {
        id: 5,
        title: '1999',
        body:
          'It is a long estracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution'
      },
      {
        id: 6,
        title: '1832',
        body:
          'It is a long estracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution'
      }
    ]
  }
}
