<template>
  <div class="w-full">
    <div class="w-full flex px-2">
      <div class="mr-auto">
        <label-chart
          :label="$filters.percentage($get(unit,'entity.profileCompletion',0)/100)"
          :chart-value="$get(unit,'entity.profileCompletion',0)/100"
          :info="$t('app.brand.dashboard.profile_strength')"
        />
      </div>
    </div>

    <div class="w-full bg-white shadow-xl px-4 py-8">
      <step-pager :items="profileSuggestions">
        <template v-slot:pager-title>
          <h4 class="my-auto mr-auto">
            {{ $t('app.brand.dashboard.strengthen_your_profile') }}
          </h4>
        </template>
        <template v-slot:content="props">
          <div class="w-full bg-black text-white font-medium p-6 flex">
            <span class="my-auto text-left uppercase md:text-h3">{{ props.item }}</span>
          </div>
        </template>
      </step-pager>

      <div class="font-medium mt-6">
        <app-button :btn-class="'link'" @clicked="openHubspotChat()">
          {{ $t('app.brand.dashboard.request_help') }}
        </app-button>
        <span class="text-grey font-serif">{{ $t('app.brand.dashboard.request_help_sentence') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import LabelChart from '@/components/LabelChart'
import { ActiveUnitQuery } from '@/services/graphql'
import StepPager from '@/components/widgets/StepPager'
import AppButton from '@/components/AppButton'
import { openHubspotChat } from '@/plugins/hubspot'

export default {
  name: 'ProfileStrength',

  components: {
    LabelChart,
    StepPager,
    AppButton
  },

  props: {
    unitId: {
      type: String,
      default: null
    }
  },

  apollo: {
    unit: ActiveUnitQuery(function() {
      return { id: this.unitId }
    })
  },

  computed: {
    profileSuggestions() {
      return this.$get(
        this.$i18n.messages[this.$i18n.locale],
        'app.profile.brand_complete_tips',
        []
      )
    }
  },

  methods: {
    openHubspotChat
  }
}
</script>

<style scoped>
</style>
