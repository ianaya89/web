export default {
  props: {
    editFormStructure: {
      type: Object,
      default: null
    },

    mutation: {
      type: Object,
      default: null
    },

    mutationInputStructure: {
      type: Object,
      default: null
    }
  },

  methods: {
    triggerEdit() {
      this.$emit('edit-mode-trigger', {
        structure: this.editFormStructure,
        mutation: this.mutation,
        mutationInputStructure: this.mutationInputStructure
      })
    }
  }
}
