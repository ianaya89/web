<template>
  <div class="w-full">
    <div class="w-full flex flex-wrap mt-4 md:mt-16 px-8 md:px-16 py-8 md:py-12 shadow-xl">
      <div class="w-full md:w-1/3 flex mb-4 md:mb-0">
        <inventory-icon class="w-24 h-24 my-auto" :category="category !== null ? category : {path: ''}" />
      </div>
      <div class="w-full md:w-1/3 mb-4 md:mb-0">
        <data-label :label="$t('app.inventory.items.form.name.label')">
          <span class="text-h3 normal-case">
            <app-input
              :value="itemData.nameOverride || $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.tertiaryCategory(category)))"
              :required="true"
              :classes="'w-full'"
              data-cy="name-override"
              class="-mt-2"
              :rules="[validationRules.required($t('form.required'))]"
              :solo-label="null"
              :label="null"
              @input="itemData.nameOverride = $event"
            />
          </span>
        </data-label>
        <data-label class="mt-2" :label="$t('app.inventory.items.form.placement.label')">
          <span class="normal-case">
            {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.secondaryCategory(category))) }}
          </span>
        </data-label>
      </div>
      <div class="w-full md:w-1/3">
        <data-label :label="$t('app.inventory.items.form.type.label')">
          <span class="normal-case">
            {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.firstCategory(category))) }}
          </span>
        </data-label>
      </div>
    </div>
    <div class="w-full flex flex-wrap py-12 md:-mx-4">
      <div class="w-full md:w-1/2 md:px-4">
        <div class="w-full flex flex-wrap -mx-4">
          <div class="w-full px-4">
            <div v-if="categoryConfig.availability !=null && categoryConfig.availability.length > 1" class="w-1/2">
              <app-select
                v-model="itemData.slotType"
                :solo="true"
                :required="true"
                data-cy="slot-type"
                :solo-label="$t('app.inventory.items.form.slot_type.label')"
                :rules="[validationRules.required($t('form.required'))]"
                :items="slotTypeItems"
                :label="null"
              />
            </div>
          </div>
          <div v-for="i in (itemData.slotType === 'date' ? dateSlots.length : seasonSlots.length)" :key="i" class="w-full flex px-4 border-b border-grey-l4">
            <div class="w-1/2 relative">
              <datepicker
                v-if="itemData.slotType === 'date'"
                v-model="dateSlots[i - 1].slot"
                :autoclose="true"
                :rules="[validationRules.required($t('form.required')), rules.dateSlotNotSelected]"
                :solo="true"
                :required="true"
                :solo-label="$t('app.inventory.items.form.slots.label')"
                :outline="true"
                data-cy="slot-slot"
              />
              <app-select
                v-else
                v-model="seasonSlots[i - 1].slot"
                :label="null"
                :items="seasonItems"
                :rules="[validationRules.required($t('form.required')), rules.seasonSlotNotSelected]"
                :solo="true"
                :required="true"
                :solo-label="$t('app.inventory.items.form.slots.label')"
                :outline="true"
                data-cy="slot-slot"
              />
            </div>
            <div class="w-1/3 px-4">
              <app-input
                v-if="itemData.slotType === 'date'"
                v-model="dateSlots[i - 1].quantity"
                :tooltip="categoryConfig.quantity_info!==null"
                :tooltip-text="$t(categoryConfig.quantity_info)"
                :required="true"
                :outline="true"
                data-cy="slot-quantity"
                :rules="[validationRules.required($t('form.required'))]"
                :type="'number'"
                :solo-label="$t('app.inventory.items.form.quantity.label')"
                :label="null"
                :suffix="categoryConfig.quantity"
              />
              <app-input
                v-else
                v-model="seasonSlots[i - 1].quantity"
                :tooltip="categoryConfig.quantity_info!==null"
                :tooltip-text="$t(categoryConfig.quantity_info)"
                :required="true"
                :outline="true"
                data-cy="slot-quantity"
                :rules="[validationRules.required($t('form.required'))]"
                :type="'number'"
                :solo-label="$t('app.inventory.items.form.quantity.label')"
                :label="null"
                :suffix="categoryConfig.quantity"
              />
            </div>
            <div v-if="itemData.slotType === 'date' ? dateSlots.length > 1 : seasonSlots.length > 1" class="my-auto ml-2 pl-2">
              <span class="fas fa-trash cursor-pointer app-link" @click="itemData.slotType === 'date' ? dateSlots.splice(i - 1, 1) : seasonSlots.splice(i - 1, 1)" />
            </div>
            <div v-if="itemData.slotType === 'date' ? dateSlots[i - 1].expiredAt : seasonSlots[i - 1].expiredAt" class="my-auto ml-2 pl-2">
              <app-label :closeable="false" color="label-yellow" :small="true">
                <span>{{ $t('general.expired') }}</span>
              </app-label>
            </div>
          </div>
          <app-button :title="'+ '+ $t('general.add_another')" :btn-class="'link'" class="px-4" data-cy="add-next-slot" @clicked="addNextSlot" />
        </div>
      </div>
      <div class="w-full md:w-1/2 md:px-4 mt-10 md:mt-0">
        <h6>
          {{ $t('app.inventory.items.form.upload.images') }}<span class="required-sign" />
          <app-tooltip v-if="categoryConfig.images_info" class="text-p2">
            {{ $t(categoryConfig.images_info) }}
          </app-tooltip>
        </h6>
        <div class="w-full flex">
          <div class="w-1/2 pr-1">
            <single-upload
              ref="upload"
              class="w-full border border-dashed border-grey-l3 p-4 h-48"
              :status-placeholder-classes="'bg-grey-l5'"
              :default-file-url="$get(images, '0.url', null)"
              :extensions="['jpg', 'jpeg', 'gif', 'png']"
              :info-text="$t('app.inventory.items.form.upload.info')"
              :btn-text="$t('app.inventory.items.form.upload.button')"
              :size="5"
              :param-name="'image'"
              :upload-url="'/upload/image'"
              :upload-classes="''"
              data-cy="image-upload-1"
              @file-uploaded="itemImage1 = $event.url"
            />
          </div>
          <div class="w-1/2 pl-1">
            <single-upload
              ref="upload"
              class="w-full border border-dashed border-grey-l3 p-4 h-48"
              :status-placeholder-classes="'bg-grey-l5'"
              :default-file-url="$get(images, '1.url', null)"
              :extensions="['jpg', 'jpeg', 'gif', 'png']"
              :info-text="$t('app.inventory.items.form.upload.info')"
              :btn-text="$t('app.inventory.items.form.upload.button')"
              :size="5"
              :param-name="'image'"
              :upload-url="'/upload/image'"
              :upload-classes="''"
              data-cy="image-upload-2"
              @file-uploaded="itemImage2 = $event.url"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-wrap pt-10 border-t border-grey-l3 md:-mx-4">
      <div class="w-full md:w-1/2 md:pl-4 md:pr-12">
        <text-area
          v-model="itemData.description"
          :rules="[validationRules.required($t('form.required'))]"
          :counter="2000"
          :label="null"
          :solo-label="$t('app.inventory.items.form.description.label')"
          :required="true"
          :outline="true"
          :rows="10"
          data-cy="description"
        />
      </div>
      <div class="w-full md:w-1/2 md:px-4">
        <div class="w-full flex flex-wrap">
          <div class="w-full md:w-1/2">
            <div class="w-full">
              <app-input
                v-model="itemData.price"
                :required="true"
                :outline="true"
                :is-currency="true"
                :classes="'w-full'"
                :rules="[validationRules.required($t('form.required'))]"
                :solo-label="$t('app.inventory.items.form.price.label')"
                appended-icon="fas fa-euro-sign"
                :label="null"
                data-cy="price"
              />
              <app-input
                v-model="itemData.priceTo"
                :value="itemData.priceTo ? itemData.priceTo : null"
                :required="false"
                :outline="true"
                :classes="'w-full'"
                :solo-label="$t('app.inventory.items.form.price_to.label')"
                appended-icon="fas fa-euro-sign"
                :label="null"
                data-cy="priceTo"
              />
            </div>
          </div>
          <div class="w-full md:w-1/2 md:pl-4">
            <div v-if="categoryConfig.dimensions !== null" class="w-full">
              <app-input
                :value="itemData.dimensions ? itemData.dimensions.replace(categoryConfig.dimensions,'') : itemData.dimensions"
                :required="true"
                :outline="true"
                :classes="'w-full'"
                :rules="[validationRules.required($t('form.required'))]"
                :suffix="categoryConfig.dimensions"
                :solo-label="$t('app.inventory.items.form.dimensions.label')"
                :label="null"
                data-cy="dimensions"
                @input="itemData.dimensions = $event + categoryConfig.dimensions"
              />
            </div>
          </div>
        </div>
        <div class="w-full flex flex-wrap">
          <div class="w-full md:w-1/2">
            <multiselect
              v-model="itemData.excludedIndustries"
              :items="excludedIndustriesItems"
              :solo-label="$t('app.inventory.items.form.excluded_industries.label')"
              :label="null"
              data-cy="excluded-industries"
            />
            <div class="relative">
              <datepicker
                v-model="itemData.visibleFrom"
                :outline="true"
                class="w-full"
                :required="true"
                :solo-label="$t('app.inventory.items.form.visible_from.label')"
                :autoclose="true"
                :label="null"
                data-cy="visible-from"
                :rules="[validationRules.required($t('form.required'))]"
              />
            </div>
          </div>
          <div class="w-full md:w-1/2 md:pl-4">
            <div class="mb-1">
              <switcher v-model="itemData.isSoldSeparately" :label="$t('app.inventory.items.form.separately.label')" data-cy="sold-separately" />
              <switcher v-if="categoryConfig.broadcast_choice" v-model="itemData.isBroadcasted" :label="$t('app.inventory.items.form.broadcasting.label')" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<inventory-special-pricing v-model="itemData.specialPricing" :slots="itemData.slots" data-cy="special-pricing" />-->
  </div>
