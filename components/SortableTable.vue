<template>
  <div :class="{'tableRow animated': animated}" class="table--sortable">
    <v-data-table
      :headers="headers"
      :items="data"
      :hide-actions="rowsPerPage===-1 || rowsPerPage>=data.length"
      :loading="loading"
      :hide-headers="hideHeaders"
      :pagination.sync="paginator"
      sort-icon="fa-chevron-up"
      @click="animate"
    >
      <template v-if="customHeaders" v-slot:headers="props">
        <slot name="headers" :header="props" />
      </template>
      <template v-slot:items="props">
        <td v-if="showMock" :colspan="headers.length">
          <content-placeholders>
            <content-placeholders-text :lines="1" />
          </content-placeholders>
        </td>

        <slot v-else :row="props" />
      </template>
      <template v-slot:pageText="props">
        {{ props.pageStart }} - {{ props.pageStop }} {{ $t('general.of') }} {{ props.itemsLength }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true
    },
    customHeaders: {
      type: Boolean,
      required: false
    },
    hideHeaders: {
      type: Boolean,
      required: false
    },
    data: {
      type: Array,
      default: () => []
    },
    sortBy: {
      type: String,
      default: 'id'
    },
    loading: {
      type: Boolean,
      default: false
    },
    sortDescending: {
      type: Boolean,
      default: true
    },
    rowsPerPage: {
      type: Number,
      default: -1 // -1 => All visible
    }
  },

  data: () => ({
    paginator: {},
    animated: false
  }),

  computed: {
    showMock() {
      return !(
        this.data.length &&
        this.$get(
          this.data,
          '0.' + this.$get(this.headers, '0.value', 'name'),
          false
        )
      )
    }
  },

  mounted() {
    this.paginator = {
      descending: this.sortDescending,
      page: 1,
      rowsPerPage: this.rowsPerPage,
      sortBy: this.sortBy,
      totalItems: this.data.length
    }

    this.animate()
  },

  methods: {
    animate() {
      this.animated = true
      setTimeout(() => {
        this.animated = false
      }, this.data.length * 70) // 70ms per animation
    }
  }
}
</script>

<style lang="postcss">
.table--sortable {
  .v-datatable__progress {
    .primary {
      @apply .bg-red .border-red;
    }
  }

  .v-datatable__actions {
    @apply .flex .items-center .flex-wrap-reverse .justify-end;
    font-size: 12px;

    .v-datatable__actions__select {
      @apply .hidden;
    }

    .v-datatable__actions__range-controls {
      @apply .flex .items-center;
      min-height: 3rem;

      .v-datatable__actions__pagination {
        @apply .block .text-center;
        font-size: 10pt;
        margin: 0 2rem 0 1.5rem;
      }

      .v-btn.v-btn--flat {
        &::before {
          content: none;
        }

        .v-ripple__container {
          @apply .hidden;
        }

        .v-btn__content .v-icon {
          font-size: 12pt;
        }
      }
    }
  }

  .v-table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .v-datatable {
    @apply .w-full;

    &__progress th {
      @apply .px-0 .py-px;
    }
  }

  th {
    @apply .font-sans .text-p2 .text-grey .outline-none .select-none;
    white-space: nowrap;

    &:first-of-type {
      @apply .text-h5 .text-black;
    }

    &:last-of-type {
      @apply .text-black;
    }

    &.sortable {
      @apply .cursor-pointer;

      .v-icon {
        @apply .text-red .text-p2 .font-icon .font-bold .px-2 .py-1;
        opacity: 0;
        transition: all 0.3s ease-in-out;
      }

      &:hover {
        .v-icon {
          opacity: 0.6;
        }
      }

      &.active {
        transform: none;

        .v-icon {
          opacity: 1;
        }

        &.desc {
          .v-icon {
            transform: rotate(-180deg);
          }
        }
      }
    }

    &.text-xs-left {
      @apply .text-left;
    }

    &.text-xs-right {
      @apply .text-right;
    }
  }

  thead {
    th {
      @apply .py-2 .px-2 .font-medium;
    }
  }

  tbody {
    tr {
      @apply .border-b .border-t .border-grey-l3;
    }

    td {
      @apply .py-2 .px-2 .font-serif;
      font-variant-numeric: tabular-nums;
    }
  }

  &.animated {
    tbody tr {
      animation-duration: 0.5s;
      animation-fill-mode: both;
      transition: all 0.5s;

      @for $i from 1 to 30 {
        &:nth-child($i) {
          animation-delay: calc($(i) * 0.02s);
        }
      }
    }
  }

  &.tableRow {
    tbody tr {
      animation-name: tableRow;
    }
  }
}

@keyframes tableRow {
  from {
    opacity: 0;
    display: none;
    transform: translate3d(0, 3rem, 0);
  }

  to {
    opacity: 1;
    display: block;
    transform: translate3d(0, 0, 0);
  }
}
</style>
