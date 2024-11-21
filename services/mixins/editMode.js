import { cloneDeep } from 'lodash'

export default {
  data: () => ({
    activeForm: {
      structure: null,
      mutation: null,
      mutationInputStructure: null
    }
  }),

  methods: {
    triggerEditModal(formStructure) {
      this.activeForm = cloneDeep(formStructure)
      this.$refs.editModal.open()
    }
  }
}
