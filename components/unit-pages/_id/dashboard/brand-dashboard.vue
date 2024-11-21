<template>
  <section class="brand__dashboard py-12 px-6 sm:px-12">
    <h3 class="pb-6">
      {{ $t('app.brand.dashboard.title') }}
    </h3>
    <div class="w-full flex flex-wrap pb-12">
      <div class="w-full md:w-1/2 md:pr-4 pb-4 md:pb-0">
        <dashboard-offers
          :unit-id="unitId"
          class="mb-12"
        >
          <template v-slot:header="props">
            <div class="mr-auto">
              <label-chart :label="props.deals.length" :info="$tc('app.brand.dashboard.new_deals', props.deals.length)" />
            </div>

            <div class="ml-auto my-auto">
              <app-button :btn-class="'link'" :title="$t('app.brand.dashboard.see_all_deals')" @clicked="onSeeNewOffersClick" />
            </div>
          </template>
        </dashboard-offers>
        <profile-strength class="mb-12" :unit-id="unitId" />
      </div>

      <div class="w-full md:w-1/2 md:pr-4 pb-4 md:pb-0">
        <dashboard-offers
          :unit-id="unitId"
          class="mb-12"
          :deals-filter="isDealEditableFnc"
        >
          <template v-slot:header="props">
            <div class="mr-auto">
              <label-chart :label="props.deals.length" :info="$tc('app.brand.dashboard.open_deals', props.deals.length)" />
            </div>

            <div class="ml-auto my-auto">
              <app-button :btn-class="'link'" :title="$t('app.brand.dashboard.see_all_deals')" @clicked="onSeeNewOffersClick" />
            </div>
          </template>
        </dashboard-offers>
      </div>
    </div>
    <div v-if="accessSportbusinessNewsfeed" class="w-full flex flex-wrap pb-12">
      <latest-sports class="mb-12" />
    </div>
  </section>
</template>

<script>
import ProfileStrength from '@/components/widgets/brand-dashboard/ProfileStrength'
import DashboardOffers from '@/components/widgets/DashboardOffers'
import LabelChart from '@/components/LabelChart'
import AppButton from '@/components/AppButton'
import deal from '@/services/mixins/deal'
import LatestSports from '@/components/widgets/LatestSports'
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'brand',

  name: 'Dashboard',

  components: {
    ProfileStrength,
    DashboardOffers,
    LabelChart,
    AppButton,
    LatestSports
  },

  mixins: [deal, unitPage],

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  computed: {
    accessSportbusinessNewsfeed() {
      return this.checkPermission('access-sportbusiness-newsfeed')
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

<style lang="postcss" scoped>
.brand__dashboard {
  @apply .w-full .overflow-hidden;
}
</style>
