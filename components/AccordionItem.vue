<template>
  <div :class="[{'border-t' : topBorder}, {'border-b' : bottomBorder}, {'border-l' : leftBorder}, {'border-r' : rightBorder}]" class="accordion border-grey-l3">
    <div class="accordion-header" :class="headerClasses" @click="toggleAccordion">
      <span
        v-if="openerOnLeft"
        :class="['pr-4', currentIconClass]"
        class="opener font-bold"
      />
      <slot name="header" />
      <span
        v-if="!openerOnLeft"
        :class="['px-4', currentIconClass]"
        class="opener font-bold ml-auto"
      />
    </div>
    <transition name="fade-down">
      <div v-if="!closed" :class="[{'hidden' : closed},{'pl-8' : openerOnLeft},bodyClasses]" class="accordion-body">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AccordionItem',

  props: {
    showIcon: {
      type: String,
      default: 'lni-chevron-down'
    },
    hideIcon: {
      type: String,
      default: 'lni-chevron-up'
    },
    headerClasses: {
      type: String,
      default: ''
    },
    bodyClasses: {
      type: String,
      default: ''
    },
    openerOnLeft: {
      type: Boolean,
      default: false
    },
    topBorder: {
      type: Boolean,
      default: false
    },
    bottomBorder: {
      type: Boolean,
      default: true
    },
    leftBorder: {
      type: Boolean,
      default: false
    },
    rightBorder: {
      type: Boolean,
      default: false
    },
    autoOpen: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    closed: true
  }),

  computed: {
    currentIconClass() {
      if (this.closed) {
        return this.showIcon
      } else {
        return this.hideIcon
      }
    }
  },

  mounted() {
    this.closed = !this.autoOpen
  },

  methods: {
    toggleAccordion() {
      this.closed = !this.closed
      if (!this.closed) {
        this.$parent.$emit('accordion-item-opened', this._uid)
      }
    },

    hide() {
      this.closed = true
    },

    show() {
      this.closed = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.accordion-header {
  @apply .flex .items-center .select-none .cursor-pointer .relative;
}
.opener {
  @apply text-red;
  &::before {
    @apply .float-right;
  }
}
</style>
