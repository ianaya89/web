import unitRoutes from '@/config/unit-routes'

export default function({ store, route, app }) {
  if (store.getters['active/unitType'] != null) {
    unitRoutes[store.getters['active/unitType']].restricted.forEach(
      restrictedRoute => {
        if (route.name.startsWith(restrictedRoute)) {
          app.$toast.error(app.i18n.t('errors.not-allowed-route'))
          app.router.push(
            app.localePath({
              name: 'unit-id-dashboard',
              params: { id: store.getters['active/unitID'] }
            })
          )
        }
      }
    )
  }
}
