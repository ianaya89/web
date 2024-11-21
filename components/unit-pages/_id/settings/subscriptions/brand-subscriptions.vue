<template>
  <section class="brand__settings__subscriptions overflow-auto">
    <div class="w-full mt-8 flex flex-wrap -px-6">
      <subscription-result v-if="isSubscriptionResultPresent" :result="subscriptionResult" :unit-id="unitId" />
      <pricing v-else :plans="plans" :loading="$apollo.loading" />
    </div>
  </section>
</template>

<script>
import { SubscriptionQuery } from '@/services/graphql'
import Pricing from '@/components/Pricing'
import SubscriptionResult from '@/components/SubscriptionResult'

export default {
  name: 'BrandSubscriptions',

  components: {
    SubscriptionResult,
    Pricing
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    team: SubscriptionQuery
  },

  data: () => ({
    team: SubscriptionQuery.mock
  }),

  computed: {
    isSubscriptionResultPresent() {
      const result = this.subscriptionResult
      return !!result && ['success', 'cancel'].indexOf(result) !== -1
    },

    subscriptionResult() {
      return this.$route.query.result
    },

    plans() {
      return {
        list: [
          {
            name: this.$t('app.brand.settings.subscriptions.plans.free.title'),
            tooltip: null,
            selectable: false,
            hidden: true,
            slug: 'free',
            stripePlan: 'brand-free',
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
            name: this.$t('app.brand.settings.subscriptions.plans.basic'),
            tooltip: null,
            selectable: true,
            hidden: false,
            slug: 'basic',
            stripePlan: 'brand-basic',
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
            name: this.$t('app.brand.settings.subscriptions.plans.premium'),
            tooltip: null,
            selectable: true,
            hidden: false,
            slug: 'premium',
            stripePlan: 'brand-premium',
            dataUpdates: 'CUSTOM',
            accounts: 10,
            free: false,
            custom: true,
            price: {}
          }
        ],
        support: [
          {
            name: this.$t('app.brand.settings.subscriptions.list.email'),
            free: true,
            basic: true,
            premium: true
          },
          {
            name: this.$t('app.brand.settings.subscriptions.list.chat'),
            free: true,
            basic: true,
            premium: true
          },
          {
            name: this.$t('app.brand.settings.subscriptions.list.data_prefill'),
            free: false,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.brand.settings.subscriptions.list.dedicated_manager'
            ),
            free: false,
            basic: true,
            premium: true
          }
        ],
        dashboards: [
          {
            name: this.$t(
              'app.brand.settings.subscriptions.list.leagues_overview'
            ),
            free: false,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.brand.settings.subscriptions.list.players_dashboard'
            ),
            free: false,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.brand.settings.subscriptions.list.stadium_dashboard'
            ),
            free: false,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.brand.settings.subscriptions.list.finances_dashboard'
            ),
            free: false,
            basic: true,
            premium: true
          }
        ],
        features: [
          {
            name: this.$t(
              'app.brand.settings.subscriptions.list.sponsorship_access'
            ),
            free: true,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.brand.settings.subscriptions.list.marketplace_comparison'
            ),
            free: false,
            basic: true,
            premium: true
          },
          {
            name: this.$t('app.brand.settings.subscriptions.list.insights'),
            free: true,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.brand.settings.subscriptions.list.website_insights'
            ),
            free: true,
            basic: true,
            premium: true
          },
          {
            name: this.$t('app.brand.settings.subscriptions.list.fans_demo'),
            free: true,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.brand.settings.subscriptions.list.team_fans_demo'
            ),
            free: false,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.brand.settings.subscriptions.list.team_social_insights'
            ),
            free: false,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.brand.settings.subscriptions.list.team_web_insights'
            ),
            free: false,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.brand.settings.subscriptions.list.logo_exposure'
            ),
            free: false,
            basic: false,
            premium: true
          },
          {
            name: this.$t('app.brand.settings.subscriptions.list.logo_ROI'),
            free: false,
            basic: false,
            premium: true
          }
        ]
      }
    }
  },

  methods: {
    isActivePlan(plan) {
      return plan.id === this.brand.subscription.id
    },

    upgradePlan(plan) {
      // todo:: upgrade plan procedure
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
