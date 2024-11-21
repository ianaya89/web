<template>
  <div :class="[size, {'cursor-pointer': clickable}]" class="relative" @click="toggleItem">
    <slot />
    <span :class="[currentIcon, currentColor]" class="fa absolute right-0 bottom-0 bg-white shadow-md px-1 py-1" />
  </div>
</template>

<script>
export default {
  name: 'IconCheck',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'h-16 w-16'
    },
    checkedIcon: {
      type: String,
      default: 'fa-check'
    },
    uncheckedIcon: {
      type: String,
      default: 'fa-question'
    },
    clickable: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    currentValue: false
  }),

  computed: {
    currentIcon() {
      return this.currentValue ? this.checkedIcon : this.uncheckedIcon
    },

    currentColor() {
      return this.currentValue ? 'text-green' : 'text-grey-l2'
    }
  },

  mounted() {
    this.currentValue = this.value
  },

  methods: {
    toggleItem() {
      if (this.clickable) {
        this.currentValue = !this.currentValue
        this.$emit('input', this.currentValue)
      }
    }
  }
}
</script>

<style scoped>
</style>
