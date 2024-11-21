<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitTargeting',

  components: {
    targeting: () =>
      import('@/components/unit-pages/_id/profile/targeting/targeting'),
    'brand-targeting': () =>
      import('@/components/unit-pages/_id/profile/targeting/brand-targeting')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'targeting'
  })
}
</script>

<style lang="postcss" scoped>
</style>
