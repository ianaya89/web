<template>
  <div class="__nuxt-error-page">
    <logo class="top-0 left-0 absolute ml-8 sm:ml-12 mt-2 sm:mt-4" />

    <div class="max-w-4xl">
      <span class="error-icon text-grey-l1 lni-island mb-8" />

      <div class="mb-1 mt-2 text-grey h2">
        <span v-if="isDevEnv">{{ message }}</span>
        <span v-else>{{ $t('error_page.prod_message') }}</span>
      </div>
      <nuxt-link class="hover:underline h4" to="/">
        {{ $t('error_page.back') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import isDev from '@/services/mixins/isDev'

export default {
  name: 'NuxtError',

  components: {
    Logo
  },

  mixins: [isDev],

  props: {
    error: {
      type: Object,
      default: null
    }
  },

  head() {
    return {
      title: this.message
    }
  },

  computed: {
    message() {
      return this.error.message || this.$t('error_page.text')
    }
  }
}
</script>

<style lang="postcss" scoped>
.__nuxt-error-page {
  @apply .m-0 .p-4 .text-center .flex .justify-center .items-center .flex-col .absolute .inset-0 .bg-grey-l4 .text-grey .z-50 .overflow-hidden;
  .error-icon {
    font-size: 10rem;
  }
}
</style>
