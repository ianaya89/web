<template>
  <league-fans :unit-id="selectedUnitId" />
</template>

<script>
import LeagueFans from '@/components/unit-pages/_id/profile/fans/league-fans'

export default {
  name: 'MarketplaceLeagueFans',

  components: {
    LeagueFans
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    selectedUnitId: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
