<template>
  <div class="container">
    <h2>Text areas</h2>
    <text-area v-model="areaModel" />
    <app-button
      ref="inputBtn"
      :should-disable="false"
      title="Check Value"
      btn-class="primary"
      @clicked="checkValueOfData('areaModel')"
    />
    <text-area :readonly="true" label="Read-only" />
    <text-area :sticky-label="true" :persistent-hint="true" hint="That's a hint" />
    <text-area :sticky-label="true" hint="That's a hidden hint" placeholder="With hidden hint" />
    <text-area :sticky-label="true" placeholder="My placeholder" />
    <text-area :outline="true" />
    <text-area :outline="true" :rules="[v => !!v || 'Item is required']" :required="true" />
    <text-area :counter="30" />
  </div>
</template>

<script>
import TextArea from '@/components/TextArea'
import AppButton from '@/components/AppButton'

export default {
  name: 'AreaExamples',

  components: {
    TextArea,
    AppButton
  },

  data: () => ({
    areaModel: 'Hey some long text'
  }),

  methods: {
    checkValueOfData(dataName) {
      alert(this[dataName])
    }
  }
}
</script>

<style scoped>
</style>
