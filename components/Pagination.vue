<template>
  <v-pagination
    class="pagination"
    v-bind="$props"
    :value="currentValue"
    @input="$emit('input', $event)"
    @next="$emit('input', currentValue + 1)"
    @previous="$emit('input', currentValue - 1)"
  />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    value: {
      type: Number,
      default: 0
    },
    length: {
      type: Number,
      required: true
    },
    nextIcon: {
      type: String,
      default: 'fas fa-chevron-right'
    },
    prevIcon: {
      type: String,
      default: 'fas fa-chevron-left'
    },
    totalVisible: {
      type: Number,
      default: 6
    }
  },

  data: () => ({
    currentValue: 0
  }),

  watch: {
    value(newVal) {
      this.currentValue = newVal
    }
  },

  mounted() {
    this.currentValue = this.value
  }
}
</script>

<style lang="postcss">
.pagination.v-pagination {
  .v-pagination__item {
    @apply .bg-transparent;
  }
  li button {
    @apply .shadow-none .font-medium .text-p1 .rounded-none .border-b .border-solid .border-transparent .outline-none;
    transition: border-bottom-color 300ms ease, color 300ms ease,
      padding-bottom 300ms ease;
    will-change: border-bottom-color, color, padding-bottom;

    &.v-pagination__navigation {
      @apply .bg-transparent;

      i {
        @apply .text-p1;
      }
    }

    &.v-pagination__item--active {
      @apply .text-red .border-red .pb-2;
    }
  }
}
</style>
