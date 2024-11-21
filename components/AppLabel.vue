<template>
  <v-chip
    :class="[{hidden: isClosed, 'cursor-pointer': closeable}]"
    :close="closeable"
    v-bind="$props"
    class="app-label"
    @input="toggleClose"
  >
    <slot>Label</slot>
    <span v-if="closeable" class="label-close" @click.stop="toggleClose">
      <span class="pl-3 pt-1 -mr-1 lni-close" />
    </span>
  </v-chip>
</template>

<script>
export default {
  name: 'AppLabel',

  props: {
    closeable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    textColor: {
      type: String,
      default: null
    }
  },

  data: () => ({
    isClosed: false
  }),

  methods: {
    toggleClose() {
      if (!this.disabled) {
        this.isClosed = !this.isClosed
        if (this.isClosed) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>

<style lang="postcss">
.v-chip.app-label {
  @apply .rounded-sm .text-white .text-p3 .bg-black .tracking-wide .font-medium .pt-1 .h-8 .uppercase;
  transition: all 0.3s;

  &:hover,
  &:focus,
  &:active {
    @apply .shadow .bg-grey;
  }

  .v-chip__content {
  }

  &.label-blue {
    @apply .text-black .bg-blue-l5;
  }

  &.label-green {
    @apply .text-black .bg-green-l5;
  }

  &.label-red {
    @apply .text-black .bg-red-l5;
  }

  &.label-yellow {
    @apply .text-black .bg-yellow;
  }
}

.v-chip.v-chip.v-chip--outline {
  @apply text-black;

  &:hover,
  &:focus,
  &:active {
    border: 1px solid grey;
    color: grey;
    box-shadow: none;
  }
}

.v-chip.app-label.v-chip--disabled {
  @apply .bg-grey-l2;
}

.v-chip__close {
  i {
    display: none;
  }
}

.label-close {
  @apply .text-red;
  transition: 0.3s ease-out;
}
</style>
