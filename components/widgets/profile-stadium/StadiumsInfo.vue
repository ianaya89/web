<template>
  <div class="w-full">
    <stadium-info v-if="stadiumsData.length>=1" :unit-id="unitId" :force-stadium="stadiumsData[0].stadium" :force-meta-data="stadiumsData[0].metaData" />

    <transition name="fade">
      <div v-if="!allStadiumsVisible && stadiumsData.length>1" class="w-full flex justify-end">
        <app-button :btn-class="'link'" :title="$t('general.show-other-stadiums')" @clicked="allStadiumsVisible = true" />
      </div>
    </transition>

    <transition name="fade">
      <div v-if="allStadiumsVisible" class="w-full">
        <appear-transition
          v-for="(stadiumData, index) in stadiumsData.slice(1)"
          :key="index"
          :percentage-offset="0.1"
          class="my-20"
          :force-load="index===0"
        >
          <stadium-info :unit-id="unitId" :force-stadium="stadiumData.stadium" :force-meta-data="stadiumData.metaData" />
        </appear-transition>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { StadiumInfoQuery } from '@/services/graphql'
import StadiumInfo from '@/components/widgets/profile-stadium/StadiumInfo'
import AppButton from '@/components/AppButton'
import AppearTransition from '@/components/transitions/AppearTransition'

export default {
  name: 'StadiumsInfo',

  components: {
    StadiumInfo,
    AppButton,
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
      ...StadiumInfoQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.activeSeason.name,
          prevseason: this.previousSeason.name
        }
      }
    }
  },

  data: () => ({
    allStadiumsVisible: false
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason',
      previousSeason: 'active/getLastSeason'
    }),

    stadiumsData() {
      return this.$get(this.unit, 'entity.leagueTeams', [])
        .map(leagueTeam => this.$get(leagueTeam, 'team.teamStadiums.0', null))
        .filter(item => item !== null)
    }
  }
}
</script>

<style scoped>
</style>
