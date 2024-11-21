<template>
  <section class="team__profile__league pt-10">
    <league-split :unit-id="unitId" />
  </section>
</template>

<script>
import LeagueSplit from '@/components/widgets/profile-league/LeagueSplit'

export default {
  name: 'TeamLeague',

  components: {
    LeagueSplit
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
