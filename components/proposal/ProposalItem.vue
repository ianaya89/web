<template>
  <div class="w-full flex flex-wrap px-4 border-grey-l4 pt-4 pb-1" :class="[{'package-border': packageItem && !last},{'border-t': !packageItem}]">
    <div class="w-full md:w-1/4 flex py-5 pl-2" :class="{'pl-12': packageItem}">
      <inventory-icon v-if="!packageItem" class="w-10 h-10" :category="item.marketplaceItem.category" />
      <inventory-icon v-else class="w-8 h-8 my-2" :category="item.category" />
      <data-label
        v-if="!packageItem"
        class="text-p1 text-grey-d1 ml-4"
        :label="$t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.secondaryCategory(item.marketplaceItem.category), false))"
      >
        <span class="capitalize">
          {{ item.marketplaceItem.nameOverride || $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.tertiaryCategory(item.marketplaceItem.category), item.marketplaceItem.itemType === 'package')) }}
        </span>
      </data-label>
      <data-label
        v-else
        class="text-p1 text-grey-d1 ml-4 capitalize"
        :label="$t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.secondaryCategory(item.category), false))"
      >
        <span class="capitalize">
          {{ item.nameOverride || $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.tertiaryCategory(item.category), false)) }}
        </span>
      </data-label>
    </div>

    <div v-if="editable" class="w-full md:w-3/4 flex flex-wrap">
      <v-form ref="slotForm" v-model="validSlots" class="w-full md:w-4/5">
        <mover class="w-full flex" :inverted="false" :data="$get(item,'slots',[])" :movers-always-visible="false">
          <template v-slot:content="props">
            <div class="w-full flex flex-wrap bg-grey-l5 px-2 pt-2">
              <div class="w-full md:w-2/3 relative">
                <div v-if="hasAppliedSpecialPricingForSlot(item.slots[props.index], 'exact_time')" class="absolute top-0 right-0 text-p3 text-green">
                  {{ discountOfTypeForSlot(item.slots[props.index], 'exact_time') * 100 }}%
                </div>

                <app-select
                  :value="item.slots[props.index].slot"
                  :items="availableSlots"
                  :solo-label="$t('general.'+ $get(item, 'marketplaceItem.slotType'))"
                  :rules="[v => !!v || $t('app.marketplace.show_item.form.slots.validation.required'),
                           v => item.slots.map(slot => slot.slot).filter(slot => slot === v).length < 2 || $t('form.item_already_selected')]"
                  :single-line="true"
                  @input="itemSlotsChange($event, item, props.index)"
                />
              </div>
              <div class="w-full md:w-auto md:pl-4 relative">
                <div v-if="hasAppliedSpecialPricingForSlot(item.slots[props.index], 'quantity')" class="absolute top-0 right-0 text-p3 text-green">
                  {{ discountOfTypeForSlot(item.slots[props.index], 'quantity') * 100 }}%
                </div>

                <app-input
                  :value="item.slots[props.index].quantity"
                  :type="'number'"
                  :solo-label="$t('general.amount')"
                  :outline="true"
                  :suffix="categoryConfig.quantity"
                  :rules="[v => slotAmountRule(v, item.slots[props.index].slot),
                           v => v > 0 || $t('app.marketplace.show_item.form.amount.validation.min')]"
                  :label="null"
                  @input="itemAmountChange($event, item, props.index)"
                />
              </div>
              <div v-if="$get(item, 'slots', []).length > 1" class="my-auto pb-4 md:pb-0 px-4">
                <span class="fas fa-trash cursor-pointer" @click="removeSlot(item, props.index)" />
              </div>
            </div>
            <div class="w-full flex py-2 bg-grey-l5 border-t border-grey-l3">
              <small v-if="!validSlots" class="mr-auto text-red normal-case">{{ $t('app.deals.form.errors_in_slots') }}</small>
              <app-button :title="'+ '+ $t('general.add_another')" :btn-class="'link'" class="px-4 ml-auto" @clicked="addNextSlot" />
            </div>
          </template>
        </mover>
      </v-form>
      <div class="w-full md:w-1/5 flex justify-end pt-8 md:pl-4">
        <app-tooltip position="left" class="text-p3 text-left mt-1 mr-2">
          {{ $t('app.deals.weight_price_tooltip') }}
        </app-tooltip>
        <p class="text-h6 pr-1 font-sans">
          <span v-if="itemPrice(item.marketplaceItem.id)[1] === 0" class="font-medium">{{ itemPrice(item.marketplaceItem.id)[0] | currency }}</span>
          <span v-else class="font-medium">{{ itemPrice(item.marketplaceItem.id)[0] | currency }} - {{ itemPrice(item.marketplaceItem.id)[1] | currency }}</span>
          <br>
          <small v-if="marketplaceItemPrice[1]===0">({{ marketplaceItemPrice[0] | currency }})</small>
          <small v-else>({{ marketplaceItemPrice[0] | currency }} - {{ marketplaceItemPrice[1] | currency }})</small>
        </p>
        <span class="ml-4 pt-2 text-p4 lni-close text-red cursor-pointer" @click="removeItem(item.marketplaceItem.id)" />
      </div>
    </div>

    <div v-else class="w-full md:w-2/3 flex flex-wrap pr-2">
      <data-label class="w-full md:w-1/3 py-5 px-2" :uppercase="false" :label="$t('app.deals.dimensions')">
        <span class="text-grey text-h6">
          {{ $get(item, 'dimensions', '-') }}
        </span>
      </data-label>

      <div class="w-full md:w-2/3 font-serif text-grey pt-4 pb-6">
        {{ $get(item, 'description', '-') }}
      </div>
    </div>

    <modal
      ref="newSlotModal"
      :modal-size-classes="'min-h-screen sm:min-h-auto max-w-sm'"
    >
      <template v-slot:header>
        {{ $t('app.deals.modals.new_slot.title') }}
        <button type="button" class="app-link text-red absolute top-0 right-0 py-3 px-4 font-bold text-p1 cursor-pointer z-50 bg-white focus:outline-none" @click="$refs.newSlotModal.close()">
          <span class="text-menu lni-close" />
        </button>
      </template>
      <template v-slot:body>
        <v-form ref="newSlotForm" class="w-full">
          <div class="w-full flex">
            <div class="w-2/3 pr-2 font-sans relative">
              <div v-if="hasAppliedSpecialPricingForSlot(newSlot, 'exact_time')" class="absolute top-0 right-0 text-p3 text-green pr-2">
                {{ discountOfTypeForSlot(newSlot, 'exact_time') * 100 }}%
              </div>

              <app-select
                v-model="newSlot.slot"
                :required="true"
                :items="availableSlots"
                :single-line="true"
                :rules="[v => !!v || $t('app.marketplace.show_item.form.slots.validation.required'),
                         v => $get(item,'slots',[]).filter(slot => slot.slot === v).length === 0 || $t('form.item_already_selected')]"
                :label="null"
                :solo-label="$t('general.'+ $get(item, 'marketplaceItem.slotType','-'))"
              />
            </div>

            <div class="w-1/3 font-sans relative">
              <div v-if="hasAppliedSpecialPricingForSlot(newSlot, 'quantity')" class="absolute top-0 right-0 text-p3 text-green">
                {{ discountOfTypeForSlot(newSlot, 'quantity') * 100 }}%
              </div>

              <app-input
                v-model="newSlot.quantity"
                :type="'number'"
                :required="true"
                :rules="[v => v > 0 || $t('app.marketplace.show_item.form.amount.validation.min'),
                         v => slotAmountRule(v, newSlot.slot)]"
                :outline="true"
                :label="null"
                :solo-label="$t('app.deals.amount')"
                :suffix="categoryConfig.quantity"
              />
            </div>
          </div>
        </v-form>
      </template>
      <template v-slot:footer>
        <div class="w-1/2 pr-2">
          <app-button class="w-full" :btn-class="'secondary'" :title="$t('general.cancel')" @clicked="cancelNewSlot" />
        </div>
        <div class="w-1/2 pl-2">
          <app-button class="w-full" :title="$t('general.save')" @clicked="storeNewSlot(item)" />
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import AppInput from '@/components/AppInput'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import DataLabel from '@/components/DataLabel'
import { getMarketplaceCategoryConfig } from '@/services/helpers'
import AppSelect from '@/components/AppSelect'
import Mover from '@/components/Mover'
import Modal from '@/components/Modal'
import AppButton from '@/components/AppButton'
import AppTooltip from '@/components/AppTooltip'
import proposalItem from '@/services/mixins/proposalItem'
import { getSumOfItems, getSumToOfItems } from '@/store/proposal'

