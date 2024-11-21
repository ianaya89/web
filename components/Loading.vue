<template>
  <div v-if="loading" class="loading-page">
    <logo-loader class="m-auto w-16" />
  </div>
</template>
<script>
import LogoLoader from '@/components/LogoLoader'

export default {
  name: 'Loading',

  components: {
    LogoLoader
  },

  data: () => ({
    loading: false
  }),

  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.loading-page {
  @apply .fixed .top-0 .left-0 .w-full .h-full .p-96 .text-center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}
</style>
