<template>
  <profile-header-partial>
    <template v-slot:image>
      <transition mode="out-in" name="fade">
        <div :key="$get(unit, 'entity.titlePhotos.0.url', 'NIL')" class="w-full h-80 sm:h-auto sm:min-h-128 overflow-hidden">
          <img
            class="hero-bg sm:w-full h-80 sm:h-auto sm:min-h-128 object-cover"
            :src="$get(unit, 'entity.titlePhotos.0.url', require('../../assets/images/profile-image-fallback.jpg'))"
            alt="Image"
          >
        </div>
      </transition>
    </template>

    <transition name="fade-up" :appear="true">
      <profile-header ref="profileHeader" :update-photos-enabled="activeUnitID === unitId">
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
          <data-label :label="$t('app.profile.header.info.city')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ $get(unit, 'entity.city.name', '-') }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.stadium')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ $get(unit, 'entity.teamStadiums.0.stadium.name', '-') }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.founded')" class="w-1/2 sm:w-1/3 text-left pr-2 pt-2 pt-2">
            {{ $get(unit, 'entity.profile.founded', null) | date('YYYY') }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.sport')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ $t('general.football') }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.league')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ $get(unit, 'entity.teamLeagues.0.league.name', '-') }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.stadium_capacity')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ $get(unit, 'entity.teamStadiums.0.stadium.precalcs.0.data.capacity') | number }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.average_attendance')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ $get(unit, 'entity.precalcs.0.data.matchVisitors.avgStadiumAttendance') | number }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.club_revenue')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ $get(unit, 'entity.precalcs.0.data.finance.totalRevenue') | currency }}
          </data-label>
        </template>

        <template v-slot:more>
          <div class="py-8">
            <div class="flex flex-wrap">
              <div class="w-4/5 sm:w-1/3 lg:w-1/4 text-left">
                <data-label
                  :label="$t('app.profile.header.info.quote')"
                  :mutation-input-structure="{profile:{key_quote: null}}"
                  :mutation="teamProfileMutation"
                  :edit-form-structure="keyQuoteEditFormStructure"
                  @edit-mode-trigger="triggerEditModal"
                >
                  <span class="h3 normal-case leading-tight">
                    {{ $get(unit, 'entity.profile.keyQuote', '-') }}
                  </span>
                </data-label>
              </div>
              <div class="w-1/6 text-right sm:text-left text-h1 text-grey-l2 -mt-3">
                <svg-icon name="ui-elements/quotation-up" class="opacity-5 -ml-10 sm:-ml-3 w-24" />
              </div>
              <div class="w-full sm:w-1/2 lg:w-1/2 text-left">
                <data-label
                  :label="$t('app.profile.header.info.about_us')"
                  :mutation-input-structure="{profile:{vision: null}}"
                  :mutation="teamProfileMutation"
                  :edit-form-structure="visionEditFormStructure"
                  @edit-mode-trigger="triggerEditModal"
                >
                  <span class="font-serif text-h7 normal-case leading-normal text-grey">
                    {{ $get(unit, 'entity.profile.vision', '-') }}
                  </span>
                </data-label>
              </div>
            </div>
          </div>
          <div class="border-t border-grey-l4 py-8">
            <h5>{{ $t('app.profile.team.league_position') }}</h5>
            <league-position :unit-id="unitId" />
          </div>
          <div class="border-t border-grey-l4 py-8">
            <div class="flex flex-wrap">
              <data-label
                :label="$t('app.profile.header.info.employees')"
                class="w-1/2 sm:w-1/3 text-left pt-2 pr-2"
                :mutation-input-structure="{profile:{full_time_employees_count: null}}"
                :mutation="teamProfileMutation"
                :edit-form-structure="employeesEditFormStructure"
                @edit-mode-trigger="triggerEditModal"
              >
                {{ $get(unit, 'entity.profile.fullTimeEmployeesCount') }}
              </data-label>
              <data-label
                :label="$t('app.profile.header.info.academies')"
                class="w-1/2 sm:w-1/3 text-left pt-2 pr-2"
                :mutation-input-structure="{profile:{academies_count: null}}"
                :mutation="teamProfileMutation"
                :edit-form-structure="academiesEditFormStructure"
                @edit-mode-trigger="triggerEditModal"
              >
                {{ $get(unit, 'entity.profile.academiesCount') }}
              </data-label>
              <data-label
                :label="$t('app.profile.header.info.teams')"
                class="w-1/2 sm:w-1/3 text-left pt-2 pr-2"
                :mutation-input-structure="{profile:{football_schools_count: null}}"
                :mutation="teamProfileMutation"
                :edit-form-structure="footballSchoolsEditFormStructure"
                @edit-mode-trigger="triggerEditModal"
              >
                {{ $get(unit, 'entity.profile.footballSchoolsCount') }}
              </data-label>
              <data-label
                :label="$t('app.profile.header.info.partner_clubs')"
                class="w-1/2 sm:w-1/3 text-left pt-2 pr-2"
                :mutation-input-structure="{profile:{partner_clubs_count: null}}"
                :mutation="teamProfileMutation"
                :edit-form-structure="partnerClubsEditFormStructure"
                @edit-mode-trigger="triggerEditModal"
              >
                {{ $get(unit, 'entity.profile.partnerClubsCount') }}
              </data-label>
              <data-label
                :label="$t('app.profile.header.info.youth_players')"
                class="w-1/2 sm:w-1/3 text-left pt-2 pr-2"
                :mutation-input-structure="{profile:{youth_players_count: null}}"
                :mutation="teamProfileMutation"
                :edit-form-structure="youthPlayersEditFormStructure"
                @edit-mode-trigger="triggerEditModal"
              >
                {{ $get(unit, 'entity.profile.youthPlayersCount') }}
              </data-label>
              <data-label
                :label="$t('app.profile.header.info.coaches')"
                class="w-1/2 sm:w-1/3 text-left pt-2 pr-2"
                :mutation-input-structure="{profile:{coaches_count: null}}"
                :mutation="teamProfileMutation"
                :edit-form-structure="coachesEditFormStructure"
                @edit-mode-trigger="triggerEditModal"
              >
                {{ $get(unit, 'entity.profile.coachesCount') }}
              </data-label>
              <data-label
                :label="$t('app.profile.header.info.shareholders')"
                class="w-full sm:w-1/2 lg:w-1/3 text-left pt-2 pr-2"
                :mutation-input-structure="{profile:{shareholders: []}}"
                :mutation="teamProfileMutation"
                :edit-form-structure="shareholdersEditFormStructure"
                @edit-mode-trigger="triggerEditModal"
              >
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
                    <timeline :visible="milestones.length" :items="milestones" :unit-id="unitId" :season="season" class="pb-8 pr-4" />
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
                      <trophies :items="trophies" :unit-id="unitId" :season="season" class="pb-8" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-full sm:w-1/3 text-left pr-4 pl-4 relative">
                <heroes :unit-id="unitId" :items="$get(unit, 'entity.heroes', [])" :season="season" :update-photos-enabled="activeUnitID === unitId" />
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
    <edit-modal ref="editModal" :structure="activeForm.structure" :mutation="activeForm.mutation" :mutation-input-structure="activeForm.mutationInputStructure" />
  </profile-header-partial>
