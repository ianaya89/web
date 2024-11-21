export default {
  data: () => ({
    unit: ''
  }),

  computed: {
    specificComponent() {
      const unitSpecificComponent =
        this.$get(this.unit, 'entity.__typename', 'team').toLowerCase() +
        '-' +
        this.pageID
      if (
        Object.keys(this.$options.components).includes(unitSpecificComponent)
      ) {
        return unitSpecificComponent
      }
      return this.pageID
    }
  }
}
