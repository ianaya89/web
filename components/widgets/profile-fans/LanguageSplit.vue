<template>
  <div class="w-full sm:w-1/2 pl-0 sm:pl-6 mt-10 sm:mt-0">
    <h6 class="pt-8">
      {{ $t('app.profile.team.fans.byLanguage.title') }}
    </h6>
    <template v-if="values.length">
      <table class="w-full font-medium mt-4">
        <tbody>
          <tr v-for="(language, index) in values" :key="language.label + index" class="border-b border-grey-l2">
            <td class="py-2">
              <span class="ml-2">{{ language.label }}</span>
            </td>
            <td class="text-right font-medium">
              {{ language.value | percentage }}
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
import { UnitLanguageSplitQuery } from '@/services/graphql'

export default {
  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitLanguageSplitQuery,
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
        this.$get(this.unit, 'entity.precalcs.0.data.languageSplit', []),
        language => -language.value
      )
    }
  }
}
</script>
