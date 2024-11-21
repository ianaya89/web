<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="multiselect">
    <span v-if="soloLabel" class="text-grey text-p3 uppercase tracking-wide">
      {{ soloLabel }}
    </span>
    <span v-if="soloLabel && required" class="text-red text-p3">
      *
    </span>
    <v-select
      ref="select"
      v-bind="$props"
      :ripple="false"
      :flat="true"
      :class="[labelMargins]"
      class="multiselect"
      multiple
      :error-messages="translatableErrorMessages"
      @input="onSelect"
    >
      <template v-if="singleLine" v-slot:selection="{ item, index }">
        <app-label v-if="index === 0" :color="'grey'">
          <span>{{ item.text }}</span>
        </app-label>
        <app-tooltip v-if="index === 1">
          <template v-slot:activator>
            <span class="text-grey">(+{{ value.length - 1 }} {{ $t('general.more') }})</span>
          </template>
          <div v-for="(item, index) in items.filter(filterItem => value.slice(1).includes(filterItem.value))" :key="index">
            {{ item.text }}
          </div>
        </app-tooltip>
      </template>
      <template v-else v-slot:selection="{ parent, item, index }">
        <app-label :color="'grey'">
          <span>{{ item.text }}</span>
        </app-label>
      </template>
      <template v-if="loading" v-slot:no-data>
        <div class="mt-5 box-content h-12 w-16 w-full text-center pt-4">
          {{ $t('general.loading_data') }}
        </div>
      </template>
    </v-select>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput'
import AppLabel from '@/components/AppLabel'
import AppTooltip from '@/components/AppTooltip'

export default BaseInput.extend({
  name: 'Multiselect',

  components: {
    AppLabel,
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

    singleLine: {
      type: Boolean,
      default: false
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
      type: Array,
      default: () => []
    },

    errorMessages: {
      type: Array,
      default() {
        return []
      }
    }
  },

  computed: {
    labelMargins() {
      return this.label === null ? 'no-label' : ''
    },

    translatableErrorMessages() {
      return this.errorMessages.map(message => this.$t(message))
    }
  },

  methods: {
    onSelect(value) {
      this.$emit('input', value)
    }
  }
})
</script>

<style lang="postcss">
.multiselect.v-input {
  .fa-caret-down:before {
    content: '\f078';
  }

  .v-icon {
    @apply .text-red .text-menu .font-icon;
  }

  .v-select__selections {
    @apply .mt-2 .mb-1;
    padding-top: 0 !important;

    .v-chip {
      @apply .ml-0 .mt-0;
    }
  }

  .v-input__slot {
    @apply .mb-0 .border .border-grey-l2 .rounded-none !important;

    &::before {
      @apply .hidden;
    }
  }
}

.menuable__content__active {
  .v-icon {
    @apply .text-transparent .text-menu .font-icon;
  }

  .v-list {
    @apply .p-0;
  }

  .v-menu__content {
    top: 0.375rem !important;
    left: 0.125rem !important;
    @apply .rounded-none;
  }
  .v-input__slot {
    @apply .mb-0 !important;

    &::before {
      @apply .hidden;
    }
  }
  .v-ripple__container {
    @apply .hidden;
  }
  .v-list__tile {
    border-bottom: 1px solid lightgrey;
    @apply .flex-row-reverse;

    &--active,
    &:hover {
      .v-icon {
        @apply .text-red !important;
      }
    }
  }

  .v-list__tile__title {
    padding-top: 2px;
  }

  .v-list__tile__action {
    @apply .min-w-0;
    .v-input--selection-controls__input {
      @apply .pl-4;
      margin-right: 1rem;
    }
  }
  .v-list__tile--active {
    background: rgb(240, 240, 240);
  }
}
</style>
