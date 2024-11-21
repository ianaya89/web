<template>
  <v-app>
    <div class="container">
      <h2>Sliders</h2>

      <slider :value="sliderModel">
        <template v-slot:label>
          <div class="flex">
            <span>Capacity</span>
            <app-tooltip />
          </div>
        </template>
      </slider>
      <slider :value="sliderRangeModel" :range="true" />
    </div>
  </v-app>
</template>

<script>
import Slider from '@/components/Slider'
import AppTooltip from '@/components/AppTooltip'

export default {
  name: 'SliderExamples',

  components: {
    AppTooltip,
    Slider
  },

  data: () => ({
    sliderModel: 30,
    sliderRangeModel: [10, 40]
  })
}
</script>

<style scoped>
</style>
