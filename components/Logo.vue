<template>
  <nuxt-link :to="localePath({name:'index'})" class="logo--so" data-cy="logo-link">
    <img :src="logoSource" :class="logoClasses" alt="SPONSOR.ONLINE">
  </nuxt-link>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'dark',
      validator: value => {
        return ['dark', 'light', 'mobile'].indexOf(value) !== -1
      }
    }
  },

  computed: {
    logoSource() {
      if (this.variant === 'light') {
        return require('~/assets/images/logos/so-logo-light.svg')
      } else if (this.variant === 'dark') {
        return require('~/assets/images/logos/so-logo-dark.svg')
      } else {
        return require('~/assets/images/logos/so-symbol-primary.svg')
      }
    },

    logoClasses() {
      if (this.variant === 'mobile') {
        return 'w-10 h-10'
      } else {
        return 'w-32'
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.logo--so {
  @apply .flex;
}
</style>
