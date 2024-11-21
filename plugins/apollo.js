import { onError } from 'apollo-link-error'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import introspectionQueryResultData from '../fragmentTypes.json'
import { REFRESH_TOKEN_MUTATION } from '@/services/graphql/refreshToken'
import { get } from '@/services/helpers'

const getNewToken = (app, store) => {
  return app.apolloProvider
    ? app.apolloProvider.defaultClient.mutate({
        ...REFRESH_TOKEN_MUTATION,
        variables: { token: store.getters['auth/refreshToken'] }
      })
    : null
}

export default ({ app, store }) => {
  const errorHandler = ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ debugMessage, path, extensions, message }) => {
        if (
          debugMessage === 'Unauthenticated.' &&
          !store.getters['auth/refreshingToken'] &&
          store.getters['auth/refreshToken']
        ) {
          store.dispatch('auth/refreshingToken')
          getNewToken(app, store)
            .then(({ data }) => {
              app.$apolloHelpers.onLogin(data.refreshToken.accessToken)
              store.dispatch('auth/login', data.refreshToken)
              location.reload()
            })
            .catch(error => {
              // eslint-disable-next-line no-console
              console.error(`[Refresh token error]: Message: ${error}`)
              location.replace('/logout')
            })
        }
        if (get(extensions, 'category', null) === 'validation') {
          if (Array.isArray(extensions.validation)) {
            app.$toast.error(extensions.validation.join(' '))
          } else if (typeof extensions.validation === 'object') {
            app.$toast.error(
              Object.values(extensions.validation)
                .map(
                  validationErrors =>
                    Array.isArray(validationErrors)
                      ? validationErrors.join(' ')
                      : validationErrors
                )
                .join(' ')
            )
          }
        }

        // eslint-disable-next-line no-console
        console.error(
          `[GraphQL error]: Message: ${message}, Debug message: ${debugMessage}, Path: ${path}, Extensions: ${JSON.stringify(
            extensions
          )}`
        )
      })
    }
    if (networkError) {
      // eslint-disable-next-line
      console.error(`[Network error]!!!: ${networkError}`)
    }
  }

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })

  return {
    httpEndpoint: process.env.VUE_APP_BACKEND_URL + '/graphql',
    connectToDevTools: true,
    tokenName: 'accessToken',
    cache: new InMemoryCache({ fragmentMatcher }),
    link: onError(errorHandler)
  }
}
