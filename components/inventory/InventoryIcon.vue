<template>
  <svg-icon class="inline" :name="'inventory/'+getMarketplaceIcon" />
</template>

<script>
import { getMarketplaceCategoryIcon } from '@/services/helpers'

export default {
  name: 'InventoryIcon',

  props: {
    category: {
      type: Object,
      required: true
    },
    isPackage: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    getMarketplaceIcon() {
      if (
        this.category == null ||
        !Object.prototype.hasOwnProperty.call(this.category, 'path')
      ) {
        return 'inventory'
      }

      if (this.isPackage) {
        return getMarketplaceCategoryIcon('package / ' + this.category.path)
      } else {
        return getMarketplaceCategoryIcon(this.category.path)
      }
    }
  }
}
</script>

<style scoped>
</style>
