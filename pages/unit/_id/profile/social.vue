<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitSocial',

  components: {
    social: () => import('@/components/unit-pages/_id/profile/social/social'),
    'brand-social': () =>
      import('@/components/unit-pages/_id/profile/social/brand-social')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'social'
  })
}
</script>

<style lang="postcss" scoped>
</style>
