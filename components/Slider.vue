<template>
  <div class="slider relative">
    <div class="text-p3 text-grey uppercase tracking-wide w-full">
      <slot name="label" />
    </div>
    <template v-if="!range">
      <span class="font-medium text-h5 w-full">{{ formattedCurrentValue }}</span>
    </template>
    <template v-else>
      <span class="font-medium text-h5 w-full">{{ formattedRangeCurrentValue }}</span>
    </template>

    <v-slider
      v-if="!range"
      v-bind="$props"
      class="-mt-1"
      :color="'#FF553F'"
      @change="onChange"
      @input="onInput"
    />
    <v-range-slider
      v-else
      v-bind="$props"
      class="-mt-1"
      :color="'#FF553F'"
      @change="onChange"
      @input="onInput"
    />

    <span class="left-0 bottom-0 absolute text-grey">{{ formattedMin }}</span>
    <span class="right-0 bottom-0 absolute text-grey">{{ formattedMax }}</span>
  </div>
</template>

<script>
export default {
  name: 'Slider',

  props: {
    value: {
      type: [Number, Array],
      required: true
    },

    range: {
      type: Boolean,
      default: false
    },

    formatter: {
      type: Function,
      default: null
    },

    formatterArgs: {
      type: Array,
      default: () => []
    },

    min: {
      type: Number,
      default: 0
    },

    max: {
      type: Number,
      default: 100
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    currentValue: []
  }),

  computed: {
    formattedCurrentValue() {
      if (this.formatter !== null) {
        return this.formatter(this.currentValue, ...this.formatterArgs)
      } else {
        return this.$filters.number(this.currentValue)
      }
    },

    formattedRangeCurrentValue() {
      if (this.formatter !== null) {
        return (
          this.formatter(this.currentValue[0], ...this.formatterArgs) +
          ' - ' +
          this.formatter(this.currentValue[1], ...this.formatterArgs)
        )
      } else {
        return (
          this.$filters.number(this.currentValue[0]) +
          ' - ' +
          this.$filters.number(this.currentValue[1])
        )
      }
    },

    formattedMin() {
      if (this.formatter !== null) {
        return this.formatter(this.min, ...this.formatterArgs)
      } else {
        return this.$filters.number(this.min)
      }
    },

    formattedMax() {
      if (this.formatter !== null) {
        return this.formatter(this.max, ...this.formatterArgs)
      } else {
        return this.$filters.number(this.max)
      }
    }
  },

  watch: {
    value(val) {
      this.currentValue = val
    }
  },

  mounted() {
    this.currentValue = this.value
  },

  methods: {
    onInput(value) {
      this.currentValue = value
      this.$emit('input', value)
    },
    onChange(value) {
      this.onInput(value)
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="postcss">
.slider .v-slider__thumb {
  @apply .bg-white .border-2 .border-red !important;
}
</style>
