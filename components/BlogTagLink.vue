<template>
  <div :class="{'blog-tag--active': isActive}" class="blog-tag min-w-1/4 mr-2 my-2">
    <content-placeholders v-if="showMock">
      <content-placeholders-text :lines="1" />
    </content-placeholders>

    <nuxt-link
      v-else
      :to="localePath({ name: 'news', query: { tag: tag.name }})"
      class="flex bg-grey-l4 text-grey p4 font-serif w-full py-1 px-2 rounded-sm hover:bg-red hover:text-white"
    >
      <span class="flex-1">
        {{ label }}
      </span>
      <span class="p5 bg-grey font-normal text-white py-px px-2 ml-1 rounded-full">
        {{ tag.occurrences }}
      </span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true
    }
  },

  computed: {
    showMock() {
      return !this.tag.name || !this.tag.occurrences
    },

    label() {
      return '#' + this.tag.name
    },

    isActive() {
      return this.$route.query.tag === this.tag.name
    }
  }
}
</script>

<style lang="postcss">
.blog-tag--active a {
  @apply .bg-red .text-white;
}
</style>
