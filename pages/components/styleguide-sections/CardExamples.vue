<template>
  <div class="container">
    <h2>Card</h2>

    <card :to="localePath({ name: 'index' })" />
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'CardExamples',

  components: {
    Card
  }
}
</script>

<style scoped>
</style>
