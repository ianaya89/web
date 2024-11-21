<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitFinances',

  components: {
    finances: () =>
      import('@/components/unit-pages/_id/profile/finances/finances'),
    'team-finances': () =>
      import('@/components/unit-pages/_id/profile/finances/team-finances'),
    'league-finances': () =>
      import('@/components/unit-pages/_id/profile/finances/league-finances')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'finances'
  })
}
</script>

<style lang="postcss" scoped>
</style>
