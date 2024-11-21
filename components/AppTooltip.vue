<template>
  <div class="tooltip relative inline-block">
    <div class="activator flex" @mouseenter="showTooltip" @mouseleave="hideTooltip">
      <slot name="activator">
        <span class="lni-question-circle p-1" />
      </slot>
    </div>
    <transition name="fade">
      <div
        v-show="!hidden"
        :class="tooltipClass"
        class="tracking-wide inline-block z-30 absolute border border-grey-l3 py-2 px-4 -mt-3 leading-tight min-w-28"
      >
        <slot>{{ $t('general.default') }}</slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppTooltip',

  props: {
    color: {
      type: String,
      default: 'dark'
    },
    position: {
      type: String,
      default: 'right'
    },
    thresholdOffset: {
      type: Number,
      default: 100
    }
  },

  data: () => ({
    hidden: true,
    usedPosition: 'right'
  }),

  computed: {
    tooltipClass() {
      return 'tooltip--' + this.color + ' tooltip--' + this.usedPosition
    }
  },

  mounted() {
    this.usedPosition = this.position
  },

  methods: {
    controlTooltipPosition() {
      const offset = this.$el.getBoundingClientRect()
      if (this.position === 'top') {
        if (offset.top < this.thresholdOffset) {
          this.usedPosition = 'bottom'
        } else {
          this.usedPosition = 'top'
        }
      }

      if (this.position === 'bottom') {
        if (offset.bottom < this.thresholdOffset) {
          this.usedPosition = 'top'
        } else {
          this.usedPosition = 'bottom'
        }
      }

      if (this.position === 'left') {
        if (offset.left < this.thresholdOffset) {
          this.usedPosition = 'right'
        } else {
          this.usedPosition = 'left'
        }
      }

      if (this.position === 'right') {
        if (offset.right < this.thresholdOffset) {
          this.usedPosition = 'left'
        } else {
          this.usedPosition = 'right'
        }
      }
    },

    showTooltip() {
      this.controlTooltipPosition()
      this.hidden = false
    },

    hideTooltip() {
      this.hidden = true
    }
  }
}
</script>

<style lang="postcss">
.tooltip--light {
  @apply .text-grey-d1 .bg-white .border-grey-l3;
  &::before {
    @apply .border-grey-l3 .bg-white .absolute;
    content: ' ';
    width: 0.625rem;
    height: 0.625rem;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}
.tooltip--dark {
  @apply .text-white .bg-black .border-transparent;
  &::before {
    @apply .bg-black .absolute;
    content: ' ';
    width: 0.625rem;
    height: 0.625rem;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}

.tooltip--top {
  bottom: 102%;
  left: -0.65rem;

  &::before {
    @apply .border-b .border-l;
    left: 1rem;
    bottom: -0.375rem;
    border-color: black;
  }
}

.tooltip--left {
  @apply .top-0;
  right: 102%;
  min-width: 6.25rem;

  &::before {
    @apply .border-b .border-r;
    right: -0.375rem;
    top: 1rem;
    border-color: black;
  }
}

.tooltip--bottom {
  bottom: -2.75rem;
  left: -0.65rem;

  &::before {
    @apply .border-t .border-r;
    left: 1rem;
    top: -0.375rem;
    border-color: black;
  }
}

.tooltip--right {
  @apply .ml-2 .top-0;
  left: 100%;

  &::before {
    @apply .border-t .border-l;
    left: -0.375rem;
    top: 1rem;
    border-color: black;
  }
}
</style>
