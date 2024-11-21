<template>
  <component :is="specificComponent" :unit-id="$route.params.id" :package-id="$route.params.packageId" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'default',

  name: 'UnitEditPackage',

  components: {
    edit: () => import('@/components/unit-pages/_id/packages/_packageId')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'edit'
  })
}
</script>

<style lang="postcss" scoped>
</style>
