<template>
  <section class="team__profile__fans">
    <appear-transition :percentage-offset="0.1">
      <div v-if="!checkPermissions" class="flex w-full flex-wrap mt-12">
        <reach-overview-landing />
        <fans-overview-landing />
      </div>
      <div v-else class="flex w-full flex-wrap mt-12">
        <reach-overview :unit-id="unitId" />
        <fans-overview :unit-id="unitId" />
      </div>
    </appear-transition>

    <hr class="w-full border-b border-grey-l4">

    <appear-transition :percentage-offset="0.4">
      <div class="w-full flex flex-wrap mt-8 lg:mt-12">
        <div class="w-full lg:w-1/2">
          <div class="pr-0 lg:pr-6 mt-4 mr-4">
            <div class="flex justify-between">
              <div class="flex">
                <h6>{{ $t('app.profile.team.fans.demographics.title') }}</h6>
                <app-tooltip class="font-normal text-left" :position="'right'">
                  <template v-slot:activator>
                    <span class="lni-question-circle text-grey mt-1 ml-2" />
                  </template>
                  <span class="w-64">
                    {{ $t('app.profile.team.fans.demographics.weighted_average_landing') }}
                  </span>
                </app-tooltip>
              </div>
              <div>
                <img class="similarweb-logo" alt="similarweb Logo" :src="require('../../../assets/images/logos/similarweb.png')">
              </div>
            </div>
          </div>
          <div v-if="!checkPermissions" class="pr-0 lg:pr-6 mt-4 mr-4">
            <img
              :src="require('../../../assets/images/team/demographics.png')"
              alt="demographics image"
              class=""
            >
          </div>
          <gender-split v-else :unit-id="unitId" class="mt-4 mr-4" />
          <div v-if="!checkPermissions">
            <h6 class="mt-10">
              {{ $t('app.profile.team.fans.age.title') }}
            </h6>

            <div class="w-full flex flex-wrap flex-col-reverse sm:flex-row">
              <div class="w-full sm:w-1/2 pr-4">
                <img
                  :src="require('../../../assets/images/team/age-table.png')"
                  alt="ages table image"
                  class=""
                >
              </div>
              <div class="w-full sm:w-1/2 flex justify-center mb-4 sm:mb-0">
                <img
                  :src="require('../../../assets/images/team/age-chart.png')"
                  alt="ages chart image"
                  class=""
                >
              </div>
            </div>
          </div>
          <age-split v-else :unit-id="unitId" />
        </div>
        <div class="w-full lg:w-1/2 pl-0 lg:pl-6 mt-10 lg:mt-4 relative">
          <div class="broadcast-logo-container">
            <img v-if="isStagingEnvironment" class="nielsen-sports-logo" alt="Nielsen Sports Logo" :src="require('../../../assets/images/logos/nielsen-sports.png')">
          </div>
          <div v-if="!checkPermissions" class="pb-10">
            <broadcast-landing :title="$t('app.profile.team.fans.broadcastCoverage.title')" :img="require('../../../assets/images/team/broadcast-coverage.png')" />
            <broadcast-landing :title="$t('app.profile.team.fans.broadcastViewers.title')" :img="require('../../../assets/images/team/broadcast-coverage.png')" />
            <broadcast-landing :title="$t('app.profile.team.fans.sharedVideoPlatforms.title')" :img="require('../../../assets/images/team/shared-videos.png')" />
          </div>
          <div v-else class="pb-10">
            <broadcast-coverage-split :unit-id="unitId" />
            <broadcast-viewers-split :unit-id="unitId" />
            <shared-video-platforms-split :unit-id="unitId" />
          </div>
        </div>
      </div>
    </appear-transition>
    <appear-transition :percentage-offset="0.4">
      <country-presence-map-landing :unit-id="this.$route.params.teamId" :country-split="countrySplit" />
    </appear-transition>

    <appear-transition :percentage-offset="0.4">
      <div v-if="!checkPermissions" class="w-full flex flex-wrap mt-4 mb-16">
        <fans-table-split :class="'pr-0 sm:pr-6 mt-10 sm:mt-0'" :title="$t('app.profile.team.fans.byCountry.title')" :img="require('../../../assets/images/team/fans-by-country.png')" />
        <fans-table-split :class="'pl-0 sm:pl-6 mt-10 sm:mt-0'" :title="$t('app.profile.team.fans.byLanguage.title')" :img="require('../../../assets/images/team/fans-by-language.png')" />
      </div>
      <div v-else class="w-full flex flex-wrap mt-4 mb-16">
        <country-split :unit-id="unitId" />
        <language-split :unit-id="unitId" />
      </div>
    </appear-transition>

    <appear-transition :percentage-offset="0.4">
      <traditional-media-landing v-if="!checkPermissions" :unit-id="unitId" :league-id="leagueId" />
      <traditional-media-overview v-else :unit-id="unitId" :league-id="leagueId" />
    </appear-transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import AppTooltip from '@/components/AppTooltip'
