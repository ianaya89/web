<template>
  <div class="marketplace-team__page">
    <div class="marketplace-team__header">
      <div class="absolute left-0 my-auto">
        <app-button
          class="ml-8"
          :btn-class="'secondary'"
          :title="$t('app.compare.back')"
          @clicked="onBackClick"
        />
      </div>
      <div class="flex-grow text-center flex justify-end md:justify-center px-8 md:px-0">
        <content-placeholders v-if="$apollo.loading">
          <content-placeholders-heading />
        </content-placeholders>
        <div v-else class="flex">
          <avatar class="my-auto" :classes="'w-12 h-12'" :src="unit.entity.logo.url" />
          <h3 class="my-auto ml-4">
            {{ unit.entity.name }}
          </h3>
        </div>
      </div>
      <div class="absolute right-0 inset-y-0 hidden md:flex">
        <transition name="slide-fade">
          <compare-header-info v-if="hasItemsInCompare" class=" text-p1" />
        </transition>
        <transition name="slide-fade">
          <proposal-header-info v-if="hasItemsInProposal" class=" text-p1" />
        </transition>
      </div>
    </div>
    <div class="w-full flex pt-20">
      <sidebar>
        <sidebar-link :href="{ name: 'unit-id-dashboard', params: {id: unitId} }">
          {{ $t('app.sidebar.brand.dashboard') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'unit-id-profile-targeting', params: {id: unitId} }" :class="getActiveClass('/unit/(\\d*)/profile')">
          {{ $t('app.sidebar.brand.profile') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'unit-id-marketplace', params: {id: unitId} }">
          {{ $t('app.sidebar.brand.marketplace') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'unit-id-deals-dealId', params: {id: unitId} }">
          {{ $t('app.sidebar.brand.deals') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'unit-id-settings-profile', params: {id: unitId} }" :class="getActiveClass('/unit/(\\d*)/settings')">
          {{ $t('app.sidebar.brand.settings') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'unit-id-contact', params: {id: unitId} }">
          {{ $t('app.sidebar.brand.contact') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'privacy' }">
          {{ $t('app.sidebar.brand.privacy') }}
        </sidebar-link>

        <template v-slot:footer>
          <nuxt-link :to="localePath({ name: 'terms'})" class="link--secondary-small">
            {{ $t('app.sidebar.brand.terms') }}
          </nuxt-link>
          <nuxt-link :to="localePath({ name: 'unit-id-about', params: {id: unitId}})" class="link--secondary-small">
            {{ $t('app.sidebar.brand.about') }}
          </nuxt-link>
        </template>
      </sidebar>

      <div class="team__profile w-full">
        <league-profile-header :unit-id="selectedUnitId" :season="activeSeason.name" />

        <navbar-tabs class="mt-12 nav-tabs">
          <navbar-tab-link :href="{ name: 'unit-id-marketplace-unit-unitId-inventory', params: {id: unitId, unitId: selectedUnitId} }">
            {{ $t('app.navbar.inventory') }}
          </navbar-tab-link>
          <navbar-tab-link :href="{ name: 'unit-id-marketplace-unit-unitId-fans', params: {id: unitId, unitId: selectedUnitId} }">
            {{ $t('app.navbar.fans') }}
          </navbar-tab-link>
          <navbar-tab-link :href="{ name: 'unit-id-marketplace-unit-unitId-finances', params: {id: unitId, unitId: selectedUnitId} }">
            {{ $t('app.navbar.finances') }}
          </navbar-tab-link>
          <navbar-tab-link :href="{ name: 'unit-id-marketplace-unit-unitId-league', params: {id: unitId, unitId: selectedUnitId} }">
            {{ $t('app.navbar.league') }}
          </navbar-tab-link>
        </navbar-tabs>

        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import onBack from '@/services/mixins/onBack'
import AppButton from '@/components/AppButton'
import CompareHeaderInfo from '@/components/CompareHeaderInfo'
import ProposalHeaderInfo from '@/components/ProposalHeaderInfo'
import proposal from '@/services/mixins/proposal'
import compare from '@/services/mixins/compare'
import SidebarLink from '@/components/SidebarLink'
import Sidebar from '@/components/Sidebar'
import { PageVisitedMutation, UnitHeaderQuery } from '@/services/graphql'
import Avatar from '@/components/Avatar'
import NavbarTabLink from '@/components/NavbarTabLink'
import NavbarTabs from '@/components/NavbarTabs'
import LeagueProfileHeader from '@/components/widgets/LeagueProfileHeader'

export default {
  name: 'MarketplaceUnitLeague',

  components: {
    LeagueProfileHeader,
    Avatar,
    AppButton,
    CompareHeaderInfo,
    ProposalHeaderInfo,
    Sidebar,
    SidebarLink,
    NavbarTabs,
    NavbarTabLink
  },

  mixins: [onBack, compare, proposal],

  props: {
    unitId: {
      type: String,
      required: true
    },
    selectedUnitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitHeaderQuery,
      variables() {
        return {
          id: this.selectedUnitId,
          season: this.activeSeason.name
        }
      }
    }
  },

  data: () => ({
    unit: UnitHeaderQuery.mock
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason'
    }),

    getActiveClass() {
      return startsWith =>
        new RegExp('^' + startsWith, 'i').test(this.$route.path) ? 'active' : ''
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
              page: 'PROFILE',
              actor_unit_id: this.unitId,
              target_unit_id: this.selectedUnitId
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
.marketplace-team__page {
  .marketplace-team__header {
    @apply .bg-white .border-b .border-grey-l2 .py-4 .flex .fixed .w-full .shadow;
    z-index: 100;
    height: 80px;
  }

  .marketplace-team__section {
    @apply .w-3/5 .pb-10 .pr-10 .flex .overflow-auto .relative .bg-white;
  }

  .marketplace-team__height {
    @apply .pt-16;
    min-height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);
  }

  .team__profile .nav-tabs {
    width: calc(100% - 100px);
    margin-left: calc(100% - calc(100% - 100px));
    @apply .relative;
  }

  @media (max-width: 768px) {
    .team__profile .nav-tabs {
      @apply pr-8;
      width: auto;
      margin-left: calc(100% - calc(100% - 30px));
    }
  }

  @media (max-width: 576px) {
    .team__profile .nav-tabs {
      @apply pr-6;
      width: auto;
      margin-left: calc(100% - calc(100% - 20px));
    }
  }
}
</style>
