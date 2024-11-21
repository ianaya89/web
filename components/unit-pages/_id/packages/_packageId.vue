<template>
  <div class="item__create">
    <div class="header-one-action" data-cy="edit-package-header">
      <div class="w-1/3 my-auto">
        <app-button
          class="ml-8"
          :btn-class="'secondary'"
          :title="$t('general.back')"
          data-cy="back-button"
          @clicked="onBackClick"
        />
      </div>
      <div class="w-1/3 text-center flex justify-center">
        <h3 class="my-auto">
          {{ $t('app.inventory.packages.update.title') }}
        </h3>
      </div>
      <div class="w-1/3 my-auto flex justify-end">
        <app-button
          ref="saveButton"
          class="mr-8"
          data-cy="create-button"
          :title="$t('app.inventory.items.create.action')"
          :disabled="itemStoring"
          :loader="itemStoring"
          @clicked="save()"
        />
      </div>
    </div>
    <div class="w-full flex bg-grey-l5" data-cy="edit-package-page">
      <div v-if="$apollo.queries.marketplaceItem.loading" class="w-full min-h-screen flex">
        <logo-loader class="h-16 w-16 m-auto" />
      </div>
      <v-form
        v-else
        ref="createPackage"
        v-model="formValid"
        class="w-full"
      >
        <inventory-package-detail v-model="marketplaceItem" :team-id="unitId" :category="marketplaceItem.category" :inventories="selectedInventories" />
      </v-form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { cloneDeep } from 'lodash'
import AppButton from '@/components/AppButton'
import onBack from '@/services/mixins/onBack'
import {
  InventoryPackageQuery,
  InventoryPackageUpdateMutation,
  MarketplacePackagesCategoriesQuery,
  UnitInventoryQuery,
  UnitPackagesQuery
} from '@/services/graphql'
import InventoryPackageDetail from '@/components/inventory/InventoryPackageDetail'
import LogoLoader from '@/components/LogoLoader'

export default {
  name: 'UpdatePackage',

  components: {
    InventoryPackageDetail,
    AppButton,
    LogoLoader
  },

  mixins: [onBack],

  props: {
    unitId: {
      type: String,
      required: true
    },
    packageId: {
      type: String,
      required: true
    }
  },

  apollo: {
    marketplaceItem: {
      ...InventoryPackageQuery,
      fetchPolicy: 'network-only',
      variables() {
        return {
          itemId: this.packageId
        }
      },
      update(data) {
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
      result({ data }) {
        this.selectedInventories = data.marketplaceItem.children
      },
      error() {
        this.$router.push(
          this.localePath({
            name: 'unit-id-inventory-packages',
            params: { id: this.unitId }
          })
        )
      }
    },
    unit: {
      ...UnitInventoryQuery,
      variables() {
        return {
          id: this.unitId
        }
      }
    }
  },

  data: () => ({
    formValid: false,
    itemStoring: false,
    selectedInventories: [],
    marketplaceItem: {
      nameOverride: null,
      description: null,
      price: null,
      slotType: 'date',
      visibleFrom: null,
      slots: [{ slot: null, quantity: null }],
      specialPricing: [],
      children: [],
      organizationUnit: {},
      excludedIndustries: []
    },
    marketplaceCategories: MarketplacePackagesCategoriesQuery.mock
  }),

  methods: {
    async save() {
      if (!this.$refs.createPackage.validate()) {
        return
      }

      function prepareForSave() {
        const marketplaceItemForUpload = cloneDeep(this.marketplaceItem)
        delete marketplaceItemForUpload.id
        delete marketplaceItemForUpload.category
        delete marketplaceItemForUpload.__typename
        delete marketplaceItemForUpload.organizationUnit
        marketplaceItemForUpload.slots.map(slot => {
          delete slot.__typename
          delete slot.id
        })
        marketplaceItemForUpload.children = {
          sync: this.marketplaceItem.children.map(item => item.id)
        }
        marketplaceItemForUpload.excludedIndustries = {
          sync: this.marketplaceItem.excludedIndustries
        }
        marketplaceItemForUpload.images = []
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
        this.itemStoring = true
        const marketplaceItemForUpload = prepareForSave.call(this)
        await this.$apollo
          .mutate({
            ...InventoryPackageUpdateMutation,
            variables: {
              id: this.packageId,
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
                ...UnitPackagesQuery,
                variables: {
                  id: this.unitId
                }
              },
              {
                ...InventoryPackageQuery,
                variables: {
                  itemId: this.packageId
                }
              }
            ]
          })
          .then(({ data }) => {
            this.$toast.success(
              this.$t('app.inventory.packages.update.messages.success')
            )
            this.$router.push(
              this.localePath({
                name: 'unit-id-inventory-packages',
                params: { id: this.unitId }
              })
            )
          })
      } catch (err) {
        this.itemStoring = false
        if (this.$refs.saveButton) {
          this.$refs.saveButton.loaded()
        }
        this.$toast.error(
          this.$t('app.inventory.packages.update.messages.error')
        )
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
