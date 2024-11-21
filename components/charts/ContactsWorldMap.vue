<template>
  <div class="map-column">
    <div ref="contactsWorldMap" />
  </div>
</template>

<script>
import WorldMap from '@/components/charts/WorldMap'

export default WorldMap.extend({
  name: 'ContactsWorldMap',

  props: {
    series: {
      type: Object,
      default: () => ({
        data: []
      })
    },
    specificOptions: {
      type: Object,
      default: () => ({})
    },
    nullColor: {
      type: String,
      default: '#ffdeda'
    }
  },

  data: () => ({
    options: {}
  }),

  watch: {
    specificOptions(newVal) {
      this.updateOptions(newVal)
      this.initializeMap()
    }
  },

  mounted() {
    this.storeMapReference(this.$refs.contactsWorldMap)

    this.updateOptions({
      chart: {
        height: '50%'
      },
      plotOptions: {
        mappoint: {
          className: 'cursor-pointer',
          events: {
            click: e => {
              this.$emit('city-clicked', this.$get(e, 'point', false))
            }
          }
        }
      },
      series: [
        {
          name: 'Countries',
          enableMouseTracking: false,
          showInLegend: false,
          borderColor: 'white',
          borderWidth: 2,
          nullColor: this.nullColor,
          zIndex: 1
        },
        this.series
      ]
    })
    this.updateOptions(this.specificOptions)
    this.initializeMap()
  }
})
</script>

<style lang="postcss">
</style>