export default {
  name: 'ProposalItem',

  components: {
    DataLabel,
    InventoryIcon,
    AppSelect,
    AppInput,
    AppButton,
    AppTooltip,
    Mover,
    Modal
  },

  mixins: [proposalItem],

  props: {
    item: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      default: true
    },
    last: {
      type: Boolean,
      default: false
    },
    packageItem: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    categoryConfig: {}
  }),

  computed: {
    marketplaceItemPrice() {
      return [
        getSumOfItems([this.item], true),
        getSumToOfItems([this.item], true)
      ]
    }
  },

  mounted() {
    if (!this.packageItem) {
      this.categoryConfig = getMarketplaceCategoryConfig(
        this.item.marketplaceItem.category.path
      )
    }
  },

  methods: {
    appliedSpecialPricingsForSlot(slot) {
      return this.$get(this.item.marketplaceItem, 'specialPricing', []).filter(
        pricing => {
          if (pricing.type === 'exact_time') {
            const itemSlot = this.item.marketplaceItem.slots.filter(
              s => s.id === slot.slot
            )[0]

            if (!itemSlot) {
              return false
            }

            return itemSlot.slot === pricing.meta.conditionValue
          }

          if (pricing.type === 'quantity') {
            if (pricing.conditionType === 'more') {
              return slot.quantity >= pricing.meta.conditionValue
            }

            return slot.quantity < pricing.meta.conditionValue
          }

          return false
        }
      )
    },

    hasAppliedSpecialPricingForSlot(slot, pricingType) {
      const appliedSpecialPricings = this.appliedSpecialPricingsForSlot(slot)

      return (
        appliedSpecialPricings.filter(pricing => pricing.type === pricingType)
          .length > 0
      )
    },

    appliedSpecialPricingsOfTypeForSlot(slot, pricingType) {
      const appliedSpecialPricings = this.appliedSpecialPricingsForSlot(slot)

      return appliedSpecialPricings.filter(
        pricing => pricing.type === pricingType
      )
    },

    discountOfTypeForSlot(slot, pricingType) {
      return this.appliedSpecialPricingsOfTypeForSlot(slot, pricingType).reduce(
        (sum, pricing) => {
          return sum + pricing.meta.coefficient
        },
        0
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
.package-border {
  @apply .border-b .border-grey-l3;
  border-bottom-width: 2px;
  border-bottom-style: dashed;
}
</style>
