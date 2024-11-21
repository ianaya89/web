<template>
  <div class="w-full mt-20">
    <div>
      <highlighted-world-map :specific-options="mapOptions" :series="highlightedMapSeries" />
    </div>
    <hr class="w-full border-b border-grey-l4">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { UnitCountrySplitQuery } from '@/services/graphql'
import HighlightedWorldMap from '@/components/charts/HighlightedWorldMap'
import { theme } from '@/tailwind.config'

export default {
  name: 'CountryPresenceMapLanding',

  components: {
    HighlightedWorldMap
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    countrySplit: {
      type: Array,
      required: true
    }
  },

  apollo: {},

  data: () => ({
    mapOptions: {
      chart: {
        backgroundColor: 'white'
      },
      colorAxis: {
        min: 0,
        max: null,
        stops: [
          [0, theme.extend.colors['pie-chart'][6]],
          [0.1, theme.extend.colors['pie-chart'][5]],
          [0.3, theme.extend.colors['pie-chart'][4]],
          [0.55, theme.extend.colors['pie-chart'][3]],
          [0.6, theme.extend.colors['pie-chart'][2]],
          [0.8, theme.extend.colors['pie-chart'][1]],
          [1, theme.extend.colors['pie-chart'][0]]
        ]
      }
    }
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getLastSeason'
    }),

    highlightedMapSeries() {
      return {
        tooltip: {
          enabled: false
        },
        data: this.countrySplit.map(country => ({
          name: country.label || 'N/A',
          value: country.value || 0
        }))
      }
    }
  }
}
</script>
