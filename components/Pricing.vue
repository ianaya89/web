<template>
  <tr class="w-full">
    <div v-if="loading">
      <content-placeholders>
        <content-placeholders-heading :img="true" />
        <content-placeholders-text :lines="10" />
      </content-placeholders>
    </div>
    <!-- TODO: All texts into lang file -->
    <table v-else class="w-full">
      <thead>
        <tr v-if="hasStripeCustomerId && isAuthenticated">
          <app-button
            :title="'Manage Subscriptions'"
            @clicked="onManageSubscriptionButtonClick()"
          />
        </tr>
        <tr>
          <th class="xl:w-1/4">
            <div class="flex">
              <app-tooltip class="font-normal text-left" :position="'right'">
                <template v-slot:activator>
                  <span class="fas fa-info-circle p-1" />
                </template>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span class="w-64" v-html="$t('pricing.annually')" />
              </app-tooltip>
              <switcher v-model="billSwitcher" data-cy="pay-switcher" :label="$t('public.bill.bill_annually')" class="text-black font-medium pr-3" />
            </div>
          </th>
          <th v-for="plan in list" :key="plan.slug" class="min-w-56 lg:min-w-48 border-l border-grey-l3 text-left px-6 py-12">
            <h2 class="text-h3 xl:text-h2 uppercase">
              {{ plan.name }}
            </h2>
            <h2 v-if="plan.custom" class="text-h4 xl:text-h3 text-red font-normal uppercase">
              <div>
                {{ $t('general.custom') }}

                <div>
                  <app-button v-if="activePlanSlug === plan.stripePlan" class="mt-4" :disabled="true" :title="$t('general.your_plan')" style="min-height: 3.25rem" />
                  <app-button
                    v-else-if="!plan.hidden"
                    :ref="plan.stripePlan + '-plan-btn'"
                    :loader="false"
                    :disabled="!plan.selectable"
                    class="mt-4"
                    style="min-height: 3.25rem"
                    :title="$t('general.get_started')"
                    @clicked="openHubspotChat()"
                  />
                </div>
              </div>
            </h2>
            <transition v-else name="fade" mode="out-in">
              <div>
                <div :key="!billSwitcher">
                  <h2 v-if="!billSwitcher" class="text-h4 xl:text-h3 text-red font-normal">
                    {{ plan.price.monthly | currency }}/{{ $t('general.month_shortcut') }}
                  </h2>
                  <h2 v-else class="text-h4 xl:text-h3 text-red font-normal">
                    {{ plan.price.annualy | currency }}/{{ $t('general.year_shortcut') }}
                  </h2>
                </div>
                <div class="flex items-end">
                  <!-- TODO: Button should link to "register" page -->
                  <app-button v-if="activePlanSlug === plan.stripePlan" class="mt-4" :disabled="true" :title="$t('general.your_plan')" style="min-height: 3.25rem" />
                  <app-button
                    v-else-if="!plan.hidden"
                    :ref="plan.stripePlan + '-plan-btn'"
                    :loader="isAuthenticated"
                    :disabled="!plan.selectable"
                    :loading-text="$t('general.updating')"
                    class="mt-4"
                    style="min-height: 3.25rem"
                    :title="$t('general.get_started')"
                    @clicked="switchPlan(plan.stripePlan)"
                  />
                </div>
              </div>
            </transition>
          </th>
        </tr>
        <tr>
          <td class="relative px-6 text-grey" />
          <td v-for="plan in list" :key="plan.slug" class="border-l border-grey-l3 text-left px-6 py-2 font-medium">
            <div v-if="plan.tooltip!==null">
              <span class="text-grey-l1 text-p2"><span class="text-red">*</span>{{ plan.tooltip }}</span>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-if="list.length && list[0].dealCommission">
          <td class="border-b border-grey-l3 relative px-6 text-grey">
            <app-tooltip class="feature-description" :position="'right'">
              <template v-slot:activator>
                <span class="fas fa-info-circle p-1" />
              </template>
              <span class="w-64">
                {{ $t('pricing.commission') }}
              </span>
            </app-tooltip>
            {{ $t('pricing.deal_commission') }}
          </td>
          <td v-for="plan in list" :key="plan.slug" class="border-l border-b border-grey-l3 text-left px-6 py-4 font-medium">
            {{ plan.dealCommission | percentage }}
          </td>
        </tr>
        <tr>
          <td class="border-b border-grey-l3 relative px-6 text-grey">
            {{ $t('pricing.user_accounts') }}
          </td>
          <td v-for="plan in list" :key="plan.slug" class="border-l border-b border-grey-l3 text-left px-6 py-4 font-medium">
            {{ plan.accounts }} <span class="uppercase">{{ $tc('general.accounts', plan.accounts) }}</span>
          </td>
        </tr>
      </tbody>

      <thead>
        <tr>
          <th class="text-left pb-4 pt-8">
            <h3>{{ $t('pricing.features') }}</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feature in plans.features" :key="feature.name">
          <td class="border-b border-grey-l3 relative px-6 text-grey">
            {{ feature.name }}
          </td>
          <td v-for="plan in list" :key="plan.slug" class="border-l border-b border-grey-l3 text-left px-6 py-4">
            <span v-if="feature[plan.slug]" class="fas fa-check text-green" />
            <span v-else class="fas fa-times text-grey-l2" />
          </td>
        </tr>
        <tr>
          <td class="w-1/5 border-b border-grey-l3 relative px-6 text-grey">
            <app-tooltip class="feature-description" :position="'right'">
              <template v-slot:activator>
                <span class="fas fa-info-circle p-1" />
              </template>
              <span class="w-64">
                {{ $t('pricing.data_update_freq_info') }}
              </span>
            </app-tooltip>
            {{ $t('pricing.data_update_freq') }}
          </td>
          <td v-for="plan in list" :key="plan.slug" class="border-l border-b border-grey-l3 text-left px-6 py-4">
            {{ plan.dataUpdates }}
          </td>
        </tr>
      </tbody>

      <thead>
        <tr>
          <th class="text-left pb-4 pt-8">
            <h3>{{ $t('pricing.analytics') }}</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dashboard in plans.dashboards" :key="dashboard.name">
          <td class="w-1/5 border-b border-grey-l3 relative px-6 text-grey">
            <app-tooltip v-if="dashboard.description" class="feature-description" :color="'light'" :position="'left'">
              <template v-slot:activator>
                <span class="fas fa-info-circle p-1" />
              </template>
              {{ dashboard.description }}
            </app-tooltip>
            {{ dashboard.name }}
          </td>
          <td v-for="plan in list" :key="plan.slug" class="border-l border-b border-grey-l3 text-left px-6 py-4">
            <span v-if="dashboard[plan.slug]" class="fas fa-check text-green" />
            <span v-else class="fas fa-times text-grey-l2" />
          </td>
        </tr>
      </tbody>

      <thead>
        <tr>
          <th class="text-left pb-4 pt-8">
            <h3>{{ $t('pricing.support') }}</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="support in plans.support" :key="support.name">
          <td class="border-b border-grey-l3 relative px-6 text-grey">
            {{ support.name }}
          </td>
          <td v-for="plan in list" :key="plan.slug" class="border-l border-b border-grey-l3 text-left px-6 py-4">
            <span v-if="support[plan.slug]" class="fas fa-check text-green" />
            <span v-else class="fas fa-times text-grey-l2" />
          </td>
        </tr>
      </tbody>

      <thead>
        <tr>
          <th class="w-1/4">
            <div class="flex">
              <app-tooltip class="font-normal text-left" :position="'right'">
                <template v-slot:activator>
                  <span class="fas fa-info-circle p-1" />
                </template>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span class="w-64" v-html="$t('pricing.annually')" />
              </app-tooltip>
              <switcher v-model="billSwitcher" :label="$t('public.bill.bill_annually')" class="text-black font-medium pr-3" />
            </div>
          </th>
          <th v-for="plan in list" :key="plan.slug" class="w-1/5 border-l border-grey-l3 text-left px-6 py-12">
            <h2 class="uppercase">
              {{ plan.name }}
            </h2>
            <h2 v-if="plan.custom" class="text-red text-h3 font-normal uppercase">
              <div>
                {{ $t('general.custom') }}

                <div class="flex items-end">
                  <!-- TODO: Button should link to "register" page -->
                  <app-button v-if="activePlanSlug === plan.stripePlan" class="mt-4" :disabled="true" :title="$t('general.your_plan')" style="min-height: 3.25rem" />
                  <app-button
                    v-else-if="!plan.hidden"
                    :ref="plan.stripePlan + '-bottom-plan-btn'"
                    :disabled="!plan.selectable"
                    :loader="false"
                    class="mt-4"
                    style="min-height: 3.25rem"
                    :title="$t('general.get_started')"
                    @clicked="openHubspotChat()"
                  />
                </div>
              </div>
            </h2>
            <transition v-else name="fade" mode="out-in">
              <div>
                <div :key="!billSwitcher">
                  <h2 v-if="!billSwitcher" class="text-red text-h3 font-normal">
                    {{ plan.price.monthly | currency }}/{{ $t('general.month_shortcut') }}
                  </h2>
                  <h2 v-else class="text-red text-h3 font-normal">
                    {{ plan.price.annualy | currency }}/{{ $t('general.year_shortcut') }}
                  </h2>
                </div>
                <div class="flex items-end">
                  <app-button v-if="activePlanSlug === plan.stripePlan" class="mt-4" :disabled="true" :title="$t('general.your_plan')" style="min-height: 3.25rem" />
                  <app-button
                    v-else-if="!plan.hidden"
                    :ref="plan.stripePlan + '-bottom-plan-btn'"
                    :loader="isAuthenticated"
                    :loading-text="$t('general.updating')"
                    :disabled="!plan.selectable"
                    class="mt-4"
                    style="min-height: 3.25rem"
                    :title="$t('general.get_started')"
                    @clicked="switchPlan(plan.stripePlan)"
                  />
                </div>
              </div>
            </transition>
          </th>
        </tr>
        <tr>
          <td class="relative px-6 text-grey" />
          <td v-for="plan in list" :key="plan.slug" class="border-l border-grey-l3 text-left px-6 py-2 font-medium">
            <div v-if="plan.tooltip!==null">
              <span class="text-grey-l1 text-p2"><span class="text-red">*</span>{{ plan.tooltip }}</span>
            </div>
          </td>
        </tr>
      </thead>
    </table>
    <stripe-checkout
      ref="checkoutRef"
      :pk="publishableKey"
      :session-id="sessionId"
    />
  </tr>
