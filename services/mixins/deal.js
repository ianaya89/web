export default {
  computed: {
    isDealEditable() {
      return deal => this.isDealEditableFnc(deal)
    },

    isDealAccepted() {
      return deal => this.isDealAcceptedFnc(deal)
    },

    isDealDeclined() {
      return deal => this.isDealDeclinedFnc(deal)
    },

    getDealStatusColor() {
      return deal => {
        switch (this.$get(deal, 'status', null)) {
          case 'declined':
            return 'red'
          case 'accepted':
          case 'paid':
            return 'green'
          case 'open':
          case 'in_negotiation':
          case 'waiting_for_payment':
          default:
            return 'blue'
        }
      }
    }
  },

  methods: {
    isDealEditableFnc(deal) {
      return (
        this.$get(deal, 'status', null) === 'open' ||
        this.$get(deal, 'status', null) === 'in_negotiation'
      )
    },

    isDealAcceptedFnc(deal) {
      return this.$get(deal, 'status', null) === 'accepted'
    },

    isDealDeclinedFnc(deal) {
      return this.$get(deal, 'status', null) === 'declined'
    }
  }
}
