<template>
  <section class="team__profile__sponsorship">
    <transition name="fade-up" :appear="true">
      <div class="w-full flex">
        <h3 class="">
          {{ $t('app.profile.team.sponsorship.title') }}
        </h3>
        <app-tooltip class="font-normal text-left" :position="'right'">
          <template v-slot:activator>
            <span class="lni-question-circle text-grey mt-1 ml-2" />
          </template>
          <p class="w-64 font-sans">
            {{ $t('app.profile.team.sponsorship.tracked_engagement') }}
          </p>
        </app-tooltip>
      </div>
    </transition>
    <div class="w-full flex flex-wrap pt-8">
      <div class="w-full sm:w-1/2 pr-4">
        <div class="w-full pb-4">
          <app-select
            v-model="selectedMetric"
            class="w-1/2 sm:w-1/3"
            :hide-details="true"
            :items="metricItems"
            :label="null"
            :solo-label="null"
          />
        </div>
        <timeseries-chart
          :height="400"
          :value-filter-fnc="selectedMetric === 'engagementValuation'
            ? $filters.currency
            : $filters.number"
          :series="timechartChartSeries"
        />
      </div>
      <transition name="fade-up" :appear="true">
        <div class="w-full sm:w-1/2 sm:pl-4 overflow-x-auto">
          <div class="w-full flex justify-between pb-4">
            <h5 class="mr-4 mt-4 leading-tight">
              {{ $t('app.profile.team.sponsorship.official_partnership') }}
            </h5>
          </div>
          <sortable-table
            v-slot:default="props"
            :headers="sponsorshipHeaders"
            :data="brandedPostsByDateTableData"
            sort-by="engagementValuation"
            class="w-full"
          >
            <td class="flex items-center">
              <div class="flex items-center">
                <avatar :classes="'w-6 h-6'" :src="props.row.item.brand.logo.url" />
              </div>
              <span class="pl-2 leading-tight">{{ props.row.item.brand.name }}</span>
            </td>
            <td class="text-right w-1/6">
              {{ props.row.item.postsCount | number }}
            </td>
            <td class="text-right w-1/6">
              {{ props.row.item.engagement | number }}
            </td>
            <td class="text-right font-semibold w-1/3">
              {{ props.row.item.engagementValuation | currency }}
            </td>
          </sortable-table>
        </div>
      </transition>
    </div>
    <appear-transition :percentage-offset="0.6">
      <div class="w-full flex mt-20 overflow-x-auto">
        <sortable-table
          v-slot:default="props"
          :headers="overallEngagementHeaders"
          :data="engagementList"
          sort-by="total"
          class="w-full"
        >
          <td class="flex items-center max-w-xs">
            {{ props.row.item.label }}
          </td>
          <td class="text-right">
            {{ props.row.item.stadium | number }}
          </td>
          <td class="text-right">
            {{ props.row.item.fans | number }}
          </td>
          <td class="text-right">
            {{ props.row.item.media | number }}
          </td>
          <td class="text-right">
            {{ props.row.item.team | number }}
          </td>
          <td class="text-right">
            {{ props.row.item.players | number }}
          </td>
          <td class="text-right font-semibold">
            {{ props.row.item.total | number }}
          </td>
        </sortable-table>
      </div>
    </appear-transition>

    <appear-transition :percentage-offset="0.4">
      <div class="w-full flex mt-20 overflow-x-auto">
        <sortable-table
          v-slot:default="props"
          :headers="overallValuationHeaders"
          :data="valuationList"
          sort-by="total"
          class="w-full"
        >
          <td class="flex items-center max-w-xs">
            {{ $t('app.profile.team.sponsorship.valuation') }}
          </td>
          <td class="text-right">
            {{ props.row.item.stadium | currency }}
          </td>
          <td class="text-right">
            {{ props.row.item.fans | currency }}
          </td>
          <td class="text-right">
            {{ props.row.item.media | currency }}
          </td>
          <td class="text-right">
            {{ props.row.item.team | currency }}
          </td>
          <td class="text-right">
            {{ props.row.item.players | currency }}
          </td>
          <td class="text-right font-semibold">
            {{ props.row.item.total | currency }}
          </td>
        </sortable-table>
      </div>
    </appear-transition>
  </section>
</template>

<script>
import { sum } from 'lodash'
import { mapGetters } from 'vuex'
import {
  UnitBrandedEngagementQuery,
  UnitOverallValuationQuery
} from '@/services/graphql'
import TimeseriesChart from '@/components/charts/TimeseriesChart'
import AppSelect from '@/components/AppSelect'
import AppTooltip from '@/components/AppTooltip'
import AppearTransition from '@/components/transitions/AppearTransition'
import SortableTable from '@/components/SortableTable'
import Avatar from '@/components/Avatar'

