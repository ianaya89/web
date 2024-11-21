<template>
  <div>
    <div class="container bg-grey-l4 p-8 mt-12">
      <h2>Timelines</h2>

      <timeline :items="[{id : 1, title: '2018', body: 'Some content'},{id : 2, title: '2017', body: 'Some content'}]" />
      <timeline :visible="1" :items="[{id : 1, title: '2018', body: 'Some content'},{id : 2, title: '2017', body: 'Some content'}]" class="mt-10" />
    </div>
  </div>
</template>

<script>
import Timeline from '@/components/Timeline'

export default {
  name: 'TimelineExamples',

  components: {
    Timeline
  }
}
</script>

<style scoped>
</style>
