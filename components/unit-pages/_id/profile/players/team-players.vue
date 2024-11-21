<template>
  <transition name="fade-up" :appear="true">
    <section class="team__profile__players">
      <players-split :unit-id="unitId" />
    </section>
  </transition>
</template>

<script>
import PlayersSplit from '@/components/widgets/profile-players/PlayersSplit'

export default {
  name: 'TeamPlayers',

  components: {
    PlayersSplit
  },

  props: {
    unitId: {
      type: String,
      required: true
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
