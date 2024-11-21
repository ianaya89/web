<template>
  <li class="compare--dropdown-item">
    <div v-if="$apollo.loading" class="py-4">
      <content-placeholders>
        <content-placeholders-heading :img="true" />
      </content-placeholders>
    </div>
    <compare-item-info
      v-else
      :id="marketplaceItem.id"
      :key="marketplaceItem.id"
      :remover="true"
      :title="$t('app.marketplace.categories.' + $helpers.normalizeCategoryName(marketplaceItem.category.name, marketplaceItem.itemType==='package'))"
      :info="$t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.firstCategory(marketplaceItem.category), marketplaceItem.itemType==='package'))"
    >
      <template v-slot:image>
        <inventory-icon class="w-8 h-8 my-auto" :category="marketplaceItem.category" :is-package="marketplaceItem.itemType==='package'" />
      </template>
    </compare-item-info>
  </li>
</template>

<script>
import { InventoryItemLightQuery } from '@/services/graphql'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import CompareItemInfo from '@/components/CompareItemInfo'

export default {
  name: 'CompareHeaderInfoItem',

  components: {
    CompareItemInfo,
    InventoryIcon
  },

  apollo: {
    marketplaceItem: {
      ...InventoryItemLightQuery,
      variables() {
        return {
          itemId: this.compareItemId
        }
      }
    }
  },

  props: {
    compareItemId: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    marketplaceItem: InventoryItemLightQuery.mock
  })
}
</script>

<style lang="postcss">
.compare--dropdown-item {
  @apply .border-b .border-grey-l4 .px-4;

  &:hover {
    @apply .bg-grey-l4;
  }

  a {
    @apply .flex .items-start .justify-start .px-3 .py-3  w-full .border-l-4 .border-transparent;
    transition: none;
  }

  &-content {
    @apply .flex .flex-col pl-2;
    .name {
      @apply .text-black .text-menu .font-medium .my-0 .py-0;
      line-height: 1.2rem;
    }
    .text {
      @apply .font-serif .text-black .text-p3;
    }
    .time {
      @apply .font-serif .text-p3 .text-grey-l1;
    }
  }
}
</style>
