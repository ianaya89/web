<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitFAQ',

  components: {
    faq: () => import('@/components/unit-pages/_id/faq/faq')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'faq'
  })
}
</script>
