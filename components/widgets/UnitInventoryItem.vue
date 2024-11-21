<template>
  <div class="w-full px-6">
    <div class="w-full px-6 pb-6 flex border-b border-grey-l3 items-center">
      <slot>
        <inventory-icon class="w-16 h-16" :category="marketplaceItem.category" :is-package="marketplaceItem.itemType === 'package'" :classes="'w-12 h-12'" />
      </slot>
      <data-label
        v-if="marketplaceItem.itemType === 'inventory'"
        class="ml-6"
        :uppercase="false"
        :label-classes="'capitalize'"
        :label="$t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.secondaryCategory(marketplaceItem.category), false))"
      >
        <span class="text-h3 leading-tight">
          {{ marketplaceItem.nameOverride || $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.tertiaryCategory(marketplaceItem.category), false)) }}
        </span>
      </data-label>
      <data-label
        v-else
        class="ml-6"
        :uppercase="false"
        :label-classes="'capitalize'"
        :label="$t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.firstCategory(marketplaceItem.category),true))"
      >
        {{ marketplaceItem.nameOverride || $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.firstCategory(marketplaceItem.category), true)) }}
      </data-label>
    </div>
    <div v-if="marketplaceItem.itemType === 'inventory' && marketplaceItem.dimensions !== null" class="w-full flex px-6 pt-6">
      <data-label class="md:ml-auto my-auto" :label="$t('app.inventory.items.form.dimensions.label')">
        {{ marketplaceItem.dimensions }}
      </data-label>
    </div>
    <div class="p-6 border-b border-grey-l3">
      <div v-if="$get(marketplaceItem, 'images', []).length" class="text-grey md:w-4/5">
        <avatar v-if="$get(marketplaceItem, 'images.0.url', null) !== null" class="w-32 h-32 cursor-pointer" :rounded="false" :src="$get(marketplaceItem, 'images.0.url', undefined)" @click.native="viewImage($get(marketplaceItem, 'images.0.url', undefined))" />
        <avatar v-if="$get(marketplaceItem, 'images.1.url', null) !== null" class="w-32 h-32 cursor-pointer" :rounded="false" :src="$get(marketplaceItem, 'images.1.url', undefined)" @click.native="viewImage($get(marketplaceItem, 'images.1.url', undefined))" />
      </div>
      <p class="item-description-more text-grey w-4/5">
        <!-- <read-more :more-str="$t('general.read-more')" :text="marketplaceItem.description ? marketplaceItem.description.replace(/\n/g,'<br>') : ''" link="#" :less-str="$t('general.hide').toLowerCase()" :max-chars="250" /> -->
        <read-more :more-str="$t('general.read-more')" :text="markdownToHtml" link="#" :less-str="$t('general.hide').toLowerCase()" :max-chars="250" />
      </p>
    </div>
    <div v-if="marketplaceItem.itemType === 'package'" class="w-full p-6">
      <h6>{{ $t('app.inventory.package_contains') }}</h6>

      <div class="w-full flex flex-wrap md:-mx-2">
        <div v-for="item in marketplaceItem.children" :key="item.id" class="w-full md:w-1/4 p-3 bg-white my-2 md:mx-2 flex flex-col shadow-lg">
          <inventory-item-card :item="item" :editable="false" :show-expire-label="false" />
        </div>
      </div>
    </div>
    <v-form
      ref="itemForm"
      v-model="formValid"
      class="w-full"
    >
      <div v-for="(selectedSlot, i) in selectedSlots" :key="i" class="w-full flex flex-wrap px-6 py-3 bg-grey-l5 border-b border-grey-l4">
        <div class="flex w-full md:w-2/3">
          <div class="w-2/3 pt-4 relative">
            <div v-if="hasAppliedSpecialPricingForSlot(selectedSlot, 'exact_time')" class="absolute top-0 right-0 text-p3 text-green pt-4">
              {{ discountOfTypeForSlot(selectedSlot, 'exact_time') * 100 }}%
            </div>

            <app-select
              v-model="selectedSlot.slot"
              :required="true"
              :items="availableSlots"
              :single-line="true"
              :rules="[v => !!v || $t('app.marketplace.show_item.form.slots.validation.required'),
                       v => selectedSlots.map(slot => slot.slot).filter(slot => slot === v).length < 2 || $t('form.item_already_selected')]"
              :solo-label="$tc('general.'+ $get(marketplaceItem, 'slotType'))"
            />
          </div>

          <div class="w-1/3 pt-4 ml-4 max-w-sm relative">
            <div v-if="hasAppliedSpecialPricingForSlot(selectedSlot, 'quantity')" class="absolute top-0 right-0 text-p3 text-green pt-4">
              {{ discountOfTypeForSlot(selectedSlot, 'quantity') * 100 }}%
            </div>

            <app-input
              v-model="selectedSlot.quantity"
              :required="true"
              :type="'number'"
              :suffix="categoryConfig.quantity"
              :rules="[v => slotAmountRule(v, selectedSlot.slot),
                       v => v > 0 || $t('app.marketplace.show_item.form.amount.validation.min')]"
              :outline="true"
              :label="null"
              :solo-label="$t('general.amount')"
            />
          </div>
          <div v-if="selectedSlots.length > 1" class="my-auto mr-auto pl-4">
            <span class="fas fa-trash cursor-pointer" @click="selectedSlots.splice(i, 1)" />
          </div>
        </div>
        <div class="w-full md:w-1/3 flex justify-end">
          <div class="flex flex-wrap my-auto text-h4 font-medium ml-4 text-right">
            <span class="w-full text-h6 font-normal text-grey">
              <app-tooltip position="left" class="text-p3 text-left">
                {{ $t('app.deals.weight_price_tooltip') }}
              </app-tooltip>
              {{ weightedPrice(selectedSlot) | currency }}
            </span>
            <span v-if="!marketplaceItem.priceTo" class="w-full">{{ weightedPrice(selectedSlot, true) | currency }}</span>
            <span v-else class="w-full">{{ weightedPrice(selectedSlot, true) | currency }}-{{ weightedPriceTo(selectedSlot, true) | currency }} </span>
          </div>
        </div>
      </div>
      <div class="bg-grey-l5">
        <app-button :title="'+ '+ $t('general.add_another')" :btn-class="'link'" class="px-6 py-4" @clicked="addNextSlot" />
      </div>
    </v-form>
    <div v-if="hasAppliedAnySpecialPricing" class="w-full px-4 pt-6 -mb-3 flex flex-wrap justify-end items-center">
      <div v-if="hasAppliedSessionsSpecialPricing" class="w-full md:w-auto text-right text-h7 font-medium md:px-2 py-2 md:py-0 text-green border-b md:border-b-0 md:border-r border-grey-l3 leading-none">
        Quantity of sessions {{ appliedSessionSpecialPricingDiscount }}% off
      </div>

      <div class="w-full md:w-auto text-right text-h7 font-medium md:px-2 py-2 md:py-0 text-green leading-none">
        Total {{ totalDiscount }}% off
      </div>
    </div>
    <div class="w-full px-4 pt-6 flex">
      <div class="text-h4 ml-auto font-medium sm:px-2">
        <app-tooltip position="left" class="text-p3 text-left">
          {{ $t('app.deals.weight_price_tooltip') }}
        </app-tooltip>
        <span v-if="!marketplaceItem.priceTo" class="w-full"> {{ $t('general.total') }}: {{ weightedPriceSum | currency }}</span>
        <span v-else>{{ $t('general.total') }}: {{ weightedPriceSum | currency }}-{{ weightedPriceSumTo | currency }}</span>
      </div>
    </div>
    <div class="w-full p-6 flex">
      <div v-if="compareBtn" class="my-auto">
        <app-button v-if="!isInCompare(marketplaceItem.id)" :title="$t('app.compare.add_to_comparison')" :btn-class="'link'" @clicked="onAddToCompareClick" />
        <app-label v-else class="label-red">
          {{ $t('app.compare.in_comparison') }}
        </app-label>
      </div>
      <slot name="add-to-proposal" :item="marketplaceItem">
        <app-button v-if="!isInProposal(marketplaceItem.id)" class="my-auto ml-auto" :title="getAddBtnText" @clicked="addToProposal()" />
        <app-label v-else class="label-green ml-auto -mt-4">
          {{ $t('app.marketplace.show_item.in_proposal') }}
        </app-label>
      </slot>
    </div>
    <app-proposal-item-modal ref="addedItemProposalModal">
      <div v-if="!$apollo.loading" class="w-full">
        <div class="pt-8 pb-4 px-8 w-full flex flex-wrap items-center font-sans border-b border-grey-l4">
          <inventory-icon class="w-8 h-8 my-auto" :category="marketplaceItem.category" :is-package="marketplaceItem.itemType === 'package'" />
          <h4 class="ml-4">
            {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName(marketplaceItem.category.name, marketplaceItem.itemType === 'package')) }}
          </h4>
          <span v-if="!marketplaceItem.priceTo" class="text-h4 font-medium md:ml-auto md:my-auto w-full md:w-auto mt-4 md:mt-0">{{ addedItemSumPrice | currency }}</span>
          <span v-else class="text-h4 font-medium md:ml-auto md:my-auto w-full md:w-auto mt-4 md:mt-0">{{ addedItemSumPrice | currency }}-{{ addedItemSumPriceTo | currency }}</span>
        </div>
        <div class="w-full md:w-1/2 flex pt-4 px-6">
          <mover class="w-full flex" :inverted="false" :data="addedItemSlots" :movers-always-visible="false">
            <template v-slot:content="props">
              <div class="w-full flex px-4">
                <data-label class="w-1/2 font-sans" :label="$tc('general.'+ $get(marketplaceItem, 'slotType'))">
                  {{ $get(getMarketplaceItemSlot($get(props.current, 'slot', '-')),'slot','-') }}
                </data-label>
                <data-label class="ml-auto font-sans self-end" :label="$t('general.amount')">
                  {{ $get(props.current, 'quantity', '-') }} <span class="lowercase">{{ categoryConfig.quantity }}</span>
                </data-label>
              </div>
            </template>
          </mover>
        </div>
      </div>
    </app-proposal-item-modal>
    <media-modal ref="modalImage" :header="false" :footer="false">
      <template v-slot:body>
        <div class="w-full flex">
          <img class="mx-auto max-w-full" :src="modalImage" alt="Inventory image">
        </div>
      </template>
    </media-modal>
  </div>
