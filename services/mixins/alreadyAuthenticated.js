import { mapGetters } from 'vuex'
import { fetchStored } from '@/services/helpers'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // if user is authenticated, send them back
      if (vm.isAuthenticated) {
        vm.$toast.success(vm.$t('errors.already-authenticated'))

        if (vm.lastAuthorizedUnitRoute) {
          return vm.$router.push(vm.lastAuthorizedUnitRoute)
        }

        return vm.$router.go(-1)
      }

      next()
    })
  },

  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    }),

    lastAuthorizedUnitRoute() {
      return fetchStored('lastAuthorizedUnitRoute')
    }
  }
}
