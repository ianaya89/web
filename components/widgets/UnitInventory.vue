<template>
  <section class="team__profile__inventory">
    <div class="w-full flex flex-wrap">
      <div class="w-full md:w-1/4 pt-10 pb-10 md:pb-32">
        <ul class="items-types">
          <li class="cursor-pointer" :class="{'active' : activeInventoryType==='packages'}" @click="switchInventoryType('packages')">
            {{ $t('app.inventory.packages.title') }}
          </li>
          <li class="cursor-pointer" :class="{'active' : activeInventoryType==='inventories'}" @click="switchInventoryType('inventories')">
            {{ $t('app.inventory.items.title') }}
          </li>
        </ul>

        <div class="w-full p-4">
          <inventory-items-list
            v-if="inventoryCategories && unit.entity.inventories"
            :items="inventoryItems"
            :categories="inventoryCategories"
            :packages="activeInventoryType==='packages'"
            :search-attribute="['category.path', 'nameOverride']"
          >
            <template v-slot:empty-category="props">
              <slot name="empty-category" :props="props" />
            </template>
            <template v-slot:empty-package>
              <slot name="empty-package" />
            </template>
            <template v-slot:action="props">
              <transition name="fade" mode="out-in">
                <div :key="selectedItem!==props.item.id" class="w-full flex ml-auto">
                  <app-button v-if="selectedItem!==props.item.id" class="ml-auto" :title="$t('general.show')" :btn-class="'link'" @clicked="showItem(props.item.id)" />
                  <app-label v-else :color="'green'" class="w-full -mr-px">
                    <span class="font-sans">
                      {{ $t('general.in_view') }}
                    </span>
                  </app-label>
                </div>
              </transition>
            </template>
          </inventory-items-list>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div :key="selectedItem!==null && !$apollo.loading" class="w-full md:w-3/4">
          <div v-if="selectedItem!==null && !$apollo.loading" class="w-full flex">
            <!--          <div class="w-3/4 xxl:w-3/5 pt-10 shadow">-->
            <div class="w-full pt-10">
              <unit-inventory-item :marketplace-item="marketplaceItem" :compare-btn="compareBtn" :get-only-event="getOnlyEvent" :add-btn-text="addBtnText" @added-item="$emit('added-item', $event)" />
            </div>
          <!--          <div class="w-1/4 xxl:w-2/5 px-8 pt-10">-->
          <!--            <div class="w-full py-4 border-b border-grey-l4">-->
          <!--              <h6>{{ $t('app.inventory.team_also_offers') }}</h6>-->
          <!--            </div>-->
          <!--            <div class="w-full py-4">-->
          <!--              <h6>{{ $t('app.inventory.add_together_with') }}</h6>-->
          <!--            </div>-->
          <!--          </div>-->
          </div>
          <div v-else class="w-full pt-32">
            <div class="w-full flex">
              <span class="fas fa-mouse-pointer text-grey-l3 fa-2x mx-auto" />
            </div>
            <div class="w-full flex pt-4">
              <p class="text-grey mx-auto">
                {{ $t('app.inventory.select_inventory_item') }}
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import AppButton from '@/components/AppButton'
import {
  InventoryItemQuery,
  MarketplaceMainCategoriesQuery,
  UnitInventoryQuery
} from '@/services/graphql'
import UnitInventoryItem from '@/components/widgets/UnitInventoryItem'
import InventoryItemsList from '@/components/inventory/InventoryItemsList'
import AppLabel from '@/components/AppLabel'

export default {
  name: 'UnitInventory',

  components: {
    AppLabel,
    InventoryItemsList,
    UnitInventoryItem,
    AppButton
  },

  props: {
    unitId: {
      type: String,
      required: true
    },

    compareBtn: {
      type: Boolean,
      default: false
    },

    getOnlyEvent: {
      type: Boolean,
      default: false
    },

    addBtnText: {
      type: String,
      default: null
    },

    skippedItems: {
      type: Array,
      default: () => []
    }
  },

  apollo: {
    unit: {
      ...UnitInventoryQuery,
      variables() {
        return {
          id: this.unitId
        }
      },
      result({ data }) {
        this.selectedItem = this.$get(
          data,
          'unit.entity.inventories.0.id',
          null
        )
        if (
          !this.unit.daimaniName ||
          this.unit.daimaniName === null ||
          this.unit.daimaniName === ''
        ) {
          this.getEvents(this.unit.entity.name)
        } else this.getEvents(this.unit.daimaniName)
      }
    },
    marketplaceItem: {
      ...InventoryItemQuery,
      skip() {
        return this.selectedItem === null
      },
      variables() {
        return {
          itemId: this.selectedItem,
          season: {
            get: 'SPECIFIC',
            value: this.activeSeason.name
          }
        }
      }
    },
    inventoryCategories: MarketplaceMainCategoriesQuery
  },

  data: () => ({
    unit: UnitInventoryQuery.mock,
    marketplaceItem: InventoryItemQuery.mock,
    inventoryCategories: MarketplaceMainCategoriesQuery.mock,
    selectedItem: null,
    teamEvents: [],
    activeInventoryType: 'inventories'
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getLastSeason'
    }),

    inventoryItems() {
      return this.unit.entity[this.activeInventoryType]
        .filter(item => !this.skippedItems.includes(item.id))
        .concat(this.teamEvents)
    }
  },

  methods: {
    getEvents(team) {
      this.teamEvents = []
      axios
        .get(process.env.VUE_APP_BACKEND_URL + '/events', {
          params: { team },
          headers: {
            authorization: 'Bearer ' + this.$store.getters['auth/accessToken']
          }
        })
        .then(response => {
          this.teamEvents = response.data
        })
    },

    showItem(marketplaceItemID) {
      this.selectedItem = marketplaceItemID
    },

    switchInventoryType(newType) {
      this.activeInventoryType = newType
    }
  }
}
</script>

<style lang="postcss" scoped>
.team__profile__inventory {
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));

  ul.items-types {
    @apply .w-full .border-b .border-grey-l3 .pb-2;

    li {
      @apply .inline .px-2 .text-grey .relative .cursor-pointer;

      &.active {
        @apply .text-black .cursor-default;

        &:before {
          @apply .-mb-px .border-b-2 .border-red .absolute .left-0 .right-0;
          bottom: -0.5rem;
          content: ' ';
          height: 1px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .team__profile__inventory {
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .team__profile__inventory {
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
