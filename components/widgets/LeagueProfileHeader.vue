<template>
  <profile-header-partial>
    <template v-slot:image>
      <transition mode="out-in" name="fade">
        <div :key="$get(unit, 'entity.titlePhotos.0', 'NIL')" class="w-full h-80 sm:h-auto sm:min-h-128 overflow-hidden">
          <img
            class="hero-bg sm:w-full h-80 sm:h-auto sm:min-h-128 object-cover"
            :src="$get(unit, 'entity.titlePhotos.0.url', require('../../assets/images/profile-image-fallback.jpg'))"
            alt="Image"
          >
        </div>
      </transition>
    </template>

    <transition name="fade-up" :appear="true">
      <profile-header ref="profileHeader">
        <template v-slot:logo>
          <div class="w-16 h-16 mb-2">
            <avatar
              classes="w-16 h-16"
              :src="$get(unit, 'entity.logo.url', undefined)"
            />
          </div>
        </template>
        <template v-slot:title>
          {{ $get(unit, 'entity.name', '-') }}
        </template>
        <template v-slot:content>
          <data-label
            :label="$t('app.profile.header.info.country')"
            class="w-1/2 sm:w-1/3 text-left pt-2 pr-2"
          >
            {{ $get(unit, 'entity.country.name', '-') }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.founded')" class="w-1/2 sm:w-1/3 text-left pr-2 pt-2 pt-2">
            {{ $get(unit, 'entity.profile.founded', null) | date('YYYY') }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.sport')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ $t('general.football') }}
          </data-label>
          <data-label :label="$t('app.league.profile.header.info.average_stadium_capacity')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ $get(unit, 'entity.precalcs.0.data.matchVisitors.avgStadiumCapacity') | number }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.average_attendance')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ $get(unit, 'entity.precalcs.0.data.matchVisitors.avgStadiumAttendance') | number }}
          </data-label>
          <data-label :label="$t('app.league.profile.header.info.average_club_revenue')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ averageClubRevenue | currency }}
          </data-label>
        </template>

        <template v-slot:more>
          <div class="py-8">
            <div class="flex flex-wrap">
              <div class="w-4/5 sm:w-1/3 lg:w-1/4 text-left">
                <data-label :label="$t('app.profile.header.info.quote')">
                  <span class="h3 normal-case leading-tight">
                    {{ $get(unit, 'entity.profile.keyQuote', '-') }}
                  </span>
                </data-label>
              </div>
              <div class="w-1/6 text-right sm:text-left text-h1 text-grey-l2 -mt-3">
                <svg-icon name="ui-elements/quotation-up" class="opacity-5 -ml-10 sm:-ml-3 w-24" />
              </div>
              <div class="w-full sm:w-1/2 lg:w-1/2 text-left">
                <data-label :label="$t('app.league.profile.header.info.about_us')">
                  <span class="font-serif text-h7 normal-case leading-normal text-grey">
                    {{ $get(unit, 'entity.profile.vision', '-') }}
                  </span>
                </data-label>
              </div>
            </div>
          </div>

          <div class="border-t border-grey-l4 py-8">
            <country-coefficients :unit-id="unitId" />
          </div>

          <div class="border-t border-grey-l4 py-8">
            <div class="flex flex-wrap">
              <data-label :label="$t('app.profile.header.info.employees')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
                {{ $get(unit, 'entity.profile.fullTimeEmployeesCount') }}
              </data-label>
              <data-label :label="$t('app.profile.header.info.academies')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
                {{ $get(unit, 'entity.profile.academiesCount') }}
              </data-label>
              <data-label :label="$t('app.profile.header.info.teams')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
                {{ $get(unit, 'entity.profile.footballSchoolsCount') }}
              </data-label>
              <data-label :label="$t('app.profile.header.info.partner_clubs')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
                {{ $get(unit, 'entity.profile.partnerClubsCount') }}
              </data-label>
              <data-label :label="$t('app.profile.header.info.players')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
                {{ $get(unit, 'entity.profile.youthPlayersCount') }}
              </data-label>
              <data-label :label="$t('app.profile.header.info.coaches')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
                {{ $get(unit, 'entity.profile.coachesCount') }}
              </data-label>
              <data-label :label="$t('app.profile.header.info.shareholders')" class="w-full sm:w-1/2 lg:w-1/3 text-left pt-2 pr-2">
                <span class="text-p3 pr-2">
                  {{ $get(unit, 'entity.profile.shareholders', []).map(item => item.name).join(', ') || '-' }}
                </span>
              </data-label>
            </div>
          </div>
          <div class="border-t border-grey-l4 py-8">
            <div class="flex flex-wrap">
              <div class="w-full sm:w-1/3 text-left pr-4 pl-4 relative">
                <div class="fading-gradient" />
                <div class="flex mb-5">
                  <div class="w-1/2 text-left text-grey text-p2 uppercase tracking-wide">
                    {{ $t('app.profile.header.info.history') }}
                  </div>
                </div>
                <div class="flex relative shadow-inner sm:shadow-none">
                  <div class="scrollable-medium p-4 sm:p-0">
                    <timeline :visible="milestones.length" :items="milestones" class="pb-8 pr-4" />
                  </div>
                </div>
              </div>

              <div class="w-full sm:w-1/3 flex justify-center text-left px-4 relative">
                <div>
                  <div class="fading-gradient" />
                  <div class="flex mb-5">
                    <div class="w-1/2 text-left text-grey text-p2 uppercase tracking-wide">
                      {{ $t('app.profile.header.info.titles') }}
                    </div>
                  </div>
                  <div class="flex relative shadow-inner sm:shadow-none">
                    <div class="scrollable-medium p-4 sm:p-0">
                      <trophies :items="trophies" class="pb-8" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-full sm:w-1/3 text-left pr-4 pl-4 relative">
                <heroes :items="$get(unit, 'entity.heroes', [])" />
              </div>
            </div>
          </div>
          <div class="border-t border-grey-l4 py-8 pl-4">
            <div class="flex">
              <div class="w-1/3 ml-auto text-right flex flex-wrap content-end">
                <div class="w-full">
                  <app-button :title="$t('app.profile.header.show_less')" :btn-class="'link'" icon="lni-arrow-up" @clicked="closeMoreInfo" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </profile-header>
    </transition>
  </profile-header-partial>
</template>

<script>
import Timeline from '@/components/Timeline'
import Trophies from '@/components/widgets/Trophies'
import Heroes from '@/components/widgets/Heroes'
import DataLabel from '@/components/DataLabel'
import ProfileHeader from '@/components/ProfileHeader'
import ProfileHeaderPartial from '@/components/partials/ProfileHeaderPartial'
import Avatar from '@/components/Avatar'
import AppButton from '@/components/AppButton'
import { UnitHeaderQuery } from '@/services/graphql'
import CountryCoefficients from '@/components/widgets/CountryCoefficients'

export default {
  name: 'LeagueProfileHeader',

  components: {
    ProfileHeaderPartial,
    ProfileHeader,
    DataLabel,
    CountryCoefficients,
    Heroes,
    Trophies,
    Timeline,
    Avatar,
    AppButton
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    season: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitHeaderQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.season
        }
      }
    }
  },

  computed: {
    trophies() {
      return this.$get(this.unit, 'entity.trophies', [])
    },

    milestones() {
      return this.$get(this.unit, 'entity.milestones', []).sort(
        (a, b) => a.season.name.localeCompare(b.season.name) * -1
      )
    },

    averageClubRevenue() {
      return (
        this.$get(this.unit, 'entity.leagueTeams', []).reduce(
          (sum, team) =>
            sum +
            this.$get(team, 'team.precalcs.0.data.finance.totalRevenue', 0),
          0
        ) / this.$get(this.unit, 'entity.leagueTeams', []).length
      )
    }
  },

  methods: {
    closeMoreInfo() {
      this.$refs.profileHeader.toggleMoreInfo()
    }
  }
}
</script>

<style lang="postcss" scoped>
img.hero-bg {
  max-width: none;
}
</style>
