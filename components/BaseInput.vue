<template>
  <div class="base-input">
    <!-- should be implemented in the derived components -->
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseInput',

  props: {
    appendedIcon: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: 'Label'
    },
    outline: {
      type: Boolean,
      default: false
    },
    persistentHint: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    prependedIcon: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    stickyLabel: {
      type: Boolean,
      default: false
    },
    solo: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number],
      default: null
    }
  }
})
</script>

<style scoped>
</style>
