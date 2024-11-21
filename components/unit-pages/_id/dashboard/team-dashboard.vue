<template>
  <section class="team__dashboard py-12 px-6 sm:px-12">
    <h3 class="pb-6">
      {{ $t('app.team.dashboard.title') }}
    </h3>
    <div class="w-full flex flex-wrap">
      <div class="w-full sm:w-1/2 sm:pr-4">
        <profile-views class="mb-12" :unit-id="unitId" />
      </div>
      <div class="w-full sm:w-1/2 sm:pl-4">
        <search-appearances :unit-id="unitId" class="mb-12" />
      </div>
      <div class="w-full sm:w-1/2 sm:pr-4">
        <profile-completed :unit-id="unitId" class="mb-12" />
      </div>
      <div class="w-full sm:w-1/2 sm:pl-4">
        <dashboard-offers :unit-id="unitId" class="mb-12" />
      </div>
    </div>
    <div class="w-full flex flex-wrap pb-12">
      <div class="w-full sm:w-1/2 sm:pr-4">
        <inventory-uploaded :unit-id="unitId" class="mb-12" />
      </div>
      <div class="w-full sm:w-1/2 sm:pl-4" />
    </div>
    <div v-if="accessSportbusinessNewsfeed" class="w-full flex flex-wrap pb-12">
      <latest-sports class="mb-12" />
    </div>
  </section>
</template>

<script>
import ProfileViews from '@/components/widgets/team-dashboard/ProfileViews'
import SearchAppearances from '@/components/widgets/team-dashboard/SearchAppearances'
import ProfileCompleted from '@/components/widgets/team-dashboard/ProfileCompleted'
import InventoryUploaded from '@/components/widgets/team-dashboard/InventoryUploaded'
import LatestSports from '@/components/widgets/LatestSports'
import { PageVisitedMutation } from '@/services/graphql'
import DashboardOffers from '@/components/widgets/DashboardOffers'
import unitPage from '@/services/mixins/unitPage'

export default {
  name: 'TeamDashboard',

  components: {
    InventoryUploaded,
    ProfileCompleted,
    DashboardOffers,
    SearchAppearances,
    ProfileViews,
    LatestSports
  },

  mixins: [unitPage],

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

  mounted() {
    this.recordProfileVisit()
  },

  methods: {
    async recordProfileVisit() {
      try {
        await this.$apollo.mutate({
          ...PageVisitedMutation,
          variables: {
            input: {
              page: 'DASHBOARD',
              actor_unit_id: this.unitId,
              target_unit_id: this.unitId
            }
          }
        })
      } catch (err) {
        //
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.team__dashboard {
  @apply .w-full .overflow-hidden;
}
</style>
