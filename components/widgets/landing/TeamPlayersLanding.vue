<template>
  <transition name="fade-up" :appear="true">
    <section class="team__profile__players">
      <players-split-landing v-if="!checkPermissions" :unit-id="unitId" />
      <players-split v-else :unit-id="unitId" />
    </section>
  </transition>
</template>

<script>
import PlayersSplitLanding from '@/components/widgets/landing/PlayersSplitLanding'
import PlayersSplit from '@/components/widgets/profile-players/PlayersSplit'

export default {
  name: 'TeamPlayersLanding',

  components: {
    PlayersSplitLanding,
    PlayersSplit
  },

  props: {
    unitId: {
      type: String,
      required: true
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
.team__profile__players {
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  padding-right: calc(100% - calc(100% - 100px));
  @apply .relative .pb-16;
}

@media (max-width: 768px) {
  .team__profile__players {
    @apply pr-8;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .team__profile__players {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