</template>

<script>
import { mapGetters } from 'vuex'
import { StripeCheckout } from '@vue-stripe/vue-stripe'
import AppTooltip from '@/components/AppTooltip'
import Switcher from '@/components/Switcher'
import AppButton from '@/components/AppButton'
import {
  ActiveUnitQuery,
  CreateStripeCustomerPortalSession,
  CreateStripeSession,
  MeQuery
} from '@/services/graphql'
import { openHubspotChat } from '@/plugins/hubspot'
import { SUBSCRIPTION_ROUTES_4_TYPENAMES } from '@/services/helpers'

export default {
  name: 'PricingBrand',

  components: {
    AppButton,
    AppTooltip,
    Switcher,
    StripeCheckout
  },

  props: {
    loading: {
      type: Boolean,
      default: true
    },
    isFromFrontend: {
      type: Boolean,
      default: false
    },
    plans: {
      type: Object,
      default: () => ({
        list: [],
        dashboards: [],
        support: [],
        features: []
      })
    }
  },

  apollo: {
    unit: {
      ...ActiveUnitQuery(function() {
        return { id: this.$route.params.id }
      }),
      skip() {
        return this.$route.params.id == null
      }
    },
    me: {
      ...MeQuery,
      skip() {
        return !this.isAuthenticated
      }
    }
  },

  data: () => ({
    billSwitcher: true,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    sessionId: null
  }),

  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    }),

    list() {
      return this.$get(this.plans, 'list', [])
    },

    activePlanSlug() {
      return this.$get(this.unit, 'activeSubscription.stripePlan')
    },

    hasStripeCustomerId() {
      return this.$get(this.unit, 'hasStripeCustomerId')
    },

    isDevEnv() {
      return process.env.BASE_ENVIROMENT === 'dev'
    }
  },

  methods: {
    openHubspotChat,

    switchPlan(plan) {
      if (!this.isAuthenticated) {
        this.$router.push(
          this.localePath({
            name: 'register'
          })
        )
        return
      } else if (this.isFromFrontend && this.me) {
        const unitId = this.$get(this.me, 'units.0.id')
        const entityType = this.$get(this.me, 'units.0.entity.__typename')
        this.$router.push(
          this.localePath({
            name: SUBSCRIPTION_ROUTES_4_TYPENAMES[entityType],
            params: { id: unitId }
          })
        )
        return
      }

      const organizationUnitId = this.$route.params.id
      const isYearly = this.billSwitcher

      this.$apollo
        .mutate({
          ...CreateStripeSession,
          variables: { organizationUnitId, plan, isYearly }
        })
        .then(response => {
          this.sessionId = response.data.createStripeSession.id
          this.$refs.checkoutRef.redirectToCheckout()
        })
    },

    onManageSubscriptionButtonClick() {
      const organizationUnitId = this.$route.params.id

      this.$apollo
        .mutate({
          ...CreateStripeCustomerPortalSession,
          variables: { organizationUnitId }
        })
        .then(response => {
          window.location.href =
            response.data.createStripeCustomerPortalSession.url
        })
    }
  }
}
</script>

<style lang="postcss" scoped>
.feature-description {
  @apply .absolute .font-normal .text-left;
  left: -0.75rem;
}
</style>
