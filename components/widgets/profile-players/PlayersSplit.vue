<template>
  <div class="w-full relative">
    <sortable-table
      v-slot:default="props"
      class="mt-12 overflow-x-auto"
      :headers="headers"
      :rows-per-page="10"
      :loading="$apollo.queries.unit.loading"
      :data="players"
      sort-by="social.total"
    >
      <td class="font-semibold flex items-center">
        <img :src="props.row.item.player.logo.url" class="w-8 h-8 rounded-full mr-4">
        {{ props.row.item.player.name }}
      </td>
      <td class="text-right">
        {{ props.row.item.social.facebook | number }}
      <!-- <app-tooltip class="font-normal text-left" :position="'right'">
        <template v-slot:activator>
          <span class="lni-question-circle text-grey mt-1 ml-2" />
        </template>
        <p class="w-64 font-sans">
          List of TV stations and number of full match broadcasts (not sport news)
        </p>
      </app-tooltip> -->
      </td>
      <td class="text-right">
        {{ props.row.item.social.instagram | number }}
      </td>
      <td class="text-right">
        {{ props.row.item.social.twitter | number }}
      </td>
      <td class="text-right">
        {{ props.row.item.social.youtube | number }}
      </td>
      <td class="text-right font-semibold">
        {{ props.row.item.social.total | number }}
      </td>
    </sortable-table>
  </div>
</template>

<script>
import { sum } from 'lodash'
import { mapGetters } from 'vuex'
import { UnitPlayersQuery } from '@/services/graphql/index'
import SortableTable from '@/components/SortableTable'
// import AppTooltip from '@/components/AppTooltip'

export default {
  name: 'PlayersSplit',

  components: {
    SortableTable
    // AppTooltip
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitPlayersQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.activeSeason.name
        }
      }
    }
  },

  data: () => ({
    headers: [
      {
        text: 'Squad:',
        align: 'left',
        value: 'player.name',
        sortable: false,
        width: '50%'
      },
      {
        text: 'Facebook',
        value: 'social.facebook',
        align: 'right'
      },
      {
        text: 'Instagram',
        value: 'social.instagram',
        align: 'right'
      },
      {
        text: 'Twitter',
        value: 'social.twitter',
        align: 'right'
      },
      {
        text: 'YouTube',
        value: 'social.youtube',
        align: 'right'
      },
      {
        text: 'Total',
        value: 'social.total',
        align: 'right'
      }
    ]
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason'
    }),

    players() {
      return this.$get(this.unit, 'entity.teamPlayers', []).map(teamPlayer => {
        teamPlayer.social = {}

        this.$get(teamPlayer, 'player.groupedSocialAccounts', []).forEach(
          account => {
            teamPlayer.social[account.type] = account.followersCount
          }
        )

        teamPlayer.social.total = sum(Object.values(teamPlayer.social))

        return teamPlayer
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
