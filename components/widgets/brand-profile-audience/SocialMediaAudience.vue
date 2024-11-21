<template>
  <div>
    <h1>{{ $t('app.brand.profile.audience.media_audience.title') }}</h1>
    <div class="w-full flex mt-4">
      <app-select
        v-model="audiencePeriod"
        class="w-1/3 pr-4 ml-auto"
        :solo="true"
        :solo-label="null"
        :label="$t('general.season')"
        :items="seasonItems"
      />
    </div>
    <div class="w-full">
      <div v-if="$apollo.queries.socialAccounts.loading" class="w-full h-64 flex">
        <logo-loader class="h-32 w-32 m-auto" />
      </div>
      <line-chart v-else :label-formatter="mediaAudienceLabelFormatter" :height="400" :series="mediaAudienceChartSeries" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { concat, groupBy, mapValues, sumBy, values } from 'lodash'
import LineChart from '@/components/charts/LineChart'
import AppSelect from '@/components/AppSelect'
import LogoLoader from '@/components/LogoLoader'
import { mediaAudienceLabelFormatter } from '@/services/chartFormatters'
import { calculateGrowth, getGrowthClasses } from '@/services/helpers'
import {
  BrandSocialAccountsQuery,
  SeasonsQuery,
  SocialAccountsPrecalcs
} from '@/services/graphql'

export default {
  name: 'SocialMediaAudience',

  components: {
    AppSelect,
    LogoLoader,
    LineChart
  },

  apollo: {
    socialAccounts: {
      ...SocialAccountsPrecalcs,
      variables() {
        return {
          ids: this.socialAccountsIds,
          season: this.audiencePeriod
        }
      },
      skip() {
        return (
          this.socialAccountsIds.length === 0 || this.audiencePeriod === null
        )
      }
    },
    seasons: {
      ...SeasonsQuery,
      result({ data }) {
        this.audiencePeriod =
          moment(data.seasons[0].toDate).format('YYYY') +
          '/' +
          (Number(moment(data.seasons[0].toDate).format('YY')) + 1)
      }
    },

    unit: {
      ...BrandSocialAccountsQuery,
      variables() {
        return {
          id: this.unitId
        }
      }
    }
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    seasons: [],
    socialAccounts: [],
    mediaAudienceLabelFormatter: mediaAudienceLabelFormatter,
    audiencePeriod: null
  }),

  computed: {
    seasonItems() {
      if (this.seasons.length === 0) {
        return []
      }
      const seasonItems = [
        {
          text: this.$t('general.current_season'),
          value:
            moment(this.seasons[0].toDate).format('YYYY') +
            '/' +
            (Number(moment(this.seasons[0].toDate).format('YY')) + 1)
        }
      ]
      return concat(
        seasonItems,
        this.seasons.map((item, index) => {
          return {
            text: index === 0 ? this.$t('general.last_season') : item.name,
            value: item.name
          }
        })
      )
    },

    socialAccountsIds() {
      return this.$get(this.unit, 'entity.socialAccounts', []).map(
        item => item.id
      )
    },

    mediaAudienceChartSeries() {
      let last = null

      let precalcs = []
      this.socialAccounts.map(
        item => (precalcs = precalcs.concat(this.$get(item, 'precalcs', [])))
      )

      return {
        name: this.$t('app.brand.profile.audience.media_audience.title'),
        data: values(
          mapValues(groupBy(precalcs, item => item.date), (item, date) => {
            function getGrowth(socialAccountType) {
              if (last === null) {
                return 0
              } else {
                const accountSameTypeLast = last.filter(
                  item1 => item1.type === socialAccountType
                )
                const accountSameType = item.filter(
                  item1 => item1.type === socialAccountType
                )

                return calculateGrowth(
                  sumBy(accountSameTypeLast, item =>
                    this.$get(item, 'data.followersCount', 0)
                  ),
                  sumBy(accountSameType, item =>
                    this.$get(item, 'data.followersCount', 0)
                  )
                )
              }
            }

            const fbGrowth = getGrowth.call(this, 'facebook')

            const igGrowth = getGrowth.call(this, 'instagram')

            const ytGrowth = getGrowth.call(this, 'youtube')

            const twGrowth = getGrowth.call(this, 'twitter')

            const sum = item.reduce(
              (total, item) =>
                total + this.$get(item, 'data.followersCount', 0),
              0
            )

            const sumGrowth =
              last !== null
                ? calculateGrowth(
                    last.reduce(
                      (total, item) =>
                        total + this.$get(item, 'data.followersCount', 0),
                      0
                    ) || null,
                    sum
                  )
                : 0

            last = item

            return {
              name: this.$filters.date(date, 'MMM'),
              date: date,
              facebookGrowth: fbGrowth,
              instagramGrowth: igGrowth,
              twitterGrowth: twGrowth,
              youtubeGrowth: ytGrowth,
              sumGrowth: sumGrowth,
              sumGrowthClasses: getGrowthClasses(sumGrowth),
              igGrowthClasses: getGrowthClasses(igGrowth),
              fbGrowthClasses: getGrowthClasses(fbGrowth),
              ytGrowthClasses: getGrowthClasses(ytGrowth),
              twGrowthClasses: getGrowthClasses(twGrowth),
              y: sum
            }
          })
        )
      }
    }
  }
}
</script>

<style scoped>
</style>
