<template>
  <div class="switcher">
    <v-switch :input-value="value" v-bind="$props" :disabled="disabled" @change="onChange" />
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput'

export default BaseInput.extend({
  name: 'Switcher',

  props: {
    color: {
      type: String,
      default: 'red'
    },
    value: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onChange(value) {
      this.$emit('input', value || false)
    }
  }
})
</script>

<style lang="postcss">
.switcher {
  mb-6 sm:mb-0 .v-input--selection-controls {
    @apply mt-0;
  }

  .v-input__control {
    min-height: auto;
    .v-input--selection-controls__input {
      @apply .mr-10;
    }

    .v-label {
      @apply .mt-1 .font-serif .normal-case;
    }

    .v-input--switch__thumb {
      @apply .w-6 .h-6 .shadow-none .bg-grey-l2;
      left: 7px;

      &.red--text {
        @apply .bg-red;
      }

      &.green--text {
        @apply .bg-green;
      }
    }

    .v-input--switch__track {
      @apply .bg-grey-l3 .h-8;
      width: 3.5rem;
      border-radius: 1.5rem;
      top: calc(50% - 0.875rem);

      &.red--text {
        @apply .bg-red-l5;
      }

      &.green--text {
        @apply .bg-green-l4;
      }
    }
    .v-input--is-disabled {
      .v-input--selection-controls__input {
        @apply .opacity-25;
      }
    }

    .v-input--selection-controls__input {
      transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
  }

  .v-input--switch .v-input--selection-controls__ripple {
    left: -2px;
    opacity: 0.4;
    top: calc(50% - 1.375rem);
  }

  .v-input--switch.v-input--is-dirty {
    .v-input--switch__thumb {
      transform: translate(1.375rem, 0);
    }
  }
}

@media (max-width: 768px) {
  .switcher {
    .v-input--selection-controls {
      @apply .mt-3;
    }
  }
}
</style>
