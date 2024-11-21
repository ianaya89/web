<template>
  <div>
    <h6 class="mt-6 border-b border-grey-l3">
      {{ $t('app.profile.team.fans.income.title') }}
    </h6>

    <label-split :values="values" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LabelSplit from '@/components/widgets/LabelSplit'
import { UnitIncomeSplitQuery } from '@/services/graphql'

export default {
  components: {
    LabelSplit
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    fields: ['group00', 'group10', 'group20', 'group50']
  }),

  apollo: {
    unit: {
      ...UnitIncomeSplitQuery,
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
        label: this.$t(`app.profile.team.fans.income.${name}`),
        value: this.$get(
          this.unit,
          `entity.precalcs.0.data.incomeSplit.${name}`
        )
      }))
    }
  }
}
</script>
