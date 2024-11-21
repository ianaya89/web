<template>
  <div class="w-full">
    <div class="w-full flex px-2">
      <div class="mr-auto">
        <label-chart :label="`${$get(unit,'entity.inventoryStatus.percentage',0)}%`" :chart-value="$get(unit,'entity.inventoryStatus.percentage',0) / 100" :info="$t('app.team.dashboard.inventory_uploaded')" />
      </div>
    </div>

    <div class="w-full bg-white shadow-xl px-4 py-8">
      <div class="icon-scroll">
        <icon-check v-for="item in $get(unit,'entity.inventoryStatus.allCheckedCategories',[])" :key="item.id" class="icon-check" :value="$get(unit,'entity.inventoryStatus.selectedCategories',[]).find(selectedCategoryItem => selectedCategoryItem.id ===item.id)!=null" :clickable="false">
          <inventory-icon class="w-full h-full" :category="item" />
        </icon-check>
      </div>

      <app-button class="w-full text-left" :title="$t('app.team.dashboard.upload_inventory')" :show-arrow="true" :btn-class="'primary-lg'" @clicked="onUploadInventoryClick()" />
    </div>
  </div>
</template>

<script>
import LabelChart from '@/components/LabelChart'
import { UnitInventoryStatusQuery } from '@/services/graphql'
import AppButton from '@/components/AppButton'
import IconCheck from '@/components/IconCheck'
import InventoryIcon from '@/components/inventory/InventoryIcon'

export default {
  name: 'InventoryUploaded',

  components: {
    InventoryIcon,
    IconCheck,
    AppButton,
    LabelChart
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitInventoryStatusQuery,
      variables() {
        return {
          id: this.unitId
        }
      }
    }
  },

  methods: {
    onUploadInventoryClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-inventory',
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
.icon-scroll {
  @apply .mb-4 .overflow-x-auto .whitespace-no-wrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  .icon-check {
    @apply .p-2 .inline-block;
  }
}
</style>
