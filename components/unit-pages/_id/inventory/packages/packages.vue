<template>
  <div class="w-full flex flex-wrap-reverse py-10 px-8 md:px-10 md:-mx-4">
    <transition name="fade-up" :appear="true">
      <div class="w-full md:w-2/3 md:px-4 pt-8 md:pt-0">
        <h4 class="pb-4 uppercase">
          {{ $t('app.inventory.packages.active.title') }}
        </h4>
        <div class="w-full pt-4 border-b border-grey-l3">
          <h6 class="text-grey pb-6 md:pr-16">
            {{ $t('app.inventory.packages.active.info') }}
          </h6>
        <!--        <h5 class="uppercase">-->
        <!--          {{ $t('app.inventory.packages.active.inspired_by') }}-->
        <!--        </h5>-->
        </div>

        <div v-if="$apollo.queries.unit.loading" class="w-full min-h-screen flex">
          <logo-loader class="h-16 w-16 m-auto" />
        </div>
        <div v-else-if="packages.length === 0 && !$apollo.queries.unit.loading" class="w-full flex pt-32 justify-center">
          <div class="text-center">
            <inventory-icon class="w-24 h-24" :category="{path: 'inventory'}" />
            <div class="mt-2">
              <span class="text-h4 ml-2 font-semibold">{{ $t('errors.no-packages-in-inventory') }}</span>
            </div>
          </div>
        </div>
        <div v-for="item in packages" v-else :key="item.id" class="w-full bg-white shadow pt-2 pb-4 px-6 mt-4">
          <div class="w-full flex">
            <app-label v-if="item.expiredAt !== null" :closeable="false" color="label-yellow" :small="true" class="mb-4">
              <span>{{ $t('general.expired') }}</span>
            </app-label>

            <dropdown class="-mr-4 mt-1 ml-auto">
              <template v-slot:activator>
                <span class="fas fa-ellipsis-v text-red" data-cy="package-menu-activator" />
              </template>
              <ul class="">
                <!--          <li>{{ $t('general.share') }}</li>-->
                <li class="cursor-pointer" data-cy="edit-package" @click="onEditClick(item.id)">
                  {{ $t('general.edit') }}
                </li>
                <li class="cursor-pointer" @click="onDeleteInventoryClick(item)">
                  {{ $t('general.delete') }}
                </li>
              </ul>
            </dropdown>
          </div>
          <data-label :label="$t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.firstCategory(item.category), true))">
            <span class="capitalize text-h4">{{ packageName(item) }}</span>
          </data-label>

          <div class="w-full flex pt-3">
            <inventory-icon class="w-16 h-16" :category="item.category" :is-package="true" />
            <p class="w-4/5 px-4 self-end text-grey">
              {{ item.description }}
            </p>
          </div>

          <div class="w-full flex flex-wrap mt-8 -mx-1 border-t border-grey-l3">
            <div v-for="inventory in item.children" :key="inventory.id" class="w-32 px-1">
              <div class="w-full bg-grey-l5 p-2 mb-2">
                <!-- TODO: Make item-inventory-icon height as a variable/prop - it can be changed -->
                <inventory-item-light-card :secondary-action="false" :editable="false" :item="inventory" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="w-full md:w-1/3 lg:w-1/4 md:pr-4 lg:pr-8 md:fixed md:top-0 md:mt-48 md:right-0">
      <h4 class="pb-4 uppercase">
        {{ $t('app.inventory.packages.predefined') }}
      </h4>

      <div v-for="category in marketplaceCategories" :key="category.id" class="w-full border-b border-grey-l3 px-4 flex py-6">
        <div class="w-full my-auto flex">
          <h5 class="mr-auto my-auto leading-none">
            {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.firstCategory(category), true)) }}
            <br>
            <small class="text-grey text-p3">({{ packagesOfCategory(category).length }} {{ $tc('general.packages', packagesOfCategory(category).length).toLowerCase() }})</small>
          </h5>
          <div>
            <app-button class="ml-auto" data-cy="set-up-package" :title="$t('general.set_up')" @clicked="onSetUpClick(category)" />
          </div>
        </div>
      </div>
    </div>
    <confirmation-modal
      ref="confirmationModal"
      :body-text="$t('app.inventory.packages.delete_modal.text', {package: packageName(itemToRemove)})"
      :header-text="$t('app.inventory.packages.delete_modal.title')"
      :confirm-btn-text="$t('app.inventory.packages.delete_modal.btn')"
      @confirmed="removePackage"
    />
  </div>
</template>

<script>
import {
  InventoryItemDeleteQuery,
  MarketplacePackagesCategoriesQuery,
  UnitPackagesQuery
} from '@/services/graphql'
import AppButton from '@/components/AppButton'
import InventoryItemLightCard from '@/components/inventory/InventoryItemLightCard'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import Dropdown from '@/components/Dropdown'
import DataLabel from '@/components/DataLabel'
import AppLabel from '@/components/AppLabel'
import ConfirmationModal from '@/components/modals/ConfirmationModal'
import LogoLoader from '@/components/LogoLoader'

export default {
  name: 'Packages',

  components: {
    DataLabel,
    InventoryIcon,
    InventoryItemLightCard,
    AppButton,
    AppLabel,
    Dropdown,
    ConfirmationModal,
    LogoLoader
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitPackagesQuery,
      variables() {
        return {
          id: this.unitId
        }
      }
    },
    marketplaceCategories: MarketplacePackagesCategoriesQuery
  },

  data: () => ({
    marketplaceCategories: MarketplacePackagesCategoriesQuery.mock,
    itemToRemove: {}
  }),

  computed: {
    packages() {
      return this.$get(this.unit, 'entity.packages', []).sort(
        (a, b) => b.category.id - a.category.id
      )
    },

    packageName() {
      return packageItem =>
        packageItem.nameOverride ||
        this.$t(
          'app.marketplace.categories.' +
            this.$helpers.normalizeCategoryName(
              this.$helpers.firstCategory(packageItem.category),
              true
            )
        )
    },

    packagesOfCategory() {
      return category =>
        this.packages.filter(item => item.category.id === category.id)
    }
  },

  methods: {
    onSetUpClick(category) {
      this.$store.dispatch('inventory/setUpPackageCategory', category)
      this.$router.push(
        this.localePath({
          name: 'unit-id-packages-create',
          params: { id: this.unitId }
        })
      )
    },

    onEditClick(packageId) {
      this.$router.push(
        this.localePath({
          name: 'unit-id-packages-packageId',
          params: {
            id: this.unitId,
            packageId: packageId
          }
        })
      )
    },

    removePackage() {
      this.$apollo
        .query({
          ...InventoryItemDeleteQuery,
          variables: {
            ids: [this.itemToRemove.id]
          },
          refetchQueries: [
            {
              ...UnitPackagesQuery,
              variables: {
                id: this.unitId
              }
            }
          ]
        })
        .then(response => {
          this.$toast.success(this.$t('app.inventory.delete.messages.success'))
          this.$refs.confirmationModal.$refs.confirmBtn.loaded()
          this.$refs.confirmationModal.close()
          this.$apollo.queries.unit.refetch()
        })
        .catch(response => {
          this.$refs.confirmationModal.$refs.confirmBtn.loaded()
          this.$toast.error(this.$t('app.inventory.delete.messages.error'))
        })
    },

    onDeleteInventoryClick(item) {
      this.itemToRemove = item
      this.$refs.confirmationModal.open()
    }
  }
}
</script>

<style scoped>
</style>
