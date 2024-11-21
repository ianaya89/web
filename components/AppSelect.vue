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
    <v-select
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
    </v-select>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput'
import AppTooltip from '@/components/AppTooltip'

export default BaseInput.extend({
  name: 'AppSelect',

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
  .v-icon {
    @apply .text-red .text-menu .font-icon;
  }

  .v-select__selection--comma {
    margin: 0.55rem 0.25rem 0.5rem 0;
  }

  .v-list {
    @apply .p-0;
  }

  .v-menu__content {
    top: 0.375rem !important;
    left: 0.125rem !important;
    @apply .rounded-none .border .border-grey-l2;
  }
  .v-input__slot {
    @apply .mb-0 .border .border-grey-l2 .rounded-none !important;

    &::before {
      @apply .hidden;
    }
  }

  .v-list__tile {
    border-bottom: 1px solid lightgrey;
    @apply .flex-row-reverse;
  }

  .v-list__tile__action {
    @apply .min-w-0;
  }

  .v-list__tile--active {
    @apply .font-bold;
  }
}
.v-select.v-text-field--enclosed:not(.v-text-field--single-line) {
  .v-select__selections {
    padding-top: 0px;
  }
}
</style>
