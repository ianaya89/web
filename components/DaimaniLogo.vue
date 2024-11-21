<template>
  <img :src="logoSource" :class="logoClasses" alt="SPONSOR.ONLINE">
</template>

<script>
export default {
  computed: {
    logoSource() {
      return require('~/assets/images/logos/daimani-logo.svg')
    },

    logoClasses() {
      return 'w-32 logo--daimani'
    }
  }
}
</script>

<style lang="postcss" scoped>
.logo--daimani {
  display: inline-block;
}
</style>
