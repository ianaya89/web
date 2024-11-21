<template>
  <div class="w-full sm:w-1/2 pr-0 sm:pr-6">
    <h6 class="pt-8">
      {{ $t('app.profile.team.fans.byCountry.title') }}
    </h6>
    <template v-if="values.length">
      <table class="w-full font-medium mt-4">
        <tbody>
          <tr v-for="(country, index) in values" :key="country.label+index" class="border-b border-grey-l2">
            <td class="py-2">
              <span class="ml-2">{{ country.label }}</span>
            </td>
            <td class="text-right">
              {{ country.value | percentage }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import { mapGetters } from 'vuex'
import { UnitCountrySplitQuery } from '@/services/graphql'

export default {
  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitCountrySplitQuery,
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
      return sortBy(
        this.$get(this.unit, 'entity.precalcs.0.data.countrySplit', []),
        country => -country.value
      )
    }
  }
}
</script>
