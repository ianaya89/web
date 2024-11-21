<template>
  <search :search-items="items" :search-attribute="searchAttribute">
    <accordion v-if="!packages" ref="accordion" class="border-t border-grey-l3">
      <accordion-item
        v-for="inventoryCategory in categories"
        :key="inventoryCategory.id"
        class="pt-4"
        :left-border="false"
        :right-border="false"
        :header-classes="'px-3 pb-4'"
        :body-classes="'bg-grey-l5'"
      >
        <template v-slot:header>
          <div class="flex items-center">
            <inventory-icon class="w-8 h-8" :category="inventoryCategory" />
            <span class="font-sans text-menu font-medium uppercase leading-tight pl-4 pt-1">
              {{ $t('app.marketplace.categories.'+$helpers.normalizeCategoryName(inventoryCategory.name)) }}
            </span>
          </div>
        </template>

        <ul class=" w-full">
          <li v-for="marketplaceItem in items4MainCategory(inventoryCategory)" :key="marketplaceItem.id" class="w-full px-4 py-2 flex border-t border-grey-l3">
            <div v-if="inventoryCategory.path==='hospitality'">
              <div v-if="marketplaceItem.name" class="p-4 bg-white">
                <div class="text-white p-2 inline-block bg-black">
                  {{ marketplaceItem.genre }}
                </div>
                <img
                  :src="marketplaceItem.imageURL"
                  alt="event image"
                >
                <div class="text-left font-bold text-lg">
                  {{ marketplaceItem.name }}
                </div>
                <div class="text-sm text-gray mt-4">
                  {{ marketplaceItem.date }}
                </div>
                <div> {{ marketplaceItem.venueName }}</div>
                <div>{{ marketplaceItem.city }},{{ marketplaceItem.country }}</div>
                <hr>
                <div class="text-center mt-5">
                  <app-button :show-arrow="true" class="view-event-button" :title="$t('app.marketplace.categories.view-event')" @clicked="ViewEvent(marketplaceItem.url + '?so=' + marketplaceItem.id + '&utm_medium=referral&utm_source=sponsor-online')" />
                </div>
              </div>
            </div>
            <div v-else class="w-full flex ml-auto">
              <div class="w-1/5 pl-1">
                <inventory-icon class="mt-1 w-8 h-8" :category="marketplaceItem.category" />
              </div>
              <div class="pl-3 w-3/5 flex">
                <div class="my-auto pr-2">
                  <p class="text-h7 font-sans font-medium capitalize leading-tight">
                    {{ marketplaceItem.nameOverride || $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.tertiaryCategory(marketplaceItem.category), packages)) }}
                  </p>
                  <p class="text-p4 text-grey capitalize leading-tight">
                    {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.secondaryCategory(marketplaceItem.category))) }}
                  </p>
                </div>
              </div>
              <div class="w-2/5 flex justify-end">
                <slot name="action" :item="marketplaceItem" />
              </div>
            </div>
          </li>
          </div>
          <li v-if="!items4MainCategory(inventoryCategory).length" class="flex flex-col pb-2">
            <slot name="empty-category" :category="inventoryCategory">
              <p class="text-center mt-4 text-grey-l1">
                {{ $t('errors.no_results') }}
              </p>

              <app-button class="mx-auto mt-8" :title="$t('app.inventory.interested')" @clicked="notifyInventoryInterest($get(inventoryCategory, 'name'))" />
            </slot>
          </li>
        </ul>
      </accordion-item>
    </accordion>

    <div v-if="packages" class="w-full border-t border-grey-l3">
      <ul class=" w-full">
        <li v-for="marketplaceItem in items" :key="marketplaceItem.id" class="w-full px-4 py-2 flex border-t border-grey-l3">
          <div class="w-1/5 pl-1">
            <inventory-icon class="mt-1 w-8 h-8" :category="marketplaceItem.category" :is-package="true" />
          </div>
          <div class="pl-3 w-2/5 flex">
            <div class="my-auto pr-2">
              <p class="text-h7 font-sans font-medium capitalize leading-tight">
                {{ marketplaceItem.nameOverride || $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.firstCategory(marketplaceItem.category), true)) }}
              </p>
              <p class="text-p4 font-sans text-grey capitalize leading-tight">
                {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.firstCategory(marketplaceItem.category), true)) }}
              </p>
            </div>
          </div>
          <div class="w-2/5 flex">
            <slot name="action" :item="marketplaceItem" />
          </div>
        </li>
        <li v-if="!items.length" class="flex flex-col">
          <slot name="empty-package">
            <p class="text-center mt-4 text-grey-l1">
              {{ $t('errors.no_results') }}
            </p>

            <app-button class="mx-auto mt-8" :title="$t('app.inventory.interested')" @clicked="notifyInventoryInterest('package')" />
          </slot>
        </li>
      </ul>
    </div>

    <template v-slot:result="props">
      <div v-if="props.result.length === 0" class="text-grey w-full flex min-h-64">
        <div class="w-full text-left">
          <span class="text-p1 pt-2">{{ $t('errors.no-search-result') }}</span>
        </div>
      </div>
      <ul v-else class=" w-full min-h-64">
        <li v-for="marketplaceItem in props.result" :key="marketplaceItem.id" class="w-full py-2 flex border-t border-grey-l3">
          <div class="w-1/5 flex">
            <inventory-icon class="mt-1 w-8 h-8" :category="marketplaceItem.category" :is-package="packages" />
          </div>
          <div class="w-2/5 flex">
            <div class="my-auto">
              <p class="text-h7 font-sans font-medium">
                {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.tertiaryCategory(marketplaceItem.category), packages)) }}
              </p>
              <p class="text-p4 text-grey-l2">
                {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName($helpers.secondaryCategory(marketplaceItem.category))) }}
              </p>
            </div>
          </div>
          <div class="w-2/5 flex">
            <slot name="action" :item="marketplaceItem" />
          </div>
        </li>
      </ul>
    </template>
  </search>
</template>

<script>
import Search from '@/components/widgets/Search'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import AccordionItem from '@/components/AccordionItem'
import Accordion from '@/components/Accordion'
import AppButton from '@/components/AppButton'
import { InventoryRequestMutation } from '@/services/graphql'

export default {
  name: 'InventoryItemsList',

  components: {
    Search,
    InventoryIcon,
    Accordion,
    AccordionItem,
    AppButton
  },

  props: {
    items: {
      type: Array,
      default: () => []
    },

    categories: {
      type: Array,
      default: () => []
    },

    packages: {
      type: Boolean,
      default: false
    },

    searchAttribute: {
      type: [String, Array],
      default: 'name'
    }
  },

  methods: {
    items4MainCategory(mainCategory) {
      return this.items.filter(
        item => item.category.path.split(' / ')[0] === mainCategory.path
      )
    },

    openAll() {
      this.$refs.accordion.showAll()
    },

    ViewEvent(eventURL) {
      window.open(eventURL, '_blank')
    },

    async notifyInventoryInterest(category = 'item') {
      try {
        await this.$apollo.mutate({
          ...InventoryRequestMutation,
          variables: {
            input: {
              category,
              actor_unit_id: this.$route.params.id,
              target_unit_id: this.$route.params.unitId
            }
          }
        })
        this.$toast.success(this.$t('success.sent'))
      } catch (err) {
        if (this.isDevEnv) {
          this.$toast.error(err.message || this.$t('errors.general'))
        } else {
          this.$toast.error(this.$t('errors.general'))
        }
      }
    }
  }
}
</script>

<style scoped>
.view-event-button {
  background-color: #040720;
}
</style>
