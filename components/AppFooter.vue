<template>
  <footer class="w-full flex flex-wrap-reverse sm:flex-wrap pb-12 sm:pb-6 lg:pb-24">
    <div class="w-full lg:w-2/5 flex lg:justify-center px-8 py-8 sm:py-3 mt-1">
      <span class="font-bold">
        <nuxt-link class="text-grey" :to="localePath({ name: 'index'})">{{ $t('general.platform') }}</nuxt-link>
      </span>
      <span class="text-grey ml-1 my-auto">&copy; {{ currentYear }} {{ $t('general.rights') }}</span>
    </div>
    <div class="w-4/5 lg:w-3/5 px-8 pt-4 text-menu">
      <div class="my-auto w-full sm:flex">
        <div class="sm:flex-1">
          <nuxt-link :to="localePath({ name: 'terms'})" class="text-grey my-auto ml-auto">
            {{ $t('app.sidebar.team.terms') }}
          </nuxt-link>
          <span class="px-2">|</span>
          <nuxt-link :to="localePath({ name: 'privacy'})" class="text-grey my-auto ml-auto">
            {{ $t('app.sidebar.team.privacy') }}
          </nuxt-link>
          <span class="px-2">|</span>
          <nuxt-link :to="localePath({name: 'contact-us'})" class="text-grey my-auto ml-auto">
            {{ $t('app.sidebar.team.contact-us') }}
          </nuxt-link>
        </div>
        <div class="pt-6 sm:pt-0 self-end">
          <a href="https://www.linkedin.com/company/sponsor-online/" target="_blank" rel="noopener" class="text-grey my-auto text-h5">
            <span class="fab fa-linkedin" />
          </a>
          <a href="https://www.facebook.com/SponsorOnline-279923382517995/" target="_blank" rel="noopener" class="text-grey my-auto ml-8 text-h5">
            <span class="fab fa-facebook" />
          </a>
          <a href="https://www.youtube.com/channel/UCWhrAaCSGj1Si0q8X8KXlsw" target="_blank" rel="noopener" class="text-grey my-auto ml-8 text-h5">
            <span class="fab fa-youtube" />
          </a>
          <a href="https://twitter.com/SponsorOnline" target="_blank" rel="noopener" class="text-grey my-auto ml-8 text-h5">
            <span class="fab fa-twitter-square" />
          </a>
          <a href="https://www.instagram.com/sponsor.online" target="_blank" rel="noopener" class="text-grey my-auto ml-8 text-h5">
            <span class="fab fa-instagram" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',

  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
</style>
