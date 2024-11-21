<template>
  <div class="w-full mt-10 mb-10 overflow-x-auto">
    <sortable-table v-slot:default="props" :headers="mentionsHeaders" :data="mentions" sort-by="sum" class="w-full -mx-2">
      <td class="text-left">
        {{ props.row.item.name }}
      </td>
      <td class="text-right">
        {{ props.row.item.videos | number }}
      </td>
      <td class="text-right">
        {{ props.row.item.images | number }}
      </td>
      <td class="text-right">
        {{ props.row.item.checkIns | number }}
      </td>
      <td class="text-right font-semibold">
        {{ props.row.item.sum | number }}
      </td>
    </sortable-table>
  </div>
</template>

<script>
import SortableTable from '@/components/SortableTable'
import { StadiumMentionsQuery } from '@/services/graphql'

export default {
  name: 'StadiumMentions',

  components: {
    SortableTable
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    team: StadiumMentionsQuery
  },

  data: () => ({
    team: StadiumMentionsQuery.mock,
    mentionsHeaders: [
      {
        text: 'Stadium mentions',
        align: 'left',
        value: 'name',
        sortable: false,
        width: '50%'
      },
      {
        text: 'Videos',
        value: 'videos',
        align: 'right'
      },
      {
        text: 'Images',
        value: 'images',
        align: 'right'
      },
      {
        text: 'Check-ins',
        value: 'checkIns',
        align: 'right'
      },
      {
        text: 'Total',
        value: 'sum',
        align: 'right'
      }
    ]
  }),

  computed: {
    mentions() {
      return this.team.stadium ? this.team.stadium.mentions : []
    }
  }
}
</script>

<style scoped>
</style>
