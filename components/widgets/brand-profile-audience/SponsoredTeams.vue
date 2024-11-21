<template>
  <div>
    <div class="w-full flex">
      <h4>{{ $t('app.brand.profile.audience.stadium_attendance.sponsored_teams') }}</h4>
    </div>
    <div class="w-full relative pt-8">
      <div class="fading-gradient" />
      <div class="overflow-y-auto h-96 pb-12">
        <avatar-info-strip
          v-for="team in followedTeams"
          :key="team.id"
          :classes="'w-16 h-12'"
          :title="team.name"
          :info="$get(team,'city.name',null)"
          :src="$get(team,'logo.url',undefined)"
          :alt="null"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AvatarInfoStrip from '@/components/AvatarInfoStrip'
import { BrandFollowedTeamsQuery } from '@/services/graphql'

export default {
  name: 'SponsoredTeams',

  components: {
    AvatarInfoStrip
  },

  apollo: {
    followedTeams: {
      ...BrandFollowedTeamsQuery,
      update(data) {
        return this.$get(data, 'unit.entity.followedTeams', [])
      },
      variables() {
        return {
          id: this.unitId
        }
      }
    }
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    followedTeams: []
  })
}
</script>

<style scoped>
</style>
