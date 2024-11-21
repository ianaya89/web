<template>
  <div />
</template>

<script>
import { clear } from '@/services/helpers'

export default {
  layout: 'auth',

  name: 'Logout',

  async mounted() {
    const oldLocale = this.$i18n.locale
    this.$toast.success(this.$t('app.logout.messages.info'))
    this.$store.dispatch('auth/logout')
    clear('lastAuthorizedUnitRoute')

    await this.$apolloHelpers.onLogout()

    if (oldLocale === 'en') {
      this.$router.push('/login')
    } else {
      this.$router.push(`/${oldLocale}/login`)
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
