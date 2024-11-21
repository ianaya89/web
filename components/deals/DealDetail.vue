<template>
  <div class="deal-detail">
    <transition name="fade-down" :appear="true">
      <div class="relative">
        <div v-if="updating" class="updating-loader">
          <div class="mt-96 w-full flex justify-center">
            <logo-loader class="text-center w-16 fixed" />
          </div>
        </div>
        <div v-if="dealData && dealData.id!=null" class="w-full p-4 sm:p-6">
          <div class="w-full flex">
            <div
              class="mr-auto my-auto text- lg:text-p3 text-grey"
            >
              {{ $t('app.deals.deal_requested') }}: {{ dealData.createdAt | date }}
            </div>
            <div class="ml-auto my-auto">
              <app-label
                :class="getLabelStatusColor"
                class="cursor-default"
              >
                {{ $t('app.deals.status.'+ dealData.status) }}
              </app-label>
            </div>
          </div>
          <div class="w-full flex flex-wrap py-4 border-b border-grey-l3">
            <div class="w-full sm:w-1/2 flex items-center sm:pr-4">
              <div class="sm:w-1/4 lg:w-auto">
                <slot name="unit-logo">
                  <avatar :src="$get(dealData, 'brand.logo.url')" :tooltip-position="'left'" />
                </slot>
              </div>
              <div class="w-3/4 pl-2">
                <slot name="unit-info">
                  <data-label :label="$t('app.deals.deal_with_brand')">
                    <span class="text-h6">
                      <span class="capitalize">{{ $get(dealData, 'brand.name', '-') }}</span>
                    </span>
                  </data-label>
                </slot>
              </div>
            </div>
            <div class="w-full sm:w-1/2 flex items-center pr-2">
              <div class="sm:w-1/4 lg:w-auto">
                <slot name="unit-representative-logo">
                  <avatar
                    :src="$get(dealData, 'brandRepresentative.profile.photo.url')"
                    :tooltip-position="'left'"
                  />
                </slot>
              </div>
              <div class="w-3/4 pl-2">
                <slot name="unit-representative-info">
                  <data-label :label="$t('app.deals.brand_representative')">
                    <span class="text-h6 capitalize">
                      {{ $get(dealData, 'brandRepresentative.profile.firstName', '-') }}
                      {{ $get(dealData, 'brandRepresentative.profile.lastName') }}
                    </span>
                  </data-label>
                </slot>
              </div>
            </div>
          </div>
          <div class="w-full pt-6 sm:pt-12 flex text-grey-l1">
            <transition name="fade" mode="out-in">
              <div :key="currentHistoryIndex">
                <h1
                  v-if="currentHistoryIndex===0"
                  class="text-h3 mr-auto"
                >
                  {{ $t('app.deals.current_offer') }}
                </h1>
                <h1
                  v-else
                  class="mr-auto text-red"
                >
                  {{ $t('app.deals.past_offer') }} - {{ dealData.history[currentHistoryIndex].createdAt | date }}
                </h1>
              </div>
            </transition>

            <!-- <mover
            class="ml-auto my-auto text-p2"
            :left-icon="'fa fa-arrow-left'"
            :right-icon="'fa fa-arrow-right'"
            :data="dealData.history"
            @change="currentHistoryIndex = $event"
            />-->
          </div>

          <div class="w-full mt-2">
            <div class="w-full">
              <deal-panel
                v-for="dealItem in items"
                :key="dealItem.id"
                :deal="deal"
                :updated-fields="getUpdatedFields(dealItem)"
                :editable="currentHistoryIndex === 0 && isEditable"
                :deal-item="dealItem"
                class="mb-8"
                @updated="onDealUpdate"
                @updating="onDealUpdating"
              />
            </div>
          </div>

          <transition name="fade-with-delay">
            <div v-if="currentHistoryIndex === 0 && isEditable" class="w-1/3 mx-auto">
              <app-button class="w-full" :disabled="updating" :title="$t('app.deals.add_item')" :btn-class="'link'" @clicked="$refs.addItemModal.open()" />
            </div>
          </transition>

          <div class="w-full mb-12 mt-10 bg-white">
            <div class="w-full flex px-4 sm:px-8 py-2">
              <div
                class="mr-auto my-auto text-grey-l1 uppercase font-medium"
              >
                {{ $t('app.deals.total') }}
              </div>
              <transition name="fade" mode="out-in">
                <div :key="currentHistoryIndex" class="ml-auto my-auto text-black text-h3 font-medium">
                  <span v-if="dealData.priceTo==null || dealData.priceTo==0">{{ $get(dealData,'price',0) | currency }}</span>
                  <span v-else>{{ $get(dealData,'price',0) | currency }} - {{ $get(dealData,'priceTo',0) | currency }}</span>
                </div>
              </transition>
            </div>

            <transition name="fadexxx" mode="out-in">
              <div :key="currentHistoryIndex === 0">
                <div v-if="isEditable && currentHistoryIndex === 0" class="w-full flex sm:px-8 py-4 border-t border-grey-l4 justify-center sm:justify-end">
                  <app-button class="sm:ml-auto" :disabled="updating" :title="$t('app.deals.decline_deal')" :btn-class="'primary-inverted'" @clicked="declineDeal" />
                  <app-button class="ml-4" :disabled="updating" :title="$t('app.deals.accept_deal')" @clicked="acceptDeal" />
                </div>
                <div
                  v-if="currentHistoryIndex !== 0"
                  class="w-full flex px-8 py-8 border-t border-grey-l2"
                >
                  <app-button
                    class="ml-auto"
                    :title="$t('app.deals.show_current_offer')"
                    @clicked="showLastOffer"
                  />
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
    <modal v-if="isEditable" ref="addItemModal" :full-page="true">
      <template v-slot:header>
        <div class="w-full px-32 relative">
          <div class="absolute top-0 right-0 text-h5">
            <app-button
              class
              title
              btn-class="link"
              icon="lni-close"
              @clicked="$refs.addItemModal.close()"
            />
          </div>
          <span
            class="w-full text-center py-8 border-b border-grey-l3"
          >{{ $t('app.deals.add_item_modal.title') }}</span>
        </div>
      </template>
      <template v-slot:body>
        <div class="w-full px-32 font-sans">
          <unit-inventory
            :add-btn-text="$t('app.deals.add_to_deal')"
            :unit-id="$get(deal, 'rightholderUnit.id')"
            :skipped-items="$get(deal, 'items',[]).map(item => item.marketplaceItem.id)"
            :compare-btn="false"
            :get-only-event="true"
            @added-item="addedItem($event)"
          >
            <template v-slot:empty-category="props">
              <p
                class="mt-2 text-grey py-2 px-4 leading-tight"
              >
                {{ $t('app.marketplace.create_item_first_4_category') }}
              </p>
            </template>
            <template v-slot:empty-package>
              <p
                class="mt-2 text-grey py-2 px-4 leading-tight"
              >
                {{ $t('app.marketplace.create_item_first_4_category') }}
              </p>
            </template>
          </unit-inventory>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import AppButton from '@/components/AppButton'
