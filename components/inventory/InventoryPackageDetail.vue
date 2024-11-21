<template>
  <div class="w-full flex flex-wrap">
    <div class="w-full md:w-3/4 pt-12 md:pt-32 pb-12 md:pb-24 md:pl-32 px-8 md:px-0">
      <!-- Package Overview Card -->
      <div class="md:pr-16 pb-8">
        <div v-if="category" class="w-full flex flex-wrap items-center px-8 md:px-16 py-8 md:pt-12 md:pb-6 shadow-xl bg-white">
          <div class="w-full md:w-1/3 flex mb-4 md:mb-0">
            <inventory-icon class="w-24 h-24 my-auto" :category="category" :is-package="true" />
          </div>
          <div class="w-full md:w-1/2">
            <data-label :label="$t('app.inventory.items.form.name.label')">
              <app-input
                :value="itemData.nameOverride || $t('app.marketplace.categories.' + $helpers.normalizeCategoryName(category.name, true))"
                :required="true"
                :classes="'w-full'"
                data-cy="name-override"
                class="-mt-2"
                :rules="[validationRules.required($t('form.required'))]"
                :solo-label="null"
                :label="null"
                @input="itemData.nameOverride = $event"
              />
            </data-label>
          </div>
        </div>
      </div>
      <div>
        <div class="w-full flex flex-wrap py-4 md:-mx-4">
          <div class="w-full md:w-1/3 md:px-4">
            <text-area
              v-model="itemData.description"
              :rules="[validationRules.required($t('form.required'))]"
              :counter="2000"
              :required="true"
              :label="null"
              data-cy="description"
              :solo-label="$t('app.inventory.items.form.description.label')"
              :outline="true"
              :rows="14"
            />
          </div>
          <div class="w-full md:w-2/3 md:px-4">
            <div class="w-full flex flex-wrap md:-mx-4">
              <div class="w-full md:w-1/2 md:px-4">
                <div class="">
                  <app-input
                    v-model="itemData.price"
                    :required="true"
                    :is-currency="true"
                    :outline="true"
                    data-cy="price"
                    :classes="'w-full'"
                    :rules="[validationRules.required($t('form.required'))]"
                    :appended-icon="'lni-euro'"
                    :solo-label="$t('app.inventory.items.form.price.label')"
                    :label="null"
                  />
                </div>
              </div>
              <div class="w-full md:w-1/2 md:px-4">
                <div class="relative">
                  <datepicker
                    v-model="itemData.visibleFrom"
                    :outline="true"
                    :autoclose="true"
                    data-cy="visible-from"
                    class="left-0 top-0 z-10 w-full"
                    :required="true"
                    :label="null"
                    :solo-label="$t('app.inventory.items.form.visible_from.label')"
                    :rules="[validationRules.required($t('form.required'))]"
                  />
                </div>
              </div>
            </div>

            <div class="w-full flex flex-wrap md:-mx-4">
              <div class="w-full md:w-1/2 md:px-4">
                <app-select
                  v-model="itemData.slotType"
                  :solo="true"
                  data-cy="slot-type"
                  :rules="[validationRules.required($t('form.required'))]"
                  :items="slotTypeItems"
                  :solo-label="$t('app.inventory.items.form.slot_type.label')"
                  :required="true"
                  :label="null"
                />
              </div>

              <div class="w-full md:w-1/2 md:px-4">
                <multiselect
                  v-model="itemData.excludedIndustries"
                  :items="excludedIndustriesItems"
                  data-cy="excluded-industries"
                  :solo-label="$t('app.inventory.items.form.excluded_industries.label')"
                  :label="null"
                />
              </div>
            </div>

            <div class="mt-10">
              <div v-for="i in (itemData.slotType === 'date' ? dateSlots.length : seasonSlots.length)" :key="i" class="w-full flex -mx-4 -mt-4 border-t border-grey-l4">
                <div class="w-1/2 px-4">
                  <div class="relative">
                    <datepicker
                      v-if="itemData.slotType === 'date'"
                      v-model="dateSlots[i - 1].slot"
                      :autoclose="true"
                      :rules="[validationRules.required($t('form.required')), rules.slotNotSelected]"
                      :solo="true"
                      :required="true"
                      data-cy="slot-slot"
                      :solo-label="$t('app.inventory.items.form.slots.label')"
                      :outline="true"
                    />
                    <app-select
                      v-else
                      v-model="seasonSlots[i - 1].slot"
                      :label="null"
                      :items="seasonItems"
                      :rules="[validationRules.required($t('form.required')), rules.seasonSlotNotSelected]"
                      :solo="true"
                      :required="true"
                      data-cy="slot-slot"
                      :solo-label="$t('app.inventory.items.form.slots.label')"
                      :outline="true"
                    />
                  </div>
                </div>
                <div class="w-1/2 flex px-4">
                  <div class="w-full mb-6">
                    <app-input
                      v-if="itemData.slotType === 'date'"
                      v-model="dateSlots[i - 1].quantity"
                      :required="true"
                      :classes="'w-full'"
                      :outline="true"
                      data-cy="slot-quantity"
                      :rules="[validationRules.required($t('form.required'))]"
                      :type="'number'"
                      :label="null"
                      :solo-label="$t('app.inventory.items.form.quantity.label')"
                      :suffix="$t('general.pieces_short')"
                    />
                    <app-input
                      v-else
                      v-model="seasonSlots[i - 1].quantity"
                      :required="true"
                      :classes="'w-full'"
                      :outline="true"
                      data-cy="slot-quantity"
                      :rules="[validationRules.required($t('form.required'))]"
                      :type="'number'"
                      :label="null"
                      :solo-label="$t('app.inventory.items.form.quantity.label')"
                      :suffix="$t('general.pieces_short')"
                    />
                  </div>
                  <div v-if="itemData.slotType === 'date' ? dateSlots.length > 1 : seasonSlots.length > 1" class="my-10 ml-2 pl-2">
                    <span class="fas fa-trash cursor-pointer" @click="itemData.slotType === 'date' ? dateSlots.splice(i - 1, 1) : seasonSlots.splice(i - 1, 1)" />
                  </div>
                </div>
              </div>
            </div>

            <div class="-mt-4 border-b border-grey-l3">
              <app-button :title="'+ '+ $t('general.add_another')" data-cy="add-next-slot" :btn-class="'link'" @clicked="addNextSlot" />
            </div>

            <h4 class="mt-12">
              {{ $t('app.inventory.packages.create.included_inventory') }}
            </h4>

            <div class="w-full flex flex-wrap pt-6 -mx-1">
              <div v-if="selectedInventories.length === 0" class="w-32 px-1">
                <div class="w-full border border-grey-l3 border-dashed p-4 cursor-pointer" data-cy="add-first-item" @click="onAddFirstItemClick()">
                  <img class="h-10 mt-4 mb-2 w-full" :src="require('../../assets/images/add_first_item.svg')" alt="add_first_item image">
                  <p class="text-grey text-center text-p3 leading-tight">
                    {{ $t('app.inventory.packages.create.add_your_first_item') }}
                  </p>
                </div>
              </div>
              <div v-for="inventory in selectedInventories" v-else :key="inventory.id" class="w-32 px-1">
                <div class="shadow-hover w-full bg-white p-2 mb-3">
                  <inventory-item-light-card data-cy="selected-inventory" :item="inventory" @item-remove="onItemRemoveClick($event)" />
                </div>
              </div>
            </div>

            <!--<inventory-special-pricing v-model="itemData.specialPricing" :slots="itemData.slots" />-->
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/4 md:fixed md:right-0 bg-white py-8 md:py-32 pr-8 pl-8 h-full overflow-y-auto">
      <h4>{{ $t('app.inventory.packages.create.select_inventory') }}</h4>

      <inventory-items-list
        v-if="inventoryCategories && unit.entity.inventories"
        ref="itemsList"
        class="mt-4"
        :items="unit.entity.inventories"
        :categories="inventoryCategories"
        :packages="false"
        data-cy="available-inventory"
        :search-attribute="['category.path', 'nameOverride']"
      >
        <template v-slot:empty-category="props">
          <p class="mt-2 text-grey py-2 px-4 leading-tight">
            {{ $t('app.marketplace.create_item_first_4_category') }}
          </p>
        </template>
        <template v-slot:action="props">
          <transition name="fade" mode="out-in">
            <div :key="!isAlreadySelected(props.item)" class="w-full flex ml-auto">
              <app-button
                v-if="!isAlreadySelected(props.item)"
                data-cy="inventory-item-add"
                class="ml-auto"
                :title="$t('general.add')"
                btn-class="link"
                @clicked="selectedInventories.push(props.item)"
              />
              <app-label v-else :color="'green'" class="w-full -mr-px">
                <span class="font-sans">
                  {{ $t('general.in_package') }}
                </span>
              </app-label>
            </div>
          </transition>
        </template>
      </inventory-items-list>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import TextArea from '@/components/TextArea'
