<template>
  <div class="container">
    <h2>Data labels</h2>

    <data-label label="Default" />
    <data-label label="Name">
      Your name
    </data-label>
  </div>
</template>

<script>
import DataLabel from '@/components/DataLabel'

export default {
  name: 'LabelDataExamples',
  components: {
    DataLabel
  }
}
</script>

<style scoped>
</style>
