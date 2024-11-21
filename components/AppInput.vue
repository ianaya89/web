<template>
  <div>
    <span v-if="soloLabel && outline" class="text-grey text-p3 uppercase tracking-wide">
      {{ soloLabel }}
    </span>
    <span v-if="soloLabel && required && outline" class="text-red text-p3">
      *
    </span>
    <app-tooltip v-if="soloLabel && tooltip" class="text-p2">
      {{ tooltipText }}
    </app-tooltip>
    <v-text-field
      ref="textfield"
      v-bind="$props"
      :value="formattedValue"
      :class="[requiredClass, classes, labelMargins]"
      :type="inputType"
      :single-line="stickyLabel"
      :append-icon="displayedAppendIcon"
      :prepend-icon="displayedPrependIcon"
      :error-messages="translatableErrorMessages"
      @change="onChange"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @click:append="appendClick"
      @click:prepend="prependClick"
    />
  </div>
  <!-- if the label does not move up, maybe better name would be - staticLabel -->
</template>


<script>
import BaseInput from '@/components/BaseInput'
import AppTooltip from '@/components/AppTooltip'

export default BaseInput.extend({
  name: 'AppInput',

  components: {
    AppTooltip
  },

  props: {
    classes: {
      type: String,
      default: 'mt-6'
    },
    browserAutocomplete: {
      type: String,
      default: undefined
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text',
      validator: value => {
        return ['text', 'email', 'password', 'number'].indexOf(value) !== -1
      }
    },
    isCurrency: {
      // supported only if type === 'text'
      type: Boolean,
      default: false
    },
    isArray: {
      // supported only if value.isArray()' useful for datepicker with multiple option
      type: Boolean,
      default: false
    },
    passwordSwitch: {
      type: Boolean,
      default: false
    },
    suffix: {
      type: String,
      default: null
    },
    counter: {
      type: Number,
      default: null
    },
    appendedIcon2: {
      type: String,
      default: null
    },
    prependedIcon2: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    soloLabel: {
      type: String,
      default: 'Label'
    },
    tooltip: {
      type: Boolean,
      default: null
    },
    tooltipText: {
      type: String,
      default: 'Tooltip'
    },
    errorMessages: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data: () => ({
    appendIconSwitch: false,
    prependIconSwitch: false,
    valueData: null
  }),

  computed: {
    translatableErrorMessages() {
      return this.errorMessages.map(message => this.$t(message))
    },

    hasError() {
      if (!this.$refs.textfield) {
        return false
      }

      return this.$refs.textfield.hasError
    },

    displayedAppendIcon() {
      if (this.appendedIcon2 == null) {
        return this.appendedIcon
      } else if (this.appendIconSwitch) {
        return this.appendedIcon2
      } else {
        return this.appendedIcon
      }
    },

    displayedPrependIcon() {
      if (this.prependedIcon2 == null) {
        return this.prependedIcon
      } else if (this.prependIconSwitch) {
        return this.prependedIcon2
      } else {
        return this.prependedIcon
      }
    },

    inputType() {
      if (this.passwordSwitch && this.appendIconSwitch) {
        return 'text'
      } else if (this.passwordSwitch && !this.appendIconSwitch) {
        return 'password'
      } else {
        return this.type
      }
    },

    requiredClass() {
      return this.required ? 'required-sign' : 'no-required'
    },

    labelMargins() {
      return this.label === null ? 'no-label' : ''
    },

    formattedValue() {
      if (this.isCurrency) {
        return this.$filters.currency(this.valueData, false, false, 0)
      } else if (this.isArray) {
        return this.valueData !== null ? this.valueData.join(', ') : ''
      } else {
        return this.valueData
      }
    }
  },

  watch: {
    value(newVal) {
      this.valueData = newVal
    }
  },

  mounted() {
    this.valueData = this.value
  },

  methods: {
    formatCurrencyInput(value) {
      if (this.isCurrency) {
        const input = this.$el.querySelector('input')
        const initPosition = input.selectionStart
        value = Number(
          String(value)
            .replace(/ /g, '')
            .replace(/,/g, '')
        )
        this.valueData = value
        this.$nextTick(() => {
          this.setCaretPosition(input, initPosition)
        })
      }
      return value
    },

    appendClick() {
      this.appendIconSwitch = !this.appendIconSwitch
    },

    prependClick() {
      this.prependIconSwitch = !this.prependIconSwitch
    },

    focus() {
      this.$refs.textfield.focus()
    },

    onFocus() {
      this.$emit('focus')
    },

    onBlur() {
      this.$emit('blur')
    },

    onChange(value) {
      value = this.formatCurrencyInput(value)
      if (this.type === 'number') {
        this.$emit('change', Number(value))
      } else {
        this.$emit('change', value)
      }
    },

    onInput(value) {
      value = this.formatCurrencyInput(value)
      if (this.type === 'number') {
        this.$emit('input', Number(value))
      } else {
        this.$emit('input', value)
      }
    },

    setCaretPosition(elem, caretPos) {
      if (elem != null) {
        elem.focus()
        elem.setSelectionRange(caretPos, caretPos)
      }
    },

    resetValidation() {
      if (this.$refs.textfield) {
        this.$refs.textfield.resetValidation()
      }
    },

    validate() {
      if (this.$refs.textfield) {
        this.$refs.textfield.validate(true)
      }
    }
  }
})
</script>

<style lang="postcss">
.v-text-field {
  input {
    @apply py-0;
  }
}

.v-input {
  input {
    max-height: none;

    &[type='password'] {
      @apply .font-serif;
    }
  }
}

.v-input.v-text-field {
  label {
    @apply .tracking-wide .uppercase;
    top: 0.15rem;
  }

  &.no-label input {
    @apply .my-auto;
  }

  .v-icon {
    @apply .text-menu .text-red;
    &.text-red {
      @apply .text-red;
    }
  }

  &.before-after-white {
    .v-input__control .v-input__slot {
      &:hover {
        &:before {
          @apply .border-white;
        }
      }

      &:before {
        border-color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .v-messages {
    @apply .pt-1 .leading-tight .normal-case;
  }

  .v-counter {
    @apply .pt-2;
  }

  .v-icon {
    @apply .text-menu;
  }

  .v-input__slot {
    margin-bottom: 0;
  }

  &.text-right .v-text-field__slot input {
    @apply .text-right;
  }

  &.text-h4 .v-text-field__slot input {
    @apply .text-h4;
  }

  &.text-white .v-text-field__slot input {
    @apply .text-white;
  }

  &.v-text-field .v-label {
    @apply .tracking-wide .truncate;
    word-wrap: break-word;
  }
}

.v-text-field--outline {
  .v-input__control {
    min-height: 5.5rem;
    .v-input__slot {
      @apply .rounded-none .border .border-grey-l2 !important;
      transition: 0.15s ease-in-out !important;

      &:hover,
      &:active {
        /* @apply .border-black

        // !important; */
      }
    }
  }
}

.v-text-field--outline.v-input--has-state {
  .v-input__control > .v-input__slot {
    border: 1px solid red !important;
  }
}

.v-text-field.v-input--has-state {
  .v-input__control > .v-input__slot::before {
    @apply .border-red;
  }

  .v-messages__message {
    @apply .text-red .leading-tight;
  }
}

.v-input__control {
  @apply .tracking-wide;

  input,
  textarea {
    @apply .text-menu .font-medium;
  }
}

.v-input--is-disabled {
  opacity: 0.6;
}

.required-sign {
  label::after {
    @apply .text-red;
    content: '*';
  }
}

.no-required {
}

.v-text-field--outline > .v-input__control > .v-input__slot {
  background: white !important;
}
</style>
