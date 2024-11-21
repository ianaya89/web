<template>
  <div class="deal-panel" :class="{'accepted': isDealAccepted(deal), 'declined': isDealDeclined(deal)}">
    <div class="header w-full bg-white border-b-2 border-grey-l4" :class="getItemStatusColor">
      <div class="flex w-12 h-12 mr-4 mt-6 sm:mt-0 sm:self-start">
        <inventory-icon
          :category="$get(dealItemData, 'marketplaceItem.category', {})"
          :is-package="$get(dealItemData, 'marketplaceItem.itemType') === 'package'"
        />
      </div>
      <div class="header-content w-full flex-wrap">
        <div class="w-full sm:w-1/2 pt-2 pb-2 sm:pb-0 flex flex-wrap border-b sm:border-b-0 border-grey-l2 mb-3 sm:mb-0">
          <div>
            <span v-if="isDealItemPackage(dealItem)" class="subtitle">
              {{ $t('app.marketplace.itemType.package') }}
            </span>
            <span v-else class="subtitle">
              {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.firstCategory($get(dealItemData,'marketplaceItem.category',null)))) }}
            </span>
            <h4 v-if="isDealItemPackage(dealItem)" class="title">
              {{ $get(dealItemData, 'marketplaceItem.category.name', '-') }} <span v-if="$get(dealItemData, 'marketplaceItem.nameOverride', false)">- {{ $get(dealItemData, 'marketplaceItem.nameOverride', '-') }}</span>
            </h4>
            <h4 v-else class="title">
              {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.secondaryCategory($get(dealItemData,'marketplaceItem.category',null)))) }} - {{ $get(dealItemData, 'marketplaceItem.nameOverride', null) || $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.tertiaryCategory($get(dealItemData,'marketplaceItem.category',null)))) }}
            </h4>
          </div>
        </div>

        <div class="w-full sm:w-1/2 flex sm:justify-end items-center">
          <div class="flex sm:pl-2" :class="{'pr-1':!isDealAccepted(deal)}">
            <transition name="fade" mode="out-in" tag="div">
              <div class="sm:text-right">
                <span class="w-full text-h6 ml-auto font-normal text-grey sm:px-2 -ml-6 sm:-ml-6">
                  <app-tooltip position="left" class="text-p3 text-left">
                    {{ $t('app.deals.weight_price_tooltip') }}
                  </app-tooltip>
                  <span v-if="dealItem.priceTo==null || dealItem.priceTo==0">{{ weightedPrice | currency }}</span>
                  <span v-else>{{ weightedPrice | currency }} - {{ weightedPriceTo | currency }}</span>
                </span>
                <span v-if="!editing || !isEditable" class="text-h4 ml-auto font-medium sm:px-2 leading-tight" :class="{'bg-blue-l5':isUpdatedField('price')}">
                  <span v-if="dealItem.priceTo==null || dealItem.priceTo==0">{{ dealItemData.price | currency }}</span>
                  <span v-else>{{ dealItemData.price | currency }} - {{ dealItemData.priceTo | currency }}</span>
                </span>
                <app-input
                  v-else
                  v-model="dealItemData.price"
                  :hide-details="true"
                  :sticky-label="true"
                  :classes="'text-h4 my-auto ml-auto font-medium text-right pt-0 px-2'"
                  :is-currency="true"
                  :label="$t('app.deals.price')"
                  :suffix="getCurrencySymbol()"
                />
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div v-if="isEditable" class="menu sm:border-l border-grey-l2">
        <dropdown ref="menuDropdown" class="ml-auto sm:my-auto">
          <template v-slot:activator>
            <span class="fas fa-ellipsis-h text-red text-p1" />
          </template>
          <ul v-if="!editing" class="">
            <li v-if="!isDealItemAccepted(dealItem)" class="px-2 py-1">
              <app-button :btn-class="'link'" :disabled="updating" :title="$t('app.deals.accept')" @clicked="accept" />
            </li>
            <li v-if="!isDealItemDeclined(dealItem)" class="px-2 py-1">
              <app-button :btn-class="'link'" :disabled="updating" :title="$t('app.deals.decline')" @clicked="decline" />
            </li>
            <li v-if="!isDealItemAccepted(dealItem) && !isDealItemDeclined(dealItem)" class="px-2 py-1">
              <app-button :btn-class="'link'" :disabled="updating" :title="$t('app.deals.edit')" @clicked="toggleEdit" />
            </li>
            <li v-if="!isDealItemAccepted(dealItem) && !isDealItemDeclined(dealItem)" class="px-2 py-1">
              <app-button :btn-class="'link'" :disabled="updating" :title="$t('app.deals.remove')" @clicked="remove" />
            </li>
          </ul>
          <ul v-else class="">
            <li class="px-2 py-1">
              <app-button :btn-class="'link'" :disabled="updating" :title="$t('app.deals.cancel')" @clicked="cancelUpdate" />
            </li>
            <li class="px-2 py-1">
              <app-button :btn-class="'link'" :disabled="updating" :title="$t('general.update')" @clicked="update" />
            </li>
          </ul>
        </dropdown>
      </div>
    </div>
    <div v-if="isDealItemPackage(dealItem)" class="body flex-wrap">
      <div class="w-full px-4 py-4">
        <v-form
          ref="dealItemForm"
          v-model="formValid"
          class="w-full"
        >
          <div class="sm:pl-18 w-full flex flex-wrap">
            <div class="w-full sm:w-1/3 pr-1" />
            <mover class="w-full sm:w-2/3 flex" :inverted="false" :data="$get(dealItemData, 'slots', [])" :movers-always-visible="false">
              <template v-slot:content="props">
                <div class="w-full flex flex-wrap px-6 bg-grey-l5 pt-2">
                  <div class="w-2/3 pr-2 self-center">
                    <transition name="fade" mode="out-in" tag="div">
                      <data-label
                        v-if="!editing || !isEditable"
                        :label="$t('general.'+ $get(dealItemData, 'marketplaceItem.slotType','-'))"
                        :highlighted="isUpdatedField('slots')"
                      >
                        <span class="block text-black text-h6">
                          {{ $get(getMarketplaceItemSlot($get(dealItemData, 'slots.'+props.index+'.slot')),'slot','-') }}
                        </span>
                      </data-label>
                      <app-select
                        v-else
                        v-model="dealItemData.slots[props.index].slot"
                        :required="true"
                        :items="availableSlots"
                        :single-line="true"
                        :rules="[v => !!v || $t('app.marketplace.show_item.form.slots.validation.required'),
                                 v => $get(dealItemData,'slots',[]).filter(slot => slot.slot === v).length < 2 || $t('form.item_already_selected')]"
                        :label="null"
                        :solo-label="$t('general.'+ $get(dealItemData, 'marketplaceItem.slotType','-'))"
                      />
                    </transition>
                  </div>
                  <div class="w-1/3 self-center">
                    <div class="w-full flex">
                      <transition name="fade" mode="out-in" tag="div">
                        <data-label v-if="!editing || !isEditable" :uppercase="false" :label="$t('app.deals.amount')" :highlighted="isUpdatedField('amount')">
                          {{ $get(dealItemData, 'slots.'+props.index+'.quantity', '-') }} {{ dealItemConfig.quantity }}
                        </data-label>
                        <app-input
                          v-else
                          v-model="dealItemData.slots[props.index].quantity"
                          :classes="'mt-4 mb-px'"
                          :type="'number'"
                          :required="true"
                          :rules="[v => v > 0 || $t('app.marketplace.show_item.form.amount.validation.min'),
                                   v => slotAmountRule(v, dealItemData.slots[props.index].slot)]"
                          :outline="true"
                          :label="null"
                          :solo-label="$t('app.deals.amount')"
                          :suffix="dealItemConfig.quantity"
                        />
                      </transition>

                      <transition name="fade">
                        <div v-if="editing" class="mt-10 pl-4">
                          <span class="fas fa-trash cursor-pointer" @click="removeSlot(props.index)" />
                        </div>
                      </transition>
                    </div>
                  </div>
                </div>
                <div v-if="editing || !formValid" class="w-full flex py-2 bg-grey-l5 border-t border-grey-l3">
                  <small v-if="!formValid && $get(dealItemData, 'slots', []).length > 1" class="mr-auto text-red normal-case">{{ $t('app.deals.form.errors_in_slots') }}</small>
                  <transition name="fade">
                    <app-button v-if="editing" :title="'+ '+ $t('general.add_another')" :btn-class="'link'" class="px-4 ml-auto" @clicked="addNextSlot" />
                  </transition>
                </div>
              </template>
            </mover>
            <div class="pr-9 w-full flex pt-4 pb-8">
              <div class="sm:w-3/5">
                <div class="w-full font-serif text-grey">
                  {{ $get(dealItemData, 'marketplaceItem.description', '-') }}
                </div>
              </div>
            </div>
          </div>
        </v-form>

        <transition name="fade">
          <div v-if="editing" class="w-full text-right mt-2 mb-4">
            <app-button :disabled="updating" :title="$t('app.deals.cancel')" :btn-class="'link'" class="pr-8" @clicked="cancelUpdate" />
            <app-button ref="updateButton" :disabled="updating" :title="$t('general.update')" @clicked="update" />
          </div>
        </transition>
      </div>
      <accordion
        ref="accordionBody"
        class="w-full bg-grey-l5"
        :multi="true"
      >
        <accordion-item
          v-for="child in $get(dealItemData, 'marketplaceItem.children', [])"
          :key="child.id"
          class="w-full px-4"
          :bottom-border="false"
          :header-classes="'py-4 border-b border-grey-l4'"
        >
          <template v-slot:header>
            <div class="w-10 h-10 self-center flex">
              <inventory-icon
                :category="$get(child, 'category', {})"
              />
            </div>
            <div class="sm:w-1/2 pl-4">
              <span class="text-grey text-p3">
                {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.secondaryCategory(child.category))) }}
              </span>
              <h4 class="text-h5 text-grey capitalize">
                {{ child.nameOverride || $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.tertiaryCategory(child.category))) }}
              </h4>
            </div>
          </template>

          <div class="sm:pl-12 pr-9 w-full flex py-4 border-t border-grey-l4">
            <div v-if="hasPhotos(child)" class="w-2/5">
              <div class="w-full flex -mx-2">
                <avatar class="cursor-pointer" :classes="'h-24 w-24'" :rounded="false" :src="$get(child, 'images.0.url', null)" @click.native="viewImage($get(child, 'images.0.url', null))" />
                <div class="w-1" />
                <avatar class="cursor-pointer" :classes="'h-24 w-24'" :rounded="false" :src="$get(child, 'images.1.url', null)" @click.native="viewImage($get(child, 'images.1.url', null))" />
              </div>
            </div>
            <div class="sm:w-3/5">
              <div class="w-full flex flex-wrap" :class="{'px-2' : hasPhotos(child)}">
                <data-label class="w-2/3 pl-3" :uppercase="false" :label="$t('app.deals.dimensions')" :highlighted="isUpdatedField('dimensions')">
                  <span class="px-2 sm:px-0 text-grey text-h6">
                    {{ $get(child, 'dimensions', '-') }}
                  </span>
                </data-label>

                <div class="w-full font-serif text-grey pt-2 pl-3">
                  {{ $get(dealItemData, 'marketplaceItem.description', '-') }}
                </div>
              </div>
            </div>
          </div>
        </accordion-item>
      </accordion>
    </div>

    <div v-else class="body pt-4">
      <div class="px-4 w-full flex flex-wrap">
        <div class="w-full flex flex-wrap">
          <div class="w-full sm:w-1/3 pr-1 my-4 sm:my-auto">
            <data-label class="w-2/3" :uppercase="false" :label="$t('app.deals.dimensions')">
              <span class="text-grey text-h6">
                {{ $get(dealItemData, 'marketplaceItem.dimensions', '-') }}
              </span>
            </data-label>
          </div>
          <div class="w-full sm:w-2/3">
            <v-form
              ref="dealItemForm"
              v-model="formValid"
              class="w-full"
            >
              <div class="w-full flex items-center">
                <mover class="w-full flex" :inverted="false" :data="$get(dealItemData, 'slots', [])" :movers-always-visible="false">
                  <template v-slot:content="props">
                    <div class="w-full flex px-6 pt-2 bg-grey-l5">
                      <transition name="fade" mode="out-in" tag="div">
                        <data-label
                          v-if="!editing || !isEditable"
                          class="w-2/3 pr-4"
                          :label="$t('general.'+ $get(dealItemData, 'marketplaceItem.slotType','-'))"
                          :highlighted="isUpdatedField('slots')"
                        >
                          <span class="block text-black text-h6">
                            {{ $get(getMarketplaceItemSlot($get(dealItemData, 'slots.'+props.index+'.slot')),'slot','-') }}
                          </span>
                        </data-label>
                        <app-select
                          v-else
                          v-model="dealItemData.slots[props.index].slot"
                          class="w-2/3 pr-2"
                          :required="true"
                          :items="availableSlots"
                          :single-line="true"
                          :rules="[v => !!v || $t('app.marketplace.show_item.form.slots.validation.required'),
                                   v => $get(dealItemData,'slots',[]).filter(slot => slot.slot === v).length < 2 || $t('form.item_already_selected')]"
                          :label="null"
                          :solo-label="$t('general.'+ $get(dealItemData, 'marketplaceItem.slotType','-'))"
                        />
                      </transition>

                      <transition name="fade" mode="out-in" tag="div">
                        <data-label v-if="!editing || !isEditable" class="w-1/3 pr-4" :uppercase="false" :label="$t('app.deals.amount')" :highlighted="isUpdatedField('amount')">
                          {{ $get(dealItemData, 'slots.'+props.index+'.quantity', '-') }} {{ dealItemConfig.quantity }}
                        </data-label>
                        <app-input
                          v-else
                          v-model="dealItemData.slots[props.index].quantity"
                          class="w-1/3"
                          :type="'number'"
                          :required="true"
                          :rules="[v => v > 0 || $t('app.marketplace.show_item.form.amount.validation.min'),
                                   v => slotAmountRule(v, dealItemData.slots[props.index].slot)]"
                          :outline="true"
                          :label="null"
                          :solo-label="$t('app.deals.amount')"
                          :suffix="dealItemConfig.quantity"
                        />
                      </transition>

                      <transition name="fade">
                        <div v-if="editing && $get(dealItemData, 'slots', []).length > 1" class="mt-10 pl-4">
                          <span class="fas fa-trash cursor-pointer" @click="removeSlot(props.index)" />
                        </div>
                      </transition>
                    </div>
                    <div v-if="editing || !formValid" class="w-full flex py-2 bg-grey-l5 border-t border-grey-l4">
                      <small v-if="!formValid" class="mr-auto text-red normal-case">{{ $t('app.deals.form.errors_in_slots') }}</small>
                      <transition name="fade">
                        <app-button v-if="editing" :title="'+ '+ $t('general.add_another')" :btn-class="'link'" class="px-4 ml-auto" @clicked="addNextSlot" />
                      </transition>
                    </div>
                  </template>
                </mover>
              </div>
            </v-form>
          </div>
          <div class="pr-9 w-full flex pt-4 pb-8">
            <div v-if="hasPhotos(dealItemData.marketplaceItem)" class="w-2/5">
              <div class="w-full flex -mx-2">
                <avatar
                  v-if="$get(dealItemData, 'marketplaceItem.images.0.url', null)!==null"
                  class="cursor-pointer"
                  :classes="'w-24 h-24'"
                  :rounded="false"
                  :src="$get(dealItemData, 'marketplaceItem.images.0.url', null)"
                  @click.native="viewImage($get(dealItemData, 'marketplaceItem.images.0.url', null))"
                />
                <div class="w-1" />
                <avatar
                  v-if="$get(dealItemData, 'marketplaceItem.images.1.url', null)!==null"
                  class="cursor-pointer"
                  :classes="'w-24 h-24'"
                  :rounded="false"
                  :src="$get(dealItemData, 'marketplaceItem.images.1.url', null)"
                  @click.native="viewImage($get(dealItemData, 'marketplaceItem.images.1.url', null))"
                />
              </div>
            </div>
            <div class="sm:w-3/5">
              <div class="w-full font-serif text-grey" :class="{'px-2' : hasPhotos(dealItemData.marketplaceItem)}">
                {{ $get(dealItemData, 'marketplaceItem.description', '-') }}
              </div>
            </div>
          </div>
        </div>

        <transition name="fade">
          <div v-if="editing" class="w-full text-right mt-2 mb-4">
            <app-button :disabled="updating" :title="$t('app.deals.cancel')" :btn-class="'link'" class="pr-8" @clicked="cancelUpdate" />
            <app-button ref="updateButton" :disabled="updating" :title="$t('general.update')" @clicked="update" />
          </div>
        </transition>
      </div>
    </div>

    <media-modal ref="modalImage" :header="false" :footer="false">
      <template v-slot:body>
        <img class="mx-auto" :src="modalImage" alt="Inventory image">
      </template>
    </media-modal>

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
            <app-select
              v-model="newSlot.slot"
              class="w-2/3 pr-2 font-sans"
              :required="true"
              :items="availableSlots"
              :single-line="true"
              :rules="[v => !!v || $t('app.marketplace.show_item.form.slots.validation.required'),
                       v => $get(dealItemData,'slots',[]).filter(slot => slot.slot === v).length === 0 || $t('form.item_already_selected')]"
              :label="null"
              :solo-label="$t('general.'+ $get(dealItemData, 'marketplaceItem.slotType','-'))"
            />

            <app-input
              v-model="newSlot.quantity"
              class="w-1/3 font-sans"
              :type="'number'"
              :required="true"
              :rules="[v => v > 0 || $t('app.marketplace.show_item.form.amount.validation.min'),
                       v => slotAmountRule(v, newSlot.slot)]"
              :outline="true"
              :label="null"
              :solo-label="$t('app.deals.amount')"
              :suffix="dealItemConfig.quantity"
            />
          </div>
        </v-form>
      </template>
      <template v-slot:footer>
        <div class="w-1/2 pr-2">
          <app-button class="w-full" :btn-class="'secondary'" :title="$t('general.cancel')" @clicked="cancelNewSlot" />
        </div>
        <div class="w-1/2 pl-2">
          <app-button class="w-full" :title="$t('general.save')" @clicked="storeNewSlot" />
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import numeral from 'numeral'
import { sumBy } from 'lodash'
import Avatar from '@/components/Avatar'
import AppButton from '@/components/AppButton'
import AppTooltip from '@/components/AppTooltip'
import AppInput from '@/components/AppInput'
import Accordion from '@/components/Accordion'
import Dropdown from '@/components/Dropdown'
import AccordionItem from '@/components/AccordionItem'
import DataLabel from '@/components/DataLabel'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import { getMarketplaceCategoryConfig } from '@/services/helpers'
import {
  DealQuery,
  RemoveDealItemMutation,
  UpdateDealItemMutation,
  UpdateDealItemStatusMutation
} from '@/services/graphql'
import isDev from '@/services/mixins/isDev'
import dealItem from '@/services/mixins/dealItem'
import deal from '@/services/mixins/deal'
import MediaModal from '@/components/MediaModal'
import Mover from '@/components/Mover'
import AppSelect from '@/components/AppSelect'
import Modal from '@/components/Modal'

