<template>
  <section class="league__profile__stadium">
    <stadiums-info :unit-id="unitId" />
  </section>
</template>

<script>
import StadiumsInfo from '@/components/widgets/profile-stadium/StadiumsInfo'

export default {
  name: 'LeagueStadium',

  components: {
    StadiumsInfo
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
.league__profile__stadium {
  @apply .pt-10 .mb-32;
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  padding-right: calc(100% - calc(100% - 100px));
}

@media (max-width: 768px) {
  .league__profile__stadium {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .league__profile__stadium {
    @apply pr-5;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
