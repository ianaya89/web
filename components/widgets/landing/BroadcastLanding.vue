<template>
  <div>
    <h6 class="border-b border-grey-l3">
      {{ title }}
    </h6>
    <img
      :src="img"
      alt="broadcasting image"
      class=""
    >
  </div>
</template>
<script>
export default {
  name: 'BroadcastLanding',
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
