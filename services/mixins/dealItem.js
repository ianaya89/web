export default {
  computed: {
    isDealItemAccepted() {
      return dealItem => this.$get(dealItem, 'resolution', null) === 'accepted'
    },

    isDealItemDeclined() {
      return dealItem => this.$get(dealItem, 'resolution', null) === 'declined'
    },

    isDealItemPackage() {
      return dealItem =>
        this.$get(dealItem, 'marketplaceItem.itemType', null) === 'package'
    },

    getDealItemStatusColor() {
      return deal => {
        switch (this.$get(deal, 'resolution', null)) {
          case 'declined':
            return 'red'
          case 'accepted':
            return 'green'
          case 'in_negotiation':
          case 'waiting':
          default:
            return 'white'
        }
      }
    }
  }
}
