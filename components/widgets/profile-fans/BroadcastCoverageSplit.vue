<template>
  <div>
    <h6 class="border-b border-grey-l3">
      {{ $t('app.profile.team.fans.broadcastCoverage.title') }}
    </h6>

    <number-label-split :values="values" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { UnitBroadcastCoverageSplitQuery } from '@/services/graphql'
import NumberLabelSplit from '@/components/widgets/NumberLabelSplit'

export default {
  components: {
    NumberLabelSplit
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    fields: [
      'liveBroadcastHours',
      'delayedBroadcastHours',
      'broadcastedHighlightsHours'
    ]
  }),

  apollo: {
    unit: {
      ...UnitBroadcastCoverageSplitQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.activeSeason.name
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      activeSeason: 'active/getLastSeason'
    }),

    values() {
      return this.fields.map(name => ({
        label: this.$t(`app.profile.team.fans.broadcastCoverage.${name}`),
        value: this.$get(
          this.unit,
          `entity.precalcs.0.data.broadcastCoverageSplit.${name}`
        )
      }))
    }
  }
}
</script>
