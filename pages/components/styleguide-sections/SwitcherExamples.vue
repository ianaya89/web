<template>
  <div class="container">
    <h2>Switcher</h2>
    <div class="p-8">
      <switcher />
      <switcher
        ref="switcherA"
        v-model="switcherA"
        :label="'My green switcher'"
        :color="'green'"
      />
      <app-button title="Check Value" btn-class="primary my-4" @clicked="checkSwitcherAValue" />
      <switcher v-model="switcherB" :label="'My disabled OFF switcher'" :disabled="true" />
    </div>
  </div>
</template>

<script>
import Switcher from '@/components/Switcher'
import AppButton from '@/components/AppButton'

export default {
  components: {
    Switcher,
    AppButton
  },

  data: () => ({
    switcherA: true,
    switcherB: false
  }),

  methods: {
    checkSwitcherAValue() {
      alert(this.switcherA)
    }
  }
}
</script>

<style lang="postcss">
</style>
