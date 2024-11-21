<template>
  <div class="border border-grey-l3 p-6 font-medium h-full">
    <div class="h-full flex flex-col content-between">
      <div class="flex-1">
        <div class="sm:min-h-64 md:min-h-56 lg:min-h-48">
          <p class="text-grey-l2 tracking-wide uppercase">
            {{ isBilled(plan) }}
          </p>
          <h3 class="mt-2 uppercase">
            {{ plan.name }}
          </h3>
          <h3 class="text-red">
            <span v-if="plan.price != null">{{ plan.price | currency }}</span>
            <span v-else>{{ $t('general.custom') }}</span>
          </h3>
          <p class="text-grey pt-2 pb-6 font-serif">
            {{ plan.description }}
          </p>
        </div>
        <p class="pt-3 pb-2 border-t border-b border-grey-l3 font-bold text-h6 uppercase">
          <span class="text-red">{{ plan.deal_commision }}%</span> {{ $t('app.team.settings.subscriptions.deal_commission') }}
        </p>
        <div class="pt-3 pb-2 block md:hidden border-b border-grey-l3">
          <app-button
            :title="toggleFeaturesButtonTitle"
            :btn-class="'link'"
            @clicked="toggleFeatures"
          />
        </div>

        <transition name="fade-down">
          <div v-if="featuresVisible">
            <p v-if="index===0" class="pb-2 pt-4">
              {{ $t('app.team.settings.subscriptions.features') }}
            </p>
            <p v-else class="pb-2 pt-4">
              {{ plans[index-1].name }} {{ $t('general.plus') }}
            </p>
            <ul class="is-truncated">
              <li v-for="feature in plan.features" :key="feature.id" class="py-2">
                {{ feature.name }}
              </li>
            </ul>
          </div>
        </transition>

        <transition name="fade-down">
          <div class="hidden md:block">
            <p v-if="index===0" class="pb-2 pt-4">
              {{ $t('app.team.settings.subscriptions.features') }}
            </p>
            <p v-else class="pb-2 pt-4">
              {{ plans[index-1].name }} {{ $t('general.plus') }}
            </p>
            <ul class="is-truncated">
              <li v-for="feature in plan.features" :key="feature.id" class="py-2">
                {{ feature.name }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="w-full pt-4 md:pt-6">
        <app-button
          :title="btnPlanTitle(plan)"
          :disabled="isActivePlan(plan)"
          :btn-class="btnClass(plan)"
          :loader="true"
          :should-disable="true"
          class="w-full pt-6"
          @clicked="upgradePlan(plan)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'SubscriptionPlan',

  components: {
    AppButton
  },

  props: {
    plans: {
      type: Array,
      default: () => []
    },
    plan: {
      type: Object,
      default: () => ({})
    },
    team: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    }
  },

  data: () => ({
    featuresVisible: false
  }),

  computed: {
    toggleFeaturesButtonTitle() {
      if (!this.featuresVisible) {
        return this.$t('general.show_more')
      } else {
        return this.$t('general.show_less')
      }
    }
  },

  methods: {
    toggleFeatures() {
      this.featuresVisible = !this.featuresVisible
    },

    isBilled(plan) {
      if (plan.free) {
        return this.$t('app.team.settings.subscriptions.free')
      } else {
        return this.$t('app.team.settings.subscriptions.billed_annually')
      }
    },

    isActivePlan(plan) {
      return plan.id === this.team.subscription.id
    },

    btnPlanTitle(plan) {
      if (this.isActivePlan(plan)) {
        return this.$t('app.team.settings.subscriptions.current')
      } else {
        return this.$t('app.team.settings.subscriptions.change')
      }
    },

    btnClass(plan) {
      if (this.isActivePlan(plan)) {
        return 'link w-full'
      } else {
        return 'primary w-full'
      }
    },

    upgradePlan(plan) {
      this.$emit('upgrade-plan', plan)
    }
  }
}
</script>

<style lang="postcss" scoped>
ul {
  li {
    @apply .pl-5;

    &:before {
      @apply .text-green .-ml-5 .w-5 .inline-block .font-icon .font-bold;
      content: '\f00c'; /* FontAwesome Unicode */
    }
  }
}

.is-truncated {
}
</style>