</template>

<script>
import { marked } from 'marked'
import Avatar from '@/components/Avatar'
import DataLabel from '@/components/DataLabel'
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import AppProposalItemModal from '@/components/modals/AppProposalItemModal'
import InventoryItemCard from '@/components/inventory/InventoryItemCard'
import AppLabel from '@/components/AppLabel'
import proposal from '@/services/mixins/proposal'
import compare from '@/services/mixins/compare'
import { getMarketplaceCategoryConfig } from '@/services/helpers'
import AppTooltip from '@/components/AppTooltip'
import MediaModal from '@/components/MediaModal'
import AppSelect from '@/components/AppSelect'
import Mover from '@/components/Mover'
import { BrandIndustriesQuery } from '@/services/graphql'

export default {
  name: 'UnitInventoryItem',

  components: {
    MediaModal,
    Avatar,
    InventoryIcon,
    AppButton,
    AppInput,
    AppTooltip,
    AppLabel,
    DataLabel,
    Mover,
    AppSelect,
    AppProposalItemModal,
    InventoryItemCard
  },

  apollo: {
    unit: {
      ...BrandIndustriesQuery,
      variables() {
        return {
          id: 72
        }
      }
    }
  },

  mixins: [compare, proposal],

  props: {
    marketplaceItem: {
      type: Object,
      required: true
    },
    classes: {
      type: String,
      default: ''
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
    }
  },

  data: () => ({
    selectedSlots: [{ slot: null, quantity: null }],
    categoryConfig: {},
    formValid: false,
    modalImage: null,
    addedItemSlots: [],
    addedItemSumPrice: null,
    addedItemSumPriceTo: null
  }),

  computed: {
    availableSlots() {
      return this.marketplaceItem.slots
        .filter(slot => {
          return slot.expiredAt === null
        })
        .map(slot => ({
          text: slot.slot,
          value: slot.id
        }))
    },

    getMarketplaceItemSlot() {
      return slotId =>
        this.$get(this.marketplaceItem, 'slots', []).find(
          item => item.id === slotId
        )
    },

    slotAmountRule() {
      return (value, slotId) => {
        const marketplaceItemSlotQuantity = this.$get(
          this.getMarketplaceItemSlot(slotId),
          'quantity',
          1
        )

        return (
          value <= marketplaceItemSlotQuantity ||
          this.$t('app.marketplace.show_item.form.amount.validation.max', {
            amount: marketplaceItemSlotQuantity
          })
        )
      }
    },

    getAddBtnText() {
      return (
        this.addBtnText || this.$t('app.marketplace.show_item.add_to_proposal')
      )
    },

    weightedPriceSum() {
      return this.selectedSlots.reduce(
        (sum, item) => sum + this.weightedPrice(item),
        0
      )
    },

    weightedPriceSumTo() {
      return this.selectedSlots.reduce(
        (sum, item) => sum + this.weightedPriceTo(item),
        0
      )
    },

    totalDiscount() {
      const slotDiscounts =
        this.selectedSlots.reduce((sum, slot) => {
          return (
            sum +
            this.appliedSpecialPricingsForSlot(slot).reduce(
              (pricingSum, pricing) => {
                return pricingSum + pricing.meta.coefficient
              },
              0
            )
          )
        }, 0) * 100

      return slotDiscounts + this.appliedSessionSpecialPricingDiscount
    },

    appliedSessionSpecialPricingDiscount() {
      return (
        this.appliedSessionSpecialPricings.reduce((sum, pricing) => {
          return sum + pricing.meta.coefficient
        }, 0) * 100
      )
    },

    appliedSessionSpecialPricings() {
      return this.$get(this.marketplaceItem, 'specialPricing', []).filter(
        pricing => {
          if (pricing.type !== 'sessions') {
            return false
          }

          if (
            pricing.meta.conditionType === 'more' &&
            this.selectedSlots.length >= Number(pricing.meta.conditionValue)
          ) {
            return true
          }

          if (
            pricing.meta.conditionType === 'less' &&
            this.selectedSlots.length < Number(pricing.meta.conditionValue)
          ) {
            return true
          }

          return false
        }
      )
    },

    hasAppliedSessionsSpecialPricing() {
      return this.appliedSessionSpecialPricings.length > 0
    },

    hasAppliedAnySpecialPricing() {
      const hasAppliedSpecialPricingsForSlots =
        this.selectedSlots.filter(slot => {
          return this.appliedSpecialPricingsForSlot(slot).length > 0
        }).length > 0

      return (
        this.hasAppliedSessionsSpecialPricing ||
        hasAppliedSpecialPricingsForSlots
      )
    },

    markdownToHtml() {
      return marked.parse(this.marketplaceItem.description)
    }
  },

  mounted() {
    this.categoryConfig = getMarketplaceCategoryConfig(
      this.marketplaceItem.category.path
    )
  },

  methods: {
    weightedPrice(slot, singleItemPrice) {
      let price

      if (singleItemPrice) {
        price = this.$get(this.marketplaceItem, 'price', 0)
      } else {
        price =
          this.$get(this.marketplaceItem, 'price', 0) *
          (slot.quantity || 0) *
          (slot.slot !== null ? 1 : 0)
      }

      const discount = price * this.discountForSlot(slot)

      return price + discount
    },

    weightedPriceTo(slot, singleItemPrice) {
      let price

      if (singleItemPrice) {
        price = this.$get(this.marketplaceItem, 'priceTo', 0)
      } else {
        price =
          this.$get(this.marketplaceItem, 'priceTo', 0) *
          (slot.quantity || 0) *
          (slot.slot !== null ? 1 : 0)
      }

      const discount = price * this.discountForSlot(slot)

      return price + discount
    },

    discountForSlot(slot) {
      return this.appliedSpecialPricingsForSlot(slot).reduce((sum, pricing) => {
        return sum + pricing.meta.coefficient
      }, 0)
    },

    appliedSpecialPricingsForSlot(slot) {
      return this.$get(this.marketplaceItem, 'specialPricing', []).filter(
        pricing => {
          if (pricing.type === 'exact_time') {
            const itemSlot = this.marketplaceItem.slots.filter(
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
    },

    addNextSlot() {
      this.selectedSlots.push({ slot: null, quantity: null })
    },

    viewImage(image) {
      this.modalImage = image
      if (this.modalImage !== null) {
        this.$refs.modalImage.open()
      }
    },

    addToProposal() {
      if (this.$refs.itemForm.validate()) {
        if (!this.getOnlyEvent) {
          this.addedItemSlots = [...this.selectedSlots]
          this.addedItemSumPrice = this.weightedPriceSum
          this.addedItemSumPriceTo = this.weightedPriceSumTo
          this.$store.dispatch('proposal/add', {
            marketplaceItem: this.marketplaceItem,
            slots: this.selectedSlots
          })
          this.$refs.addedItemProposalModal.open()
        }

        this.$emit('added-item', {
          marketplaceItem: this.marketplaceItem,
          slots: this.selectedSlots
        })
        this.selectedSlots = [{ slot: null, quantity: null }]
        this.$refs.itemForm.resetValidation()
      }
    },

    onAddToCompareClick() {
      this.$store.dispatch('compare/add', this.marketplaceItem.id)
    }
  }
}
</script>

<style lang="postcss">
.item-description-more {
  ul {
    list-style: initial !important;
    margin: 4px 10px !important;
    padding: 0 10px !important;
  }
}
</style>
