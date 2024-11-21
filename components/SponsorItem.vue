<template>
  <div class="sponsor-item flex items-center">
    <div class="w-16">
      <avatar class="my-auto" :src="src" :rounded="false" />
    </div>
    <div class="w-3/5 ml-4">
      <h6 class="my-auto leading-tight">
        {{ name }}
      </h6>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  name: 'SponsorItem',

  components: { Avatar },

  props: {
    src: {
      type: String,
      default: require('../assets/images/thumb-fallback.svg')
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.sponsor-item {
  @apply .w-full .flex .border-b .border-grey-l4 .p-6;
  transition: border-color 400ms linear;
  will-change: border-color;

  &:hover {
    @apply .border-red;
  }
}
</style>
