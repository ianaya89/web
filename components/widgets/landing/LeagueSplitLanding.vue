<template>
  <div class="w-full">
    <transition name="fade-up" :appear="true">
      <div class="flex w-full">
        <div class="flex items-center">
          <avatar :src="leagueLogo" :rounded="false" :tooltip-position="'left'" :tooltip-color="'dark'" />
        </div>
        <div class="flex items-center pl-4">
          <div>
            <h3 class="leading-none">
              {{ leagueName }}
            </h3>
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
            <img
              :src="require('../../../assets/images/team/league/col-1.png')"
              alt="first column image placeholder"
              class=""
            >
          </td>
          <td class="text-right font-medium">
            <img
              :src="require('../../../assets/images/team/league/col-2.png')"
              alt="second column image placeholder"
              class="float-right"
            >
          </td>
          <td class="text-right font-medium">
            <img
              :src="require('../../../assets/images/team/league/col-3.png')"
              alt="third column image placeholder"
              class="float-right"
            >
          </td>
        </template>
      </sortable-table>
    </div>
    <transition name="fade-up-delayed" :appear="true">
      <div class="w-full mt-20 overflow-x-auto">
        <sortable-table
          v-slot:default="props"
          :headers="socialHeaders"
          :data="teams"
          sort-by="social.total"
          class="w-full"
        >
          <td class="font-semibold flex items-center">
            <img
              :src="require('../../../assets/images/team/league/team-follow-1.png')"
              alt="first column image placeholder"
              class=""
            >
          </td>
          <td class="text-right">
            <img
              :src="require('../../../assets/images/team/league/team-follow-2.png')"
              alt="second column image placeholder"
              class="float-right"
            >
          </td>
          <td class="text-right">
            <img
              :src="require('../../../assets/images/team/league/team-follow-2.png')"
              alt="third column image placeholder"
              class="float-right"
            >
          </td>
          <td class="text-right">
            <img
              :src="require('../../../assets/images/team/league/team-follow-3.png')"
              alt="fourth column image placeholder"
              class="float-right"
            >
          </td>
          <td class="text-right">
            <img
              :src="require('../../../assets/images/team/league/team-follow-3.png')"
              alt="fifth column image placeholder"
              class="float-right"
            >
          </td>
          <td class="text-right font-semibold">
            <img
              :src="require('../../../assets/images/team/league/team-follow-4.png')"
              alt="sixth column image placeholder"
              class="float-right"
            >
          </td>
        </sortable-table>
      </div>
    </transition>

    <appear-transition :percentage-offset="0.4">
      <div class="w-full mt-20">
        <h3>{{ country }}</h3>
        <table class="w-full mt-4">
          <tbody>
            <tr class="border-t border-grey-l3">
              <td class="font-medium font-serif py-2">
                <img
                  :src="require('../../../assets/images/team/league/teams-count1.png')"
                  alt="first column image placeholder"
                  class=""
                >
              </td>
              <td class="text-right font-medium h6 py-2">
                <img
                  :src="require('../../../assets/images/team/league/teams-count.png')"
                  alt="first column image placeholder"
                  class="float-right"
                >
              </td>
            </tr>
            <tr class="border-t border-b border-grey-l3">
              <td class="font-medium font-serif py-2">
                <img
                  :src="require('../../../assets/images/team/league/male-count1.png')"
                  alt="second column image placeholder"
                  class=""
                >
              </td>
              <td class="text-right font-medium h6 py-2">
                <img
                  :src="require('../../../assets/images/team/league/male-count.png')"
                  alt="second column image placeholder"
                  class="float-right"
                >
              </td>
            </tr>
            <tr class="border-b border-grey-l3">
              <td class="font-medium font-serif py-2">
                <img
                  :src="require('../../../assets/images/team/league/female-count1.png')"
                  alt="third column image placeholder"
                  class=""
                >
              </td>
              <td class="text-right font-medium h6 py-2">
                <img
                  :src="require('../../../assets/images/team/league/female-count.png')"
                  alt="third column image placeholder"
                  class="float-right"
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </appear-transition>

    <appear-transition :percentage-offset="0.1">
      <div class="w-full my-20">
        <h3>{{ $get(city, 'name') }}</h3>
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
                  {{ $get(city, 'info.population') | number }}
                </data-label>
              </div>
              <div class="pr-4">
                <data-label :label="$t('app.profile.league.city.area')">
                  {{ $get(city, 'info.area') | number }} <span>km<sup>2</sup></span>
                </data-label>
              </div>
              <div>
                <data-label :label="$t('app.profile.league.city.district')">
                  {{ $get(city, 'info.district', '-') }}
                </data-label>
              </div>
            </div>
            <div class="w-full mt-6 font-serif text-grey">
              {{ $get(city, 'info.description', '-') }}
            </div>
          </div>
        </div>
      </div>
    </appear-transition>
  </div>
</template>

<script>
// import { sum } from 'lodash'
import { mapGetters } from 'vuex'
import Avatar from '@/components/Avatar'
import SortableTable from '@/components/SortableTable'
import DataLabel from '@/components/DataLabel'
import Mover from '@/components/Mover'
import {
  LeagueQuery,
  SeasonsQuery,
  // TeamLeagueQuery,
  TeamPrecalcsQuery
} from '@/services/graphql'
import AppearTransition from '@/components/transitions/AppearTransition'

export default {
  name: 'LeagueSplitLanding',

  components: {
    Avatar,
    SortableTable,
    DataLabel,
    Mover,
    AppearTransition
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    leagueName: {
      type: String,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    city: {
      type: Object,
      required: false
    },
    // eslint-disable-next-line vue/require-default-prop
    country: {
      type: String,
      required: false
    },
    // eslint-disable-next-line vue/require-default-prop
    leagueLogo: {
      type: String,
      required: false
    }
  },

  apollo: {
    // unit: {
    //   ...TeamLeagueQuery,
    //   variables() {
    //     return {
    //       id: this.unitId,
    //       season: this.activeSeason.name
    //     }
    //   }
    // },

    lastLeagueData: {
      ...LeagueQuery,
      variables() {
        return {
          id: this.leagueId,
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

    teams() {
      const teamsArr = []
      for (let i = 1; i <= 10; i++) {
        teamsArr.push({
          id: i,
          name: 'test',
          logo: {
            url: ''
          },
          social: {
            facebook: i,
            instagram: i,
            total: i,
            twitter: i,
            youtube: i
          }
        })
      }
      return teamsArr
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

    mapCenter() {
      return {
        lat: this.$get(this.city, 'latitude', 0),
        lng: this.$get(this.city, 'longitude', 0)
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
