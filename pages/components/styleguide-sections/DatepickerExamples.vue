<template>
  <div class="container">
    <h2>Datepicker</h2>
    <datepicker v-model="pickerModel" />
    <app-button
      ref="inputBtn"
      :should-disable="false"
      title="Check Value"
      btn-class="primary"
      @clicked="checkValueOfData('pickerModel')"
    />

    <datepicker v-model="pickerModelMultiple" :multiple="true" />
    <app-button
      ref="inputBtn"
      :should-disable="false"
      title="Check Multiple Values"
      btn-class="primary"
      @clicked="checkValueOfData('pickerModelMultiple')"
    />
  </div>
</template>

<script>
import Datepicker from '@/components/Datepicker'
import AppButton from '@/components/AppButton'

export default {
  name: 'DatepickerExamples',

  components: {
    Datepicker,
    AppButton
  },

  data: () => ({
    pickerModel: null,
    pickerModelMultiple: []
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
