<template>
  <div
    class="rounded-full bg-red text-white w-6 h-6 text-center text-p4 flex items-center border-white border-solid border-2"
    :class="{'change-value-animation':valueChanged}"
  >
    <transition name="fade" mode="out-in">
      <span v-if="value !== null" :key="badgeValue" class="pt-px flex-1 font-bold leading-none">
        {{ badgeValue }}
      </span>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Badge',

  props: {
    value: {
      type: Number,
      default: null
    }
  },

  data: () => ({
    valueChanged: false
  }),

  computed: {
    badgeValue() {
      return this.value > 99 ? '99+' : this.value
    }
  },

  watch: {
    value() {
      this.valueChanged = true
      setTimeout(() => {
        this.valueChanged = false
      }, 1000)
    }
  }
}
</script>

<style lang="postcss" scoped>
@keyframes badge-bounce {
  0% {
    transform: scale(1, 1) translate3d(0, 0, 0);
  }
  10% {
    transform: scale(1.15, 0.85) translate3d(0, 0, 0);
  }
  30% {
    transform: scale(0.9, 1.1) translate3d(0, -40%, 0);
  }
  50% {
    transform: scale(1.05, 0.95) translate3d(0, 0, 0);
  }
  60% {
    transform: scale(0.95, 1.05) translate3d(0, -15%, 0);
  }
  70% {
    transform: scale(1.02, 0.98) translate3d(0, 0, 0);
  }
  75% {
    transform: scale(1, 1) translate3d(0, 0, 0);
  }
  100% {
    transform: scale(1, 1) translate3d(0, 0, 0);
  }
}

.change-value-animation {
  animation-duration: 1000ms;
  animation-iteration-count: 1;
  animation-name: badge-bounce;
  animation-timing-function: ease;
  transform-origin: bottom;
}
</style>
