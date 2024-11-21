<template>
  <button
    :class="['button--' + btnClass]"
    class="focus:outline-none"
    @click.stop="clickAction"
  >
    <div class="w-full flex align-center align-middle justify-between">
      <div class="h-full">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        v-if="showArrow"
        class="ml-8 animation--arrow-up h-full"
      >
        <span v-if="arrowType==='arrow'" class="lni-arrow-up my-auto" />
        <span v-else-if="arrowType==='caret'" class="fas fa-chevron-down my-auto" />
        <span class="capitalize">
          <slot name="arrow-text" />
        </span>
      </div>
    </div>
  </button>
</template>

  <script>
export default {
  name: 'DropdownAppButton',

  props: {
    title: {
      type: String,
      default: 'title'
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    arrowType: {
      type: String,
      default: 'arrow'
    },
    btnClass: {
      type: String,
      default: 'primary'
    }
  },

  data: () => ({}),

  computed: {},

  methods: {
    clickAction() {
      this.$emit('clicked')
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
