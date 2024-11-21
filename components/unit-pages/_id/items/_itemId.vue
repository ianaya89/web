<template>
  <div class="item__edit">
    <div class="header-one-action" data-cy="inventory-item-header">
      <div class="w-1/3 my-auto">
        <app-button
          class="ml-8"
          :btn-class="'secondary'"
          data-cy="back-button"
          :title="$t('general.back')"
          @clicked="onBackClick"
        />
      </div>
      <div class="w-1/3 text-center flex justify-center">
        <h3 class="my-auto">
          {{ $t('app.inventory.items.edit.title') }}
        </h3>
      </div>
      <div class="w-1/3 my-auto flex justify-end">
        <app-button
          ref="saveButton"
          class="mr-8"
          :title="$t('app.inventory.items.edit.action')"
          :disabled="itemUpdating"
          :loader="itemUpdating"
          data-cy="create-button"
          @clicked="save()"
        />
      </div>
    </div>
    <div class="w-full flex bg-grey-l5 pt-12 px-32 pb-32">
      <div v-if="$apollo.queries.marketplaceItem.loading" class="w-full min-h-screen flex">
        <logo-loader class="h-16 w-16 m-auto" />
      </div>
      <v-form
        v-else
        ref="updateInventory"
        v-model="formValid"
        class="w-full"
      >
        <inventory-item-detail v-model="marketplaceItem" :category="marketplaceItem.category" @images-input="addedImages($event)" />
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import AppButton from '@/components/AppButton'
import onBack from '@/services/mixins/onBack'
import InventoryItemDetail from '@/components/inventory/InventoryItemDetail'
import {
  InventoryItemQuery,
  InventoryItemUpdateMutation,
  UnitInventoryQuery
} from '@/services/graphql'
import LogoLoader from '@/components/LogoLoader'

export default {
  name: 'EditItem',

  components: {
    LogoLoader,
    InventoryItemDetail,
    AppButton
  },

  mixins: [onBack],

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
      fetchPolicy: 'network-only',
      variables() {
        return {
          itemId: this.itemId,
          season: {
            get: 'SPECIFIC',
            value: this.activeSeason.name
          }
        }
      },
      result({ data }) {
        data.marketplaceItem.visibleFrom = moment(
          data.marketplaceItem.visibleFrom
        ).format('YYYY-MM-DD')
        if (data.marketplaceItem.excludedIndustries != null) {
          data.marketplaceItem.excludedIndustries = data.marketplaceItem.excludedIndustries.map(
            item => {
              if (typeof item === 'object') {
                return item.id
              } else {
                return item
              }
            }
          )
        }
        return data.marketplaceItem
      },
      error() {
        this.$router.push(
          this.localePath({
            name: 'unit-id-inventory',
            params: { id: this.unitId }
          })
        )
      }
    }
  },

  data: () => ({
    formValid: false,
    uploadedImages: [],
    marketplaceItem: {
      description: null,
      price: null,
      dimensions: null,
      slotType: 'date',
      visibleFrom: null,
      isSoldSeparately: false,
      slots: [{ slot: null, quantity: null }],
      excludedIndustries: [],
      specialPricing: []
    },
    itemUpdating: false
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason'
    })
  },

  methods: {
    addedImages(images) {
      this.uploadedImages = images
    },

    async save() {
      if (!this.$refs.updateInventory.validate()) {
        return
      }

      function prepareForSave() {
        const marketplaceItemForUpload = cloneDeep(this.marketplaceItem)
        delete marketplaceItemForUpload.id
        delete marketplaceItemForUpload.category
        delete marketplaceItemForUpload.itemType
        delete marketplaceItemForUpload.expiredAt
        delete marketplaceItemForUpload.children
        delete marketplaceItemForUpload.unit
        delete marketplaceItemForUpload.__typename
        delete marketplaceItemForUpload.organizationUnit
        marketplaceItemForUpload.slots.map(slot => {
          delete slot.__typename
          delete slot.id
          delete slot.expiredAt
        })
        marketplaceItemForUpload.excludedIndustries = {
          sync: this.marketplaceItem.excludedIndustries
        }
        marketplaceItemForUpload.images = []
        this.uploadedImages.map(image =>
          marketplaceItemForUpload.images.push({
            url: image
          })
        )
        const specialPricing = marketplaceItemForUpload.specialPricing

        if (!specialPricing) {
          marketplaceItemForUpload.specialPricing = []
        } else {
          marketplaceItemForUpload.specialPricing = specialPricing.map(
            pricing => {
              delete pricing.__typename
              delete pricing.meta.__typename
              delete pricing.industry

              return pricing
            }
          )
        }
        return marketplaceItemForUpload
      }

      try {
        this.itemUpdating = true
        const marketplaceItemForUpload = prepareForSave.call(this)
        await this.$apollo
          .mutate({
            ...InventoryItemUpdateMutation,
            variables: {
              id: this.itemId,
              input: marketplaceItemForUpload
            },
            refetchQueries: [
              {
                ...UnitInventoryQuery,
                variables: {
                  id: this.unitId
                }
              },
              {
                ...InventoryItemQuery,
                variables: {
                  itemId: this.itemId,
                  season: {
                    get: 'SPECIFIC',
                    value: this.activeSeason.name
                  }
                }
              }
            ]
          })
          .then(({ data }) => {
            this.$toast.success(
              this.$t('app.inventory.update.messages.success')
            )
            this.$router.push(
              this.localePath({
                name: 'unit-id-inventory',
                params: { id: this.unitId }
              })
            )
          })
      } catch (err) {
        this.itemUpdating = false
        if (this.$refs.saveButton) {
          this.$refs.saveButton.loaded()
        }
        this.$toast.error(this.$t('app.inventory.update.messages.error'))
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
