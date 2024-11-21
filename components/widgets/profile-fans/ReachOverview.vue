<template>
  <div class="w-full lg:w-1/2 pr-0 lg:pr-6">
    <h6 class="float-right">
      {{ reachSeries.data.map(x => x.y).reduce((a, b) => a + b, 0) | number }}
    </h6>
    <div class="flex">
      <h6>{{ $t('app.profile.team.fans.web_social_following') }}</h6>
    </div>
    <div class="w-full flex flex-wrap flex-col-reverse sm:flex-row pt-4">
      <div class="w-full sm:w-1/2 pr-4">
        <table class="w-full font-medium">
          <tbody>
            <tr v-for="(row, index) in reachSeries.data" :key="index" class="border-b border-grey-l3">
              <td class="py-2 text-grey flex items-center">
                <span :class="['bg-pie-chart-' + index]" class="h-3 w-3 -mt-1" />
                <span class="ml-2">{{ row.name }}</span>
              </td>
              <td v-if="row.name!=='Unique website visits'" class="text-right">
                {{ hideZero(row.y) | number(true) }}
              </td>
              <td v-else class="text-right">
                {{ hideZero(uniqueVisitors) | number(true) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-full sm:w-1/2 flex justify-center mb-4 sm:mb-0">
        <pie-chart :series="reachSeries" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import { UnitReachOverviewQuery } from '@/services/graphql'
import PieChart from '@/components/charts/PieChart'
// import axios from 'axios'
// import AppTooltip from '@/components/AppTooltip'

export default {
  components: {
    PieChart
    // AppTooltip
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitReachOverviewQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.activeSeason.name
        }
      },
      result({ data }) {
        this.getUniqueVisitors(this.unit.entity.id)
      }
    }
  },

  data: () => ({
    columns: ['uniqueWebsiteVisits'],
    socialAccounts: ['facebook', 'instagram', 'twitter', 'tiktok', 'weibo'],
    uniqueVisitors: null
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getLastSeason'
    }),

    reachSeries() {
      const filteredSocialAccounts = this.$get(
        this.unit,
        `entity.socialAccounts`,
        []
      ).filter(account => this.socialAccounts.indexOf(account.type) !== -1)

      const precalcData = this.columns.map(name => ({
        name: this.$t(`app.profile.team.fans.reach.${name}Count`),
        y: this.$get(this.unit, `entity.precalcs.0.data.reach.${name}`, 0)
      }))

      const groupedSocialAccounts = {}
      filteredSocialAccounts
        .map(account => ({
          type: account.type,
          name: this.$t(`general.${account.type}`),
          y: account.followersCount
        }))
        .forEach(account => {
          if (!groupedSocialAccounts[account.type]) {
            groupedSocialAccounts[account.type] = {
              type: account.type,
              name: account.name,
              y: account.y
            }
          } else {
            groupedSocialAccounts[account.type].y += account.y
          }
        })

      const data = _.concat(precalcData, Object.values(groupedSocialAccounts))

      return {
        name: 'Reach - last season',
        data: data
      }
    }
  },

  methods: {
    hideZero(value) {
      return value === 0 ? null : value
    },

    getUniqueVisitors() {
      this.uniqueVisitors = this.$get(
        this.unit,
        `entity.precalcs.0.data.reach.uniqueWebsiteVisits`,
        0
      )
      // if (this.unit) {
      //   axios
      //     .get(process.env.VUE_APP_BACKEND_URL + '/unique_visitors', {
      //       params: { teamId: this.unit.entity.id },
      //       headers: {
      //         authorization: 'Bearer ' + this.$store.getters['auth/accessToken']
      //       }
      //     })
      //     .then(response => {
      //       this.uniqueVisitors = response.data.uniqueVisitors
      //     })
      // }
    }
  }
}
</script>
