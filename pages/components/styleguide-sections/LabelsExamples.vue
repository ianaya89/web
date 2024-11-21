<template>
  <div class="container">
    <h2>Labels</h2>
    <app-label color="primary" />
    <app-label :closeable="true">
      Close
    </app-label>
    <app-label :closeable="true" :outline="true">
      Outline
    </app-label>
    <app-label :disabled="true">
      Disabled
    </app-label>
    <app-label>
      <span>Can be with html!</span>
    </app-label>
  </div>
</template>

<script>
import AppLabel from '@/components/AppLabel'

export default {
  name: 'AreaLabels',

  components: {
    AppLabel
  }
}
</script>

<style scoped>
</style>
