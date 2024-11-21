<template>
  <div class="flex items-center">
    <div v-if="hasChart">
      <pie-chart
        :specific-options="chartOptions"
        :height="30"
        :series="chartSeries"
        :tooltip="false"
        :enable-mouse-tracking="false"
        :pie-colors="pieColors"
      />
    </div>
    <div class="flex flex-wrap items-center">
      <div :class="{'ml-2' : hasChart}" class="text-left mt-1">
        <h3 v-if="hasChart && animation" :class="labelClass">
          <span ref="bounty" class="flex" />
        </h3>
        <template v-else>
          <h3 v-if="labelIsNumeric" :class="labelClass">
            <span>{{ label | number }}</span>
          </h3>
          <h3 v-else :class="labelClass">
            {{ label }}
          </h3>
        </template>
      </div>
      <div class="text-left max-w-4xs font-medium leading-none ml-2">
        {{ info }}
      </div>
    </div>
  </div>
</template>

<script>
import bounty from 'bounty'
import PieChart from '@/components/charts/PieChart'
import { bountyFilterFix } from '@/services/helpers'

export default {
  name: 'LabelChart',

  components: {
    PieChart
  },

  props: {
    chartValue: {
      type: Number,
      default: null
    },
    pieColors: {
      type: Array,
      default: () => ['#21CE99', '#D4D4D4']
    },
    label: {
      type: [String, Number],
      default: 'Label'
    },
    labelClass: {
      type: String,
      default: 'text-h3'
    },
    info: {
      type: String,
      default: 'Search info'
    },
    animation: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    chartOptions: {
      chart: {
        animation: false
      }
    }
  }),

  computed: {
    labelIsNumeric() {
      return typeof this.label === 'number'
    },

    chartSeries() {
      return {
        name: '',
        data: [
          {
            name: this.label,
            y: this.chartValue
          },
          {
            name: 'foo',
            y: 1 - this.chartValue
          }
        ]
      }
    },

    hasChart() {
      return this.chartValue != null
    }
  },

  watch: {
    label() {
      if (this.$refs.bounty != null) {
        bounty({
          el: this.$refs.bounty,
          value: this.label,
          duration: 2000
        })
        setTimeout(() => {
          bountyFilterFix(this.$refs.bounty)
        }, 2000)
      }
    }
  },

  mounted() {
    if (this.$refs.bounty != null) {
      bounty({
        el: this.$refs.bounty,
        value: this.label,
        duration: 2000
      })
      setTimeout(() => {
        bountyFilterFix(this.$refs.bounty)
      }, 2000)
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
