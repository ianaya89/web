<template>
  <div class="container">
    <h2>Popover</h2>

    <popover>
      <template v-slot:header>
        <h4 class="font-medium">
          Here might be a popover html title
        </h4>
      </template>
      <template v-slot:body>
        <p>Here might be a popover html body</p>
      </template>
    </popover>
  </div>
</template>

<script>
import Popover from '@/components/Popover'

export default {
  name: 'PopoverExamples',

  components: {
    Popover
  }
}
</script>

<style scoped>
</style>
