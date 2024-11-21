<template>
  <div class="w-full my-16 ">
    <div class="pr-0 sm:pr-6">
      <h3 class="pt-8 leading-tight">
        {{ $t('app.profile.team.fans.media.title') }}
      </h3>
    </div>
    <div class="w-full flex flex-wrap flex-col-reverse sm:flex-row pt-10">
      <div class="w-full sm:w-2/3 pr-0 sm:pr-6 flex">
        <app-select
          v-model="selectedMetric"
          class="max-w-32"
          :hide-details="true"
          :solo-label="null"
          :items="metricSelectorItems"
          @input="selectMetric"
        />
        <app-tooltip class="font-normal text-left" :position="'right'">
          <template v-slot:activator>
            <span class="lni-question-circle text-grey mt-1 ml-2" />
          </template>
          <p class="w-64 font-sans text-grey-l2">
            <span class="font-medium text-white">{{ $t('app.profile.team.fans.media.engagement') }}:</span> {{ $t('app.profile.team.fans.media.engagement_per_channel') }}<br>
            <!--            <span class="font-medium text-white">Reach:</span> sum of social media reach last 12 months per channel <br>-->
            <span class="font-medium text-white">{{ $t('app.profile.team.fans.media.followers') }}:</span> {{ $t('app.profile.team.fans.media.followers_per_channel') }}
          </p>
        </app-tooltip>
      </div>
      <div class="w-full sm:w-1/3 flex">
        <div class="w-1/2 flex">
          <span class="text-h5 font-medium leading-tight">{{ $t('app.profile.team.fans.media.social_accounts') }}</span>
        </div>
        <div class="w-1/2">
          <app-select
            v-model="selectedMediaSource"
            class="max-w-xxs"
            :hide-details="true"
            :solo-label="null"
            :items="socialMediaTypeSelectorItems"
          />
        </div>
      </div>
    </div>
    <div class="w-full flex flex-wrap flex-col-reverse sm:flex-row pt-4">
      <div class="w-full sm:w-2/3 pr-0 sm:pr-6">
        <timeseries-chart :height="400" :series="historicalData" />
      </div>
      <div class="w-full sm:w-1/3 relative">
        <div class="fading-gradient z-20" />
        <div class="media-accounts overflow-y-auto pb-10">
          <media-value
            v-for="media in socialMediaWithTotal"
            :key="media.id"
            :class="{'total': media.id.includes('total'), 'active': media.id === selectedAccountId}"
            :media="media"
            :metric="selectedMetric"
            @click.native="selectAccountId(media.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groupBy, mapValues, orderBy, sumBy, uniqBy, values } from 'lodash'
import { mapGetters } from 'vuex'
import {
  SocialAccountsPrecalcs,
  LeagueSocialMediaQuery
} from '@/services/graphql'
import AppSelect from '@/components/AppSelect'
import AppTooltip from '@/components/AppTooltip'
import TimeseriesChart from '@/components/charts/TimeseriesChart'
import MediaValue from '@/components/MediaValue'
import socialIcons from '@/config/social-icons'

export default {
  name: 'LeagueMediaSourcesOverview',

  components: {
    MediaValue,
    AppSelect,
    AppTooltip,
    TimeseriesChart
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    leagueWithTeamsSocialAccounts: {
      ...LeagueSocialMediaQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.activeSeason.name
        }
      },
      skip() {
        return this.activeSeason === null
      },
      update(data) {
        data.leagueWithTeamsSocialAccounts.map(item => {
          item.engagement = this.$get(item, 'precalcs', []).reduce(
            (sum, precalc) =>
              sum + this.$get(precalc, 'data.totalEngagement', 0),
            0
          )
          return item
        })
        return data.leagueWithTeamsSocialAccounts
      },
      result() {
        this.selectAccountId(this.$get(this.socialMediaWithTotal, '0.id', null))
      }
    },

    socialAccounts: {
      ...SocialAccountsPrecalcs,
      skip() {
        return this.selectedAccountId === null || this.activeSeason === null
      },
      update(data) {
        data.socialAccounts.map(socialAcc => {
          socialAcc.precalcs.map(precalc => {
            precalc.data.engagement = precalc.data.totalEngagement
          })
        })
        return data.socialAccounts
      },
      variables() {
        let ids = [this.selectedAccountId]

        if (this.selectedAccountId.includes('total')) {
          ids = this.socialMedia.map(sm => sm.id)
        }

        return {
          ids,
          season: this.activeSeason.name
        }
      }
    }
  },

  data: () => ({
    leagueWithTeamsSocialAccounts: [],
    selectedMediaSource: 'all',
    socialAccounts: [],
    selectedMetric: 'followersCount',
    selectedAccountId: null
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason'
    }),

    socialMedia() {
      return this.leagueWithTeamsSocialAccounts.filter(media => {
        // ignore web for followers
        if (
          this.selectedMetric === 'followersCount' &&
          media.type === 'web-page'
        ) {
          return false
        }

        if (this.selectedMediaSource === 'all') {
          return true
        }

        return media.type === this.selectedMediaSource
      })
    },

    socialMediaWithTotal() {
      const icon = this.selectedMediaSource
        ? socialIcons.icons[this.selectedMediaSource] || null
        : null

      const iconUrl = icon
        ? require(`../../../assets/images/social/${icon}`)
        : null

      return [
        {
          id: `total-${this.selectedMediaSource}`,
          name: this.$t('general.total'),
          unit: {
            entityName: this.$t('general.total')
          },
          profilePicture: {
            url: iconUrl
          },
          followersCount: sumBy(this.socialMedia, 'followersCount'),
          engagement: sumBy(this.socialMedia, 'engagement')
        },
        ...this.socialMedia
      ]
    },

    socialMediaTypeSelectorItems() {
      return orderBy(
        [
          { text: 'All', value: 'all' },
          ...uniqBy(
            this.leagueWithTeamsSocialAccounts
              .filter(item => item.type !== 'web-page')
              .map(item => ({
                text: this.$t('general.' + item.type),
                value: item.type
              })),
            media => media.value
          )
        ],
        'value'
      )
    },

    metricSelectorItems() {
      return [
        {
          text: this.$t('app.profile.team.fans.media.engagement'),
          value: 'engagement'
        },
        {
          text: this.$t('app.profile.team.fans.media.followers'),
          value: 'followersCount'
        }
      ]
    },

    historicalData() {
      let precalcs = []
      this.socialAccounts.map(
        item => (precalcs = precalcs.concat(this.$get(item, 'precalcs', [])))
      )

      return {
        name: 'Historical social media metric',
        data: values(
          mapValues(groupBy(precalcs, item => item.date), (item, key) => {
            return {
              x: new Date(key).getTime(),
              y: item.reduce(
                (total, item1) =>
                  total + this.$get(item1, 'data.' + this.selectedMetric, 0),
                0
              )
            }
          })
        )
      }
    }
  },

  methods: {
    selectMetric(value) {
      this.selectedMetric = value
    },

    selectAccountId(id) {
      this.selectedAccountId = id
    }
  }
}
</script>

<style lang="postcss" scoped>
.media-accounts {
  max-height: 25rem;
}
</style>
