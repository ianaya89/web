<template>
  <div />
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { MeQuery } from '@/services/graphql'
import { DEFAULT_ROUTES_4_TYPENAMES } from '@/services/helpers'
import unitRoutes from '@/config/unit-routes'

export default Vue.extend({
  data: () => ({
    me: null
  }),

  apollo: {
    me: {
      ...MeQuery,
      skip() {
        return !this.isAuthenticated
      },
      variables() {
        return {
          // has to be here to make it reactive when switching org. unit
          unitId: this.$route.params.id
        }
      },
      result({ data }) {
        const unit = this.$get(data, 'me.units', []).find(
          unit => unit.id === this.$route.params.id
        )

        if (this.$route.params.id != null) {
          if (!unit || !Object.prototype.hasOwnProperty.call(unit, 'entity')) {
            return this.$router.push(
              this.localePath({
                name: 'logout'
              })
            )
          }

          this.$store.dispatch(
            'active/setUnitType',
            unit.entity.__typename.toLowerCase()
          )

          this.$store.dispatch('active/setUnitID', unit.id)
        }

        this.$store.dispatch(
          'active/setTimezone',
          this.$get(data, 'me.profile.timezone', 'Europe/Bratislava')
        )

        if (this.$route.params.id != null) {
          unitRoutes[this.$store.getters['active/unitType']].restricted.forEach(
            restrictedRoute => {
              if (this.$route.name.startsWith(restrictedRoute)) {
                this.$toast.error(this.$t('errors.not-allowed-route'))
                this.$router.push(
                  this.localePath({
                    name: 'unit-id-dashboard',
                    params: { id: unit.id }
                  })
                )
              }
            }
          )
        }
      },
      error(error) {
        if (process.env.BASE_ENVIROMENT === 'dev') {
          // eslint-disable-next-line no-console
          console.error(error)
        }
        this.$router.push(
          this.localePath({
            name: 'logout'
          })
        )
      }
    }
  },

  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    }),

    resolvedEnterInApp() {
      if (this.me !== null) {
        const unitId = this.$get(this.me, 'units.0.id')
        const entityType = this.$get(this.me, 'units.0.entity.__typename')
        return this.localePath({
          name: DEFAULT_ROUTES_4_TYPENAMES[entityType],
          params: { id: unitId }
        })
      } else {
        return {}
      }
    },

    fullName() {
      if (this.me !== null) {
        const firstName = this.$get(this.me, 'profile.firstName', '-')
        const lastName = this.$get(this.me, 'profile.lastName', '-')
        return `${firstName} ${lastName}`
      } else {
        return ''
      }
    }
  },

  mounted() {
    //
  }
})
</script>
