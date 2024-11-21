<template>
  <component :is="specificComponent" data-cy="settings-notifications-page" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitNotifications',

  components: {
    notifications: () =>
      import('@/components/unit-pages/_id/settings/notifications/notifications')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'notifications'
  })
}
</script>

<style lang="postcss" scoped>
</style>
