<template>
  <div class="pricing-page">
    <div class="w-full flex relative">
      <div class="w-screen h-screen bg-image absolute top-0 right-0" />
      <div class="w-auto sm:w-16 xl:w-1/5" />
      <div class="w-full xl:w-4/5 pb-10 px-8 sm:px-12 xl:pr-48 border-l border-grey-l3 -mb-56 relative">
        <div class="red-stripe" />
        <transition name="fade-up" :appear="true">
          <div class="pt-128 xl:pt-192">
            <h1 class="text-h2 sm:text-6xl uppercase leading-none max-w-sm -mt-64 xl:-mt-128">
              {{ $t('pricing.for_teams.title') }}
            </h1>
          </div>
        </transition>
      </div>
    </div>

    <div class="w-full flex overflow-x-auto mt-48 xl:mt-0">
      <div class="w-auto sm:w-16 xl:w-1/5" />
      <div class="w-full xl:w-4/5 pb-32 pl-6 xl:pl-12 xl:pr-24">
        <transition name="fade-up-delayed" :appear="true">
          <div class="w-full flex">
            <pricing :plans="plans" :loading="$apollo.loading" :is-from-frontend="true" />
          </div>
        </transition>
      </div>
    </div>

    <div class="w-full flex">
      <div class="w-auto sm:w-16 xl:w-1/5" />
      <div class="w-full xl:w-4/5 pb-10 px-8 sm:px-12 xl:pr-48 border-l border-grey-l3 relative">
        <appear-transition :percentage-offset="0.5">
          <div class="sm:pb-48">
            <h2 class="text-h2 sm:text-h1 uppercase leading-none max-w-md pb-12">
              {{ $t('pricing.for_teams.cta') }}
            </h2>
            <!-- TODO: Button should link to "register" page -->
            <app-button :title="$t('pricing.for_teams.cta_button')" btn-class="primary-lg" :show-arrow="true" class="sm:-ml-12" @clicked="openHubspotChat()" />
          </div>
        </appear-transition>
      </div>
    </div>
  </div>
</template>

<script>
import { SubscriptionQuery } from '@/services/graphql'
import AppButton from '@/components/AppButton'
import Pricing from '@/components/Pricing'
import AppearTransition from '@/components/transitions/AppearTransition'
import { openHubspotChat } from '@/plugins/hubspot'

export default {
  layout: 'landing',

  components: {
    Pricing,
    AppButton,
    AppearTransition
  },

  apollo: {
    team: SubscriptionQuery
  },

  data: () => ({
    team: SubscriptionQuery.mock
  }),

  computed: {
    plans() {
      return {
        list: [
          {
            name: this.$t('app.team.settings.subscriptions.plans.free'),
            tooltip: null,
            selectable: true,
            slug: 'free',
            stripePlan: 'team-free',
            dealCommission: 0.12,
            accounts: 1,
            dataUpdates: 'QUARTERLY',
            free: true,
            custom: false,
            price: {
              monthly: 0,
              annualy: 0
            }
          },
          {
            name: this.$t('app.team.settings.subscriptions.plans.basic'),
            tooltip: null,
            selectable: true,
            slug: 'basic',
            stripePlan: 'team-basic',
            dealCommission: 0.1,
            accounts: 3,
            dataUpdates: 'MONTHLY',
            free: false,
            custom: false,
            price: {
              monthly: 90,
              annualy: 900
            }
          },
          {
            name: this.$t('app.team.settings.subscriptions.plans.premium'),
            tooltip: null,
            selectable: true,
            slug: 'premium',
            stripePlan: 'team-premium',
            dealCommission: 0.08,
            dataUpdates: 'CUSTOM',
            accounts: 10,
            free: false,
            custom: true,
            price: {}
          }
        ],
        support: [
          {
            name: this.$t('app.team.settings.subscriptions.list.email'),
            free: true,
            basic: true,
            premium: true
          },
          {
            name: this.$t('app.team.settings.subscriptions.list.chat'),
            free: true,
            basic: true,
            premium: true
          },
          {
            name: this.$t('app.team.settings.subscriptions.list.data_prefill'),
            free: false,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.team.settings.subscriptions.list.dedicated_manager'
            ),
            free: false,
            basic: true,
            premium: true
          }
        ],
        dashboards: [
          {
            name: this.$t(
              'app.team.settings.subscriptions.list.team_dashboard'
            ),
            free: true,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.team.settings.subscriptions.list.leagues_overview'
            ),
            free: false,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.team.settings.subscriptions.list.stadium_dashboard'
            ),
            free: true,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.team.settings.subscriptions.list.players_dashboard'
            ),
            free: false,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.team.settings.subscriptions.list.sport_media_overview'
            ),
            free: true,
            basic: true,
            premium: true
          }
          // {
          //   name: this.$t(
          //     'app.team.settings.subscriptions.list.sponsorship_dashboard'
          //   ),
          //   free: false,
          //   basic: false,
          //   premium: true
          // }
        ],
        features: [
          // {
          //   name: this.$t('app.team.settings.subscriptions.list.insights'),
          //   free: true,
          //   basic: true,
          //   premium: true
          // },
          {
            name: this.$t(
              'app.team.settings.subscriptions.list.website_insights'
            ),
            free: false,
            basic: true,
            premium: true
          },
          {
            name: this.$t('app.team.settings.subscriptions.list.fans_demo'),
            free: false,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.team.settings.subscriptions.list.media_buy_inventory'
            ),
            free: true,
            basic: true,
            premium: true
          },
          {
            name: this.$t('app.team.settings.subscriptions.list.deals'),
            free: true,
            basic: true,
            premium: true
          }
        ]
      }
    }
  },

  mounted() {
    this.$store.dispatch('public-menu/setPermanentMenu', true)
  },

  destroyed() {
    this.$store.dispatch('public-menu/setDefault')
  },

  methods: {
    openHubspotChat
  }
}
</script>

<style lang="postcss" scoped>
.pricing-page {
  .bg-image {
    @apply .opacity-50;
    z-index: -10;
    background-image: url('../assets/images/pricing-for-teams.jpg');
    background-repeat: no-repeat;
  }
  @media (max-width: 576px) {
    .bg-image {
      background-size: 300% auto;
      background-position: 80% 100%;
    }
  }
  @media (min-width: 577px) and (max-width: 1200px) {
    .bg-image {
      background-size: 200% auto;
      background-position: 80% top;
    }
  }
  .red-stripe {
    @apply .border-r-2 .border-red .absolute .h-8 .bottom-0 .left-0;
  }
}
</style>
