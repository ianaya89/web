<template>
  <div class="container">
    <h2>Badges</h2>
    <div>
      <badge :value="2" />
      <badge />
    </div>
  </div>
</template>

<script>
import Badge from '@/components/Badge'

export default {
  components: {
    Badge
  }
}
</script>

<style lang="postcss">
</style>