</template>

<script>
import LeaguePosition from '@/components/widgets/LeaguePosition'
import Timeline from '@/components/Timeline'
import Trophies from '@/components/widgets/Trophies'
import Heroes from '@/components/widgets/Heroes'
import DataLabel from '@/components/DataLabel'
import ProfileHeader from '@/components/ProfileHeader'
import ProfileHeaderPartial from '@/components/partials/ProfileHeaderPartial'
import Avatar from '@/components/Avatar'
import AppButton from '@/components/AppButton'
import { TeamProfileMutation, UnitHeaderQuery } from '@/services/graphql'
import EditModal from '@/components/modals/EditModal'
import editMode from '@/services/mixins/editMode'
import { numberRangeOptions } from '@/config/select-options'

export default {
  name: 'TeamProfileHeader',

  components: {
    ProfileHeaderPartial,
    ProfileHeader,
    DataLabel,
    Heroes,
    Trophies,
    Timeline,
    LeaguePosition,
    Avatar,
    AppButton,
    EditModal
  },

  mixins: [editMode],

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

  data: () => ({
    teamProfileMutation: TeamProfileMutation,
    numberRangeOptions: numberRangeOptions
  }),

  computed: {
    activeUnitID() {
      return this.$store.getters['active/unitID']
    },

    trophies() {
      return this.$get(this.unit, 'entity.trophies', [])
    },

    milestones() {
      return this.$get(this.unit, 'entity.milestones', [])
    },

    keyQuoteEditFormStructure() {
      if (this.activeUnitID !== this.unitId) {
        return null
      }

      return {
        inputs: [
          {
            key: 'key_quote',
            mutationKey: 'profile.key_quote',
            type: 'textarea',
            required: true,
            label: this.$t('app.profile.header.info.quote'),
            model: this.$get(this.unit, 'entity.profile.keyQuote', null)
          }
        ]
      }
    },

    visionEditFormStructure() {
      if (this.activeUnitID !== this.unitId) {
        return null
      }

      return {
        inputs: [
          {
            key: 'vision',
            mutationKey: 'profile.vision',
            type: 'textarea',
            required: true,
            label: this.$t('app.profile.header.info.about_us'),
            model: this.$get(this.unit, 'entity.profile.vision', null)
          }
        ]
      }
    },

    employeesEditFormStructure() {
      if (this.activeUnitID !== this.unitId) {
        return null
      }

      return {
        inputs: [
          {
            key: 'full_time_employees_count',
            mutationKey: 'profile.full_time_employees_count',
            type: 'text',
            required: true,
            options: numberRangeOptions,
            label: this.$t('app.profile.header.info.employees'),
            model: this.$get(
              this.unit,
              'entity.profile.fullTimeEmployeesCount',
              null
            )
          }
        ]
      }
    },

    academiesEditFormStructure() {
      if (this.activeUnitID !== this.unitId) {
        return null
      }

      return {
        inputs: [
          {
            key: 'academies_count',
            mutationKey: 'profile.academies_count',
            type: 'text',
            required: true,
            options: numberRangeOptions,
            label: this.$t('app.profile.header.info.academies'),
            model: this.$get(this.unit, 'entity.profile.academiesCount', null)
          }
        ]
      }
    },

    footballSchoolsEditFormStructure() {
      if (this.activeUnitID !== this.unitId) {
        return null
      }

      return {
        inputs: [
          {
            key: 'football_schools_count',
            mutationKey: 'profile.football_schools_count',
            type: 'text',
            required: true,
            options: numberRangeOptions,
            label: this.$t('app.profile.header.info.football_schools'),
            model: this.$get(
              this.unit,
              'entity.profile.footballSchoolsCount',
              null
            )
          }
        ]
      }
    },

    partnerClubsEditFormStructure() {
      if (this.activeUnitID !== this.unitId) {
        return null
      }

      return {
        inputs: [
          {
            key: 'partner_clubs_count',
            mutationKey: 'profile.partner_clubs_count',
            type: 'text',
            required: true,
            options: numberRangeOptions,
            label: this.$t('app.profile.header.info.partner_clubs'),
            model: this.$get(
              this.unit,
              'entity.profile.partnerClubsCount',
              null
            )
          }
        ]
      }
    },

    youthPlayersEditFormStructure() {
      if (this.activeUnitID !== this.unitId) {
        return null
      }

      return {
        inputs: [
          {
            key: 'youth_players_count',
            mutationKey: 'profile.youth_players_count',
            type: 'text',
            required: true,
            options: numberRangeOptions,
            label: this.$t('app.profile.header.info.youth_players'),
            model: this.$get(
              this.unit,
              'entity.profile.youthPlayersCount',
              null
            )
          }
        ]
      }
    },

    coachesEditFormStructure() {
      if (this.activeUnitID !== this.unitId) {
        return null
      }

      return {
        inputs: [
          {
            key: 'coaches_count',
            mutationKey: 'profile.coaches_count',
            type: 'text',
            required: true,
            options: numberRangeOptions,
            label: this.$t('app.profile.header.info.coaches'),
            model: this.$get(this.unit, 'entity.profile.coachesCount', null)
          }
        ]
      }
    },

    shareholdersEditFormStructure() {
      if (this.activeUnitID !== this.unitId) {
        return null
      }

      return {
        inputs: [
          {
            key: 'shareholders',
            mutationKey: 'profile.shareholders',
            type: 'textarea',
            required: true,
            label: this.$t('app.profile.header.info.shareholders'),
            model: this.$get(this.unit, 'entity.profile.shareholders', [])
              .map(item => item.name)
              .join('\n'),
            transform: value =>
              !value
                ? []
                : value.split('\n').map(item => {
                    return { name: item }
                  })
          }
        ]
      }
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
