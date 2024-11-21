<template>
  <div class="w-full mt-20 mb-10">
    <div class="flex items-center">
      <h3>{{ $t('app.profile.team.fans.media_exposure.title') }}</h3>
      <app-tooltip class="font-normal text-left" :position="'right'">
        <template v-slot:activator>
          <span class="lni-question-circle text-grey mt-1 ml-2" />
        </template>
        <p class="w-64 font-sans">
          {{ $t('app.profile.team.fans.media_exposure.overview') }}
        </p>
      </app-tooltip>
    </div>
    <div class="w-full flex mt-4">
      <div class="mr-auto flex">
        <h4 class="my-4">
          {{ $t('app.profile.team.fans.media_exposure.sources') }}
        </h4>
      </div>
    </div>
    <div class="w-full flex mt-6">
      <div class="w-1/2 pr-4">
        <timeseries-chart :height="300" :series="chartSeries" :label-formatter="labelFormatter" />
      </div>
      <div class="w-1/2 relative">
        <div class="fading-gradient" />
        <div class="media-exposure-table overflow-auto pb-10">
          <sortable-table v-slot:default="props" :headers="mediaHeaders" :data="media" class="" sort-by="valuation">
            <td class="flex items-center w-2/6">
              <div class="h-6 w-6 mr-2">
                <avatar :src="props.row.item.traditionalMedia.logo.url" classes="h-6 w-6" />
              </div>
              <span class="leading-tight">{{ props.row.item.traditionalMedia.name }}</span>
            </td>
            <td class="text-right w-1/6">
              {{ props.row.item.postsCount | number }}
            </td>
            <td class="text-right w-1/6">
              {{ props.row.item.engagement | number }}
            </td>
            <!-- <td class="text-right font-semibold w-2/6">
              {{ props.row.item.valuation | currency }}
            </td> -->
          </sortable-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import { mapGetters } from 'vuex'
import { TeamTraditionalMediaExposuresQuery } from '@/services/graphql'
import AppTooltip from '@/components/AppTooltip'
import TimeseriesChart from '@/components/charts/TimeseriesChart'
import SortableTable from '@/components/SortableTable'
import Avatar from '@/components/Avatar'

export default {
  name: 'MediaExposureOverview',

  components: {
    Avatar,
    AppTooltip,
    TimeseriesChart,
    SortableTable
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...TeamTraditionalMediaExposuresQuery,
      variables() {
        return {
          id: this.unitId,
          from: this.activeSeason.fromDate,
          to: this.activeSeason.toDate
        }
      },
      skip() {
        return !this.activeSeason
      }
    }
  },

  data: () => ({
    mediaHeaders: [],
    labelFormatter: vm =>
      function() {
        return `
            <div class="chart__title">${vm.$filters.date(this.point.x)}</div>
            <div class="chart__val">${vm.$filters.number(this.y)}</div>
            `
      }
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason'
    }),

    media() {
      return this.$get(this.unit, 'entity.traditionalMediaExposures', [])
    },

    chartSeries() {
      return {
        name: 'Traditional media exposure',
        data: sortBy(
          this.$get(
            this.unit,
            'entity.traditionalMediaExposuresByDate',
            []
          ).map(exposure => {
            return {
              x: new Date(exposure.publishedDate).getTime(),
              y: exposure.engagement || 0,
              media: exposure.traditionalMedia || []
            }
          }),
          'x'
        )
      }
    }
  },

  mounted() {
    this.mediaHeaders = [
      {
        text: this.$t('app.profile.team.fans.media_exposure.media.source'),
        align: 'left',
        value: 'traditionalMedia.name',
        sortable: false,
        width: '50%'
      },
      {
        text: this.$t('app.profile.team.fans.media_exposure.media.exposures'),
        value: 'postsCount',
        align: 'right'
      },
      {
        text: this.$t('app.profile.team.fans.media_exposure.media.engagement'),
        value: 'engagement',
        align: 'right'
      }
      // {
      //   text: 'Valuation',
      //   value: 'valuation',
      //   align: 'right'
      // }
    ]
  }
}
</script>

<style lang="postcss" scoped>
.media-exposure-table {
  max-height: 25rem;
}
</style>
