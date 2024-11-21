<template>
  <component
    :is="specificComponent"
    data-cy="settings-password-page"
    :unit-id="$route.params.id"
  />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitPassword',

  components: {
    password: () =>
      import('@/components/unit-pages/_id/settings/password/password')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'password'
  })
}
</script>

<style lang="postcss" scoped>
</style>
