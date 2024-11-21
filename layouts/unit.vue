<template>
  <v-app class="layout--app min-h-screen">
    <private-menu data-cy="header">
      <template v-slot:header-links>
        <app-header-link :href="{ name: 'unit-id-faq', params: $route.params }">
          {{ $t('app.header.faq') }}
        </app-header-link>
      </template>

      <template v-slot:mobile-links>
        <sidebar-link :href="{ name: 'unit-id-dashboard', params: $route.params }" :locked="!accessBrandDashboard">
          {{ $t('app.sidebar.team.dashboard') }}
        </sidebar-link>
        <sidebar-link v-if="unitTypeCategory === 'seller'" :href="{ name: 'unit-id-profile-fans', params: $route.params }" :class="getActiveClass('/unit/(\\d*)/profile')">
          {{ $t('app.sidebar.brand.profile') }}
        </sidebar-link>
        <sidebar-link v-if="unitTypeCategory === 'buyer'" :href="{ name: 'unit-id-profile-targeting', params: $route.params }" :class="getActiveClass('/unit/(\\d*)/profile')">
          {{ $t('app.sidebar.brand.profile') }}
        </sidebar-link>
        <sidebar-link v-if="unitTypeCategory === 'seller'" :href="{ name: 'unit-id-inventory', params: $route.params }">
          {{ $t('app.sidebar.team.inventory') }}
        </sidebar-link>
        <sidebar-link v-if="unitTypeCategory === 'buyer'" :href="{ name: 'unit-id-marketplace', params: $route.params }">
          {{ $t('app.sidebar.brand.marketplace') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'unit-id-deals-dealId', params: $route.params }" :locked="!accessBrandDeals">
          {{ $t('app.sidebar.team.deals') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'unit-id-settings-profile', params: $route.params }" :class="getActiveClass('/unit/(\\d*)/settings')">
          {{ $t('app.sidebar.team.settings') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'unit-id-contact', params: $route.params }">
          {{ $t('app.sidebar.team.contact') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'privacy' }">
          {{ $t('app.sidebar.team.privacy') }}
        </sidebar-link>
      </template>
    </private-menu>

    <div class="flex mt-20">
      <sidebar data-cy="sidebar">
        <sidebar-link :href="{ name: 'unit-id-dashboard', params: $route.params }" :locked="!accessBrandDashboard">
          {{ $t('app.sidebar.team.dashboard') }}
        </sidebar-link>
        <sidebar-link v-if="unitTypeCategory === 'seller'" :href="{ name: 'unit-id-profile-fans', params: $route.params }" :class="getActiveClass('/unit/(\\d*)/profile')">
          {{ $t('app.sidebar.brand.profile') }}
        </sidebar-link>
        <sidebar-link v-if="unitTypeCategory === 'buyer'" :href="{ name: 'unit-id-profile-targeting', params: $route.params }" :class="getActiveClass('/unit/(\\d*)/profile')">
          {{ $t('app.sidebar.brand.profile') }}
        </sidebar-link>
        <sidebar-link v-if="unitTypeCategory === 'seller'" :href="{ name: 'unit-id-inventory', params: $route.params }">
          {{ $t('app.sidebar.team.inventory') }}
        </sidebar-link>
        <sidebar-link v-if="unitTypeCategory === 'buyer'" :href="{ name: 'unit-id-marketplace', params: $route.params }">
          {{ $t('app.sidebar.brand.marketplace') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'unit-id-deals-dealId', params: $route.params }" :locked="!accessBrandDeals">
          {{ $t('app.sidebar.team.deals') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'unit-id-settings-profile', params: $route.params }" :class="getActiveClass('/unit/(\\d*)/settings')">
          {{ $t('app.sidebar.team.settings') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'unit-id-contact', params: $route.params }">
          {{ $t('app.sidebar.team.contact') }}
        </sidebar-link>
        <sidebar-link :href="{ name: 'privacy' }">
          {{ $t('app.sidebar.team.privacy') }}
        </sidebar-link>

        <template v-slot:footer>
          <nuxt-link :to="localePath({ name: 'terms'})" class="link--secondary-small">
            {{ $t('app.sidebar.team.terms') }}
          </nuxt-link>
          <nuxt-link :to="localePath({ name: 'unit-id-about', params: $route.params })" class="link--secondary-small">
            {{ $t('app.sidebar.team.about') }}
          </nuxt-link>
        </template>
      </sidebar>

      <transition name="fade" mode="out-in">
        <div v-if="unitType === null" class="unit-page-logo-loader">
          <logo-loader class="h-16 w-16 m-auto" />
        </div>
        <div v-else class="page-container">
          <div v-if="isUnitOnTrial" class="trial-notification py-4 px-6 sm:px-12">
            <div class="trial-notification-title font-bold">
              {{ $t('app.trial_notification.title') }}
            </div>
            <div class="trial-notification-content">
              {{ $t('app.trial_notification.text') }}
            </div>
            <div class="trial-notification-content font-bold">
              {{ trialDaysRemaining }} {{ $t('app.trial_notification.days_left') }} |
              <nuxt-link :to="localePath({ name: 'unit-id-settings-subscriptions', params: $route.params })">
                {{ $t('app.trial_notification.upgrade_now') }}
              </nuxt-link>
            </div>
          </div>
          <nuxt />
        </div>
      </transition>
    </div>

    <portal-target name="modals-outlet" multiple />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import App from './app'
import Sidebar from '@/components/Sidebar'
import SidebarLink from '@/components/SidebarLink'
import { metaTitles } from '@/services/seo'
import PrivateMenu from '@/components/menus/PrivateMenu'
import AppHeaderLink from '@/components/AppHeaderLink'
import LogoLoader from '@/components/LogoLoader'
import unitPage from '@/services/mixins/unitPage'

export default App.extend({
  name: 'UnitLayout',

  middleware: ['unit-permissions', 'unit-routes'],

  components: {
    Sidebar,
    SidebarLink,
    AppHeaderLink,
    LogoLoader,
    PrivateMenu
  },

  mixins: [unitPage],

  head() {
    const title = `${this.$t('general.' + this.unitType)} - ${this.$t(
      'general.platform'
    )}`
    return {
      title: title,
      meta: [...metaTitles(title)]
    }
  },

  computed: {
    getActiveClass() {
      return startsWith =>
        new RegExp('^' + startsWith, 'i').test(this.$route.path) ? 'active' : ''
    },

    ...mapGetters({
      unitTypeCategory: 'active/unitTypeCategory',
      unitType: 'active/unitType',
      unitActiveSubscription: 'active/unitActiveSubscription'
    }),

    isUnitOnTrial() {
      return (
        this.unitActiveSubscription &&
        this.unitActiveSubscription.isOnTrial === true
      )
    },

    trialDaysRemaining() {
      return (
        this.unitActiveSubscription &&
        this.unitActiveSubscription.trialDaysRemaining
      )
    },

    accessBrandDashboard() {
      return this.checkBrandPermission('access-brand-dashboard')
    },

    accessBrandDeals() {
      return this.checkBrandPermission('access-brand-deals')
    }
  }
})
</script>

<style lang="postcss" scoped>
.unit-page-logo-loader {
  @apply .w-full .flex;
  min-height: calc(100vh - 80px);
  max-height: calc(100vh - 80px);
}

.page-container {
  @apply .w-full;
}

.trial-notification {
  @apply .bg-white .border-solid .border-b .border-grey-l3 .w-full;
}

.trial-notification-title {
  @apply .text-red;
}

.page-container {
  width: 100%;
  overflow: hidden;
}
</style>
