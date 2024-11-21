<template>
  <div>
    <h6 class="border-b border-grey-l3">
      {{ $t('app.profile.team.fans.education.title') }}
    </h6>

    <label-split :values="values" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { UnitEducationSplitQuery } from '@/services/graphql'
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
    fields: ['primary', 'secondary', 'bachelor', 'master']
  }),

  apollo: {
    unit: {
      ...UnitEducationSplitQuery,
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
        label: this.$t(`app.profile.team.fans.education.${name}`),
        value: this.$get(
          this.unit,
          `entity.precalcs.0.data.educationSplit.${name}`
        )
      }))
    }
  }
}
</script>
