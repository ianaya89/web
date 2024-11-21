<template>
  <div class="app-card max-w-xs p-6 border border-grey-l3">
    <div class="text-h3 leading-tight font-medium mb-2">
      {{ title }}
    </div>
    <div class="text-grey font-serif mb-6">
      {{ body }}
    </div>
    <nuxt-link class="font-medium" :to="to">
      {{ linkTitle }}
    </nuxt-link>
    <div v-if="info" class="text-grey font-serif mt-2">
      {{ info }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    title: {
      type: String,
      default: 'Title'
    },
    info: {
      type: String,
      default: 'Info'
    },
    body: {
      type: String,
      default: 'Some body content'
    },
    linkTitle: {
      type: String,
      default: 'Link title'
    },
    to: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="postcss" scoped>
.app-card {
  transition: 0.4s ease-in-out;
  &:hover {
    @apply .shadow-xl border-transparent;
  }
}
</style>
