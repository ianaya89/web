<template>
  <component :is="specificComponent" data-cy="settings-social-page" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitSocialProfiles',

  components: {
    'social-profiles': () =>
      import('@/components/unit-pages/_id/settings/social/social-profiles')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'social-profiles'
  })
}
</script>

<style lang="postcss" scoped>
</style>
