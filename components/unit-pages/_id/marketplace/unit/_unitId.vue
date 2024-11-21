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
          <compare-header-info v-if="hasItemsInCompare" class="text-p1" />
        </transition>
        <transition name="slide-fade">
          <proposal-header-info v-if="hasItemsInProposal" class="text-p1" />
        </transition>
      </div>
    </div>
    <div class="w-full flex pt-20">
      <sidebar>
        <sidebar-link
          :href="{ name: 'unit-id-dashboard', params: {id: unitId} }"
          :locked="!accessBrandDashboard"
        >
          {{ $t('app.sidebar.brand.dashboard') }}
        </sidebar-link>
        <sidebar-link
          :href="{ name: 'unit-id-profile-targeting', params: {id: unitId} }"
          :class="getActiveClass('/unit/(\\d*)/profile')"
        >
          {{ $t('app.sidebar.brand.profile') }}
        </sidebar-link>
        <sidebar-link
          :href="{ name: 'unit-id-marketplace', params: {id: unitId} }"
        >
          {{ $t('app.sidebar.brand.marketplace') }}
        </sidebar-link>
        <sidebar-link
          :href="{ name: 'unit-id-deals-dealId', params: {id: unitId} }"
          :locked="!accessBrandDeals"
        >
          {{ $t('app.sidebar.brand.deals') }}
        </sidebar-link>
        <sidebar-link
          :href="{ name: 'unit-id-settings-profile', params: {id: unitId} }"
          :class="getActiveClass('/unit/(\\d*)/settings')"
        >
          {{ $t('app.sidebar.brand.settings') }}
        </sidebar-link>
        <sidebar-link
          :href="{ name: 'unit-id-contact', params: {id: unitId} }"
        >
          {{ $t('app.sidebar.brand.contact') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'privacy' }">
          {{ $t('app.sidebar.brand.privacy') }}
        </sidebar-link>

        <template v-slot:footer>
          <nuxt-link
            :to="localePath({ name: 'terms'})"
            class="link--secondary-small"
          >
            {{ $t('app.sidebar.brand.terms') }}
          </nuxt-link>
          <nuxt-link
            :to="localePath({ name: 'unit-id-about', params: {id: unitId}})"
            class="link--secondary-small"
          >
            {{ $t('app.sidebar.brand.about') }}
          </nuxt-link>
        </template>
      </sidebar>

      <div class="team__profile w-full">
        <team-profile-header :unit-id="selectedUnitId" :season="activeSeason.name" />

        <navbar-tabs class="mt-12 nav-tabs">
          <lockable-navbar-tab-link
            :href="{ name: 'unit-id-marketplace-unit-unitId-inventory', params: {id: unitId, unitId: selectedUnitId} }"
            :locked="!accessTeamInventory"
          >
            {{ $t('app.navbar.inventory') }}
          </lockable-navbar-tab-link>
          <lockable-navbar-tab-link
            :href="{ name: 'unit-id-marketplace-unit-unitId-fans', params: {id: unitId, unitId: selectedUnitId} }"
            :locked="!accessFansAndReach"
          >
            {{ $t('app.navbar.fans') }}
          </lockable-navbar-tab-link>
          <lockable-navbar-tab-link
            :href="{ name: 'unit-id-marketplace-unit-unitId-players', params: {id: unitId, unitId: selectedUnitId} }"
            :locked="!accessPlayers"
          >
            {{ $t('app.navbar.players') }}
          </lockable-navbar-tab-link>
          <navbar-tab-link
            :href="{ name: 'unit-id-marketplace-unit-unitId-stadium', params: {id: unitId, unitId: selectedUnitId} }"
          >
            {{ $t('app.navbar.stadium') }}
          </navbar-tab-link>
          <navbar-tab-link
            :href="{ name: 'unit-id-marketplace-unit-unitId-finances', params: {id: unitId, unitId: selectedUnitId} }"
          >
            {{ $t('app.navbar.partners') }}
          </navbar-tab-link>
          <lockable-navbar-tab-link
            :href="{ name: 'unit-id-marketplace-unit-unitId-league', params: {id: unitId, unitId: selectedUnitId} }"
            :locked="!accessLeague"
          >
            {{ $t('app.navbar.league') }}
          </lockable-navbar-tab-link>
          <!-- <navbar-tab-link
            :href="{ name: 'unit-id-marketplace-unit-unitId-sponsorship', params: {id: unitId, unitId: selectedUnitId} }"
          >
            {{ $t('app.navbar.sponsorship') }}
          </navbar-tab-link> -->

          <!-- <v-menu bottom class="v-tabs__div" left>
            <template v-slot:activator="{ on }">
              <div class="flex flex-wrap ml-auto pr-8">
                <span class="text-grey text-p3 uppercase leading-none">{{ $t('general.season') }}</span>
                <div class="w-full">
                  <a class="text-black font-medium text-h4" v-on="on">
                    {{ activeSeason.name }}
                    <span class="text-h6 ml-1 fas fa-caret-down text-red" />
                  </a>
                </div>
              </div>
            </template>
            <v-list class="">
              <v-list-tile
                v-for="season in seasons"
                :key="season.id"
                class="cursor-pointer hover:text-red"
                @click="changeActiveSeason(season)"
              >
                {{ season.name }}
              </v-list-tile>
            </v-list>
          </v-menu>-->
        </navbar-tabs>

        <nuxt-child
          :access-fans-and-reach="accessFansAndReach"
          :access-team-inventory="accessTeamInventory"
          :access-league="accessLeague"
          :access-players="accessPlayers"
        />
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
import {
  PageVisitedMutation,
  SeasonsQuery,
  UnitHeaderQuery
} from '@/services/graphql'
import Avatar from '@/components/Avatar'
import NavbarTabLink from '@/components/NavbarTabLink'
import NavbarTabs from '@/components/NavbarTabs'
import TeamProfileHeader from '@/components/widgets/TeamProfileHeader'
import unitPage from '@/services/mixins/unitPage'
import LockableNavbarTabLink from '@/components/LockableNavbarTabLink'

export default {
  name: 'MarketplaceUnit',

  components: {
    LockableNavbarTabLink,
    TeamProfileHeader,
    Avatar,
    AppButton,
    CompareHeaderInfo,
    ProposalHeaderInfo,
    Sidebar,
    SidebarLink,
    NavbarTabs,
    NavbarTabLink
  },

  middleware: ['unit-permissions'],

  mixins: [onBack, compare, proposal, unitPage],

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
    },
    seasons: SeasonsQuery
  },

  data: () => ({
    unit: UnitHeaderQuery.mock
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason',
      unitTypeCategory: 'active/unitTypeCategory',
      unitType: 'active/unitType',
      unitActiveSubscription: 'active/unitActiveSubscription'
    }),

    getActiveClass() {
      return startsWith =>
        new RegExp('^' + startsWith, 'i').test(this.$route.path) ? 'active' : ''
    },

    accessTeamInventory() {
      return this.checkBrandPermission('access-team-inventory-as-brand')
    },

    accessBrandDashboard() {
      return this.checkBrandPermission('access-brand-dashboard')
    },

    accessBrandDeals() {
      return this.checkBrandPermission('access-brand-deals')
    },

    accessFansAndReach() {
      return this.checkPermission('access-team-fans-reach-as-brand')
    },

    accessPlayers() {
      return this.checkPermission('access-team-players-as-brand')
    },

    accessLeague() {
      return this.checkPermission('access-team-league-as-brand')
    },

    accessSponsorship() {
      return this.checkPermission('access-team-sponsorship-as-brand')
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
    },

    changeActiveSeason(season) {
      this.$store.dispatch('active/setSeason', season)
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
