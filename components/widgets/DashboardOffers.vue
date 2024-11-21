<template>
  <div class="w-full">
    <div v-if="$apollo.loading">
      <content-placeholders>
        <content-placeholders-heading :img="true" />
        <content-placeholders-text :lines="4" />
      </content-placeholders>
    </div>
    <div v-else class="w-full">
      <div class="w-full flex px-2">
        <slot name="header" :deals="deals">
          <div class="mr-auto">
            <label-chart :label="deals ? deals.length : 0" :info="$tc('app.team.dashboard.new_offer', deals ? deals.length : 0)" />
          </div>

          <div class="ml-auto my-auto">
            <app-button :btn-class="'link'" :title="$t('app.team.dashboard.see_new_offers')" @clicked="onSeeNewOffersClick" />
          </div>
        </slot>
      </div>
      <div class="w-full bg-white shadow-xl px-4 pt-8 pb-4">
        <step-pager :items="deals">
          <template v-slot:title="props">
            <div class="mt-6 flex items-center">
              <inventory-item-info :classes="'h-12 w-12'" :src="$get(props, 'item.brand.logo.url')" :info="$get(props, 'item.brand.info')">
                <template v-slot:title>
                  <p class="font-medium font-sans leading-tight">
                    {{ $get(props, 'item.brand.name', '-') }}
                  </p>
                </template>
              </inventory-item-info>
              <app-button btn-class="link" :title="$t('general.reply')" @clicked="$router.push(localePath({name: 'unit-id-deals-dealId', params: {id: unitId, dealId: props.item.id}}))" />
            </div>
          </template>
          <template v-slot:content="props">
            <div class="w-1/2 xl:w-full flex flex-wrap bg-grey-l4">
              <div v-for="dealItem in props.item.items" :key="dealItem.id" class="w-10 border-r border-t border-white flex py-2">
                <inventory-icon class="m-auto w-6 h-6" :category="dealItem.marketplaceItem.category" />
              </div>
            </div>
            
            <div class="xl:w-1/3 bg-grey-l4 py-2 pr-4 text-right">
              <span class="text-grey uppercase font-medium pt-2">{{ $t('app.deals.total') }}:</span>
              <span class="font-medium ml-2">
                <span v-if="$get(props, 'item.priceTo') == null || $get(props, 'item.priceTo') == 0">{{ $get(props, 'item.price') | currency }}</span>
                <span v-else>{{ $get(props, 'item.price') | currency }} - {{ $get(props, 'item.priceTo') | currency }}</span>
              </span>
            </div>
          </template>
        </step-pager>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import LabelChart from '@/components/LabelChart'
import AppButton from '@/components/AppButton'
import { ActiveUnitQuery, DealsQuery, MeQuery } from '@/services/graphql'
import StepPager from '@/components/widgets/StepPager'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import InventoryItemInfo from '@/components/inventory/InventoryItemInfo'

export default {
  name: 'DashboardOffers',

  components: {
    LabelChart,
    AppButton,
    StepPager,
    InventoryIcon,
    InventoryItemInfo
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    dealsFilter: {
      type: Function,
      default: null
    }
  },

  apollo: {
    unit: ActiveUnitQuery(function() {
      return { id: this.unitId }
    }),
    me: MeQuery,
    deals: {
      ...DealsQuery,
      variables() {
        return {
          id: this.unitId
        }
      },
      update(data) {
        const deals = this.$get(data, 'unit.entity.deals', [])
        if (this.dealsFilter !== null) {
          return deals.filter(this.dealsFilter)
        } else {
          return deals.filter(deal =>
            moment().isSame(moment(deal.createdAt), 'day')
          )
        }
      }
    }
  },

  methods: {
    onSeeNewOffersClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-deals-dealId',
          params: {
            id: this.unitId
          }
        })
      )
    }
  }
}
</script>

<style scoped>
</style>
