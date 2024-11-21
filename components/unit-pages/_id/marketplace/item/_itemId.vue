<template>
  <div class="marketplace-item__page">
    <div class="marketplace-item__header">
      <div class="absolute left-0 my-auto">
        <app-button
          class="ml-8"
          :btn-class="'secondary'"
          :title="$t('app.compare.back')"
          @clicked="onBackClick"
        />
      </div>
      <div class="flex-grow text-center flex justify-center">
        <content-placeholders v-if="$apollo.loading">
          <content-placeholders-heading />
        </content-placeholders>
        <h3 v-else class="my-auto">
          {{ $tc('general.items', 1) }}
        </h3>
      </div>
      <div class="absolute right-0 inset-y-0 flex">
        <transition name="slide-fade">
          <compare-header-info v-if="hasItemsInCompare" class=" text-p1" />
        </transition>
        <transition name="slide-fade">
          <proposal-header-info v-if="hasItemsInProposal" class=" text-p1" />
        </transition>
      </div>
    </div>
    <div class="w-full flex flex-wrap">
      <div class="w-full md:w-1/5 bg-grey-l5 marketplace-item__height">
        <content-placeholders v-if="$apollo.loading" class="w-full px-4">
          <content-placeholders-heading :img="true" />
          <content-placeholders-text />
        </content-placeholders>
        <div v-else class="w-full pl-1 pr-3">
          <div class="w-full px-4 border-b border-grey-l3 pb-6">
            <inventory-item-info
              :src="$get(marketplaceItem, 'unit.entity.logo.url', undefined)"
              :title="$get(marketplaceItem, 'unit.entity.name', '-')"
              :info="$get(marketplaceItem, 'unit.entity.country.name', '')"
            />
          </div>
          <div class="w-full px-4 py-6">
            <app-button :btn-class="'light'" :title="$t('app.marketplace.show_item.visit_team_profile')" :show-arrow="true" @clicked="onVisitTeamClick()" />
          </div>
        </div>
      </div>
      <div class="marketplace-item__section marketplace-item__height md:shadow md:max-w-md xxl:max-w-lg w-full">
        <content-placeholders v-if="$apollo.loading" class="w-full px-8 py-6">
          <content-placeholders-heading :img="true" />
          <content-placeholders-text />
        </content-placeholders>
        <unit-inventory-item v-else :marketplace-item="marketplaceItem" />
      </div>
      <div class="px-4 bg-white marketplace-item__height">
        <!--        <div class="w-full py-4">-->
        <!--          <h6>{{ $t('app.inventory.add_together_with') }}</h6>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import onBack from '@/services/mixins/onBack'
import AppButton from '@/components/AppButton'
import { InventoryItemQuery } from '@/services/graphql'
import InventoryItemInfo from '@/components/inventory/InventoryItemInfo'
import CompareHeaderInfo from '@/components/CompareHeaderInfo'
import compare from '@/services/mixins/compare'
import proposal from '@/services/mixins/proposal'
import UnitInventoryItem from '@/components/widgets/UnitInventoryItem'
import ProposalHeaderInfo from '@/components/ProposalHeaderInfo'

export default {
  name: 'MarketplaceItem',

  components: {
    UnitInventoryItem,
    AppButton,
    ProposalHeaderInfo,
    InventoryItemInfo,
    CompareHeaderInfo
  },

  mixins: [onBack, compare, proposal],

  props: {
    unitId: {
      type: String,
      required: true
    },
    itemId: {
      type: String,
      required: true
    }
  },

  apollo: {
    marketplaceItem: {
      ...InventoryItemQuery,
      variables() {
        return {
          itemId: this.itemId,
          season: {
            get: 'SPECIFIC',
            value: this.activeSeason.name
          }
        }
      }
    }
  },

  data: () => ({
    marketplaceItem: InventoryItemQuery.mock
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason'
    })
  },

  methods: {
    onVisitTeamClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-marketplace-unit-unitId-inventory',
          params: {
            id: this.unitId,
            unitId: this.marketplaceItem.unit.id
          }
        })
      )
    },

    onDealsClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-proposal',
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
.marketplace-item__page {
  .marketplace-item__header {
    @apply .bg-white .border-b .border-grey-l2 .py-4 .flex .relative;
    height: 80px;
  }

  .marketplace-item__section {
    @apply .pb-10 .flex .overflow-auto .relative .bg-white;
  }

  .marketplace-item__height {
    @apply .pt-8;
  }
}

@screen md {
  .marketplace-item__height {
    @apply .pt-16;
    min-height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);
  }
}
</style>
