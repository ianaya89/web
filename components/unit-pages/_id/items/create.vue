<template>
  <div class="item__create">
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
      <div class="w-1/3 text-center hidden md:flex justify-center">
        <h3 class="my-auto">
          {{ $t('app.inventory.items.create.title') }}
        </h3>
      </div>
      <div class="w-1/3 my-auto flex justify-end">
        <app-button
          ref="saveButton"
          class="mr-8"
          :title="$t('app.inventory.items.create.action')"
          :disabled="itemStoring"
          :loader="itemStoring"
          data-cy="create-button"
          @clicked="save()"
        />
      </div>
    </div>
    <div class="w-full md:flex pt-12 px-8 md:px-32 bg-grey-l5 pb-32">
      <h3 class="md:hidden mt-16">
        {{ $t('app.inventory.items.create.title') }}
      </h3>

      <v-form
        ref="createInventory"
        v-model="formValid"
        class="w-full"
      >
        <inventory-item-detail v-model="marketplaceItem" :category="selectedCategory" @images-input="addedImages($event)" />
      </v-form>
    </div>
    <modal ref="categoryModal" :full-page="true" :class="'create-item-modal'" :cy-identifier="'category-modal'">
      <template v-slot:header>
        <span>{{ $t('app.inventory.items.init_modal.title') }}</span>
        <button type="button" class="text-h4 absolute mt-12 mr-12 right-0 top-0 focus:outline-none" data-cy="close-modal" @click="$router.back()">
          <span class="lni-close" />
        </button>
      </template>
      <template v-slot:body>
        <div v-for="(topCategory, index) in Object.keys(groupedCategoriesByTopCategory)" :key="index" class="w-4/5 mx-auto pb-16">
          <h2 class="uppercase font-medium font-sans">
            {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName(topCategory)) }}
          </h2>
          <div class="w-full flex flex-wrap">
            <div v-for="category in groupedCategoriesByTopCategory[topCategory]" :key="category.id" class="p-3 bg-white m-1 flex flex-wrap shadow-hover inventory-item--card">
              <div class="w-full flex flex-wrap h-full">
                <!-- Content -->
                <div>
                  <inventory-icon class="w-full h-16 mt-3" :category="category" />
                  <h5 class="font-sans mt-4 leading-tight">
                    {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.tertiaryCategory(category))) }}
                  </h5>
                  <p class="text-grey leading-tight">
                    {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.secondaryCategory(category))) }}
                  </p>
                </div>
                <div class="w-full self-end mt-4">
                  <app-label v-if="alreadyUploadedInventory(category).length > 0" :color="'green'" class="w-full -ml-px">
                    <span class="font-sans">
                      {{ alreadyUploadedInventory(category).length }} {{ $tc('general.items',alreadyUploadedInventory(category).length) }}
                    </span>
                  </app-label>
                  <app-button class="w-full" data-cy="add-category-btn" :title="$t('general.add')" :btn-class="'primary-inverted-outlined'" @clicked="onAddCategoryClick(category)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { groupBy } from 'lodash'
import AppButton from '@/components/AppButton'
import onBack from '@/services/mixins/onBack'
import InventoryItemDetail from '@/components/inventory/InventoryItemDetail'
import Modal from '@/components/Modal'
import {
  InventoryItemMutation,
  MarketplaceCategoriesQuery,
  UnitInventoryQuery
} from '@/services/graphql'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import AppLabel from '@/components/AppLabel'

export default {
  name: 'CreateItem',

  components: {
    AppLabel,
    Modal,
    AppButton,
    InventoryItemDetail,
    InventoryIcon
  },

  mixins: [onBack],

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    marketplaceCategories: MarketplaceCategoriesQuery,
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
    selectedCategory: null,
    uploadedImages: [],
    marketplaceItem: {
      description: null,
      price: null,
      dimensions: null,
      isBroadcasted: null,
      slotType: 'date',
      visibleFrom: null,
      isSoldSeparately: false,
      slots: [{ slot: null, quantity: null }],
      specialPricing: [],
      organizationUnit: null,
      excludedIndustries: []
    },
    marketplaceCategories: MarketplaceCategoriesQuery.mock
  }),

  computed: {
    inventories() {
      return this.$get(this.unit, 'entity.inventories', [])
    },

    alreadyUploadedInventory() {
      return category =>
        this.inventories.filter(item => item.category.id === category.id)
    },

    groupedCategoriesByTopCategory() {
      return groupBy(
        this.marketplaceCategories.filter(item => item.layer === '3'),
        item => {
          return item.path.split(' / ')[0]
        }
      )
    }
  },

  mounted() {
    this.$refs.categoryModal.open()
  },

  methods: {
    onAddCategoryClick(category) {
      this.selectedCategory = category
      this.$refs.categoryModal.close()
    },

    addedImages(images) {
      this.uploadedImages = images
    },

    async save() {
      if (!this.$refs.createInventory.validate()) {
        return
      }
      function prepareForSave() {
        const marketplaceItemForUpload = Object.assign({}, this.marketplaceItem)
        marketplaceItemForUpload.organizationUnit = {
          sync: this.unitId
        }
        marketplaceItemForUpload.category = {
          sync: this.selectedCategory.id
        }
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
        this.itemStoring = true
        const marketplaceItemForUpload = prepareForSave.call(this)
        await this.$apollo
          .mutate({
            ...InventoryItemMutation,
            variables: {
              input: marketplaceItemForUpload
            },
            refetchQueries: [
              {
                ...UnitInventoryQuery,
                variables: {
                  id: this.unitId
                }
              }
            ]
          })
          .then(({ data }) => {
            this.$toast.success(
              this.$t('app.inventory.create.messages.success')
            )
            this.$router.push(
              this.localePath({
                name: 'unit-id-inventory',
                params: { id: this.unitId }
              })
            )
          })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        this.itemStoring = false
        this.$refs.saveButton.loaded()
        this.$toast.error(this.$t('app.inventory.create.messages.error'))
      }
    }
  }
}
</script>

<style lang="postcss">
.inventory-item--card {
  min-height: 15rem;
}

@screen md {
  .inventory-item--card {
    max-width: 11rem;
  }
}

&.create-item-modal {
  .modal {
    @apply .bg-grey-l5;
  }
}
</style>
