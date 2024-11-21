<template>
  <div class="inventory-item-card-light w-full flex flex-wrap h-full relative">
    <div class="absolute top-0 right-0">
      <span v-if="secondaryAction" data-cy="inventory-item-remove" class="fas fa-times text-red cursor-pointer" @click="onRemoveClick()" />
    </div>
    <div class="w-full flex flex-col pt-6">
      <inventory-icon class="h-10 w-10 self-center" :category="item.category" />
    </div>
    <div class="w-full items-end">
      <h6 class="mt-3 leading-tight text-h7">
        {{ item.nameOverride || $t('app.marketplace.categories.' + categories.tertiary) }}
      </h6>
      <p class="text-grey text-p3 py-2 -mt-2 leading-none">
        {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName(categories.secondary)) }}
      </p>
    </div>
  </div>
</template>

<script>
import InventoryIcon from '@/components/inventory/InventoryIcon'

export default {
  name: 'InventoryItemLightCard',

  components: {
    InventoryIcon
  },

  props: {
    item: {
      type: Object,
      required: true
    },
    secondaryAction: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    categories() {
      const categories = this.item.category.path.split(' / ')

      return {
        main: categories[0],
        secondary: categories[1],
        tertiary: categories[2]
      }
    }
  },

  methods: {
    onRemoveClick() {
      this.$emit('item-remove', this.item)
    }
  }
}
</script>

<style lang="postcss" scoped>
.inventory-item-card-light {
  min-height: 9rem;
}
</style>
