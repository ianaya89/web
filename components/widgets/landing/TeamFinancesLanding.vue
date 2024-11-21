<template>
  <section class="team__profile__finances">
    <transition name="fade-up" :appear="true">
      <partners-landing :unit-id="unitId" :brand-partners="brandPartners" />
    </transition>
  </section>
</template>

<script>
// import Partners from '@/components/widgets/profile-finances/Partners'
import PartnersLanding from '@/components/widgets/landing/PartnersLanding'

export default {
  name: 'TeamFinancesLanding',

  components: {
    PartnersLanding
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    brandPartners: {
      type: Array,
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
