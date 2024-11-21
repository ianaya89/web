export default {
  data: () => ({
    validationRules: {
      required: message => {
        return v => !!v || (message || 'required')
      }
    }
  })
}
