<template>
  <transition name="fade-up" :appear="true">
    <section class="league__profile__players">
      <league-players-split :unit-id="unitId" class="mb-32" />
    </section>
  </transition>
</template>

<script>
import LeaguePlayersSplit from '@/components/widgets/profile-players/LeaguePlayersSplit'

export default {
  name: 'LeaguePlayers',

  components: {
    LeaguePlayersSplit
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
.league__profile__players {
  @apply .relative .pb-16 .pt-10;
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  padding-right: calc(100% - calc(100% - 100px));
}

@media (max-width: 768px) {
  .league__profile__players {
    @apply pr-8;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .league__profile__players {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
