<template>
  <div class="w-full pt-10 border-t border-grey-l3">
    <h6>
      {{ $t('app.inventory.items.form.special_pricing.title') }}
    </h6>

    <p class="block text-grey text-p3 uppercase tracking-wide mb-2">
      {{ $t('app.inventory.items.form.special_pricing.price_decrease') }}
    </p>

    <transition-group name="special-pricing" tag="div" class="flex flex-wrap w-full -m-2">
      <div v-for="(pricing, index) in priceDecreasingSpecialPricingItems" :key="'priceDecreasingSpecialPricing' + index" class="w-full md:w-1/3 md:max-w-xs p-2">
        <div class="border border-grey-l3 p-4 w-full cursor-pointer relative">
          <div class="absolute top-0 right-0 p-2">
            <dropdown :ref="'dropdownPriceDecreasing' + index">
              <template v-slot:activator>
                <span class="fas fa-ellipsis-v text-red" />
              </template>
              <ul class="">
                <li class="cursor-pointer" @click="editSpecialPricing(false, pricing, index)">
                  {{ $t('general.edit') }}
                </li>
                <li class="cursor-pointer" @click="removeSpecialPricing(false, index)">
                  {{ $t('general.delete') }}
                </li>
              </ul>
            </dropdown>
          </div>

          <div class="flex items-start leading-normal mr-6 cursor-pointer" @click="editSpecialPricing(false, pricing, index)">
            <span class="far fa-arrow-alt-circle-down text-h5 mt-1 text-green" />

            <div class="ml-4">
              <span class="text-h7 text-green font-medium">{{ pricing.meta.coefficient * 100 }}% {{ $t('app.inventory.items.form.special_pricing.price_decrease') }}</span>
              <div v-if="pricing.type === 'industry'">
                {{ $t('app.inventory.items.form.special_pricing.industry') }}: <span class="font-medium">{{ pricing.industry ? pricing.industry.text : '' }}</span>
              </div>
              <div v-if="pricing.type === 'exact_time'">
                {{ $t('app.inventory.items.form.special_pricing.type_exact_time') }}: <span class="font-medium">{{ pricing.meta.conditionValue }}</span>
              </div>
              <div v-if="pricing.type !== 'industry' && pricing.type !== 'exact_time'">
                {{ pricing.type == 'quantity' ? $t('app.inventory.items.form.special_pricing.type_quantity') : $t('app.inventory.items.form.special_pricing.type_sessions') }}: {{ $t('app.inventory.items.form.special_pricing.condition_type_' + pricing.meta.conditionType + '_short') }} <span class="font-medium">{{ pricing.meta.conditionValue }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div key="addAnotherSpecialPricingDecreasingPrice" class="w-full md:w-1/3 md:max-w-xs p-2">
        <div class="border border-grey-l3 p-4 w-full cursor-pointer flex items-center justify-center h-full font-medium" style="min-height:85px" @click="addAnotherSpecialPricing(false)">
          + {{ $t('general.add_another') }}
        </div>
      </div>
    </transition-group>

    <p class="block text-grey text-p3 uppercase tracking-wide mb-2 mt-6">
      {{ $t('app.inventory.items.form.special_pricing.price_increase') }}
    </p>

    <transition-group name="special-pricing" tag="div" class="flex flex-wrap w-full -m-2">
      <div v-for="(pricing, index) in priceIncreasingSpecialPricingItems" :key="'priceIncreasingSpecialPricing' + index" class="w-full md:w-1/3 md:max-w-xs p-2">
        <div class="border border-grey-l3 p-4 w-full cursor-pointer relative">
          <div class="absolute top-0 right-0 p-2">
            <dropdown :ref="'dropdownPriceIncreasing' + index">
              <template v-slot:activator>
                <span class="fas fa-ellipsis-v text-red" />
              </template>
              <ul class="">
                <li class="cursor-pointer" @click="editSpecialPricing(true, pricing, index)">
                  {{ $t('general.edit') }}
                </li>
                <li class="cursor-pointer" @click="removeSpecialPricing(true, index)">
                  {{ $t('general.delete') }}
                </li>
              </ul>
            </dropdown>
          </div>

          <div class="flex items-start leading-normal mr-6 cursor-pointer" @click="editSpecialPricing(true, pricing, index)">
            <span class="far fa-arrow-alt-circle-down text-h5 mt-1 text-red" />

            <div class="ml-4">
              <span class="text-h7 text-red font-medium">{{ pricing.meta.coefficient * 100 }}% {{ $t('app.inventory.items.form.special_pricing.price_increase') }}</span>
              <div v-if="pricing.type === 'industry'">
                {{ $t('app.inventory.items.form.special_pricing.industry') }}: <span class="font-medium">{{ pricing.industry ? pricing.industry.text : '' }}</span>
              </div>
              <div v-if="pricing.type === 'exact_time'">
                {{ $t('app.inventory.items.form.special_pricing.type_exact_time') }}: <span class="font-medium">{{ pricing.meta.conditionValue }}</span>
              </div>
              <div v-if="pricing.type !== 'industry' && pricing.type !== 'exact_time'">
                {{ pricing.type == 'quantity' ? $t('app.inventory.items.form.special_pricing.type_quantity') : $t('app.inventory.items.form.special_pricing.type_sessions') }}: {{ $t('app.inventory.items.form.special_pricing.condition_type_' + pricing.meta.conditionType + '_short') }} <span class="font-medium">{{ pricing.meta.conditionValue }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div key="addAnotherSpecialPricingIncreasingPrice" class="w-full md:w-1/3 md:max-w-xs p-2">
        <div class="border border-grey-l3 p-4 w-full cursor-pointer flex items-center justify-center h-full font-medium" style="min-height:85px" @click="addAnotherSpecialPricing(true)">
          + {{ $t('general.add_another') }}
        </div>
      </div>
    </transition-group>

    <modal
      ref="addSpecialPricingModal"
      :modal-size-classes="'min-h-screen sm:min-h-auto max-w-sm'"
      @opened="shouldValidateSpecialPricingModalFrom = true"
      @closed="shouldValidateSpecialPricingModalFrom = false; specialPricingEditingIndex = null"
    >
      <template v-slot:header>
        {{ specialPricingEditingIndex == null ? $t('app.inventory.items.form.special_pricing.add_special_pricing') : $t('app.inventory.items.form.special_pricing.edit_special_pricing') }}
        <div class="absolute top-0 right-0 text-menu">
          <app-button
            :title="''"
            class="py-4 px-2"
            btn-class="link"
            icon="lni-close"
            @clicked="$refs.addSpecialPricingModal.close()"
          />
        </div>
      </template>
      <template v-slot:body>
        <div class="flex flex-wrap -ml-2 -mr-2 -mt-2 mb-2">
          <div class="w-full md:w-1/2 md:p-2">
            <div class="border p-2 w-full cursor-pointer relative" :class="{ 'border-grey-l3': (addSpecialPricing.priceIncrease || addSpecialPricing.priceIncrease == null), 'border-green': addSpecialPricing.priceIncrease == false }" @click="addSpecialPricing.priceIncrease = false">
              <div class="flex items-center leading-normal" :class="{ 'text-grey-l3': (addSpecialPricing.priceIncrease || addSpecialPricing.priceIncrease == null), 'text-green': addSpecialPricing.priceIncrease == false }">
                <span class="far fa-arrow-alt-circle-down text-h7" />

                <div class="ml-2">
                  <span class="text-h7 font-medium font-sans lowercase">{{ $t('app.inventory.items.form.special_pricing.price_decrease') }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full md:w-1/2 md:p-2">
            <div class="border p-2 w-full cursor-pointer relative" :class="{ 'border-grey-l3': ! addSpecialPricing.priceIncrease, 'border-red': addSpecialPricing.priceIncrease }" @click="addSpecialPricing.priceIncrease = true">
              <div class="flex items-center leading-normal" :class="{ 'text-grey-l3': ! addSpecialPricing.priceIncrease, 'text-red': addSpecialPricing.priceIncrease }">
                <span class="far fa-arrow-alt-circle-up text-h7" />

                <div class="ml-2">
                  <span class="text-h7 font-medium font-sans lowercase">{{ $t('app.inventory.items.form.special_pricing.price_increase') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <app-select
          ref="addSpecialPricingInputCoefficient"
          v-model="addSpecialPricing.coefficient"
          :solo="true"
          :required="specialPricingFormValidation.required"
          :solo-label="$t('app.inventory.items.form.special_pricing.coefficient')"
          :rules="specialPricingFormValidation.rules"
          :items="specialPricingCoefficient"
          :label="null"
        />

        <app-select
          ref="addSpecialPricingInputType"
          v-model="addSpecialPricing.type"
          :solo="true"
          :required="specialPricingFormValidation.required"
          :solo-label="$t('app.inventory.items.form.special_pricing.type')"
          :rules="specialPricingFormValidation.rules"
          :items="specialPricingTypes"
          :label="null"
        />

        <app-select
          v-if="addSpecialPricing.type && addSpecialPricing.type !== 'industry' && addSpecialPricing.type !== 'exact_time'"
          ref="addSpecialPricingInputConditionType"
          v-model="addSpecialPricing.conditionType"
          :solo="true"
          :required="specialPricingFormValidation.required"
          :solo-label="$t('app.inventory.items.form.special_pricing.condition_type')"
          :rules="specialPricingFormValidation.rules"
          :items="specialPricingConditionTypes"
          :label="null"
        />

        <app-input
          v-if="addSpecialPricing.type && addSpecialPricing.type !== 'industry' && addSpecialPricing.type !== 'exact_time'"
          ref="addSpecialPricingInputConditionValue"
          v-model="addSpecialPricing.conditionValue"
          :type="'number'"
          :outline="true"
          :label="null"
          :solo-label="addSpecialPricing.type === 'sessions' ? $t('app.inventory.items.form.special_pricing.type_sessions') : $t('app.inventory.items.form.special_pricing.type_quantity')"
          :required="specialPricingFormValidation.required"
          :rules="specialPricingFormValidation.rules"
        />

        <app-select
          v-if="addSpecialPricing.type === 'industry'"
          ref="addSpecialPricingInputConditionValue"
          v-model="addSpecialPricing.conditionValue"
          :solo="true"
          :required="specialPricingFormValidation.required"
          :solo-label="$t('app.inventory.items.form.special_pricing.industry')"
          :rules="specialPricingFormValidation.rules"
          :items="specialPricingIndustries"
          :label="null"
        />

        <app-select
          v-if="addSpecialPricing.type === 'exact_time'"
          ref="addSpecialPricingInputConditionValue"
          v-model="addSpecialPricing.conditionValue"
          :solo="true"
          :required="specialPricingFormValidation.required"
          :solo-label="$t('app.inventory.items.form.special_pricing.type_exact_time')"
          :rules="specialPricingFormValidation.rules"
          :items="specialPricingExactTimes"
          :label="null"
        />
      </template>
      <template v-slot:footer>
        <div class="w-full flex mt-4">
          <div class="w-auto pr-2">
            <app-button
              class="w-full"
              :title="$t('general.cancel')"
              :btn-class="'secondary'"
              @clicked="$refs.addSpecialPricingModal.close()"
            />
          </div>
          <div class="flex-1 pl-2">
            <app-button
              ref="saveBtn"
              class="w-full"
              :title="$t('app.inventory.items.form.special_pricing.confirm_special_pricing')"
              :btn-class="'primary'"
              @clicked="saveSpecialPricing()"
            />
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
import Dropdown from '@/components/Dropdown'
import Modal from '@/components/Modal'
import { IndustriesQuery } from '@/services/graphql'
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'

export default {
  name: 'InventorySpecialPricing',

  components: {
    AppInput,
    AppSelect,
    AppButton,
    Modal,
    Dropdown
  },

  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },

    slots: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  apollo: {
    industries: IndustriesQuery
  },

  data: () => ({
    industries: IndustriesQuery.mock,
    specialPricing: [],
    addSpecialPricing: {
      conditionType: null,
      conditionValue: null,
      coefficient: null,
      type: null,
      priceIncrease: null
    },
    shouldValidateSpecialPricingModalFrom: false,
    specialPricingEditingIndex: null
  }),

  computed: {
    specialPricingFormValidation() {
      if (this.shouldValidateSpecialPricingModalFrom) {
        return {
          required: true,
          rules: [v => !!v || this.$t('form.required')]
        }
      }

      return {
        required: false,
        rules: []
      }
    },

    specialPricingItemsWithIndustries() {
      const specialPricing = this.specialPricing

      if (specialPricing) {
        return specialPricing.map(pricing => {
          if (pricing.type === 'industry') {
            pricing.industry = this.specialPricingIndustries.filter(
              industry => industry.value === pricing.meta.conditionValue
            )[0]
          }

          return pricing
        })
      }

      return []
    },

    priceIncreasingSpecialPricingItems() {
      return this.specialPricingItemsWithIndustries.filter(pricing => {
        return pricing.meta.coefficient >= 0
      })
    },

    priceDecreasingSpecialPricingItems() {
      return this.specialPricingItemsWithIndustries.filter(pricing => {
        return pricing.meta.coefficient < 0
      })
    },

    specialPricingTypes() {
      return [
        {
          text: this.$t(
            'app.inventory.items.form.special_pricing.type_sessions'
          ),
          value: 'sessions'
        },
        {
          text: this.$t(
            'app.inventory.items.form.special_pricing.type_exact_time'
          ),
          value: 'exact_time'
        },
        {
          text: this.$t(
            'app.inventory.items.form.special_pricing.type_quantity'
          ),
          value: 'quantity'
        },
        {
          text: this.$t(
            'app.inventory.items.form.special_pricing.type_industry'
          ),
          value: 'industry'
        }
      ]
    },

    specialPricingConditionTypes() {
      return [
        {
          text: this.$t(
            'app.inventory.items.form.special_pricing.condition_type_more'
          ),
          value: 'more'
        },
        {
          text: this.$t(
            'app.inventory.items.form.special_pricing.condition_type_less'
          ),
          value: 'less'
        }
      ]
    },

    specialPricingExactTimes() {
      return this.slots.filter(slot => slot.slot).map(slot => {
        return {
          text: slot.slot,
          value: slot.slot
        }
      })
    },

    specialPricingCoefficient() {
      const coefficients = []

      for (let i = 1; i < 10; i++) {
        coefficients.push({
          text: i * 10 + '%',
          value: i / 10
        })
      }

      return coefficients
    },

    specialPricingIndustries() {
      return this.industries.map(industry => {
        return {
          text: industry.name,
          value: industry.id
        }
      })
    }
  },

  watch: {
    value: {
      handler(newVal) {
        this.specialPricing = newVal
      },
      deep: true
    }
  },

  mounted() {
    this.specialPricing = this.value
  },

  methods: {
    addAnotherSpecialPricing(priceIncrease) {
      this.specialPricingEditingIndex = null
      this.addSpecialPricing.priceIncrease = priceIncrease
      this.$refs.addSpecialPricingModal.open()
    },

    specialPricingFormHasErrors() {
      let hasError = false

      if (this.$refs.addSpecialPricingInputCoefficient) {
        this.$refs.addSpecialPricingInputCoefficient.validate()

        hasError =
          hasError || this.$refs.addSpecialPricingInputCoefficient.hasError
      }

      if (this.$refs.addSpecialPricingInputType) {
        this.$refs.addSpecialPricingInputType.validate()

        hasError = hasError || this.$refs.addSpecialPricingInputType.hasError
      }

      if (this.$refs.addSpecialPricingInputConditionValue) {
        this.$refs.addSpecialPricingInputConditionValue.validate()

        hasError =
          hasError || this.$refs.addSpecialPricingInputConditionValue.hasError
      }

      if (this.$refs.addSpecialPricingInputConditionType) {
        this.$refs.addSpecialPricingInputConditionType.validate()

        hasError =
          hasError || this.$refs.addSpecialPricingInputConditionType.hasError
      }

      return hasError
    },

    saveSpecialPricing() {
      if (this.specialPricingFormHasErrors()) {
        return
      }

      const pricing = {
        meta: {
          conditionType: this.addSpecialPricing.conditionType,
          conditionValue: this.addSpecialPricing.conditionValue,
          coefficient: this.addSpecialPricing.coefficient
        },
        type: this.addSpecialPricing.type
      }

      if (
        this.addSpecialPricing.priceIncrease &&
        this.addSpecialPricing.coefficient < 0
      ) {
        pricing.meta.coefficient = -1 * pricing.meta.coefficient
      }

      if (
        !this.addSpecialPricing.priceIncrease &&
        this.addSpecialPricing.coefficient > 0
      ) {
        pricing.meta.coefficient = -1 * pricing.meta.coefficient
      }

      if (this.specialPricingEditingIndex == null) {
        this.specialPricing.push(pricing)
      } else {
        Vue.set(this.specialPricing, this.specialPricingEditingIndex, pricing)
      }

      this.$refs.addSpecialPricingModal.close()
      this.resetSpecialPricingForm()
      this.$emit('input', this.specialPricing)
    },

    resetSpecialPricingForm() {
      this.specialPricingEditingIndex = null

      this.addSpecialPricing = {
        conditionType: null,
        conditionValue: null,
        coefficient: null,
        type: null,
        priceIncrease: null
      }

      if (this.$refs.addSpecialPricingInputCoefficient) {
        this.$refs.addSpecialPricingInputCoefficient.resetValidation()
      }

      if (this.$refs.addSpecialPricingInputType) {
        this.$refs.addSpecialPricingInputType.resetValidation()
      }

      if (this.$refs.addSpecialPricingInputConditionValue) {
        this.$refs.addSpecialPricingInputConditionValue.resetValidation()
      }
    },

    removeSpecialPricing(priceIncrease, index) {
      if (priceIncrease) {
        this.$refs['dropdownPriceIncreasing' + index][0].hideDropdown()
        index = index + this.priceDecreasingSpecialPricingItems.length
      } else {
        this.$refs['dropdownPriceDecreasing' + index][0].hideDropdown()
      }

      this.$delete(this.specialPricing, index)
      this.$emit('input', this.specialPricing)
    },

    editSpecialPricing(priceIncrease, pricing, index) {
      if (priceIncrease) {
        this.$refs['dropdownPriceIncreasing' + index][0].hideDropdown()
        index = index + this.priceDecreasingSpecialPricingItems.length
      } else {
        this.$refs['dropdownPriceDecreasing' + index][0].hideDropdown()
      }

      this.specialPricingEditingIndex = index

      this.addSpecialPricing = {
        conditionType: pricing.meta.conditionType,
        conditionValue: pricing.meta.conditionValue,
        coefficient:
          pricing.meta.coefficient < 0
            ? -1 * pricing.meta.coefficient
            : pricing.meta.coefficient,
        type: pricing.type,
        priceIncrease: priceIncrease
      }

      this.$refs.addSpecialPricingModal.open()
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

.special-pricing-enter-active,
.special-pricing-leave-active {
  transition: all 1s;
}

.special-pricing-enter,
.special-pricing-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
