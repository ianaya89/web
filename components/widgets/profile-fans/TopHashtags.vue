<template>
  <div class="w-full my-20  overflow-x-auto">
    <template v-if="values.length">
      <sortable-table v-slot:default="props" :headers="hashtagsHeaders" :data="values" class="" sort-by="value">
        <td class="">
          #{{ props.row.item.name }}
          <app-tooltip class="font-normal text-left" :position="'right'">
            <template v-slot:activator>
              <span class="lni-question-circle text-grey mt-1 ml-2" />
            </template>
            <p class="w-64 font-sans">
              {{ $t('app.profile.team.fans.hashtags.overview') }}
            </p>
          </app-tooltip>
        </td>
        <td class="text-right font-semibold">
          {{ props.row.item.value | number }}
        </td>
      </sortable-table>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { UnitHashtagsQuery } from '@/services/graphql'
import SortableTable from '@/components/SortableTable'
import AppTooltip from '@/components/AppTooltip'

export default {
  components: {
    SortableTable,
    AppTooltip
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    hashtagsHeaders: []
  }),

  apollo: {
    unit: {
      ...UnitHashtagsQuery,
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
      activeSeason: 'active/getCurrentSeason'
    }),

    values() {
      return this.$get(this.unit, 'entity.precalcs.0.data.hashtags', [])
    }
  },

  mounted() {
    this.hashtagsHeaders = [
      {
        text: this.$t('app.profile.team.fans.hashtags.title'),
        align: 'left',
        value: 'name',
        sortable: false,
        width: '50%'
      },
      {
        text: this.$t('general.total'),
        value: 'value',
        align: 'right'
      }
    ]
  }
}
</script>
