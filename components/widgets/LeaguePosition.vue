<template>
  <div class="w-full flex">
    <div class="w-2/3">
      <league-position-chart v-if="leaguePositionChartSeries.data.length" :height="400" :series="leaguePositionChartSeries" />
    </div>
    <div class="w-1/3">
      <div class="table flex flex-col w-2/3 mx-auto">
        <div class="text-right">
          <a v-if="isViewingOwnProfile" href="#" @click.prevent="onItemAddClick">
            <i class="fa fa-plus" /> {{ $t('general.create_new') }}
          </a>
        </div>
        <div v-for="record in leaguePositions" :key="record.season.id" class="flex pt-2 pb-1 mb-1 border-b border-grey-l4">
          <app-tooltip class="w-1/2">
            <template v-slot:activator>
              <span>
                {{ record.season.name }}
              </span>
              <span v-if="isViewingOwnProfile">
                <a href="#" class="mx-3" @click.prevent="onItemEditClick(record)">
                  <i class="fa fa-edit" />
                </a>
                <a href="#" @click.prevent="onItemDeleteClick(record)">
                  <i class="fa fa-trash" />
                </a>
              </span>
            </template>
            {{ record.league.name }}
          </app-tooltip>
          <span class="w-1/2 text-right font-medium">
            {{ formatPosition(record.position) }}
          </span>
        </div>
        <team-league-position-modal
          ref="editModal"
          :unit-id="unitId"
          :seasons="seasonsItems"
          :leagues="leaguesItems"
          :input="activeInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import numeral from 'numeral'
import { mapGetters } from 'vuex'
import AppTooltip from '@/components/AppTooltip'
import LeaguePositionChart from '@/components/charts/LeaguePositionChart'
import {
  AllSeasonsQuery,
  DeleteTeamLeaguePositionMutation,
  LeaguesQuery,
  TeamLeaguePositionsQuery
} from '@/services/graphql'
import { buildLeagueChartPosition } from '@/services/helpers'
import TeamLeaguePositionModal from '@/components/modals/TeamLeaguePositionModal'

export default {
  name: 'LeaguePosition',

  components: {
    AppTooltip,
    LeaguePositionChart,
    TeamLeaguePositionModal
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      activeInput: {
        id: null,
        season: null,
        league: null,
        position: null
      }
    }
  },

  apollo: {
    unit: {
      ...TeamLeaguePositionsQuery,
      variables() {
        return {
          id: this.unitId
        }
      }
    },
    allSeasons: AllSeasonsQuery,
    leagues: LeaguesQuery
  },

  computed: {
    ...mapGetters({
      activeUnitID: 'active/unitID'
    }),

    seasonsItems() {
      if (!this.allSeasons) {
        return []
      }
      return this.allSeasons.map(item => {
        return {
          text: item.name,
          value: item.id
        }
      })
    },

    leaguesItems() {
      if (!this.leagues) {
        return []
      }
      const items = this.leagues.map(item => {
        return {
          text: item.name,
          value: item.id
        }
      })
      return sortBy(items, 'text')
    },

    isViewingOwnProfile() {
      return this.activeUnitID === this.unitId
    },

    leaguePositions() {
      return sortBy(
        this.$get(this.unit, 'entity.teamLeagues', []),
        r => -parseInt(r.season.name)
      )
    },

    leaguePositionChartSeries() {
      return {
        name: 'League positions',
        data: sortBy(this.leaguePositions, r => parseInt(r.season.name)).map(
          record => {
            return {
              name: `${record.league.name}: ${record.season.name}`,
              league: record.league,
              season: record.season,
              y: this.formatPositionForChart(record)
            }
          }
        )
      }
    }
  },

  methods: {
    formatPositionForChart(record) {
      const stage = record.league.stage || 1
      const positionWithCoefficient = buildLeagueChartPosition(record.position)
      return parseFloat(`${stage}.${positionWithCoefficient}`)
    },
    // TODO: Make filter
    formatPosition(position) {
      if (!position) {
        return 'N/A'
      }

      return numeral(position).format('0o')
    },

    onItemAddClick() {
      this.activeInput = {
        id: null,
        season: null,
        league: null,
        position: null
      }
      this.$refs.editModal.open()
    },

    onItemEditClick(item) {
      this.activeInput = {
        id: item.id || null,
        season: item.season ? item.season.id + '' : null,
        league: item.league ? item.league.id + '' : null,
        position: item.position
      }
      this.$refs.editModal.open()
    },

    refreshData() {
      this.$apollo.queries.unit.refetch()
    },

    async onItemDeleteClick(item) {
      if (confirm(this.$t('general.delete_confirmation'))) {
        await this.$apollo.mutate({
          ...DeleteTeamLeaguePositionMutation,
          variables: {
            organizationUnitId: this.unitId,
            leagueTeamId: item.id
          }
        })
        this.refreshData()
      }
    }
  }
}
</script>
