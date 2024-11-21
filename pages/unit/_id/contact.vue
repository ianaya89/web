<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitContact',

  components: {
    contact: () => import('@/components/unit-pages/_id/contact/contact')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'contact'
  })
}
</script>

<style lang="postcss" scoped>
</style>
