<template>
  <div class="timepicker">
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :lazy="true"
      :transition="'scale-transition'"
      :full-width="true"
      attach
      :min-width="'290px'"
    >
      <template v-slot:activator="{ on }">
        <span v-if="soloLabel" class="text-grey text-p2 uppercase tracking-wide">
          {{ soloLabel }}
        </span>
        <span v-if="soloLabel && required" class="text-red text-p2">
          *
        </span>
        <v-combobox
          :value="value"
          :multiple="multiple"
          :solo="solo"
          :flat="solo"
          :rules="rules"
          :outline="outline"
          :label="null"
          :append-icon="'far fa-clock'"
          :readonly="true"
          @click="on.click"
          @click:append="on.click"
        >
          <template v-if="singleLine" v-slot:selection="{ item, index }">
            <app-label v-if="index === 0" :color="'grey'" @click.native="on.click">
              <span>{{ item }}</span>
            </app-label>
            <app-tooltip v-if="index === 1">
              <template v-slot:activator>
                <span class="text-grey" @click="on.click">(+{{ value.length - 1 }} {{ $t('general.more') }})</span>
              </template>
              <div v-for="(item, index) in value.slice(1)" :key="index">
                {{ item }}
              </div>
            </app-tooltip>
          </template>
          <template v-else v-slot:selection="{ item, index }">
            <app-label :color="'grey'" @click.native="on.click">
              <span>{{ item }}</span>
            </app-label>
          </template>
        </v-combobox>
      </template>
      <v-time-picker
        v-bind="$props"
        :reactive="true"
        @click:minute="clickedDate"
        @input="onInput"
      >
        <slot />
      </v-time-picker>
    </v-menu>
  </div>
</template>

<script>
import AppLabel from '@/components/AppLabel'
import AppTooltip from '@/components/AppTooltip'

export default {
  name: 'Timepicker',

  components: {
    AppTooltip,
    AppLabel
  },

  props: {
    color: {
      type: String,
      default: 'red'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    landscape: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    soloLabel: {
      type: String,
      default: 'Label'
    },
    singleLine: {
      type: Boolean,
      default: false
    },
    max: {
      type: String,
      default: null
    },
    min: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    solo: {
      type: Boolean,
      default: false
    },
    nextIcon: {
      type: String,
      default: 'lni-chevron-right'
    },
    prevIcon: {
      type: String,
      default: 'lni-chevron-left'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    autoclose: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: '24hr',
      validator: value => {
        return ['24hr', 'ampm'].indexOf(value) !== -1
      }
    },
    type: {
      type: String,
      default: 'date',
      validator: value => {
        return ['date', 'month'].indexOf(value) !== -1
      }
    },
    rules: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Array],
      default: null
    }
  },

  data: () => ({
    menu: false
  }),

  methods: {
    onInput(value) {
      this.$emit('input', value)
    },

    clickedDate() {
      if (this.autoclose) {
        this.menu = false
      }
    }
  }
}
</script>

<style lang="postcss">
.timepicker {
  .v-select__selections {
    @apply .items-start .mt-2 .mb-px;

    .v-chip {
      @apply .ml-0 .mt-px;
    }
  }
}
.v-time-picker-header__value {
  button {
    @apply .font-medium;
  }
}
</style>
