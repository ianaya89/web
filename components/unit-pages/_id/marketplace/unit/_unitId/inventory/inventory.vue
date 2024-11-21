<template>
  <unit-inventory :unit-id="selectedUnitId" />
</template>

<script>
import UnitInventory from '@/components/widgets/UnitInventory'

export default {
  name: 'MarketplaceUnitInventory',

  components: {
    UnitInventory
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
