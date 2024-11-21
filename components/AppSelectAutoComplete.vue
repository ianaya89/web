<template>
  <div class="app_select">
    <span v-if="soloLabel" class="text-grey text-p3 uppercase tracking-wide">
      {{ soloLabel }}
    </span>
    <span v-if="soloLabel && required" class="text-red text-p3">
      *
    </span>
    <app-tooltip v-if="soloLabel && tooltip" class="text-p2">
      {{ tooltipText }}
    </app-tooltip>
    <v-autocomplete
      ref="select"
      v-bind="$props"
      :outline="outline"
      :flat="true"
      :append-icon="'fa-chevron-down'"
      :error-messages="translatableErrorMessages"
      @input="onSelect"
    >
      <template v-if="loading" v-slot:no-data>
        <div class="mt-5 box-content h-8 w-8 w-full text-center">
          {{ $t('general.loading_data') }}
        </div>
      </template>
    </v-autocomplete>
  </div>
</template>

  <script>
import BaseInput from '@/components/BaseInput'
import AppTooltip from '@/components/AppTooltip'

export default BaseInput.extend({
  name: 'AppSelectAutoComplete',

  components: {
    AppTooltip
  },

  props: {
    soloLabel: {
      type: String,
      default: 'Label'
    },

    label: {
      type: String,
      default: null
    },

    items: {
      type: Array,
      default: () => []
    },
    outline: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Object],
      default: null
    },
    tooltip: {
      type: Boolean,
      default: null
    },
    errorMessages: {
      type: Array,
      default() {
        return []
      }
    },
    tooltipText: {
      type: String,
      default: 'Tooltip'
    }
  },

  computed: {
    translatableErrorMessages() {
      return this.errorMessages.map(message => this.$t(message))
    },

    hasError() {
      if (!this.$refs.select) {
        return false
      }

      return this.$refs.select.hasError
    }
  },

  data: () => ({
    selected: []
  }),

  methods: {
    onSelect(value) {
      this.$emit('input', value)
    },

    resetValidation() {
      if (this.$refs.select) {
        this.$refs.select.resetValidation()
      }
    },

    validate() {
      if (this.$refs.select) {
        this.$refs.select.validate(true)
      }
    }
  }
})
</script>

  <style lang="postcss">
.app_select {
  .v-select {
    &__slot {
      > input {
        margin-top: 0 !important;
        align-self: center !important;
      }
    }
  }
}
</style>
