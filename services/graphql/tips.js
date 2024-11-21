import gql from 'graphql-tag'
// import { mockArray } from './_mocks'

// TODO: Endpoint required
export const TipsQuery = {
  mock: [],
  query: gql`
    query Tips {
      tips {
        id
        body
      }
    }
  `,
  fetchPolicy: 'cache-only',
  update(data) {
    return [
      {
        id: 1,
        body:
          'Add your sponsorship inventory to your profile, set up your sponsorship packages, and let leading brands know what can you offer.'
      }
    ]
  }
}
