export default {
  data: () => ({
    validSlots: null,
    newSlot: { slot: null, quantity: null }
  }),

  computed: {
    itemPrice() {
      return itemId => this.$store.getters['proposal/itemPrice'](itemId)
    },

    getMarketplaceItemSlot() {
      return slotId =>
        this.$get(this.item, 'marketplaceItem.slots', []).find(
          item => item.id === slotId
        )
    },

    slotAmountRule() {
      return (value, slotId) => {
        const marketplaceItemSlotQuantity = this.$get(
          this.getMarketplaceItemSlot(slotId),
          'quantity',
          1
        )

        return (
          value <= marketplaceItemSlotQuantity ||
          this.$t('app.marketplace.show_item.form.amount.validation.max', {
            amount: marketplaceItemSlotQuantity
          })
        )
      }
    },

    availableSlots() {
      return this.$get(this.item, 'marketplaceItem.slots', [])
        .filter(slot => {
          return slot.expiredAt === null
        })
        .map(slot => ({
          text: slot.slot,
          value: slot.id
        }))
    }
  },

  methods: {
    itemAmountChange(newAmountValue, item, index) {
      const newSlots = [...item.slots]
      newSlots[index] = Object.assign({}, newSlots[index])
      newSlots[index].quantity = newAmountValue
      this.$store.dispatch('proposal/updateItem', {
        marketplaceItem: item.marketplaceItem,
        slots: newSlots
      })
    },

    itemSlotsChange(newSlotValue, item, index) {
      const newSlots = [...item.slots]
      newSlots[index] = Object.assign({}, newSlots[index])
      newSlots[index].slot = newSlotValue
      this.$store.dispatch('proposal/updateItem', {
        marketplaceItem: item.marketplaceItem,
        slots: newSlots
      })
    },

    removeItem(proposalItemId) {
      this.$store.dispatch('proposal/removeItem', proposalItemId)
    },

    removeSlot(item, index) {
      const newSlots = [...item.slots]
      newSlots.splice(index, 1)
      this.$store.dispatch('proposal/updateItem', {
        marketplaceItem: item.marketplaceItem,
        slots: newSlots
      })
    },

    addNextSlot() {
      this.$refs.newSlotModal.open()
    },

    cancelNewSlot() {
      this.$refs.newSlotForm.resetValidation()
      this.$refs.newSlotModal.close()
      this.newSlot = { slot: null, quantity: null }
    },

    storeNewSlot(item) {
      if (this.$refs.newSlotForm.validate()) {
        const newSlots = [...item.slots]
        newSlots.push(this.newSlot)
        this.$store.dispatch('proposal/updateItem', {
          marketplaceItem: item.marketplaceItem,
          slots: newSlots
        })
        this.newSlot = { slot: null, quantity: null }
        this.$refs.newSlotModal.close()
      }
    }
  }
}
