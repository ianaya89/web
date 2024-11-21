<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitLeague',

  components: {
    audience: () =>
      import('@/components/unit-pages/_id/profile/audience/audience'),
    'brand-audience': () =>
      import('@/components/unit-pages/_id/profile/audience/brand-audience')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'audience'
  })
}
</script>

<style lang="postcss" scoped>
</style>
