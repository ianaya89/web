<template>
  <div class="w-full sm:w-1/2">
    <h6 class="pt-8">
      {{ title }}
    </h6>
    <img
      :src="img"
      alt="fans overview table image"
      class="pt-6"
    >
  </div>
</template>
<script>
export default {
  name: 'FansTableSplit',
  props: {
    title: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