import FansOverviewLanding from '@/components/widgets/landing/FansOverviewLanding'
import ReachOverviewLanding from '@/components/widgets/landing/ReachOverviewLanding'
import FansOverview from '@/components/widgets/profile-fans/FansOverview'
import ReachOverview from '@/components/widgets/profile-fans/ReachOverview'
import AgeSplit from '@/components/widgets/profile-fans/AgeSplit'
import GenderSplit from '@/components/widgets/profile-fans/GenderSplit'
import BroadcastLanding from '@/components/widgets/landing/BroadcastLanding'
import BroadcastCoverageSplit from '@/components/widgets/profile-fans/BroadcastCoverageSplit'
import BroadcastViewersSplit from '@/components/widgets/profile-fans/BroadcastViewersSplit'
import SharedVideoPlatformsSplit from '@/components/widgets/profile-fans/SharedVideoPlatformsSplit'
import FansTableSplit from '@/components/widgets/landing/FansTableSplit'
import CountryPresenceMapLanding from '@/components/widgets/landing/CountryPresenceMapLanding'
import CountrySplit from '@/components/widgets/profile-fans/CountrySplit'
import LanguageSplit from '@/components/widgets/profile-fans/LanguageSplit'
import TraditionalMediaLanding from '@/components/widgets/landing/TraditionalMediaLanding'
import TraditionalMediaOverview from '@/components/widgets/profile-fans/TraditionalMediaOverview'
import AppearTransition from '@/components/transitions/AppearTransition'

export default {
  name: 'TeamFansLanding',

  components: {
    AppTooltip,
    FansOverviewLanding,
    ReachOverviewLanding,
    FansOverview,
    ReachOverview,
    AgeSplit,
    GenderSplit,
    BroadcastLanding,
    BroadcastCoverageSplit,
    BroadcastViewersSplit,
    SharedVideoPlatformsSplit,
    FansTableSplit,
    CountryPresenceMapLanding,
    CountrySplit,
    LanguageSplit,
    TraditionalMediaLanding,
    TraditionalMediaOverview,
    AppearTransition
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    countrySplit: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    leagueId: {
      type: String,
      required: false
    },
    isAuthenticated: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters({
      currentSeason: 'active/getCurrentSeason'
    }),

    accessMedia() {
      return true
    },

    isStagingEnvironment() {
      return (
        process.env.SO_ENVIRONMENT && process.env.SO_ENVIRONMENT === 'staging'
      )
    },

    checkPermissions() {
      return this.isAuthenticated
    }
  }
}
</script>

<style lang="postcss" scoped>
.team__profile__fans {
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  padding-right: calc(100% - calc(100% - 100px));
  @apply .relative .pb-16;
}

.similarweb-logo {
  height: 30px;
}

.nielsen-sports-logo {
  height: 30px;
}

.broadcast-logo-container {
  position: absolute;
  right: 0;
  top: 0;
}

@media (max-width: 768px) {
  .team__profile__fans {
    @apply pr-8;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .team__profile__fans {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
