<template>
  <section class="team__profile__stadium">
    <stadium-info :unit-id="unitId" />

    <appear-transition :percentage-offset="0.4">
      <stadium-visitors :unit-id="unitId" />
    </appear-transition>

    <!-- <stadium-mentions :unit-id="unitId" /> -->
  </section>
</template>

<script>
import StadiumInfo from '@/components/widgets/profile-stadium/StadiumInfo'
// import StadiumMentions from '@/components/widgets/profile-stadium/StadiumMentions'
import StadiumVisitors from '@/components/widgets/profile-stadium/StadiumVisitors'
import AppearTransition from '@/components/transitions/AppearTransition'

export default {
  name: 'Stadium',

  components: {
    StadiumVisitors,
    // StadiumMentions,
    StadiumInfo,
    AppearTransition
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
.team__profile__stadium {
  @apply .pt-10;
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  padding-right: calc(100% - calc(100% - 100px));
}

@media (max-width: 768px) {
  .team__profile__stadium {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .team__profile__stadium {
    @apply pr-5;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
