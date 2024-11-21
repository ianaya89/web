<template>
  <div :class="mainClasses">
    <span :class="[growthClasses, iconClass]" />
    <span v-if="showValue" class="ml-1 pt-1" :class="[applyColorOnText ? textColorClass : '']">
      <slot>
        <span ref="bounty" class="flex" />
      </slot>
    </span>
  </div>
</template>

<script>
import bounty from 'bounty'
import { bountyFilterFix } from '@/services/helpers'

export default {
  name: 'Growth',

  props: {
    mainClasses: {
      type: String,
      default: 'flex items-center'
    },
    upIcon: {
      type: String,
      default: 'fas fa-arrow-alt-circle-up'
    },
    downIcon: {
      type: String,
      default: 'fas fa-arrow-alt-circle-down'
    },
    iconClass: {
      type: String,
      default: ''
    },
    upColor: {
      type: String,
      default: 'text-green'
    },
    downColor: {
      type: String,
      default: 'text-red'
    },
    applyColorOnText: {
      type: Boolean,
      default: true
    },
    showValue: {
      type: Boolean,
      default: true
    },
    value: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: false,
      default: 2000
    }
  },

  data: () => ({
    animated: false
  }),

  computed: {
    growthClasses() {
      if (this.value < 0) {
        return this.downIcon + ' ' + this.textColorClass
      } else {
        return this.upIcon + ' ' + this.textColorClass
      }
    },

    textColorClass() {
      if (this.value < 0) {
        return this.downColor
      } else {
        return this.upColor
      }
    }
  },

  watch: {
    value() {
      if (this.$refs.bounty != null) {
        const bountyInstance = bounty({
          el: this.$refs.bounty,
          value: this.$filters.percentage(this.value),
          initialValue: this.$filters.percentage(this.value),
          duration: 2000
        })
        if (!this.animated) {
          this.animated = !this.animated
          setTimeout(() => {
            bountyFilterFix(this.$refs.bounty)
          }, 2000)
        } else {
          if (bountyInstance) {
            bountyInstance.cancel()
          }
          bountyFilterFix(this.$refs.bounty)
        }
      }
    }
  }
}
</script>

<style lang="postcss">
span > svg {
  @apply .my-auto;
}
.text-red svg text {
  fill: #ff553f;
}
.text-green svg text {
  fill: #21ce99;
}
</style>
