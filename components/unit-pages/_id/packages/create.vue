<template>
  <div class="item__create">
    <div class="header-one-action" data-cy="create-package-header">
      <div class="w-1/3 my-auto">
        <app-button
          class="ml-8"
          data-cy="back-button"
          :btn-class="'secondary'"
          :title="$t('general.back')"
          @clicked="onBackClick"
        />
      </div>
      <div class="w-1/3 text-center hidden md:flex justify-center">
        <h3 class="my-auto">
          {{ $t('app.inventory.packages.create.title') }}
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
    <div class="w-full md:flex bg-grey-l5 pt-12 md:pt-0" data-cy="create-package-page">
      <h3 class="md:hidden mt-16 px-8 md:px-0">
        {{ $t('app.inventory.packages.create.title') }}
      </h3>

      <v-form
        ref="createPackage"
        v-model="formValid"
        class="w-full"
      >
        <inventory-package-detail v-model="marketplaceItem" :team-id="unitId" :category="selectedCategory" />
      </v-form>
    </div>
    <modal ref="categoryModal" :full-page="true" :class="'create-package-modal'">
      <template v-slot:header>
        <span>{{ $t('app.inventory.packages.init_modal.title') }}</span>
        <button type="button" class="text-h4 absolute mt-12 mr-12 right-0 top-0 focus:outline-none" @click="$router.back()">
          <span class="lni-close" />
        </button>
      </template>
      <template v-slot:body>
        <div class="w-full px-32 py-8">
          <div class="w-full flex flex-wrap">
            <div v-for="category in marketplaceCategories" :key="category.id" class="p-3 bg-white m-1 flex flex-wrap shadow-hover inventory-item--card">
              <div class="w-full flex flex-wrap h-full">
                <!-- Content -->
                <div>
                  <inventory-icon class="w-full h-20" :category="category" :is-package="true" />
                  <h5 class="font-sans mt-4 leading-tight">
                    {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.firstCategory(category),true)) }}
                  </h5>
                </div>
                <div class="w-full self-end mt-2">
                  <app-label v-if="alreadyUploadedPackage(category).length > 0" :color="'green'" class="w-full -ml-px">
                    <span class="font-sans">
                      {{ alreadyUploadedPackage(category).length }} {{ $tc('general.items',alreadyUploadedPackage(category).length) }}
                    </span>
                  </app-label>
                  <app-button class="w-full" :title="$t('general.add')" :btn-class="'primary-inverted-outlined'" @clicked="onAddCategoryClick(category)" />
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
import AppButton from '@/components/AppButton'
import onBack from '@/services/mixins/onBack'
import {
  InventoryPackageMutation,
  MarketplacePackagesCategoriesQuery,
  UnitInventoryQuery,
  UnitPackagesQuery
} from '@/services/graphql'
import InventoryPackageDetail from '@/components/inventory/InventoryPackageDetail'
import AppLabel from '@/components/AppLabel'
import Modal from '@/components/Modal'
import InventoryIcon from '@/components/inventory/InventoryIcon'

export default {
  name: 'CreatePackage',

  components: {
    InventoryPackageDetail,
    AppButton,
    InventoryIcon,
    Modal,
    AppLabel
  },

  mixins: [onBack],

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    marketplaceCategories: MarketplacePackagesCategoriesQuery,
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
    marketplaceItem: {
      description: null,
      price: null,
      slotType: 'date',
      visibleFrom: null,
      slots: [{ slot: null, quantity: null }],
      specialPricing: [],
      children: [],
      excludedIndustries: []
    },
    marketplaceCategories: MarketplacePackagesCategoriesQuery.mock
  }),

  computed: {
    packages() {
      return this.$get(this.unit, 'entity.packages', [])
    },

    alreadyUploadedPackage() {
      return category =>
        this.packages.filter(item => item.category.id === category.id)
    }
  },

  mounted() {
    // eslint-disable-next-line standard/computed-property-even-spacing
    this.selectedCategory = this.$store.getters[
      'inventory/setUpPackageCategory'
    ]

    if (this.selectedCategory === null) {
      this.$refs.categoryModal.open()
    }
  },

  methods: {
    onAddCategoryClick(category) {
      this.selectedCategory = category
      this.$refs.categoryModal.close()
    },

    async save() {
      if (!this.$refs.createPackage.validate()) {
        return
      }

      if (this.marketplaceItem.children.length === 0) {
        this.$toast.error(
          this.$t('app.inventory.packages.create.messages.no_inventories')
        )
        return
      }

      function prepareForSave() {
        const marketplaceItemForUpload = Object.assign({}, this.marketplaceItem)
        marketplaceItemForUpload.organizationUnit = {
          sync: this.unitId
        }
        marketplaceItemForUpload.category = {
          sync: this.marketplaceItem.category.id
        }
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
            ...InventoryPackageMutation,
            variables: {
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
              }
            ]
          })
          .then(({ data }) => {
            this.$toast.success(
              this.$t('app.inventory.packages.create.messages.success')
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
        this.$refs.saveButton.loaded()
        this.$toast.error(
          this.$t('app.inventory.packages.create.messages.error')
        )
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.inventory-item--card {
  max-width: 12rem;
  min-height: 15rem;
}

&.create-package-modal {
  .modal {
    @apply .bg-grey-l5;
  }
}
</style>
