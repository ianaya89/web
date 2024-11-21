<template>
  <div class="datepicker">
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
        <span v-if="soloLabel" class="text-grey text-p3 uppercase tracking-wide">
          {{ soloLabel }}
        </span>
        <span v-if="soloLabel && required" class="text-red text-p3">
          *
        </span>
        <v-combobox
          :value="value"
          :multiple="multiple"
          :solo="solo"
          :flat="solo"
          :rules="rules"
          :outline="outline"
          :label="label"
          :append-icon="'far fa-calendar-alt'"
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
      <v-date-picker
        v-bind="$props"
        @input="onInput($event)"
        @click:date="clickedDate"
      />
    </v-menu>
  </div>
</template>

<script>
import AppLabel from '@/components/AppLabel'
import AppTooltip from '@/components/AppTooltip'

export default {
  name: 'Datepicker',

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
    required: {
      type: Boolean,
      default: false
    },
    soloLabel: {
      type: String,
      default: 'Label'
    },
    firstDayOfWeek: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: null
    },
    landscape: {
      type: Boolean,
      default: false
    },
    singleLine: {
      type: Boolean,
      default: false
    },
    locale: {
      // Accepts a string with a BCP 47 language tag.
      type: String,
      default: 'en-us'
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
.datepicker {
  .v-select__selections {
    @apply .items-start .mt-2 .mb-px;

    .v-chip {
      @apply .ml-0 .mt-px;
    }
  }
}
.v-date-picker-header__value {
  button {
    @apply .font-medium;
  }
}
</style>
