<template>
  <section class="team__settings__subscriptions overflow-auto">
    <div class="w-full mt-8 flex flex-wrap -px-6">
      <pricing :plans="plans" :loading="$apollo.loading" />
    </div>
  </section>
</template>

<script>
import Pricing from '@/components/Pricing'
import { SubscriptionQuery } from '@/services/graphql'

export default {
  name: 'Subscriptions',

  components: {
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
            free: true,
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
            free: false,
            basic: false,
            premium: true
          },
          {
            name: this.$t(
              'app.team.settings.subscriptions.list.sponsorship_dashboard'
            ),
            free: false,
            basic: false,
            premium: true
          }
        ],
        features: [
          {
            name: this.$t('app.team.settings.subscriptions.list.insights'),
            free: true,
            basic: true,
            premium: true
          },
          {
            name: this.$t(
              'app.team.settings.subscriptions.list.website_insights'
            ),
            free: true,
            basic: true,
            premium: true
          },
          {
            name: this.$t('app.team.settings.subscriptions.list.fans_demo'),
            free: true,
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
            name: this.$t('app.team.settings.subscriptions.list.easy_share'),
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

  methods: {
    isActivePlan(plan) {
      return plan.id === this.team.subscription.id
    },

    upgradePlan(plan) {
      // todo:: upgrade plan procedure
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