export default {
  name: 'DealPanel',

  components: {
    Mover,
    AppButton,
    AppInput,
    AppTooltip,
    Avatar,
    Accordion,
    AccordionItem,
    DataLabel,
    InventoryIcon,
    Dropdown,
    AppSelect,
    MediaModal,
    Modal
  },

  mixins: [isDev, dealItem, deal],

  props: {
    dealItem: {
      type: Object,
      required: true
    },

    deal: {
      type: Object,
      required: true
    },

    editable: {
      type: Boolean,
      required: true
    },

    updatedFields: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    formValid: false,
    editing: false,
    updating: false,
    dealItemData: {},
    dealItemConfig: {},
    modalImage: null,
    newSlot: {
      slot: null,
      quantity: null
    }
  }),

  computed: {
    hasPhotos() {
      return item => item != null && item.images.length > 0
    },

    isEditable() {
      if (!this.isDealEditable(this.deal)) {
        return false
      } else {
        return this.editable
      }
    },

    getMarketplaceItemSlot() {
      return slotId =>
        this.$get(this.dealItemData, 'marketplaceItem.slots', []).find(
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
          this.$t('app.deals.form.amount.validation.max', {
            amount: marketplaceItemSlotQuantity
          })
        )
      }
    },

    getItemStatusColor() {
      return 'bg-' + this.getDealItemStatusColor(this.dealItem) + '-l5'
    },

    isUpdatedField() {
      if (!this.isEditable) {
        return fieldKey => false
      } else {
        return fieldKey => this.updatedFields.includes(fieldKey)
      }
    },

    weightedPrice() {
      return (
        this.$get(this.dealItemData, 'price', 0) *
        sumBy(this.$get(this.dealItemData, 'slots', []), 'quantity')
      )
    },

    weightedPriceTo() {
      return (
        this.$get(this.dealItemData, 'priceTo', 0) *
        sumBy(this.$get(this.dealItemData, 'slots', []), 'quantity')
      )
    },

    availableSlots() {
      return this.$get(this.dealItemData, 'marketplaceItem.slots', []).map(
        item => ({
          text: item.slot,
          value: item.id
        })
      )
    }
  },

  watch: {
    dealItem(newVal) {
      this.dealItemData = Object.assign({}, newVal)
      this.dealItemConfig = getMarketplaceCategoryConfig(
        this.$get(this.dealItemData, 'marketplaceItem.category.path', '')
      )
    }
  },

  mounted() {
    this.dealItemData = Object.assign({}, this.dealItem)
    this.dealItemData.slots = [...this.dealItem.slots]
    this.dealItemConfig = getMarketplaceCategoryConfig(
      this.$get(this.dealItemData, 'marketplaceItem.category.path', '')
    )
  },

  methods: {
    viewImage(image) {
      this.modalImage = image
      if (this.modalImage !== null) {
        this.$refs.modalImage.open()
      }
    },

    cancelNewSlot() {
      this.$refs.newSlotForm.resetValidation()
      this.$refs.newSlotModal.close()
      this.newSlot = { slot: null, quantity: null }
    },

    storeNewSlot() {
      if (this.$refs.newSlotForm.validate()) {
        this.dealItemData.slots.push(this.newSlot)
        this.newSlot = { slot: null, quantity: null }
        this.$refs.newSlotModal.close()
      }
    },

    addNextSlot() {
      this.$refs.newSlotModal.open()
    },

    removeSlot(index) {
      this.dealItemData.slots.splice(index, 1)
    },

    getCurrencySymbol() {
      return numeral.locales[numeral.locale()].currency.symbol
    },

    toggleEdit() {
      this.editing = !this.editing
      if (this.editing) {
        if (this.$refs.accordionBody != null) {
          this.$refs.accordionBody.showAll()
        }
      }
      this.$refs.menuDropdown.hideDropdown()
    },

    async accept() {
      this.processUpdate()
      try {
        await this.$apollo.mutate({
          ...UpdateDealItemStatusMutation,
          variables: {
            dealItemId: this.dealItem.id,
            input: {
              resolution: 'accepted'
            }
          },
          refetchQueries: [
            {
              ...DealQuery,
              variables: {
                dealId: this.deal.id
              }
            }
          ]
        })

        this.processUpdated()
        this.$toast.success(this.$t('app.deals.messages.accept_item.success'))
      } catch (err) {
        this.processUpdated()
        if (this.isDevEnv) {
          this.$toast.error(
            err.message || this.$t('app.deals.messages.accept_item.error')
          )
        } else {
          this.$toast.error(this.$t('app.deals.messages.accept_item.error'))
        }
      }
      this.processUpdated()
    },

    async decline() {
      this.processUpdate()
      try {
        await this.$apollo.mutate({
          ...UpdateDealItemStatusMutation,
          variables: {
            dealItemId: this.dealItem.id,
            input: {
              resolution: 'declined'
            }
          },
          refetchQueries: [
            {
              ...DealQuery,
              variables: {
                dealId: this.deal.id
              }
            }
          ]
        })

        this.processUpdated()
        this.$toast.success(this.$t('app.deals.messages.decline_item.success'))
      } catch (err) {
        this.processUpdated()
        if (this.isDevEnv) {
          this.$toast.error(
            err.message || this.$t('app.deals.messages.decline_item.error')
          )
        } else {
          this.$toast.error(this.$t('app.deals.messages.decline_item.error'))
        }
      }
      this.processUpdated()
    },

    async remove() {
      this.processUpdate()
      try {
        await this.$apollo.mutate({
          ...RemoveDealItemMutation,
          variables: {
            dealItemId: this.dealItem.id
          },
          refetchQueries: [
            {
              ...DealQuery,
              variables: {
                dealId: this.deal.id
              }
            }
          ]
        })

        this.processUpdated()
        this.$toast.success(this.$t('app.deals.messages.remove_item.success'))
      } catch (err) {
        this.processUpdated()
        if (this.isDevEnv) {
          this.$toast.error(
            err.message || this.$t('app.deals.messages.remove_item.error')
          )
        } else {
          this.$toast.error(this.$t('app.deals.messages.remove_item.error'))
        }
      }
    },

    async update() {
      if (this.$refs.dealItemForm.validate()) {
        this.editing = !this.editing
        this.processUpdate()

        this.dealItemData.slots.map(slot => delete slot.__typename)

        try {
          await this.$apollo.mutate({
            ...UpdateDealItemMutation,
            variables: {
              dealItemId: this.dealItem.id,
              input: {
                id: this.dealItemData.marketplaceItem.id,
                slots: this.dealItemData.slots,
                price: this.dealItemData.price
              }
            },
            refetchQueries: [
              {
                ...DealQuery,
                variables: {
                  dealId: this.deal.id
                }
              }
            ]
          })

          this.processUpdated()
          this.$toast.success(this.$t('app.deals.messages.update_item.success'))
        } catch (err) {
          this.processUpdated()
          if (this.isDevEnv) {
            this.$toast.error(
              err.message || this.$t('app.deals.messages.update_item.error')
            )
          } else {
            this.$toast.error(this.$t('app.deals.messages.update_item.error'))
          }
        }
      }
    },

    processUpdate() {
      this.$refs.menuDropdown.hideDropdown()
      this.updating = true
      this.$emit('updating')
    },

    processUpdated() {
      this.updating = false
      this.$emit('updated')
    },

    cancelUpdate() {
      this.editing = false
      this.$refs.menuDropdown.hideDropdown()
      this.dealItemData = Object.assign({}, this.dealItem)
    }
  }
}
</script>

<style lang="postcss" scoped>
.deal-panel {
  @apply .border-b border-grey-l3;
  transition: box-shadow 500ms ease-out;
  will-change: box-shadow;

  .header {
    @apply .flex .items-stretch .p-4;
    transition: background-color 500ms ease-out;
    will-change: background-color;

    .header-content {
      @apply .flex;

      .title {
        @apply .capitalize .leading-tight;
      }

      .subtitle {
        transition: color 500ms ease-out;
        will-change: color;
        @apply .text-grey .leading-tight;
      }
    }

    .menu {
      @apply .w-10 .flex;
    }
  }

  .body {
    @apply .bg-white .w-full .flex;
  }

  &.accepted {
    @apply .shadow;

    .header {
      @apply .bg-green-l5;

      .header-content {
        @apply .-ml-1;
      }

      .menu {
        @apply .border-none;
      }
    }
  }

  &.declined {
    @apply .shadow;

    .header {
      @apply .bg-red-l5;

      .header-content {
        @apply .-ml-1;
      }

      .menu {
        @apply .border-none;
      }
    }
  }

  li {
    .button--link {
      @apply text-black;
    }
  }
}
</style>
