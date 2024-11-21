<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitPayments',

  components: {
    payments: () =>
      import('@/components/unit-pages/_id/settings/payments/payments')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'payments'
  })
}
</script>

<style lang="postcss" scoped>
</style>
