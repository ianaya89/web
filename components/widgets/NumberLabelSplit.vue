<template>
  <div class="w-full flex flex-wrap pt-2">
    <div v-for="field in values" :key="field.label" class="w-1/2 sm:w-1/4">
      <data-label :label="field.label">
        {{ field.value | number(true) }}
      </data-label>
    </div>
  </div>
</template>

<script>
import DataLabel from '@/components/DataLabel'

export default {
  components: {
    DataLabel
  },

  props: {
    values: {
      type: Array,
      default: () => []
    }
  }
}
</script>
