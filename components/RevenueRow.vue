<template>
  <div class="w-full flex pt-2 pb-4">
    <div class="w-1/2 flex text-left font-medium">
      <slot name="name" />
    </div>
    <div class="w-1/2 flex text-right pt-1">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RevenueRow'
}
</script>

<style scoped>
</style>
