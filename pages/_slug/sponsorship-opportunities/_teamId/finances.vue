<template>
  <team-finances-landing :unit-id="unitId" :brand-partners="brandPartners" />
</template>

<script>
// import TeamFinances from '@/components/unit-pages/_id/profile/finances/team-finances'
import TeamFinancesLanding from '@/components/widgets/landing/TeamFinancesLanding'
import unitPage from '@/services/mixins/unitPage'

export default {
  scrollToTop: true,

  components: { TeamFinancesLanding },

  mixins: [unitPage],

  props: {
    unitId: {
      type: String,
      required: true
    },
    brandPartners: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    pageID: 'unit'
  })
}
</script>

<style lang="postcss" scoped>
</style>