import AppInput from '@/components/AppInput'
import Datepicker from '@/components/Datepicker'
import AppButton from '@/components/AppButton'
import DataLabel from '@/components/DataLabel'
import {
  IndustriesQuery,
  MarketplaceMainCategoriesQuery,
  UnitInventoryQuery
} from '@/services/graphql'
import InventoryItemsList from '@/components/inventory/InventoryItemsList'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import InventoryItemLightCard from '@/components/inventory/InventoryItemLightCard'
import AppSelect from '@/components/AppSelect'
import AppLabel from '@/components/AppLabel'
import validationRules from '@/services/mixins/validationRules'
import Multiselect from '@/components/Multiselect'

export default {
  name: 'InventoryPackageDetail',

  components: {
    AppLabel,
    InventoryIcon,
    AppInput,
    AppButton,
    DataLabel,
    Multiselect,
    TextArea,
    InventoryItemsList,
    InventoryItemLightCard,
    Datepicker,
    AppSelect
  },

  mixins: [validationRules],

  props: {
    teamId: {
      type: String,
      required: true
    },

    value: {
      type: Object,
      default: () => ({
        description: null,
        price: null,
        slotType: 'date',
        slots: [],
        visibleFrom: null,
        children: [],
        excludedIndustries: [],
        specialPricing: []
      })
    },

    category: {
      type: Object,
      default: null
    },

    inventories: {
      type: Array,
      default: () => []
    }
  },

  apollo: {
    industries: IndustriesQuery,
    inventoryCategories: MarketplaceMainCategoriesQuery,
    unit: {
      ...UnitInventoryQuery,
      variables() {
        return {
          id: this.teamId
        }
      }
    }
  },

  data: () => ({
    rules: {
      slotNotSelected: v => false,
      seasonSlotNotSelected: v => false
    },
    itemImages: [],
    unit: UnitInventoryQuery.mock,
    inventoryCategories: MarketplaceMainCategoriesQuery.mock,
    industries: IndustriesQuery.mock,
    selectedInventories: [],
    itemData: {
      slots: [{ slot: null, quantity: null }],
      excludedIndustries: [],
      specialPricing: [],
      children: []
    },
    dateSlots: [{ slot: null, quantity: null }],
    seasonSlots: [{ slot: null, quantity: null }],
    showSlotsDatepicker: false
  }),

  computed: {
    excludedIndustriesItems() {
      return this.industries.map(item => ({
        text: item.name,
        value: item.id
      }))
    },

    seasonItems() {
      const items = []
      const lastYear = moment().year() - 1
      const lastYearShort = moment().format('YY') - 1
      for (let i = 0; i < 5; i++) {
        items.push({
          text: `${lastYear + i}/${lastYearShort + i + 1}`,
          value: `${lastYear + i}/${lastYearShort + i + 1}`
        })
      }
      return items
    },

    isAlreadySelected() {
      return marketplaceItem =>
        this.selectedInventories.find(item => item.id === marketplaceItem.id)
    },

    slotTypeItems() {
      return [
        { text: this.$t('general.date'), value: 'date' },
        { text: this.$t('general.season'), value: 'season' }
      ]
    }
  },

  watch: {
    category(newVal) {
      if (newVal != null) {
        this.itemData.category = newVal
      }
    },

    selectedInventories: {
      handler(newVal) {
        if (newVal != null) {
          this.itemData.children = newVal
        }
      },
      deep: true
    },

    value: {
      handler(newVal) {
        this.itemData = newVal
      },
      deep: true
    },

    itemData: {
      handler(newVal) {
        if (newVal != null) {
          if (this.itemData.slotType === 'season') {
            this.itemData.slots = this.seasonSlots
          } else {
            this.itemData.slots = this.dateSlots
          }
          this.$emit('input', newVal)
        }
      },
      deep: true
    },

    seasonSlots(val) {
      this.itemData.slots = val
    },

    dateSlots(val) {
      this.itemData.slots = val
    }
  },

  mounted() {
    this.selectedInventories = this.inventories
    this.itemData = this.value
    if (this.itemData.slotType === 'season') {
      this.seasonSlots = this.itemData.slots
    } else {
      this.dateSlots = this.itemData.slots
    }

    const vm = this

    this.rules.slotNotSelected = v =>
      vm.dateSlots.map(slot => slot.slot).filter(slot => slot === v).length <
        2 || vm.$t('form.item_already_selected')

    this.rules.seasonSlotNotSelected = v =>
      vm.seasonSlots.map(slot => slot.slot).filter(slot => slot === v).length <
        2 || vm.$t('form.item_already_selected')
  },

  methods: {
    onAddFirstItemClick() {
      this.$refs.itemsList.openAll()
    },

    onItemRemoveClick(marketplaceItem) {
      const itemIndex = this.selectedInventories.findIndex(
        item => item.id === marketplaceItem.id
      )
      this.selectedInventories.splice(itemIndex, 1)
    },

    addNextSlot() {
      this.dateSlots.push({ slot: null, quantity: null })
      this.seasonSlots.push({ slot: null, quantity: null })
    }
  }
}
</script>

<style lang="postcss" scoped>
span.required-sign {
  &::after {
    @apply .text-red;
    content: '*';
  }
}
</style>
