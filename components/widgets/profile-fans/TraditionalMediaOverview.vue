<template>
  <div class="w-full ">
    <div class="">
      <h3>
        {{ $t('app.profile.team.fans.tv_print.title') }}
      </h3>
      <div class="mt-12 flex">
        <h6>
          {{ $t('app.profile.team.fans.tv_print.tv.title') }}
        </h6>
        <app-tooltip class="font-normal text-left" :position="'right'">
          <template v-slot:activator>
            <span class="lni-question-circle text-grey mt-1 ml-2" />
          </template>
          <p class="w-64 font-sans">
            {{ $t('app.profile.team.fans.tv_print.tv.description') }}
          </p>
        </app-tooltip>
      </div>
      <hr class="w-full border-b border-grey-l4">
    </div>

    <div v-if="tvExposures.length" class="w-full flex flex-wrap py-6">
      <div v-for="station in tvExposures" :key="station.id" class="w-full sm:w-1/2 lg:w-1/3 flex py-4 flex items-center">
        <div class="w-18">
          <avatar :src="station.logo.url" />
        </div>
        <div class="w-3/4 pl-4">
          <h6 class="leading-none">
            {{ station.name }}
          </h6>
          <!--          <span class="text-grey">{{ station.periodicity }}</span>-->
        </div>
      </div>
    </div>

    <div v-else class="w-full flex flex-wrap py-10">
      <p class="text-grey">
        {{ $t('errors.no_results') }}
      </p>
    </div>

    <div class="mt-6 flex">
      <h6>
        {{ $t('app.profile.team.fans.tv_print.print.title') }}
      </h6>
      <app-tooltip class="font-normal text-left" :position="'right'">
        <template v-slot:activator>
          <span class="lni-question-circle text-grey mt-1 ml-2" />
        </template>
        <p class="w-64 font-sans">
          {{ $t('app.profile.team.fans.tv_print.print.description') }}
        </p>
      </app-tooltip>
    </div>
    <hr class="w-full border-b border-grey-l4">

    <div v-if="printExposures.length" class="w-full flex flex-wrap pt-6">
      <div v-for="print in printExposures" :key="print.id" class="w-full sm:w-1/2 lg:w-1/3 flex py-3">
        <div>
          <avatar :src="print.logo.url" :rounded="false" class="w-24 h-33 shadow-lg" :classes="'w-24 h-33'" />
        </div>
        <div class="w-3/4 ml-4 sm:ml-4 mt-6">
          <h6 class="leading-none">
            {{ print.name }}
          </h6>
          <!--          <span class="text-grey">{{ print.periodicity }}</span>-->
        </div>
      </div>
    </div>

    <div v-else class="w-full flex flex-wrap py-10">
      <p class="text-grey">
        {{ $t('errors.no_results') }}
      </p>
    </div>
  </div>
</template>

<script>
import { LeagueTraditionalMediaQuery } from '@/services/graphql'
import Avatar from '@/components/Avatar'
import AppTooltip from '@/components/AppTooltip'

export default {
  components: {
    Avatar,
    AppTooltip
  },

  props: {
    leagueId: {
      type: String,
      default: null
    }
  },

  apollo: {
    league: {
      ...LeagueTraditionalMediaQuery,
      variables() {
        return {
          id: this.leagueId
        }
      }
    }
  },

  computed: {
    printExposures() {
      return this.$get(this.league, 'traditionalMedia', []).filter(
        m => m.type === 'print'
      )
    },

    tvExposures() {
      return this.$get(this.league, 'traditionalMedia', []).filter(
        m => m.type === 'tv'
      )
    }
  }
}
</script>
