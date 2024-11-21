<template>
  <div>
    <div :class="labelClasses">
      <span class="leading-tight">{{ label }}</span>
      <span v-if="editFormStructure!=null" class="text-red ml-2 lni-pencil cursor-pointer" @click="triggerEdit" />
      <app-tooltip v-if="tooltip!==null" class="-mt-1">
        <span class="normal-case">{{ tooltip }}</span>
      </app-tooltip>
      <span v-if="required" class="text-red text-p2">
        *
      </span>
    </div>
    <div class="text-h5 font-medium leading-tight" :class="{'highlight px-1':highlighted, 'uppercase':uppercase}" :aria-label="label">
      <slot>-</slot>
    </div>
  </div>
</template>

<script>
import AppTooltip from '@/components/AppTooltip'
import editModeTrigger from '@/services/mixins/editModeTrigger'

export default {
  name: 'DataLabel',

  components: { AppTooltip },

  mixins: [editModeTrigger],

  props: {
    label: {
      type: String,
      required: true
    },

    tooltip: {
      type: String,
      default: null
    },

    labelClasses: {
      type: String,
      default: 'text-grey text-p3 uppercase tracking-wide'
    },

    highlighted: {
      type: Boolean,
      default: false
    },

    required: {
      type: Boolean,
      default: false
    },

    uppercase: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.highlight {
  @apply .bg-blue-l5;
}
</style>
