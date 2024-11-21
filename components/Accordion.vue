<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Accordion',

  props: {
    multi: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    items: []
  }),

  created: function() {
    this.items = this.$children
    if (!this.multi) {
      this.$on('accordion-item-opened', this.accordionItemOpenedHandler)
    }
  },

  methods: {
    accordionItemOpenedHandler(itemUid) {
      this.items.forEach(item => {
        if (item._uid !== itemUid) {
          item.hide()
        }
      })
    },

    showAll() {
      this.items.forEach(item => {
        item.show()
      })
    },

    hideAll() {
      this.items.forEach(item => {
        item.hide()
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
