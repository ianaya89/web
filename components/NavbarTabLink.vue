<template>
  <v-tab :to="localePath(href)" nuxt>
    <slot />
  </v-tab>
</template>

<script>
export default {
  props: {
    href: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
