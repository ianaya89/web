<template>
  <section class="team__profile__fans">
    <appear-transition :percentage-offset="0.1">
      <div class="flex w-full flex-wrap mt-12">
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
                    {{ $t('app.profile.team.fans.demographics.weighted_average') }}
                  </span>
                </app-tooltip>
              </div>
              <div>
                <img class="similarweb-logo" alt="similarweb Logo" :src="require('../../../../../assets/images/logos/similarweb.png')">
              </div>
            </div>
          </div>
          <gender-split :unit-id="unitId" class="mt-4 mr-4" />
          <age-split :unit-id="unitId" />
        </div>
        <div class="w-full lg:w-1/2 pl-0 lg:pl-6 mt-10 lg:mt-4 relative">
          <div class="broadcast-logo-container">
            <img v-if="isStagingEnvironment" class="nielsen-sports-logo" alt="Nielsen Sports Logo" :src="require('../../../../../assets/images/logos/nielsen-sports.png')">
          </div>
          <div class="pb-10">
            <broadcast-coverage-split :unit-id="unitId" />
            <broadcast-viewers-split :unit-id="unitId" />
            <shared-video-platforms-split :unit-id="unitId" />
          </div>
        </div>
      </div>
    </appear-transition>
    <appear-transition :percentage-offset="0.4">
      <country-presence-map :unit-id="unitId" />
    </appear-transition>

    <appear-transition :percentage-offset="0.4">
      <div class="w-full flex flex-wrap mt-4 mb-16">
        <country-split :unit-id="unitId" />
        <language-split :unit-id="unitId" />
      </div>
    </appear-transition>
    <!-- <appear-transition :percentage-offset="0.6">
      <media-sources-overview v-if="accessMedia" :unit-id="unitId" />
    </appear-transition> -->

    <!-- <appear-transition :percentage-offset="0.6">
      <top-hashtags :unit-id="unitId" />
    </appear-transition> -->

    <!-- <appear-transition :percentage-offset="0.6">
      <media-exposure-overview v-if="accessMedia" :unit-id="unitId" />
    </appear-transition> -->

    <appear-transition :percentage-offset="0.4">
      <traditional-media-overview v-if="accessMedia" :unit-id="unitId" :league-id="leagueId" />
    </appear-transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import AppTooltip from '@/components/AppTooltip'
import FansOverview from '@/components/widgets/profile-fans/FansOverview'
import ReachOverview from '@/components/widgets/profile-fans/ReachOverview'
import CountrySplit from '@/components/widgets/profile-fans/CountrySplit'
import LanguageSplit from '@/components/widgets/profile-fans/LanguageSplit'
import BroadcastCoverageSplit from '@/components/widgets/profile-fans/BroadcastCoverageSplit'
import BroadcastViewersSplit from '@/components/widgets/profile-fans/BroadcastViewersSplit'
import SharedVideoPlatformsSplit from '@/components/widgets/profile-fans/SharedVideoPlatformsSplit'
import AgeSplit from '@/components/widgets/profile-fans/AgeSplit'
import CountryPresenceMap from '@/components/widgets/profile-fans/CountryPresenceMap'
import TraditionalMediaOverview from '@/components/widgets/profile-fans/TraditionalMediaOverview'
// import MediaExposureOverview from '@/components/widgets/profile-fans/MediaExposureOverview'
// import MediaSourcesOverview from '@/components/widgets/profile-fans/MediaSourcesOverview'
// import TopHashtags from '@/components/widgets/profile-fans/TopHashtags'
import GenderSplit from '@/components/widgets/profile-fans/GenderSplit'
import { TeamLeagueQuery } from '@/services/graphql'
import AppearTransition from '@/components/transitions/AppearTransition'

export default {
  name: 'TeamFans',

  components: {
    AppTooltip,
    GenderSplit,
    FansOverview,
    ReachOverview,
    CountrySplit,
    LanguageSplit,
    AgeSplit,
    BroadcastCoverageSplit,
    BroadcastViewersSplit,
    SharedVideoPlatformsSplit,
    CountryPresenceMap,
    TraditionalMediaOverview,
    // MediaExposureOverview,
    // MediaSourcesOverview,
    // TopHashtags,
    AppearTransition
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    teamLeague: {
      ...TeamLeagueQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.currentSeason.name
        }
      },
      update: data => data.unit
    }
  },

  computed: {
    ...mapGetters({
      currentSeason: 'active/getCurrentSeason'
    }),

    leagueId() {
      return this.$get(this.teamLeague, 'entity.teamLeagues.0.league.id', null)
    },

    accessMedia() {
      return true
    },

    isStagingEnvironment() {
      return (
        process.env.SO_ENVIRONMENT && process.env.SO_ENVIRONMENT === 'staging'
      )
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
