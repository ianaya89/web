<template>
  <div class="landing-layout overflow-hidden">
    <public-menu />

    <nuxt />

    <app-footer />
  </div>
</template>

<script>
import App from './app'
import PublicMenu from '@/components/menus/PublicMenu'
import AppFooter from '@/components/AppFooter'

export default App.extend({
  name: 'LandingLayout',

  components: {
    PublicMenu,
    AppFooter
  },

  head() {
    return {
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: require('../assets/images/public-brand-bg-01.jpg')
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: require('../assets/images/public-brand-bg-01.jpg')
        }
      ]
    }
  }
})
</script>

<style lang="postcss" scoped>
.landing-layout {
  @apply .relative;
}
</style>
