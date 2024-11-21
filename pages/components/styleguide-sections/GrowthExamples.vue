<template>
  <div class="container">
    <h2>Growth</h2>

    <growth :value="0" />
    <growth :value="30" />
    <growth :value="-20">
      -20px
    </growth>
  </div>
</template>

<script>
import Growth from '@/components/Growth'

export default {
  name: 'GrowthExamples',

  components: {
    Growth
  }
}
</script>

<style scoped>
</style>
