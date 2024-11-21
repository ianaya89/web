<template>
  <section class="team__profile__league pt-10">
    <league-split-landing
      v-if="!checkPermissions"
      :unit-id="unitId"
      :league-name="leagueName"
      :league-logo="leagueLogo"
      :city="city"
      :country="country"
    />
    <league-split v-else :unit-id="unitId" />
  </section>
</template>

<script>
import LeagueSplitLanding from '@/components/widgets/landing/LeagueSplitLanding'
import LeagueSplit from '@/components/widgets/profile-league/LeagueSplit'

export default {
  name: 'TeamLeagueLanding',

  components: {
    LeagueSplitLanding,
    LeagueSplit
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    teamId: {
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
    },
    isAuthenticated: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    checkPermissions() {
      return this.isAuthenticated
    }
  }
}
</script>

<style lang="postcss" scoped>
.team__profile__league {
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  padding-right: calc(100% - calc(100% - 100px));
}

@media (max-width: 768px) {
  .team__profile__league {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .team__profile__league {
    @apply pr-5;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
