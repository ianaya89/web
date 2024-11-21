<template>
  <section class="team__profile__finances">
    <transition name="fade-up" :appear="true">
      <revenue :unit-id="unitId" />
    </transition>
    <appear-transition :percentage-offset="0.4">
      <partners :unit-id="unitId" />
    </appear-transition>
  </section>
</template>

<script>
import Partners from '@/components/widgets/profile-finances/Partners'
import Revenue from '@/components/widgets/profile-finances/Revenue'
import AppearTransition from '@/components/transitions/AppearTransition'

export default {
  name: 'Finances',

  components: {
    Revenue,
    Partners,
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
.team__profile__finances {
  @apply .pt-10 .pb-32;
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  padding-right: calc(100% - calc(100% - 100px));
}

@media (max-width: 768px) {
  .team__profile__finances {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .team__profile__finances {
    @apply pr-5;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
