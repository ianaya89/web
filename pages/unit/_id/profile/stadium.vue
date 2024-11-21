<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitStadium',

  components: {
    stadium: () =>
      import('@/components/unit-pages/_id/profile/stadium/stadium'),
    'team-stadium': () =>
      import('@/components/unit-pages/_id/profile/stadium/team-stadium'),
    'league-stadium': () =>
      import('@/components/unit-pages/_id/profile/stadium/league-stadium')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'stadium'
  })
}
</script>

<style lang="postcss" scoped>
</style>
