<template>
  <li class="link--app-header">
    <nuxt-link :to="localePath(href)">
      <slot />
    </nuxt-link>
  </li>
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

<style lang="postcss">
.link--app-header {
  a {
    @apply .px-6 .h-full .flex .items-center .text-grey-d1 .font-medium .border-transparent .border-b-3;
    &:hover {
      @apply .text-black .border-red .border-b-3;
    }
  }
}
</style>
