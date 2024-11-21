<template>
  <v-tab :to="localePath(href)" nuxt>
    <i v-if="locked" class="fa fa-fw fa-lock" /> <slot />
  </v-tab>
</template>

<script>
export default {
  props: {
    href: {
      type: Object,
      required: true
    },
    locked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
