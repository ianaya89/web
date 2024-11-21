<template>
  <div class="w-full my-20">
    <div class="">
      <h3>{{ $t('app.profile.team.fans.media_exposure.title') }}</h3>
    </div>
    <div class="w-full flex mt-4 -mx-4">
      <div class="mr-auto flex px-4">
        <h4 class="my-auto">
          {{ $t('app.profile.team.fans.media_exposure.sources') }}
        </h4>
      </div>
      <div class="ml-auto px-4">
        <app-select
          v-model="timeSlot"
          class="max-w-sm ml-auto px-4"
          :hide-details="true"
          :solo="true"
          :items="timeSlotsItems"
          @input="selectTimeSlot"
        />
      </div>
    </div>
    <div class="w-full flex mt-8 -mx-4">
      <div class="w-3/5 px-4">
        <timeseries-chart :height="400" :series="chartSeries" :label-formatter="labelFormatter" />
      </div>
      <div class="w-2/5 px-4">
        <sortable-table v-slot:default="props" :headers="mediaHeaders" :data="media" class="" sort-by="valuation">
          <td class="flex items-center">
            <avatar :src="props.row.item.traditionalMedia.logo.url" classes="h-8 w-8 mr-4" />
            {{ props.row.item.traditionalMedia.name }}
          </td>
          <td class="text-right">
            {{ props.row.item.postsCount | number }}
          </td>
          <td class="text-right">
            {{ props.row.item.engagement | number }}
          </td>
          <td class="text-right font-bold">
            {{ props.row.item.valuation | currency }}
          </td>
        </sortable-table>
      </div>
    </div>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import { TeamTraditionalMediaExposuresQuery } from '@/services/graphql'
import AppSelect from '@/components/AppSelect'
import TimeseriesChart from '@/components/charts/TimeseriesChart'
import SortableTable from '@/components/SortableTable'
import Avatar from '@/components/Avatar'

export default {
  name: 'MediaExposureOverview',

  components: {
    Avatar,
    AppSelect,
    TimeseriesChart,
    SortableTable
  },

  apollo: {
    unit: {
      ...TeamTraditionalMediaExposuresQuery,
      variables() {
        return {
          id: this.$route.params.id,
          from: this.timeSlot.from,
          to: this.timeSlot.to
        }
      }
    }
  },

  data: () => ({
    timeSlot: { from: '2016-01-01', to: '2019-01-01' },
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
    media() {
      return this.$get(this.unit, 'entity.traditionalMediaExposures', [])
    },

    timeSlotsItems() {
      return [
        {
          text: 'first chunk',
          value: { from: '2016-01-01', to: '2019-01-01' }
        },
        {
          text: 'second chunk',
          value: { from: '2019-01-01', to: '2020-01-01' }
        }
      ]
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
        text: 'Source',
        align: 'left',
        value: 'traditionalMedia.name',
        sortable: false,
        width: '50%'
      },
      {
        text: 'Exposures',
        value: 'postsCount',
        align: 'right'
      },
      {
        text: 'Engagement',
        value: 'engagement',
        align: 'right'
      },
      {
        text: 'Valuation',
        value: 'valuation',
        align: 'right'
      }
    ]
  },

  methods: {
    selectTimeSlot(value) {
      this.timeSlot = value
    }
  }
}
</script>
