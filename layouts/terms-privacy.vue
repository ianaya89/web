<template>
  <div class="terms-layout min-h-screen">
    <public-menu />

    <nuxt />

    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/AppFooter'
import PublicMenu from '@/components/menus/PublicMenu'

export default {
  name: 'LandingLayout',

  components: {
    PublicMenu,
    AppFooter
  },

  mounted() {
    this.$store.dispatch('public-menu/setPermanentMenu', true)
  },

  destroyed() {
    this.$store.dispatch('public-menu/setPermanentMenu', false)
  }
}
</script>


<style lang="postcss" scoped>
.terms-layout {
  @apply .overflow-hidden .relative;
}
</style>
