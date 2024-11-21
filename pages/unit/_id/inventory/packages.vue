<template>
  <component :is="specificComponent" data-cy="packages-page" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitPackages',

  components: {
    packages: () =>
      import('@/components/unit-pages/_id/inventory/packages/packages')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'packages'
  })
}
</script>

<style lang="postcss" scoped>
</style>
