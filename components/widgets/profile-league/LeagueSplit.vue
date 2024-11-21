<template>
  <div class="w-full">
    <transition name="fade-up" :appear="true">
      <div class="flex w-full">
        <div class="flex items-center">
          <avatar :src="$get(league, 'logo.url')" :rounded="false" :tooltip-position="'left'" :tooltip-color="'dark'" />
        </div>
        <div class="flex items-center pl-4">
          <div>
            <h3 class="leading-none">
              {{ $get(league, 'name', '-') }}
            </h3>
            <!-- <span class="text-grey-l1">
              {{ 'association' }}
            </span> -->
          </div>
        </div>
      </div>
    </transition>
    <div class="w-full mt-2">
      <sortable-table
        :headers="leagueDataHeaders"
        :custom-headers="true"
        :data="leagueTableItems"
        :sort-descending="false"
        sort-by="key"
        class="w-full"
      >
        <template v-slot:headers="props">
          <tr>
            <th />
            <th class="text-right">
              <mover :data="seasonsToSelect" @change="onChangeSeason">
                <template v-slot:content="props">
                  <span class="text-p1 font-medium">
                    {{ $t('app.profile.league.stats.club') }} {{ selectedOtherSeason }}
                  </span>
                </template>
              </mover>
            </th>
            <th class="text-right">
              <span class="text-p1 font-medium pr-6">
                {{ $t('app.profile.league.stats.league') }} {{ selectedOtherSeason }}
              </span>
            </th>
          </tr>
        </template>

        <template v-slot:default="props">
          <td class="font-semibold flex items-center">
            <span class="ml-4">
              {{ $t('app.profile.league.stats.'+props.row.item.key) }}
            </span>
          </td>
          <td class="text-right font-medium">
            <span v-if="props.row.item.key === 'avgStadiumUtilization'" class="font-sans">{{ props.row.item.otherValue | percentage }}</span>
            <span v-else class="font-sans">{{ props.row.item.otherValue | number }}</span>
          </td>
          <td class="text-right font-medium">
            <span v-if="props.row.item.key === 'avgStadiumUtilization'" class="font-sans">{{ props.row.item.lastValue | percentage }}</span>
            <span v-else class="font-sans">{{ props.row.item.lastValue | number }}</span>

            <growth :main-classes="'inline-block pl-2'" :value="props.row.item.lastValue - props.row.item.otherValue" :show-value="false" />
          </td>
        </template>
      </sortable-table>
    </div>
    <transition name="fade-up-delayed" :appear="true">
      <div class="w-full mt-20 overflow-x-auto">
        <sortable-table v-slot:default="props" :headers="socialHeaders" :data="teams" sort-by="social.total" class="w-full">
          <td class="font-semibold flex items-center">
            <avatar
              :classes="'w-10 h-10'"
              :src="props.row.item.logo.url"
              :rounded="false"
              :tooltip-position="'left'"
              :tooltip-color="'dark'"
            />
            <span class="ml-4 font-serif">
              {{ props.row.item.name }}
            </span>
          </td>
          <td class="text-right">
            {{ props.row.item.social.facebook | number }}
          </td>
          <td class="text-right">
            {{ props.row.item.social.instagram | number }}
          </td>
          <td class="text-right">
            {{ props.row.item.social.twitter | number }}
          </td>
          <td class="text-right">
            {{ props.row.item.social.tiktok | number }}
          </td>
          <td class="text-right font-semibold">
            {{ props.row.item.social.total | number }}
          </td>
        </sortable-table>
      </div>
    </transition>

    <appear-transition :percentage-offset="0.4">
      <div class="w-full mt-20">
        <h3>{{ $get(league, 'country.name') }}</h3>
        <table class="w-full mt-4">
          <tbody>
            <tr class="border-t border-grey-l3">
              <td class="font-medium font-serif py-2">
                {{ $t('app.profile.league.country.stats.clubsCount') }}
              </td>
              <td class="text-right font-medium h6 py-2">
                {{ $get(league, 'country.info.teamsCount') | number }}
              </td>
            </tr>
            <tr class="border-t border-b border-grey-l3">
              <td class="font-medium font-serif py-2">
                {{ $t('app.profile.league.country.stats.maleCount') }}
              </td>
              <td class="text-right font-medium h6 py-2">
                {{ $get(league, 'country.info.malePlayersCount') | number }}
              </td>
            </tr>
            <tr class="border-b border-grey-l3">
              <td class="font-medium font-serif py-2">
                {{ $t('app.profile.league.country.stats.femaleCount') }}
              </td>
              <td class="text-right font-medium h6 py-2">
                {{ $get(league, 'country.info.femalePlayersCount') | number }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </appear-transition>

    <appear-transition :percentage-offset="0.1">
      <div class="w-full my-20">
        <h3>{{ $get(team, 'city.name') }}</h3>
        <div class="flex flex-wrap w-full mt-4 -mx-4">
          <div class="w-full sm:w-1/2 flex px-4 min-h-64">
            <GmapMap
              class="w-full h-full"
              :center="mapCenter"
              :options="mapOptions"
              :zoom="7"
              map-type-id="terrain"
            />
          </div>
          <div class="w-full sm:w-1/2 flex flex-col pl-4">
            <div class="flex w-full flex-wrap justify-between">
              <div class="pr-4">
                <data-label :label="$t('app.profile.league.city.population')">
                  {{ $get(team, 'city.info.population') | number }}
                </data-label>
              </div>
              <div class="pr-4">
                <data-label :label="$t('app.profile.league.city.area')">
                  {{ $get(team, 'city.info.area') | number }} <span>km<sup>2</sup></span>
                </data-label>
              </div>
              <div>
                <data-label :label="$t('app.profile.league.city.district')">
                  {{ $get(team, 'city.info.district', '-') }}
                </data-label>
              </div>
            </div>
            <div class="w-full mt-6 font-serif text-grey">
              {{ $get(team, 'city.info.description', '-') }}
            </div>
          </div>
        </div>
      </div>
    </appear-transition>
  </div>
</template>

<script>
import { sum } from 'lodash'
import { mapGetters } from 'vuex'
import Avatar from '@/components/Avatar'
import SortableTable from '@/components/SortableTable'
import DataLabel from '@/components/DataLabel'
import Growth from '@/components/Growth'
import Mover from '@/components/Mover'
import {
  LeagueQuery,
  SeasonsQuery,
  TeamLeagueQuery,
  TeamPrecalcsQuery
} from '@/services/graphql'
import AppearTransition from '@/components/transitions/AppearTransition'

export default {
  name: 'LeagueSplit',

  components: {
    Avatar,
    SortableTable,
    DataLabel,
    Growth,
    Mover,
    AppearTransition
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...TeamLeagueQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.activeSeason.name
        }
      }
    },

    lastLeagueData: {
      ...LeagueQuery,
      variables() {
        return {
          id: this.league.id,
          season: this.activeSeason.name
        }
      },
      skip() {
        return this.league.id == null || this.activeSeason === null
      },
      update(data) {
        return data.league
      }
    },

    teamData: {
      ...TeamPrecalcsQuery,
      variables() {
        return {
          id: this.team.id,
          season: this.selectedOtherSeason
        }
      },
      skip() {
        return this.team.id == null || this.selectedOtherSeason === null
      },
      update(data) {
        return data.team
      }
    },

    otherLeagueData: {
      ...LeagueQuery,
      variables() {
        return {
          id: this.league.id,
          season: this.selectedOtherSeason
        }
      },
      skip() {
        return this.league.id == null || this.selectedOtherSeason === null
      },
      update(data) {
        return data.league
      }
    },

    seasons: {
      ...SeasonsQuery,
      skip() {
        return this.activeSeason === null
      },
      result({ data }) {
        if (data.seasons.length > 2) {
          data.seasons.shift()
        }
        this.selectedOtherSeason = this.$get(
          data.seasons.find(s => s.name === this.lastSeason.name),
          'name',
          null
        )
      }
    }
  },

  data: () => ({
    selectedOtherSeason: null,
    mapOptions: {
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      disableDefaultUi: false
    },

    socialHeaders: [
      {
        text: 'Team followers',
        align: 'left',
        value: 'name',
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
        text: 'TikTok',
        value: 'social.tiktok',
        align: 'right'
      },
      {
        text: 'Total',
        value: 'social.total',
        align: 'right'
      }
    ],

    leagueDataHeaders: [
      {
        text: '',
        align: 'left',
        value: 'key',
        sortable: false,
        width: '50%'
      },
      {
        text: '',
        value: 'otherValue',
        align: 'right'
      },
      {
        text: '',
        value: 'lastValue',
        align: 'right'
      }
    ]
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason',
      lastSeason: 'active/getLastSeason'
    }),

    team() {
      return this.$get(this.unit, 'entity', {})
    },

    league() {
      return this.$get(this.unit, 'entity.teamLeagues.0.league', {})
    },

    seasonsToSelect() {
      const seasons = this.seasons || []

      return seasons.map(season => season.name)
    },

    leagueTableItems() {
      return [
        {
          key: 'avgStadiumAttendance',
          lastValue: this.$get(
            this.otherLeagueData,
            'precalcs.0.data.matchVisitors.avgStadiumAttendance',
            0
          ),
          otherValue: this.$get(
            this.teamData,
            'precalcs.0.data.matchVisitors.avgStadiumAttendance',
            0
          )
        },
        {
          key: 'avgMatchdayAttendance',
          lastValue: this.$get(
            this.otherLeagueData,
            'precalcs.0.data.matchVisitors.avgMatchdayAttendance',
            0
          ),
          otherValue: this.$get(
            this.teamData,
            'precalcs.0.data.matchVisitors.avgMatchdayAttendance',
            0
          )
        },
        {
          key: 'avgStadiumCapacity',
          lastValue: this.$get(
            this.otherLeagueData,
            'precalcs.0.data.matchVisitors.avgStadiumCapacity',
            0
          ),
          otherValue: this.$get(
            this.teamData,
            'precalcs.0.data.matchVisitors.avgStadiumCapacity',
            0
          )
        },
        {
          key: 'avgStadiumUtilization',
          lastValue: this.$get(
            this.otherLeagueData,
            'precalcs.0.data.matchVisitors.avgStadiumUtilization',
            0
          ),
          otherValue: this.$get(
            this.teamData,
            'precalcs.0.data.matchVisitors.avgStadiumUtilization',
            0
          )
        },
        {
          key: 'matchesCount',
          lastValue: this.$get(
            this.otherLeagueData,
            'precalcs.0.data.matchVisitors.matchesCount',
            0
          ),
          otherValue: this.$get(
            this.teamData,
            'precalcs.0.data.matchVisitors.matchesCount',
            0
          )
        },
        {
          key: 'cumulativeAttendance',
          lastValue: this.$get(
            this.otherLeagueData,
            'precalcs.0.data.matchVisitors.cumulativeAttendance',
            0
          ),
          otherValue: this.$get(
            this.teamData,
            'precalcs.0.data.matchVisitors.cumulativeAttendance',
            0
          )
        }
      ]
    },

    teams() {
      return this.$get(
        this.unit,
        'entity.teamLeagues.0.league.leagueTeams',
        []
      ).map(leagueTeam => {
        const team = {
          ...leagueTeam.team,
          social: {}
        }

        this.$get(leagueTeam, 'team.groupedSocialAccounts', []).forEach(
          account => {
            if (account.type === 'web-page') {
              return
            }

            team.social[account.type] = account.followersCount
          }
        )

        team.social.total = sum(Object.values(team.social))

        return team
      })
    },

    mapCenter() {
      return {
        lat: this.$get(this.team, 'city.latitude', 0),
        lng: this.$get(this.team, 'city.longitude', 0)
      }
    }
  },

  methods: {
    onChangeSeason(seasonIndex) {
      this.selectedOtherSeason = this.seasonsToSelect[seasonIndex]
    }
  }
}
</script>

<style scoped>
</style>