</template>

<script>
import moment from 'moment'
import DataLabel from '@/components/DataLabel'
import AppButton from '@/components/AppButton'
import TextArea from '@/components/TextArea'
import AppInput from '@/components/AppInput'
import Switcher from '@/components/Switcher'
import Multiselect from '@/components/Multiselect'
import Datepicker from '@/components/Datepicker'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import { IndustriesQuery } from '@/services/graphql'
import AppSelect from '@/components/AppSelect'
import { getMarketplaceCategoryConfig } from '@/services/helpers'
import AppTooltip from '@/components/AppTooltip'
import SingleUpload from '@/components/SingleUpload'
import AppLabel from '@/components/AppLabel'
import validationRules from '@/services/mixins/validationRules'

export default {
  name: 'InventoryItemDetail',

  components: {
    AppButton,
    AppTooltip,
    SingleUpload,
    InventoryIcon,
    AppInput,
    DataLabel,
    TextArea,
    Switcher,
    Multiselect,
    AppSelect,
    AppLabel,
    Datepicker
  },

  mixins: [validationRules],

  props: {
    value: {
      type: Object,
      default: () => ({
        description: null,
        price: null,
        priceTo: null,
        dimensions: null,
        slotType: 'date',
        slots: [],
        visibleFrom: null,
        isSoldSeparately: true,
        partOfPackage: false,
        excludedIndustries: []
      })
    },

    category: {
      type: Object,
      default: null
    }
  },

  apollo: {
    industries: IndustriesQuery
  },

  data: () => ({
    rules: {
      dateSlotNotSelected: v => false,
      seasonSlotNotSelected: v => false
    },
    itemImage1: null,
    itemImage2: null,
    itemImages: [null, null],
    industries: IndustriesQuery.mock,
    dateSlots: [{ slot: null, quantity: null }],
    seasonSlots: [{ slot: null, quantity: null }],
    categoryConfig: {},
    itemData: {
      slots: [{ slot: null, quantity: null }],
      excludedIndustries: []
    },
    showSlotsDatepicker: false
  }),

  computed: {
    images() {
      return this.$get(this.itemData, 'images', [])
    },

    excludedIndustriesItems() {
      return this.industries.map(item => ({
        text: item.name,
        value: item.id
      }))
    },

    slotTypeItems() {
      return [
        { text: this.$t('general.date'), value: 'date' },
        { text: this.$t('general.season'), value: 'season' }
      ]
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
    }
  },

  watch: {
    itemImage1(val) {
      if (val !== null) {
        this.itemImages[0] = val
        this.$emit(
          'images-input',
          this.itemImages.filter(image => image !== null)
        )
      }
    },

    itemImage2(val) {
      if (val !== null) {
        this.itemImages[1] = val
        this.$emit(
          'images-input',
          this.itemImages.filter(image => image !== null)
        )
      }
    },

    categoryConfig: {
      handler(newVal) {
        if (newVal.availability != null && newVal.availability.length === 1) {
          this.itemData.slotType = newVal.availability[0]
        }
      },
      deep: true
    },

    category(newVal) {
      if (newVal != null) {
        this.categoryConfig = getMarketplaceCategoryConfig(newVal.path)
        this.itemData.category = newVal.id
      }
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
    this.itemData = this.value
    this.categoryConfig = getMarketplaceCategoryConfig(
      this.$get(this.value, 'category.path', '')
    )
    if (this.itemData.slotType === 'season') {
      this.seasonSlots = this.itemData.slots
    } else {
      this.dateSlots = this.itemData.slots
    }

    const vm = this

    this.rules.dateSlotNotSelected = v =>
      vm.dateSlots.map(slot => slot.slot).filter(slot => slot === v).length <
        2 || vm.$t('form.item_already_selected')

    this.rules.seasonSlotNotSelected = v =>
      vm.seasonSlots.map(slot => slot.slot).filter(slot => slot === v).length <
        2 || vm.$t('form.item_already_selected')

    this.itemData.isSoldSeparately = true
  },

  methods: {
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
