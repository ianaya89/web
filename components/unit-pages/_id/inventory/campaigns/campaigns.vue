<template>
  <div class="w-full flex p-5">
    <div class="w-full bg-white py-4 px-5">
      <div class="w-full flex">
        <h4 class="my-auto uppercase">
          {{ $t('app.inventory.campaigns.title') }}
        </h4>
        <app-button class="ml-auto" data-cy="createNew" :title="$t('general.create_new')" @clicked="onCreateClick" />
      </div>
      <div v-if="$apollo.loading" class="w-full pt-4">
        <content-placeholders class="w-full">
          <content-placeholders-text class="w-full" :lines="10" />
        </content-placeholders>
      </div>
      <div v-else class="overflow-auto w-full mt-2">
        <table class="w-full">
          <thead>
            <tr class="border-b border-grey-l3">
              <th class="text-left text-grey font-normal p-2">
                {{ $t('app.inventory.campaigns.name') }}
              </th>
              <th class="text-left text-grey font-normal p-2">
                {{ $t('app.inventory.campaigns.sent') }}
              </th>
              <th class="text-left text-grey font-normal p-2">
                {{ $t('app.inventory.campaigns.open_rate') }}
              </th>
              <th class="text-left text-grey font-normal p-2">
                {{ $t('app.inventory.campaigns.items') }}
              </th>
              <th class="text-left text-grey font-normal p-2">
                {{ $t('app.inventory.campaigns.contacts') }}
              </th>
              <th class="text-left text-grey font-normal p-2">
                {{ $t('app.inventory.campaigns.actions') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(campaign,index) in $get(unit, 'entity.campaignsPaginator.data', [])" :key="index" :data-cy="'campaign-row-'+index" class="border-b border-grey-l3">
              <td class="py-4 px-2 font-semibold font-serif leading-tight" data-cy="campaign-row-name">
                {{ campaign.name }}
              </td>
              <td class="py-4 px-2 font-serif leading-tight" data-cy="campaign-row-send-at">
                {{ campaign.sendAt | dateTime }}
              </td>
              <td class="py-4 px-2">
                <label-chart :chart-value="campaign.openRate" :label="$filters.percentage(campaign.openRate)" :animation="false" :info="null" :label-class="'text-p1'" />
              </td>
              <td class="py-4 px-2 font-serif" data-cy="campaign-row-items">
                {{ campaign.inventoryItems.length + campaign.packageItems.length }}
              </td>
              <td class="py-4 px-2 font-serif max-w-lg" data-cy="campaign-row-recipients">
                {{ campaign.recipients.map(item => item.company).join(', ') | truncate(100) }}
              </td>
              <td class="py-4 px-2" data-cy="campaign-row-duplicate">
                <app-button :title="$t('general.duplicate')" :btn-class="'link'" @clicked="onDuplicateCampaignClick(campaign)" />
              </td>
            </tr>
            <tr v-if="$get(unit, 'entity.campaignsPaginator.data', []).length === 0">
              <td colspan="6">
                <p class="text-center text-grey mt-4">
                  {{ $t('errors.no_results') }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="!$apollo.loading && $get(unit, 'entity.campaignsPaginator.paginatorInfo.lastPage', 1)!==1" class="w-full text-grey pt-4">
        <div class="w-full">
          {{ $t('app.inventory.campaigns.currentView', {first: firstCampaignIndex , last:lastCampaignIndex, total: $get(unit, 'entity.campaignsPaginator.paginatorInfo.total')}) }}
        </div>
        <div class="w-full pt-8">
          <pagination v-model="page" :length="$get(unit, 'entity.campaignsPaginator.paginatorInfo.lastPage')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'
import { CampaignsPaginatedQuery } from '@/services/graphql'
import LabelChart from '@/components/LabelChart'
import Pagination from '@/components/Pagination'

export default {
  name: 'Campaigns',

  components: {
    LabelChart,
    Pagination,
    AppButton
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...CampaignsPaginatedQuery,
      variables() {
        return {
          page: this.page,
          size: this.size,
          id: this.unitId
        }
      }
    }
  },

  data: () => ({
    page: 1,
    size: 10
  }),

  computed: {
    firstCampaignIndex() {
      return (this.page - 1) * this.size + 1
    },

    getCampaignIndex() {
      return index => (this.page - 1) * this.size + index + 1
    },

    lastCampaignIndex() {
      return (
        (this.page - 1) * this.size +
        this.$get(this.unit, 'entity.campaignsPaginator.data', []).length
      )
    }
  },

  mounted() {
    this.$store.dispatch('campaign/clear')
  },

  methods: {
    onCreateClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-campaigns-create',
          params: this.$route.params
        })
      )
    },

    onDuplicateCampaignClick(campaign) {
      this.$store.dispatch('campaign/duplicateCampaign', campaign)
      this.onCreateClick()
    }
  }
}
</script>

<style scoped>
</style>
