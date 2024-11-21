<template>
  <profile-header-partial>
    <template v-slot:image>
      <transition mode="out-in" name="fade">
        <div class="w-full h-80 sm:h-auto sm:min-h-128 overflow-hidden">
          <img
            class="hero-bg sm:w-full h-80 sm:h-auto sm:min-h-128 object-cover"
            :src="teamPhoto"
            alt="Image"
          >
        </div>
      </transition>
    </template>

    <transition name="fade-up" :appear="true">
      <profile-header ref="profileHeader" :update-photos-enabled="activeUnitID === unitId" :has-more="false">
        <template v-slot:logo>
          <div class="w-16 h-16 mb-2">
            <avatar
              classes="w-16 h-16"
              :src="logoUrl"
            />
          </div>
        </template>
        <template v-slot:title>
          {{ teamName }}
        </template>
        <template v-slot:content>
          <data-label
            :label="$t('app.profile.header.info.country')"
            class="w-1/2 sm:w-1/3 text-left pt-2 pr-2"
          >
            {{ countryName }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.city')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ cityName }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.stadium')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ stadiumName }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.founded')" class="w-1/2 sm:w-1/3 text-left pr-2 pt-2 pt-2">
            {{ founded }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.sport')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ $t('general.football') }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.league')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ leagueName }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.stadium_capacity')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ stadiumCapacity || '-' }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.average_attendance')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ averageAttendance || '-' }}
          </data-label>
          <data-label :label="$t('app.profile.header.info.club_revenue')" class="w-1/2 sm:w-1/3 text-left pt-2 pr-2">
            {{ clubRevenue | currency }}
          </data-label>
        </template>
      </profile-header>
    </transition>
  </profile-header-partial>
</template>

<script>
import DataLabel from '@/components/DataLabel'
import ProfileHeader from '@/components/ProfileHeader'
import ProfileHeaderPartial from '@/components/partials/ProfileHeaderPartial'
import Avatar from '@/components/Avatar'
import { TeamProfileMutation } from '@/services/graphql'
import editMode from '@/services/mixins/editMode'
import { numberRangeOptions } from '@/config/select-options'

export default {
  name: 'TeamProfileLandingHeader',

  components: {
    ProfileHeaderPartial,
    ProfileHeader,
    DataLabel,
    Avatar
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
    },
    teamPhoto: {
      type: String,
      required: true
    },
    logoUrl: {
      type: String,
      required: true
    },
    teamName: {
      type: String,
      required: true
    },
    countryName: {
      type: String,
      required: true
    },
    cityName: {
      type: String,
      required: true
    },
    stadiumName: {
      type: String,
      required: true
    },
    founded: {
      type: String,
      required: true
    },
    leagueName: {
      type: String,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    stadiumCapacity: {
      type: Number,
      required: false
    },
    averageAttendance: {
      type: Number,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    clubRevenue: {
      type: Number,
      required: false
    }
  },

  apollo: {},

  data: () => ({
    teamProfileMutation: TeamProfileMutation,
    numberRangeOptions: numberRangeOptions
  }),

  computed: {
    activeUnitID() {
      return this.$store.getters['active/unitID']
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
