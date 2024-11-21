<template>
  <div class="relative mt-20">
    <v-progress-linear v-bind="$props" />
    <v-chip
      v-if="label"
      :class="['triangle--' + color]"
      :style="{left : offset}"
      :color="color"
      class="mb-5 top-0 -mt-16 label--progress-bar label--progress-bar-transition"
    >
      <slot>{{ value }}% complete</slot>
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',

  props: {
    value: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: 'red'
    },
    bufferValue: {
      type: Number,
      default: 0
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 5
    },
    active: {
      type: Boolean,
      default: true
    },
    label: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    offset() {
      return this.value + '%'
    }
  }
}
</script>

<style lang="postcss" scoped>
.label--progress-bar:hover,
.label--progress-bar:focus,
.label--progress-bar:active {
  box-shadow: none;
  background-color: transparent;
  color: white;
  border-radius: 0;
}

.label--progress-bar {
  @apply .font-sans .text-white .text-p2 .font-semibold .uppercase .tracking-wide .p-1 .rounded-none .absolute;

  &:focus::after {
    background: transparent;
  }

  &.triangle--grey,
  &:focus.triangle--grey {
    &:after {
      @apply .block .absolute .left-0 .border-l-40 .border-grey;
      content: '';
      bottom: -1.5rem;
      top: initial;
      border-bottom: 2.25rem transparent solid;
      opacity: 1;
    }
  }

  &.triangle--grey-l3,
  &:focus.triangle--grey-l3 {
    &:after {
      @apply .block .absolute .left-0 .border-l-40 .border-grey-l3;
      content: '';
      bottom: -1.5rem;
      top: initial;
      border-bottom: 2.25rem transparent solid;
      opacity: 1;
    }
  }

  &.triangle--red,
  &:focus.triangle--red {
    &:after {
      @apply .block .absolute .left-0 .border-l-40 .border-red;
      content: '';
      bottom: -1.5rem;
      top: initial;
      border-bottom: 2.25rem transparent solid;
      opacity: 1;
    }
  }

  &.triangle--green,
  &:focus.triangle--green {
    &:after {
      @apply .block .absolute .left-0 .border-l-40 .border-green;
      content: '';
      bottom: -1.5rem;
      top: initial;
      border-bottom: 2.25rem transparent solid;
      opacity: 1;
    }
  }

  &.triangle--blue,
  &:focus.triangle--blue {
    &:after {
      @apply .block .absolute .left-0 .border-l-40 .border-blue;
      content: '';
      bottom: -1.5rem;
      top: initial;
      border-bottom: 2.25rem transparent solid;
      opacity: 1;
    }
  }
}

.label--progress-bar-transition {
  transition: all 0.5s ease-out;

  &:focus {
    box-shadow: none;
  }
}
</style>
