<template>
  <div class="select-none">
    <span
      class="text-red pr-1 my-auto"
      :class="[inverted ? moveForwardClasses : moveBackwardClasses, leftIcon, {'hidden': !moversAlwaysVisible && data.length === 1}]"
      @click="inverted ? moveForward() : moveBackward()"
    />
    <span class="font-medium flex-grow">
      <slot name="content" :current="data[selectedIndex]" :index="selectedIndex" />
    </span>
    <span
      class="text-red pl-1 my-auto"
      :class="[inverted ? moveBackwardClasses : moveForwardClasses, rightIcon, {'hidden': !moversAlwaysVisible && data.length === 1}]"
      @click="inverted ? moveBackward() : moveForward()"
    />
  </div>
</template>

<script>
export default {
  name: 'Mover',

  props: {
    data: {
      type: Array,
      required: true
    },
    inverted: {
      type: Boolean,
      default: true
    },
    leftIcon: {
      type: String,
      default: 'fa fa-chevron-left'
    },
    rightIcon: {
      type: String,
      default: 'fa fa-chevron-right'
    },
    moversAlwaysVisible: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    selectedIndex: 0
  }),

  computed: {
    moveForwardClasses() {
      if (this.data.length === this.selectedIndex + 1) {
        return 'disabled'
      } else {
        return 'cursor-pointer'
      }
    },

    moveBackwardClasses() {
      if (this.selectedIndex === 0) {
        return 'disabled'
      } else {
        return 'cursor-pointer'
      }
    }
  },

  watch: {
    data: {
      handler() {
        this.selectedIndex = 0
      },
      deep: true
    }
  },

  methods: {
    moveBackward() {
      if (this.selectedIndex !== 0) {
        this.selectedIndex--
        this.$emit('change', this.selectedIndex)
      }
    },

    moveForward() {
      if (this.data.length > this.selectedIndex + 1) {
        this.selectedIndex++
        this.$emit('change', this.selectedIndex)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
