import gql from 'graphql-tag'
import { get } from '../helpers'
import { mockArray } from './_mocks'

export const TagsQuery = {
  mock: mockArray(5),
  query: gql`
    query Tags {
      blog {
        tags {
          id
          name
          occurrences
        }
      }
    }
  `,
  update(data) {
    return get(data, 'blog.tags', [])
  }
}

export const TopPostsQuery = {
  mock: mockArray(4),
  query: gql`
    query TopBlogPosts {
      blog {
        posts(top: true) {
          id
          title
          slug
          title_photo {
            url
          }
          published_at
          read_time
          author
          tags {
            name
          }
        }
      }
    }
  `,
  update(data) {
    return get(data, 'blog.posts', [])
  }
}

export const FilteredPostsQuery = {
  mock: mockArray(7),
  query: gql`
    query FilteredBlogPosts($author: String, $tag: String) {
      blog {
        posts(latest: true, author: $author, tag: $tag) {
          id
          title
          slug
          title_photo {
            url
          }
          published_at
          read_time
          author
          tags {
            name
          }
        }
      }
    }
  `,
  update(data) {
    return get(data, 'blog.posts', [])
  }
}

export const SinglePostQuery = {
  mock: {
    id: 'mock1',
    tags: [],
    title_photo: {},
    related: []
  },
  query: gql`
    query SingleBlogPostWithRelated($postId: ID!) {
      blog {
        post(id: $postId) {
          id
          title
          slug
          excerpt
          title_photo {
            url
          }
          published_at
          read_time
          author
          body
          tags {
            name
          }
          related {
            id
            title
            slug
            title_photo {
              url
            }
            published_at
            read_time
            author
            tags {
              name
            }
          }
        }
      }
    }
  `,

  update(data) {
    return get(data, 'blog.post', { related: [], tags: [] })
  }
}

export const SubmitNewsletter = {
  mutation: gql`
    mutation SubmitNewsletter(
      $email: String!
      $recaptchaToken: String!
      $meta: String
    ) {
      submitNewsletter(
        email: $email
        recaptchaToken: $recaptchaToken
        meta: $meta
      ) {
        id
      }
    }
  `
}
