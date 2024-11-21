<template>
  <div class="container">
    <h2>Icon Checks</h2>

    <icon-check>
      <svg-icon class="w-full h-full" name="inventory/50" />
    </icon-check>
    <br>
    <icon-check :size="'w-12 h-12'">
      <svg-icon class="w-full h-full" name="inventory/30" />
    </icon-check>
  </div>
</template>

<script>
import IconCheck from '@/components/IconCheck'

export default {
  name: 'IconCheckExamples',

  components: {
    IconCheck
  }
}
</script>

<style scoped>
</style>
