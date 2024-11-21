<template>
  <div class="tween" :class="isVisible">
    <slot />
  </div>
</template>

<script>
import { setTimeout } from 'timers'
import { isScrolledIntoView } from '@/services/helpers'

export default {
  name: 'TweenContent',

  props: {
    localQuerySelector: {
      type: String,
      required: true
    },

    startValue: {
      type: Number,
      default: 0
    },

    duration: {
      type: Number,
      default: 1000
    },

    initVisible: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    animated: false
  }),

  computed: {
    isVisible() {
      return this.animated || this.initVisible
        ? 'tween-visible'
        : 'tween-invisible'
    }
  },

  mounted() {
    if (!this.initVisible) {
      window.addEventListener('scroll', () => {
        if (!this.animated && isScrolledIntoView(this.$el)) {
          this.animateContent()
        }
      })
    } else if (!this.animated) {
      this.animateContent()
    }
  },

  methods: {
    animateContent() {
      const minTimer = 100
      const contentElement = this.$el.querySelector(this.localQuerySelector)
      const textStarting = contentElement.innerHTML
      const endValue = parseInt(textStarting.replace(/\D/g, ''))
      const range = endValue - this.startValue
      const duration = this.duration

      let stepTime = Math.abs(Math.floor(duration / range))
      stepTime = Math.max(stepTime, minTimer)

      const startTime = new Date().getTime()
      const endTime = startTime + duration
      let timer = null

      timer = setInterval(() => {
        const now = new Date().getTime()
        const remaining = Math.max((endTime - now) / duration, 0)
        const value = Math.round(endValue - remaining * range)
        contentElement.innerHTML = textStarting.replace(/([0-9]+)/g, value)
        if (value === endValue) {
          clearInterval(timer)
        }
      }, stepTime)

      setTimeout(() => {
        this.animated = true
      }, stepTime)
    }
  }
}
</script>

<style lang="postcss" scoped>
.tween {
  transition: opacity 1000ms linear;
  will-change: opacity;

  &.tween-invisible {
    opacity: 0;
  }
  &.tween-visible {
    opacity: 100;
  }
}
</style>
