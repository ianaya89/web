<template>
  <div class="container">
    <h2>Select dropdown</h2>

    <app-select class="w-1/6" :items="items" />
  </div>
</template>

<script>
import AppSelect from '@/components/AppSelect'

export default {
  name: 'SelectExamples',

  components: {
    AppSelect
  },

  data: () => ({
    items: [
      {
        text: 'First',
        value: 0
      },
      {
        text: 'Second',
        value: 1
      }
    ]
  })
}
</script>

<style>
</style>
