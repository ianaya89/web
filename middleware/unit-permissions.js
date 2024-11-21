import { PERMISSIONS_QUERY } from '@/services/graphql'

export default function(context) {
  if (!context.route.params.id || context.route.name.startsWith('team-teamId'))
    return

  if (!context.app.apolloProvider) return

  return context.app.apolloProvider.defaultClient
    .query({
      query: PERMISSIONS_QUERY,
      variables: { id: context.route.params.id },
      fetchPolicy: 'no-cache'
    })
    .then(response => {
      context.store.dispatch(
        'active/setUnitPermissions',
        response.data.unit.permissions.list
      )

      context.store.dispatch(
        'active/setUnitActiveSubscription',
        response.data.unit.activeSubscription
      )
    })
}
