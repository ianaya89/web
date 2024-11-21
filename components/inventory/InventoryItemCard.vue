<template>
  <div class="w-full flex flex-col h-full z-10">
    <div class="flex-1">
      <!-- Menu -->
      <div class="w-full flex pb-2">
        <app-label v-if="item.expiredAt !== null && showExpireLabel" :closeable="false" color="label-yellow" :small="true">
          <span>{{ $t('general.expired') }}</span>
        </app-label>

        <dropdown v-if="editable" class="-mr-1 ml-auto">
          <template v-slot:activator>
            <span class="fas fa-ellipsis-v text-red" data-cy="item-menu-activator" />
          </template>
          <ul class="">
            <!--          <li>{{ $t('general.share') }}</li>-->
            <li class="cursor-pointer" @click="onEditItemClick()">
              {{ $t('general.edit') }}
            </li>
            <li class="cursor-pointer" data-cy="item-duplicate" @click="onDuplicateItemClick()">
              {{ $t('general.duplicate') }}
            </li>
            <li class="cursor-pointer" @click="onDeleteInventoryClick()">
              {{ $t('general.delete') }}
            </li>
          </ul>
        </dropdown>
      </div>
      <!-- Icon -->
      <div class="w-full flex justify-center">
        <inventory-icon class="w-1/2" :category="item.category" :class="iconSize" />
      </div>
      <!-- Texts -->
      <h5 class="mt-2 pt-2 leading-tight border-t border-grey-l2">
        {{ itemName }}
      </h5>
      <p class="text-grey text-p3 py-2 -mt-2 leading-tight">
        {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName(categories.secondary)) }}
      </p>
    </div>
    <!-- Button -->
    <div class="flex items-end">
      <app-button
        v-if="editable"
        class="w-full mt-auto"
        :title="$t('general.edit')"
        data-cy="edit"
        :btn-class="'primary-inverted-outlined'"
        @clicked="onEditItemClick()"
      />
    </div>
    <confirmation-modal
      ref="confirmationModal"
      :body-text="$t('app.inventory.items.delete_modal.text', {item: itemName})"
      :header-text="$t('app.inventory.items.delete_modal.title')"
      :confirm-btn-text="$t('app.inventory.items.delete_modal.btn')"
      @confirmed="removeInventory"
    />
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import AppButton from '@/components/AppButton'
import AppLabel from '@/components/AppLabel'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import ConfirmationModal from '@/components/modals/ConfirmationModal'
import {
  InventoryItemDeleteQuery,
  InventoryItemDuplicateQuery
} from '@/services/graphql'

export default {
  name: 'InventoryItemCard',

  components: {
    ConfirmationModal,
    InventoryIcon,
    AppButton,
    AppLabel,
    Dropdown
  },

  props: {
    item: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      default: true
    },
    iconSize: {
      type: String,
      default: 'h-16'
    },
    showExpireLabel: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    categories() {
      const categories = this.item.category.path.split(' / ')

      return {
        main: categories[0],
        secondary: categories[1],
        tertiary: categories[2]
      }
    },

    itemName() {
      return (
        this.item.nameOverride ||
        this.$t(
          'app.marketplace.categories.' +
            this.$helpers.normalizeCategoryName(this.categories.tertiary)
        )
      )
    }
  },

  methods: {
    onEditItemClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-items-itemId',
          params: {
            id: this.$route.params.id,
            itemId: this.item.id
          }
        })
      )
    },

    onDuplicateItemClick() {
      this.$apollo
        .query({
          ...InventoryItemDuplicateQuery,
          variables: {
            ids: [this.item.id]
          }
        })
        .then(response => {
          this.$emit('item-changed')
          this.$toast.success(
            this.$t('app.inventory.duplicate.messages.success')
          )
        })
        .catch(response => {
          this.$toast.error(this.$t('app.inventory.duplicate.messages.error'))
        })
    },

    removeInventory() {
      this.$apollo
        .query({
          ...InventoryItemDeleteQuery,
          variables: {
            ids: [this.item.id]
          }
        })
        .then(response => {
          this.$emit('item-changed')
          this.$toast.success(this.$t('app.inventory.delete.messages.success'))
          this.$refs.confirmationModal.$refs.confirmBtn.loaded()
          this.$refs.confirmationModal.close()
        })
        .catch(response => {
          this.$refs.confirmationModal.$refs.confirmBtn.loaded()
          this.$toast.error(this.$t('app.inventory.delete.messages.error'))
        })
    },

    onDeleteInventoryClick() {
      this.$refs.confirmationModal.open()
    }
  }
}
</script>

<style lang="postcss" scoped>
ul {
  li {
    @apply .my-1;
  }
}
</style>
