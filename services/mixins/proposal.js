export default {
  computed: {
    isInProposal() {
      return itemId => this.$store.getters['proposal/isInProposal'](itemId)
    },

    proposalItemsCount() {
      return (
        this.$store.getters['proposal/itemsCount'] +
        this.$store.getters['proposal/packagesCount']
      )
    },

    hasItemsInProposal() {
      return this.proposalItemsCount > 0
    }
  }
}