import DealPanel from '@/components/deals/DealPanel'
import DataLabel from '@/components/DataLabel'
import LogoLoader from '@/components/LogoLoader'
import AppLabel from '@/components/AppLabel'
import {
  AddDealItemMutation,
  DealQuery,
  UpdateDealStatusMutation
} from '@/services/graphql'
import isDev from '@/services/mixins/isDev'
import Modal from '@/components/Modal'
import UnitInventory from '@/components/widgets/UnitInventory'
import deal from '@/services/mixins/deal'
import dealItem from '@/services/mixins/dealItem'
// import {
//   findObjectByAttributeValue,
//   findDifferentValuesReturnKeys
// } from '@/services/helpers'
// import Mover from '@/components/Mover'

export default {
  name: 'DealDetail',

  components: {
    Modal,
    // Mover,
    Avatar,
    AppLabel,
    AppButton,
    DealPanel,
    DataLabel,
    LogoLoader,
    UnitInventory
  },

  mixins: [isDev, deal, dealItem],

  props: {
    deal: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    dealData: null,
    updating: false,
    currentHistoryIndex: 0
  }),

  computed: {
    items() {
      return this.$get(this.dealData, `items`, [])
    },

    isEditable() {
      if (!this.isDealEditable(this.deal)) {
        return false
      } else {
        return this.editable
      }
    },

    getLabelStatusColor() {
      return 'label-' + this.getDealStatusColor(this.deal)
    }
  },

  watch: {
    deal(newVal) {
      this.dealData = newVal
    }
  },

  mounted() {
    this.dealData = this.deal
  },

  methods: {
    onDealUpdate() {
      this.updating = false
    },

    onDealUpdating() {
      this.updating = true
    },

    async addedItem(addedItemData) {
      this.updating = true
      this.$refs.addItemModal.close()
      try {
        await this.$apollo.mutate({
          ...AddDealItemMutation,
          variables: {
            dealId: this.dealData.id,
            input: {
              id: addedItemData.marketplaceItem.id,
              slots: addedItemData.slots
            }
          },
          refetchQueries: [
            {
              ...DealQuery,
              variables: {
                dealId: this.dealData.id
              }
            }
          ]
        })
        this.updating = false
        this.$toast.success(
          this.$t('app.deals.messages.add_item_modal.success')
        )
      } catch (err) {
        this.updating = false
        this.$refs.addItemModal.close()
        if (this.isDevEnv) {
          this.$toast.error(
            err.message || this.$t('app.deals.messages.add_item_modal.error')
          )
        } else {
          this.$toast.error(this.$t('app.deals.messages.add_item_modal.error'))
        }
      }
    },

    getUpdatedFields(dealItem) {
      return []
      // if (this.currentHistoryIndex !== this.dealData.history.length - 1) {
      //   const previousItem = findObjectByAttributeValue(
      //     this.dealData.history[this.currentHistoryIndex + 1].items,
      //     'id',
      //     dealItem.id
      //   )
      //   return findDifferentValuesReturnKeys(dealItem, previousItem)
      // } else {
      //   return []
      // }
    },

    async acceptDeal() {
      this.updating = true
      try {
        await this.$apollo.mutate({
          ...UpdateDealStatusMutation,
          variables: {
            id: this.dealData.id,
            input: {
              status: 'accepted'
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

        this.updating = false
        this.$toast.success(this.$t('app.deals.messages.accept.success'))
      } catch (err) {
        this.updating = false
        if (this.isDevEnv) {
          this.$toast.error(
            err.message || this.$t('app.deals.messages.accept.error')
          )
        } else {
          this.$toast.error(this.$t('app.deals.messages.accept.error'))
        }
      }
    },

    async declineDeal() {
      this.updating = true
      try {
        await this.$apollo.mutate({
          ...UpdateDealStatusMutation,
          variables: {
            id: this.dealData.id,
            input: {
              status: 'declined'
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

        this.updating = false
        this.$toast.success(this.$t('app.deals.messages.decline.success'))
      } catch (err) {
        this.updating = false
        if (this.isDevEnv) {
          this.$toast.error(
            err.message || this.$t('app.deals.messages.decline.error')
          )
        } else {
          this.$toast.error(this.$t('app.deals.messages.decline.error'))
        }
      }
    },

    showLastOffer() {
      this.currentHistoryIndex = 0
    }
  }
}
</script>

<style lang="postcss" scoped>
.deal-detail {
  @apply .overflow-y-scroll .overflow-x-hidden .bg-grey-l4;

  .updating-loader {
    @apply .absolute .top-0 .left-0 .bottom-0 .right-0 .z-50 .text-center;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .fade-with-delay-enter-active {
    transition: all 300ms ease 300ms;
  }

  .fade-with-delay-leave-active {
    transition: all 150ms cubic-bezier(1, 0.5, 0.8, 1);
  }

  .fade-with-delay-enter,
  .fade-with-delay-leave-to {
    opacity: 0;
  }
}
</style>
