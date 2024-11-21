<template>
  <div class="container">
    <h2>Progress Bars</h2>

    <progress-bar v-model="progressBarData" :label="true" color="green" />
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar'

export default {
  name: 'ProgressBarExamples',

  components: {
    ProgressBar
  },

  data: () => ({
    progressBarData: 0
  }),

  mounted() {
    setTimeout(() => {
      this.progressBarData = 70
    }, 2000)
  }
}
</script>

<style scoped>
</style>
