<template>
  <img :src="logoSource" :class="logoClasses" alt="SPONSOR.ONLINE">
</template>

  <script>
export default {
  computed: {
    logoSource() {
      return require('~/assets/images/logos/sport-business-logo.png')
    },

    logoClasses() {
      return 'w-64 ml-4 logo--sportbusiness'
    }
  }
}
</script>

  <style lang="postcss" scoped>
.logo--sportbusiness {
  display: inline-block;
}
</style>