export default {
  name: 'TeamSponsorship',

  components: {
    Avatar,
    SortableTable,
    AppSelect,
    AppTooltip,
    AppearTransition,
    TimeseriesChart
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitOverallValuationQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.lastSeason.name
        }
      }
    },
    brandedPostsByDate: {
      ...UnitBrandedEngagementQuery,
      variables() {
        return {
          id: this.unitId,
          from: this.lastSeason.fromDate,
          to: this.currentSeason.toDate
        }
      }
    }
  },

  data: () => ({
    brandedPostsByDate: UnitBrandedEngagementQuery.mock,
    selectedMetric: 'engagementValuation'
  }),

  computed: {
    ...mapGetters({
      lastSeason: 'active/getLastSeason',
      currentSeason: 'active/getCurrentSeason'
    }),

    brandedPostsByDateTableData() {
      return this.brandedPostsByDate.reduce((objects, item) => {
        const currentBrandObject = objects.find(
          object => object.brand.id === item.brand.id
        )
        if (currentBrandObject === undefined) {
          objects.push({
            brand: item.brand,
            engagement: item.engagement,
            engagementValuation: item.engagementValuation,
            postsCount: item.postsCount,
            publishedDate: item.publishedDate
          })
        } else {
          currentBrandObject.brand = item.brand
          currentBrandObject.engagement += item.engagement
          currentBrandObject.engagementValuation += item.engagementValuation
          currentBrandObject.postsCount += item.postsCount
          currentBrandObject.publishedDate = item.publishedDate
        }
        return objects
      }, [])
    },

    sponsorshipHeaders() {
      return [
        {
          text: this.$t('app.profile.team.sponsorship.source'),
          align: 'left',
          value: 'brand.name',
          sortable: false,
          width: '30%'
        },
        {
          text: this.$t('app.profile.team.sponsorship.posts'),
          value: 'postsCount',
          align: 'right'
        },
        {
          text: this.$t('app.profile.team.sponsorship.engagement'),
          value: 'engagement',
          align: 'right'
        },
        {
          text: this.$t('app.profile.team.sponsorship.valuation'),
          value: 'engagementValuation',
          align: 'right'
        }
      ]
    },

    overallValuationHeaders() {
      return [
        {
          text: this.$t('app.profile.team.sponsorship.valuation_table_title'),
          align: 'left',
          value: 'id',
          sortable: false,
          width: '25%'
        },
        {
          text: this.$t('app.profile.team.sponsorship.stadium'),
          value: 'stadium',
          align: 'right'
        },
        {
          text: this.$t('app.profile.team.sponsorship.fans'),
          value: 'fans',
          align: 'right'
        },
        {
          text: this.$t('Media'),
          value: 'media',
          align: 'right'
        },
        {
          text: this.$t('app.profile.team.sponsorship.team'),
          value: 'team',
          align: 'right'
        },
        {
          text: this.$t('app.profile.team.sponsorship.players'),
          value: 'players',
          align: 'right'
        },
        {
          text: this.$t('app.profile.team.sponsorship.total'),
          value: 'total',
          align: 'right'
        }
      ]
    },

    metricItems() {
      return [
        {
          text: this.$t('app.profile.team.sponsorship.engagement'),
          value: 'engagement'
        },
        {
          text: this.$t('app.profile.team.sponsorship.valuation'),
          value: 'engagementValuation'
        },
        {
          text: this.$t('app.profile.team.sponsorship.posts'),
          value: 'postsCount'
        }
      ]
    },

    overallEngagementHeaders() {
      return [
        {
          text: this.$t('app.profile.team.sponsorship.engagement_table_title'),
          align: 'left',
          value: 'label',
          sortable: false,
          width: '25%'
        },
        {
          text: this.$t('app.profile.team.sponsorship.stadium'),
          value: 'stadium',
          align: 'right'
        },
        {
          text: this.$t('app.profile.team.sponsorship.fans'),
          value: 'fans',
          align: 'right'
        },
        {
          text: this.$t('Media'),
          value: 'media',
          align: 'right'
        },
        {
          text: this.$t('app.profile.team.sponsorship.team'),
          value: 'team',
          align: 'right'
        },
        {
          text: this.$t('app.profile.team.sponsorship.players'),
          value: 'players',
          align: 'right'
        },
        {
          text: this.$t('app.profile.team.sponsorship.total'),
          value: 'total',
          align: 'right'
        }
      ]
    },

    timechartChartSeries() {
      return {
        name: '',
        data: this.brandedPostsByDate
          .map(brandedPosts => {
            return {
              brandedPosts: brandedPosts,
              filterFnc:
                this.selectedMetric === 'engagementValuation'
                  ? this.$filters.currency
                  : this.$filters.number,
              y: brandedPosts[this.selectedMetric],
              x: new Date(brandedPosts.publishedDate).getTime()
            }
          })
          .sort((a, b) => {
            return a.x - b.x
          })
      }
    },

    engagementList() {
      const rows = [
        'picturesCount',
        'videosCount',
        'mentionsCount',
        'hashtagsCount',
        'brandedContentCount'
      ]

      const engagements = this.$get(
        this.unit,
        'entity.precalcs.0.data.overallEngagement',
        {}
      )

      return rows.map(rowName => {
        const engagement = this.$get(engagements, rowName, {})
        return {
          label: this.$t('app.profile.team.sponsorship.' + rowName),
          ...engagement,
          total: sum(Object.values(engagement))
        }
      })
    },

    valuationList() {
      const valuations = this.$get(
        this.unit,
        'entity.precalcs.0.data.overallValuation',
        {}
      )

      return [
        {
          ...valuations,
          total: sum(Object.values(valuations)),
          id: true
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
.team__profile__sponsorship {
  @apply .pt-10 .pb-32;
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  padding-right: calc(100% - calc(100% - 100px));
}

@media (max-width: 768px) {
  .team__profile__sponsorship {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .team__profile__sponsorship {
    @apply pr-5;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
