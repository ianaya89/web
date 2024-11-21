export default {
  computed: {
    availableLocales() {
      return (this.$i18n ? this.$i18n.locales : []).filter(i => {
        if (i.code === 'pseudo') {
          return process.env.NODE_ENV === 'development'
        } else {
          // return process.env.NODE_ENV === 'development' // disable translations for now
          return i.code !== this.$i18n.locale
        }
      })
    },

    currentLocale() {
      return this.$i18n ? this.$i18n.locale.toUpperCase() : null
    }
  },

  methods: {
    switchLang(locale) {
      if (this.$i18n) {
        this.$i18n.setLocaleCookie(locale)
      }

      this.$router.push(this.switchLocalePath(locale.code))
    }
  }
}
