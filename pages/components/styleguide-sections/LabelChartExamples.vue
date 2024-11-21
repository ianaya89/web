<template>
  <div class="container">
    <h2>Label Charts</h2>
    <label-chart />
    <label-chart :chart-value="0.9" />
  </div>
</template>

<script>
import LabelChart from '@/components/LabelChart'

export default {
  name: 'LabelChartExamples',

  components: {
    LabelChart
  }
}
</script>

<style scoped>
</style>
