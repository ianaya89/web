<template>
  <div>
    <h6 class="mt-6 border-b border-grey-l3">
      {{ $t('app.profile.team.fans.status.title') }}
    </h6>

    <label-split :values="values" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { UnitStatusSplitQuery } from '@/services/graphql'
import LabelSplit from '@/components/widgets/LabelSplit'

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
    fields: ['married', 'divorced', 'single']
  }),

  apollo: {
    unit: {
      ...UnitStatusSplitQuery,
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
        label: this.$t(`app.profile.team.fans.status.${name}`),
        value: this.$get(
          this.unit,
          `entity.precalcs.0.data.statusSplit.${name}`
        )
      }))
    }
  }
}
</script>
