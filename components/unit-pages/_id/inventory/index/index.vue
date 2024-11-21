<template>
  <div class="w-full flex flex-wrap-reverse py-10 pl-8 pr-4 md:px-10 -mx-2 md:-mx-4">
    <div class="w-full md:w-3/4 px-2 md:px-4">
      <transition name="fade-up" :appear="true">
        <div class="w-full">
          <div v-if="$apollo.queries.unit.loading" class="w-full min-h-screen flex">
            <logo-loader class="h-16 w-16 m-auto" />
          </div>
          <div v-else-if="Object.keys(groupedInventoryByTopCategory).length === 0 && !$apollo.queries.unit.loading" class="w-full flex pt-32 justify-center">
            <div class="text-center">
              <inventory-icon class="w-32 h-32" :category="{path: 'inventory'}" />
              <div class="mt-2">
                <span class="text-h3 ml-2 font-semibold">{{ $t('errors.no-items-in-inventory') }}</span>
              </div>
            </div>
          </div>
          <div v-for="(category, index) in Object.keys(groupedInventoryByTopCategory)" v-else :key="index" class="w-full mb-8">
            <h4 class="uppercase font-medium">
              {{ $t('app.marketplace.categories.' + category) }}
            </h4>
            <div class="w-full flex flex-wrap md:-mx-2">
              <div v-for="item in groupedInventoryByTopCategory[category]" :key="item.id" class="w-full md:w-1/5 p-3 bg-white my-2 md:mx-2 flex flex-col shadow-hover inventory-item--card">
                <inventory-item-card :item="item" @item-changed="$apollo.queries.unit.refetch()" />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="w-full md:w-1/4 px-2 md:px-4 md:pt-8 mb-12 md:mb-0">
      <app-button class="w-full text-left min-h-16" data-cy="addItem" :title="$t('app.inventory.upload_your_inventory')" @clicked="onUploadInventoryClick()" />
      <app-button
        class="w-full mt-4 text-left text-left min-h-16"
        data-cy="addPackage"
        :title="$t('app.inventory.sell_in_packages')"
        :btn-class="'secondary'"
        :show-arrow="true"
        @clicked="onSellInPackagesClick"
      />
      <tips-card class="mt-4 w-full bg-white shadow-xl" />
    </div>
  </div>
</template>

<script>
import { groupBy } from 'lodash'
import { UnitInventoryQuery } from '@/services/graphql'
import AppButton from '@/components/AppButton'
import TipsCard from '@/components/widgets/TipsCard'
import InventoryItemCard from '@/components/inventory/InventoryItemCard'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import LogoLoader from '@/components/LogoLoader'

export default {
  name: 'InventoryIndex',

  components: {
    InventoryIcon,
    InventoryItemCard,
    AppButton,
    TipsCard,
    LogoLoader
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitInventoryQuery,
      variables() {
        return {
          id: this.unitId
        }
      }
    }
  },

  computed: {
    inventories() {
      return this.$get(this.unit, 'entity.inventories', []).sort(
        (a, b) => a.category.id - b.category.id
      )
    },

    groupedInventoryByTopCategory() {
      return groupBy(this.inventories, item => {
        return item.category.path.split(' / ')[0]
      })
    }
  },

  methods: {
    onUploadInventoryClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-items-create',
          params: {
            id: this.unitId
          }
        })
      )
    },

    onSellInPackagesClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-inventory-packages',
          params: {
            id: this.unitId
          }
        })
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
.inventory-item--card {
  min-height: 17rem;
}
</style>
