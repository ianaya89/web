<template>
  <div class="relative flex bg-center bg-cover overflow-hidden" :style="{'background-image': 'url('+$get(item,'image',undefined)+')'}">
    <div class="featured-mask" />
    <div class="featured-logo flex items-end ml-12 pb-16 w-32">
      <img :src="$get(item,'logo',undefined)">
    </div>

    <div class="w-3/4 border-r my-2 border-grey py-4 pl-10 pr-6 text-white text-h4 z-10 flex">
      <slot />
    </div>
    <div class="w-1/4 text-white py-6 px-8 z-10">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturedTopCard',

  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="postcss" scoped>
.featured-mask {
  @apply .absolute .top-0 .left-0 .right-0 .bottom-0;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.5)
  );
}

.featured-logo {
  @apply .bg-white .top-0 .bottom-0 .flex .px-4 z-10;
  left: 5rem;
}
</style>
