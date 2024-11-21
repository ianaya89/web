<template>
  <v-checkbox
    v-model="valueData"
    class="checkbox"
    :class="[requiredClass]"
    v-bind="$props"
    :value="checkboxValue"
    :error-messages="translatableErrorMessages"
    @change="valueChanged"
  >
    <template v-slot:label>
      <slot name="label" />
    </template>
  </v-checkbox>
</template>

<script>
import BaseInput from '@/components/BaseInput'

export default BaseInput.extend({
  name: 'Checkbox',

  props: {
    color: {
      type: String,
      default: 'red'
    },
    checkboxValue: {
      type: [String, Number],
      required: true
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Array, Boolean],
      default: null
    },
    errorMessages: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data: () => ({
    valueData: null
  }),

  watch: {
    value(newVal) {
      this.valueData = newVal
    }
  },
  computed: {
    translatableErrorMessages() {
      return this.errorMessages.map(message => this.$t(message))
    },

    requiredClass() {
      return this.required ? 'required-sign' : ''
    }
  },
  mounted() {
    this.valueData = this.value
  },

  methods: {
    valueChanged(value) {
      this.$emit('input', value)
    }
  }
})
</script>

<style lang="postcss">
.checkbox {
  &.v-input--has-state {
    .v-input__control {
      .v-input__slot {
        &::before {
          @apply .border-red;
        }
      }
    }

    .v-messages__message {
      @apply .text-red .leading-tight;
    }
  }

  .v-input__control .v-input__slot {
    @apply .mb-0;

    .red--text {
      @apply .text-red;
    }

    .v-messages {
      @apply .pt-1 .leading-tight;
    }

    .theme--light.fa-minus-square.v-icon {
      @apply .text-red;
    }

    .required-sign {
      label::after {
        @apply .text-red;
        content: '*';
      }
    }
  }
}
</style>
