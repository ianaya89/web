<template>
  <div class="w-full md:w-1/3 px-2 py-4">
    <div class="search-item flex h-full flex-col shadow-hover relative">
      <div class="search-item-content flex flex-col pt-4 px-6 flex-1">
        <inventory-item-info :src="item.unit.entity.logo.url" :title="item.unit.entity.name" :info="''" class="mb-2 cursor-pointer" @click.native.stop="linkToUnit" />
        <div class="w-full flex justify-center my-2">
          <inventory-icon class="w-20 h-20" :is-package="item.itemType === 'package'" :category="item.category" />
        </div>
        <div class="mt-2 flex flex-wrap flex-1">
          <div v-if="item.itemType === 'inventory'">
            <h6 class="text-grey text-h7">
              {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.secondaryCategory(item.category), false)) }}
              <small>
                ({{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.firstCategory(item.category), false)) }})
              </small>
            </h6>
            <h3 class="leading-tight">
              {{ item.nameOverride || $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.tertiaryCategory(item.category), false)) }}
            </h3>
          </div>
          <div v-else>
            <h6 class="text-grey text-h7">
              {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.firstCategory(item.category), true)) }}
            </h6>
            <h3 class="leading-tight">
              {{ item.nameOverride || $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.firstCategory(item.category), true)) }}
            </h3>
          </div>
          <div v-if="item.itemType === 'inventory'" class="w-full self-end">
            <app-button v-if="!isInCompare" class="text-left" :title="$t('app.compare.add_to_comparison')" :btn-class="'link'" @clicked="onAddToCompareClick" />
            <app-label v-else class="label-red -ml-1">
              {{ $t('app.compare.in_comparison') }}
            </app-label>
          </div>
          <div v-else class="w-full flex flex-col self-end">
            <span class="text-grey">{{ itemsInPackage | truncate(100) }}</span>
            <app-button v-if="!isInCompare" class="text-left" :title="$t('app.compare.add_to_comparison')" :btn-class="'link'" @clicked="onAddToCompareClick" />
            <app-label v-else class="label-red -ml-1">
              {{ $t('app.compare.in_comparison') }}
            </app-label>
          </div>
        </div>
      </div>
      <div v-if="showPrices" class="search-item-content w-full flex px-6 py-4 relative border-t border-grey-l4 min-h-20 self-end">
        <div class="search-item-info">
          <div class="pr-1 my-auto w-full">
            <h4 v-if="!item.priceTo">
              {{ item.price | currency }}
            </h4>
            <h4 v-else>
              {{ item.price | currency }} - {{ item.priceTo | currency }}
            </h4>
          </div>
          <!-- TODO: Hidden for now -->
          <!-- <div class="ml-auto flex justify-end">
            <label-chart v-if="item.itemType === 'inventory'" :chart-value="0.045" :label="'4.5'" :info="$t('app.marketplace.cpt_index')" :label-class="'text-h4'" />
            <span v-else class="my-auto text-h4">{{ item.children.length }} {{ $tc('general.items',item.children.length) }}</span>
          </div> -->
        </div>
        <div class="search-item-show flex items-center">
          <app-button class="w-full" :btn-class="'primary'" :title="$t('app.marketplace.show_item.title')" @clicked="onShowItemClick()" />
        </div>
      </div>
      <div v-else class="search-item-content w-full flex px-6 py-4 relative border-t border-grey-l4 min-h-20 self-end">
        <h4>
          <not-available-link :unit-id="this.$route.params.id" />
        </h4>
      </div>
      <div class="absolute w-full h-48 bg-grey-l5 bottom-0" />
    </div>
  </div>
</template>

<script>
// import LabelChart from '@/components/LabelChart'
import InventoryItemInfo from '@/components/inventory/InventoryItemInfo'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import AppButton from '@/components/AppButton'
import AppLabel from '@/components/AppLabel'
import NotAvailableLink from '@/components/NotAvailableLink'

export default {
  name: 'SearchItem',

  components: {
    AppLabel,
    AppButton,
    InventoryIcon,
    // LabelChart,
    InventoryItemInfo,
    NotAvailableLink
  },

  props: {
    item: {
      type: Object,
      required: true
    },
    showPrices: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    isInCompare() {
      return this.$store.getters['compare/isInCompare'](this.item.id)
    },

    itemsInPackage() {
      return this.item.children
        .map(item =>
          this.$t(
            'app.marketplace.categories.' +
              this.$helpers.normalizeCategoryName(
                item.category.name,
                item.itemType === 'package'
              )
          )
        )
        .join(', ')
    }
  },

  methods: {
    onAddToCompareClick() {
      this.$store.dispatch('compare/add', this.item.id)
    },

    onShowItemClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-marketplace-item-itemId',
          params: {
            id: this.$route.params.id,
            itemId: this.item.id
          }
        })
      )
    },

    linkToUnit() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-marketplace-unit-unitId-inventory',
          params: {
            id: this.$route.params.id,
            unitId: this.item.unit.id
          }
        })
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
.search-item {
  @apply .w-full .bg-white;
  min-height: 24rem;

  .search-item-content {
    z-index: 1;
  }

  .search-item-info {
    @apply .w-full .my-auto .flex .opacity-100;
    transition: opacity 300ms ease-in;
    will-change: opacity;
  }

  .search-item-show {
    @apply .absolute .inset-0 .opacity-0 .px-6;
    transition: opacity 300ms ease-out;
    will-change: opacity;
  }

  &:hover {
    .search-item-info {
      @apply .opacity-0;
    }

    .search-item-show {
      @apply .opacity-100;
    }
  }
}
</style>
