<template>
  <div>
    <h6 class="mt-6 border-b border-grey-l3">
      {{ $t('app.profile.team.fans.sharedVideoPlatforms.title') }}
    </h6>

    <number-label-split :values="values" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { UnitSharedVideoPlatformsSplitQuery } from '@/services/graphql'
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
    fields: ['youtube', 'twitch']
  }),

  apollo: {
    unit: {
      ...UnitSharedVideoPlatformsSplitQuery,
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
        label: this.$t(`app.profile.team.fans.sharedVideoPlatforms.${name}`),
        value: this.$get(
          this.unit,
          `entity.precalcs.0.data.sharedVideoPlatformsSplit.${name}`
        )
      }))
    }
  }
}
</script>
