<template>
  <div class="relative">
    <span v-if="soloLabel && outline" class="text-grey text-p2 uppercase tracking-wide">
      {{ soloLabel }}
    </span>
    <span v-if="soloLabel && required && outline" class="text-red text-p2">
      *
    </span>
    <v-textarea
      :no-resize="noResizeProp"
      :single-line="stickyLabel"
      v-bind="$props"
      :class="[requiredClass]"
      class="textarea"
      :error-messages="translatableErrorMessages"
      @change="onChange"
      @keyup.enter="$emit('enterClick')"
      @input="onInput"
    />
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput'
import SingleUpload from '@/components/SingleUpload'

export default BaseInput.extend({
  name: 'TextArea',

  components: {
    SingleUpload
  },

  props: {
    name: {
      type: String,
      default: 'name'
    },
    autoGrow: {
      type: Boolean,
      default: false
    },
    counter: {
      type: Number,
      default: null
    },
    noResizeProp: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 5
    },
    soloLabel: {
      type: String,
      default: 'Label'
    },
    errorMessages: {
      type: Array,
      default() {
        return []
      }
    }
  },

  computed: {
    requiredClass() {
      return this.required ? 'required-sign' : 'no-required'
    },

    translatableErrorMessages() {
      return this.errorMessages.map(message => this.$t(message))
    }
  },

  methods: {
    onChange(value) {
      this.onInput(value)
      this.$emit('change', value)
    },
    onInput(value) {
      this.$emit('input', value)
    }
  }
})
</script>

<style lang="postcss">
.v-textarea.v-text-field--enclosed textarea {
  margin-top: 0px;
}

.textarea {
  textarea {
    @apply .min-h-20 .leading-tight;
  }

  .v-textarea textarea {
    flex: 1 1 auto;
    line-height: 18px;
  }

  &.required-sign {
    label::after {
      @apply text-red;
      content: '*';
    }
  }

  &.no-required {
  }
}

.v-text-field.v-text-field--solo > .v-input__control > .v-input__slot {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0) !important;
}
</style>
