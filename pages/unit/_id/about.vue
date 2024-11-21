<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitAbout',

  components: {
    about: () => import('@/components/unit-pages/_id/about/about')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'about'
  })
}
</script>

<style lang="postcss" scoped>
</style>
