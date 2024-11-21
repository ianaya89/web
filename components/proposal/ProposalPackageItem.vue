<template>
  <div class="w-full bg-grey-l5">
    <div class="w-full min-h-20 flex my-auto package-border px-4">
      <div class="w-1/4 flex pl-2 my-auto pr-6">
        <div class="w-4/5 flex">
          <div class="w-10 h-10">
            <inventory-icon class="w-10 h-10" :category="item.marketplaceItem.category" :is-package="true" />
          </div>
          <span class="text-h5 text-medium leading-tight my-auto ml-3">
            {{ $t('app.marketplace.categories.' + $helpers.normalizeCategoryName(item.marketplaceItem.category.name, item.marketplaceItem.itemType === 'package')) }}
          </span>
        </div>
        <!-- <span class="ml-auto my-auto">{{ item.marketplaceItem.children.length }} {{ $tc('general.items', item.marketplaceItem.children.length) }}</span> -->
      </div>
      <div class="w-3/4 flex">
        <v-form ref="slotForm" v-model="validSlots" class="w-4/5">
          <mover class="w-full flex" :inverted="false" :data="$get(item,'slots',[])" :movers-always-visible="false">
            <template v-slot:content="props">
              <div class="w-full flex bg-grey-l5 px-2 pt-2">
                <div class="w-2/3">
                  <app-select
                    :value="item.slots[props.index].slot"
                    :single-line="true"
                    :items="availableSlots"
                    :solo-label="$t('general.'+ $get(item, 'marketplaceItem.slotType'))"
                    :rules="[v => !!v || $t('app.marketplace.show_item.form.slots.validation.required'),
                             v => item.slots.map(slot => slot.slot).filter(slot => slot === v).length < 2 || $t('form.item_already_selected')]"
                    @input="itemSlotsChange($event, item, props.index)"
                  />
                </div>
                <div class="w-1/3 ml-4">
                  <app-input
                    :value="item.slots[props.index].quantity"
                    :type="'number'"
                    :label="null"
                    :solo-label="$t('general.amount')"
                    :suffix="$t('general.pieces_short')"
                    :rules="[v => slotAmountRule(v, item.slots[props.index].slot),
                             v => v > 0 || $t('app.marketplace.show_item.form.amount.validation.min')]"
                    :outline="true"
                    @input="itemAmountChange($event, item, props.index)"
                  />
                </div>
                <div v-if="$get(item, 'slots', []).length > 1" class="my-auto px-4">
                  <span class="fas fa-trash cursor-pointer" @click="removeSlot(item, props.index)" />
                </div>
              </div>
              <div class="w-full flex py-2 bg-grey-l5 border-t border-grey-l2">
                <small v-if="!validSlots" class="mr-auto text-red normal-case">{{ $t('app.deals.form.errors_in_slots') }}</small>
                <app-button :title="'+ '+ $t('general.add_another')" :btn-class="'link'" class="px-4 ml-auto" @clicked="addNextSlot" />
              </div>
            </template>
          </mover>
        </v-form>
        <div class="w-2/5 flex justify-end pt-8 pl-4">
          <div class="ml-auto flex my-auto">
            <app-tooltip position="left" class="text-p3 text-left mt-1 mr-2">
              {{ $t('app.deals.weight_price_tooltip') }}
            </app-tooltip>
            <p class="text-h6 pr-1 font-sans">
              <span class="font-medium">{{ itemPrice(item.marketplaceItem.id) | currency }}</span>
              <br>
              <small>({{ item.marketplaceItem.price | currency }})</small>
            </p>
            <span class="ml-4 pt-2 text-p4 lni-close text-red cursor-pointer" @click="removeItem(item.marketplaceItem.id)" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <proposal-item
        v-for="(packageItem, index2) in item.marketplaceItem.children"
        :key="packageItem.id"
        :last="item.marketplaceItem.children.length - 1 === index2"
        :package-item="true"
        :item="packageItem"
        :editable="false"
      />
    </div>

    <modal
      ref="newSlotModal"
      :modal-size-classes="'min-h-screen sm:min-h-auto max-w-sm'"
    >
      <template v-slot:header>
        {{ $t('app.deals.modals.new_slot.title') }}
        <button type="button" class="app-link text-red absolute top-0 right-0 py-3 px-4 font-bold text-p1 cursor-pointer z-50 bg-white focus:outline-none" @click="$refs.newSlotModal.close()">
          <span class="text-menu lni-close" />
        </button>
      </template>
      <template v-slot:body>
        <v-form ref="newSlotForm" class="w-full">
          <div class="w-full flex">
            <app-select
              v-model="newSlot.slot"
              class="w-2/3 pr-2 font-sans"
              :required="true"
              :items="availableSlots"
              :single-line="true"
              :rules="[v => !!v || $t('app.marketplace.show_item.form.slots.validation.required'),
                       v => $get(item,'slots',[]).filter(slot => slot.slot === v).length === 0 || $t('form.item_already_selected')]"
              :label="null"
              :solo-label="$t('general.'+ $get(item, 'marketplaceItem.slotType','-'))"
            />

            <app-input
              v-model="newSlot.quantity"
              class="w-1/3 font-sans"
              :type="'number'"
              :required="true"
              :rules="[v => v > 0 || $t('app.marketplace.show_item.form.amount.validation.min'),
                       v => slotAmountRule(v, newSlot.slot)]"
              :outline="true"
              :label="null"
              :solo-label="$t('app.deals.amount')"
              :suffix="$t('general.pieces_short')"
            />
          </div>
        </v-form>
      </template>
      <template v-slot:footer>
        <div class="w-1/2 pr-2">
          <app-button class="w-full" :btn-class="'secondary'" :title="$t('general.cancel')" @clicked="cancelNewSlot" />
        </div>
        <div class="w-1/2 pl-2">
          <app-button class="w-full" :title="$t('general.save')" @clicked="storeNewSlot(item)" />
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import AppInput from '@/components/AppInput'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import AppSelect from '@/components/AppSelect'
import Mover from '@/components/Mover'
import Modal from '@/components/Modal'
import AppButton from '@/components/AppButton'
import AppTooltip from '@/components/AppTooltip'
import ProposalItem from '@/components/proposal/ProposalItem'
import proposalItem from '@/services/mixins/proposalItem'

export default {
  name: 'ProposalPackageItem',

  components: {
    InventoryIcon,
    AppSelect,
    AppInput,
    AppButton,
    AppTooltip,
    Mover,
    Modal,
    ProposalItem
  },

  mixins: [proposalItem],

  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.package-border {
  @apply .border-b .border-grey-l3;
  border-bottom-width: 1px;
  border-bottom-style: dashed;
}
</style>
