<template>
  <div class="container">
    <h2>Dropdown</h2>

    <dropdown>
      <template v-slot:activator>
        <span class="fas fa-ellipsis-h text-red" />
      </template>
      <template v-slot:deactivator>
        <span class="fas fa-times text-red" />
      </template>

      sdfsdf sdf sfd
    </dropdown>

    <br>

    <dropdown>
      sdfsdf sdf sfd
    </dropdown>

    <br>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'

export default {
  name: 'CardExamples',

  components: {
    Dropdown
  }
}
</script>

<style scoped>
</style>
