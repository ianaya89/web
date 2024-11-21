export default {
  computed: {
    specificComponent() {
      if (
        this.permissionName &&
        !this.checkBrandPermission(this.permissionName)
      ) {
        return 'page-not-available'
      }

      const unitSpecificComponent =
        this.$store.getters['active/unitType'] + '-' + this.pageID

      const components = this.$options.components

      if (Object.keys(components).includes(unitSpecificComponent)) {
        return unitSpecificComponent
      }

      return this.pageID
    }
  },

  methods: {
    getUnitType() {
      return this.$store.getters['active/unitType']
    },

    getUnitPermissions() {
      return this.$store.getters['active/unitPermissions']
    },

    isBrand() {
      return this.getUnitType() === 'brand'
    },

    isTeam() {
      return this.getUnitType() === 'team'
    },

    checkBrandPermission(permission) {
      if (!this.isBrand()) {
        return true
      }

      return this.checkPermission(permission)
    },

    checkPermission(permission) {
      return !!this.getUnitPermissions().find(p => {
        return p.name === permission && p.can === true
      })
    }
  }
}
