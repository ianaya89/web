export default {
  computed: {
    isInCompare() {
      return itemId => this.$store.getters['compare/isInCompare'](itemId)
    },

    hasItemsInCompare() {
      return this.$store.getters['compare/itemsCount'] > 0
    },

    compareMarketplaceItemsIds() {
      return this.$store.getters['compare/items']
    }
  }
}
