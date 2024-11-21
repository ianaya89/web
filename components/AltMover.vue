<template>
  <div class="flex select-none">
    <span
      class="text-xl pr-1 my-auto"
      :class="[inverted ? moveForwardClasses : moveBackwardClasses, leftIcon, {'hidden': !moversAlwaysVisible && data.length === 1}]"
      @click="inverted ? moveForward() : moveBackward()"
    />
    <span class="text-xl mr-1">1</span>

    <span v-for="(logo, key) in data" :key="key" class="slides-steps text-xl" :data-step="key" :class="{ 'active' : selectedIndex >= key }" />
    <slot name="lastpage" />
    <!-- <span class="text-xl ml-1">{{ lastPage }}</span> -->
    <span
      class="text-xl pl-1 my-auto"
      :class="[inverted ? moveBackwardClasses : moveForwardClasses, rightIcon, {'hidden': !moversAlwaysVisible && data.length === 1}]"
      @click="inverted ? moveBackward() : moveForward()"
    />
  </div>
</template>

<script>
export default {
  name: 'AltMover',

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
      default: 'lni-arrow-left my-auto'
    },
    rightIcon: {
      type: String,
      default: 'lni-arrow-right my-auto'
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
    },

    lastPage() {
      return this.data.length
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
.slides-steps {
  display: block;

  &:before {
    display: inline-block;
    content: ' ';
    height: 1px;
    width: 1rem;
    background-color: #d9d9d9;
    vertical-align: middle;
  }

  &.active:before {
    background-color: #797979;
  }
}
</style>
