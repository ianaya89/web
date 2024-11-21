<template>
  <div class="container">
    <h2>GMaps</h2>

    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    />
  </div>
</template>

<script>
export default {
  name: 'GmapExamples'
}
</script>

<style scoped>
</style>
