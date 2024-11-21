<template>
  <div class="w-full">
    <div v-if="$apollo.queries.unit.loading" class="w-full flex z-10 loader-bg p-8">
      <logo-loader class="h-6 w-6 m-auto" />
    </div>
    <accordion v-else :multi="true">
      <accordion-item
        v-for="(teamData, index) in playersGroupedByTeam"
        :key="$get(teamData, '0.team.id', index)"
        class="w-full mb-12 border-grey-l4"
        :auto-open="index===0"
      >
        <template v-slot:header>
          <div class="w-full flex items-center">
            <div class="sm:w-1/4 lg:w-auto">
              <avatar :classes="'w-12 h-12'" :src="$get(teamData, '0.team.logo.url')" :tooltip-position="'left'" />
            </div>
            <div class="w-3/4 pl-2">
              <span class="text-h6">
                <span class="capitalize">{{ $get(teamData, '0.team.name', '-') }}</span>
              </span>
            </div>
          </div>
        </template>
        <sortable-table
          v-slot:default="props"
          class="overflow-x-auto"
          :headers="headers"
          :rows-per-page="10"
          :data="teamData"
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
      </accordion-item>
    </accordion>
  </div>
</template>

<script>
import { groupBy, sum } from 'lodash'
import { mapGetters } from 'vuex'
import { UnitPlayersQuery } from '@/services/graphql/index'
import SortableTable from '@/components/SortableTable'
import Avatar from '@/components/Avatar'
import LogoLoader from '@/components/LogoLoader'
import Accordion from '@/components/Accordion'
import AccordionItem from '@/components/AccordionItem'
// import AppTooltip from '@/components/AppTooltip'

export default {
  name: 'LeaguePlayersSplit',

  components: {
    SortableTable,
    LogoLoader,
    Avatar,
    Accordion,
    AccordionItem
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
        text: '',
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

    playersGroupedByTeam() {
      return Object.values(
        groupBy(
          this.$get(this.unit, 'entity.leaguePlayers', []).map(leaguePlayer => {
            leaguePlayer.social = {}

            this.$get(leaguePlayer, 'player.groupedSocialAccounts', []).forEach(
              account => {
                leaguePlayer.social[account.type] = account.followersCount
              }
            )

            leaguePlayer.social.total = sum(Object.values(leaguePlayer.social))

            return leaguePlayer
          }),
          'team.id'
        )
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
