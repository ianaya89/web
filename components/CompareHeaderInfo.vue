<template>
  <li class="compare-items" @click.stop="toggleDropdown">
    <span>
      <i class="fas fa-balance-scale" />
      <badge :value="compareItemsCount" />
    </span>
    <dropdown ref="compareDropdown" class="cursor-default" :items-classes="'top-0 -mt-6'" :activator="false" :deactivator="false">
      <ul class="compare--dropdown">
        <compare-header-info-item
          v-for="(compareItem, index) in compareItems"
          :key="index"
          :compare-item-id="compareItem"
        />
        <li class="p-4">
          <app-button class="w-full" :title="$t('app.compare.go_to_compare')" @clicked="onToCompareClick()" />
        </li>
      </ul>
    </dropdown>
  </li>
</template>

<script>
import Badge from '@/components/Badge'
import Dropdown from '@/components/Dropdown'
import CompareHeaderInfoItem from '@/components/CompareHeaderInfoItem'
import AppButton from '@/components/AppButton'

export default {
  name: 'CompareHeaderInfo',

  components: {
    AppButton,
    CompareHeaderInfoItem,
    Badge,
    Dropdown
  },

  data: () => ({
    showNotifications: false,

    notifications: {
      unreadCount: 0,
      latest: []
    }
  }),

  computed: {
    compareItems() {
      return this.$store.getters['compare/items'].map(item => Number(item))
    },

    compareItemsCount() {
      return this.compareItems.length
    }
  },

  methods: {
    toggleDropdown() {
      this.$refs.compareDropdown.toggleDropdown()
    },

    onToCompareClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-compare',
          params: {
            id: this.$route.params.id
          },
          query: {
            items: this.compareItems.join(',')
          }
        })
      )
    }
  }
}
</script>

<style lang="postcss">
.compare-items {
  @apply .relative .list-none;

  > span {
    @apply .px-4 .h-full .flex .items-center .text-grey-d1 .font-medium .border-transparent .border-b-3 .cursor-pointer;
    &:hover {
      @apply .text-black;
    }
  }

  .compare--dropdown {
    @apply .absolute .flex .flex-col .justify-start .w-80 .max-h-128 .bg-white .shadow-md .border .border-grey-l4 .overflow-y-auto;
    right: 0;
  }
}
</style>
